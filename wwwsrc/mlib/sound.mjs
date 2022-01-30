const rs = function (item) {

item.tempo = 0.5;
let theItem = item;
  
item.fetchSamples= function (srcs,rs) {
  let audioCtx;
  if (!this.audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioCtx = this.audioCtx = new  AudioContext();
  }
  let ln = srcs.length;
  for (let i=0;i<ln;i++) {
   let src = srcs[i];
   if (!rs[src]) {
     fetch('./samples/'+srcs[i])
      .then(data => data.arrayBuffer())
      .then(arrayBuffer => {
        return audioCtx.decodeAudioData(arrayBuffer);
      })
      .then(audio => {
      console.log('fetched ',src);
      rs[src] = audio;});
    }
 }
}

item.mkEvenRhythm = function(numBeats,dur,notesPerBeat=1,randomDelay=0) {
  let rs = [];
  for (let i=0; i<numBeats;i++) {
    let stdStart = i*dur;
    for (let j=0;j<notesPerBeat;j++) {
      let delay = 0;
      if (randomDelay) {
        delay = Math.random()*randomDelay;
      }
      rs.push(stdStart+delay);
    }
  }
  return rs;
}

const instrument = core.ObjectNode.mk();

const sbInstrument = instrument.instantiate();

//sbInstrument.context = item;


const note = core.ObjectNode.mk();
const tune = core.ObjectNode.mk();

//note.context = item;


 // if instrument is a number, it is the frequency, and an oscilator node is used to play it
item.mkNote = function(instrument,start,params) {
  let nt = note.instantiate();
  /*if (typeof instrument === 'string') {
    instrument = this.instruments[instrument];
  }*/
  nt.instrument = instrument;
  nt.start = start;
  Object.assign(nt,params);
  return nt;
}

item.mkNoteFromD = function (noteD) {
  let ln = noteD.length;
  let instrument = noteD[0]
  let start = noteD[1];
  let params = (ln>2)?noteD[2]:{};
  return this.mkNote(instrument,start,params);
}


item.mkBlankTune = function (numNotes,start,duration,instrument) {
  let tuneI = tune.instantiate();
  let notes = [];
  for (let i=0;i<numNotes;i++) {
    notes.push(this.mkNote(instrument,undefined));
  }
  tuneI.start = start; 
  tuneI.duration = duration;
  tuneI.notes = notes;
 // tuneI.context = this;
  return tuneI;
}



tune.assignPropValues= function (prop,values) {
 // debugger;
  if (!values) {
    return;
  }
  let isOb = typeof values === 'object';
  let notes = this.notes;
  let ln = notes.length;
  let smallNum = 0.001;
  for (let i=0;i<ln;i++) {
    let vl = isOb?values[i]:values;
    notes[i][prop] = (vl ===0)?smallNum:vl;
  }
}

tune.getPropValues= function (prop) {
  let notes = this.notes;
  let ln = notes.length;
  let seq = notes.map((note) => note[prop]);
  return seq;
}


tune.scalePropValues= function (prop,scale) {
 // debugger;
  let notes = this.notes;
  let ln = notes.length;
  notes.forEach((nt) => {
    let ovl = nt[prop]
    if (ovl) {
      nt[prop] = ovl*scale
    }
  });
}

tune.assignRhythm = function (values) {
  this.assignPropValues('start',values);
}

tune.assignGains = function (values) {
  // debugger;
  this.assignPropValues('gain',values);
}

tune.scaleGains = function (scale) {
  // debugger;
  this.scalePropValues('gain',scale);
}

tune.assignDetunes = function (values) {
  // debugger;
  this.assignPropValues('detune',values);
}
 
 
tune.assignInstruments= function (values) {
  // debugger;
  this.assignPropValues('instrument',values);
}

tune.assignFrequencies =  function (values) {
  // debugger;
  this.assignPropValues('instrument',values);
}

tune.assignRates = function (values) {
  // debugger;
  this.assignPropValues('rate',values);
}

tune.assignNoteDurations = function (values) {
  // debugger;
  this.assignPropValues('duration',values);
}
 
 
tune.assignTypes = function (values) {
  // debugger;
  this.assignPropValues('type',values);
}
 


item.mkNotes = function (noteDs,duration) {
  let notes = noteDs.map((noteD) => this.mkNoteFromD(noteD));
  return {notes:notes,duration:duration};
}

item.mkSimpleBufferInstrument = function (nm) {
  let ins = sbInstrument.instantiate();
  ins.buffer = this.assets[nm];
  this.instruments[nm] = ins;
  return ins;
}

item.mkSimpleBufferInstruments = function (){
  let samples = this.samples;
  samples.forEach((nm) => {
    this.mkSimpleBufferInstrument(nm);
    });
}



note.play = function () {
  debugger;
  let isOscillator =0;
  let ins = this.instrument;
  if (typeof ins === 'string') {
    ins = theItem.instruments[ins];
  } else {
    isOscillator = 1;
  }
  let ctx = theItem;
  let tempo = ctx.tempo;
  let audioCtx = ctx.audioCtx;
  let {gain,rate,detune,type} = this;
  let start;
  if (ctx.playingNotes) {
    start = this.start/tempo + ctx.notesStart;
  } else {
    start = this.start/tempo;
  }
  let sound;
  if (isOscillator) {
    sound = audioCtx.createOscillator();
    sound.frequency.value = ins;
  } else {
    sound = audioCtx.createBufferSource();
    sound.buffer = ins.buffer;
  }
  if (rate) {
    sound.playbackRate.value = rate;
  }
   if (detune) {
    sound.detune.value = detune;
  }
  if (type) {
    sound.type= type;
  }
  if (typeof gain === 'number') {
   // debugger;
    let gainNode = audioCtx.createGain();
    gainNode.connect(audioCtx.destination);
    gainNode.gain.value = gain;
    sound.connect(gainNode);
  } else {
    sound.connect(audioCtx.destination);
  }
  console.log('playing note ',this,' at ',start);
  sound.start(start);
  if (isOscillator) {
    sound.stop((this.start + this.duration)/tempo + ctx.notesStart);
   }
 }


tune.play = function () {
  debugger;
  let notes = this.notes;
  theItem.notesStart = theItem.audioCtx.currentTime;
  console.log('notesStart',theItem.notesStart);
  theItem.playingNotes = 1;
  notes.forEach((note) => note.play());
  theItem.playingNotes = 0;
}

tune.clone = function () {
  let {notes,duration,start} = this;
  let inotes = notes.map(note => note.instantiate());
  let rs = tune.instantiate();
  rs.start = start;
  rs.duration = duration;
  rs.notes = inotes;
  return rs;
}  
// by side effect
tune.sortNotes = function () {
  let notes = this.notes;
  notes.sort((note0,note1) => {
    let st0=note0.start;
    let st1=note1.start;
    if (st0 < st1) {
      return -1;
    }
    if (st0 < st1) {
      return 1;
    }
    return 0;
  });
}
// by side effect
tune.delay = function (d) {
  let {duration,start,notes} = this;
  this.start = start + d;
  notes.forEach(note=>note.start=note.start+d);
  return this;
}

//tune.combine = function (instantiateNotes,...theArgs) {
tune.combine = function (...theArgs) {
  let notesArray = [];
  theArgs.forEach((tn) => notesArray.push(tn.notes));
  let notes = this.notes;
  let nnotes = notes.concat.apply(notes,notesArray);
  let inotes;
  let rs = tune.instantiate();
  let starts = [this.start];
  let ends = [this.start + this.duration];
  theArgs.forEach((tn) => {
    starts.push(tn.start);
    ends.push(tn.start + tn.duration);
  });
  let minStart = Math.min.apply(null,starts);
  let maxEnd  = Math.max.apply(null,ends);
  rs.duration = maxEnd - minStart;
  rs.start = minStart;
  rs.notes = nnotes;
  rs.sortNotes();
  return rs;
}


tune.append = function (...theArgs) {
  let delay = this.duration;
  let delayedTunes  = []
  theArgs.forEach((tn) => {
    let dtn = tn.delay(delay);
    delayedTunes.push(dtn);
    delay += tn.duration;
  });
  let tn = this.combine(...delayedTunes);
  return tn;
}
    
tune.repeat = function (n,op) {
  let {start,duration} = this;
  let repetitions = [];
  let cstart = start;
  for (let i=1;i<n;i++) {
    let itune = this.clone();
    if (op) {
      op(itune,i);
    }
    itune.delay(i*duration);
   // itune.start = cstart;
    repetitions.push(itune);
    cstart = cstart + duration;
  }
  let rs = this.combine.apply(this,repetitions);
  
  return rs;
 }
    


item.mkAtune = function (params) {
  let {insts,rhythm,gains,types,detunes,rates,duration,noteDurations} = params;
  //debugger;
  let tune = this.mkBlankTune(rhythm.length,0,duration);
  tune.assignInstruments(insts);
  tune.assignRhythm(rhythm);
  if (noteDurations) {
    tune.assignNoteDurations(noteDurations);
  }
  if (gains) {
    tune.assignGains(gains);
  } 
  if (detunes) {
    tune.assignDetunes(detunes);
  }
  if (rates) {
    tune.assignRates(rates);
  }
  if (types) {
    tune.assignTypes(types);
  }
  return tune;
}
    
item.initializeSound = function  () {
  if (!this.assets) {
    let samples = this.samples;// = ['fx-01','fx-02','hh-01','hh-02','kd-01','perc-02'];
    let assets = this.assets = {};
    this.instruments = {};
    this.fetchSamples(samples,assets);
    setTimeout(() => {
        debugger;
        this.mkSimpleBufferInstruments();
        this.tune.play();
      },1000);
  } else {
    this.tune.play();
  }
}


item.repeatSequence = function (numRepeats,seq) {
  let seqln = seq.length;
  let sq = [];
  for (let i = 0;i<numRepeats;i++) {
    for (let j = 0;j<seqln;j++) {
      sq.push(seq[j])
    }
  }
  return sq;
}

item.mkRandomIntSequence = function (numVals,minVal,maxVal,zeroProbability=0) {
  let sq = [];
  let delta = maxVal-minVal;
  for (let i = 0;i<numVals;i++) {
    let rv0 = Math.random();
    if (rv0 < zeroProbability) {
      sq.push(0    );
    } else {
      let rv = minVal + Math.floor(Math.random()*delta);
      sq.push(rv);
    }
  }
  return sq;
}

item.mkRandomRealSequence = function (numVals,minVal,maxVal,zeroProbability=0) {
  let sq = [];
  let delta = maxVal-minVal;
  for (let i = 0;i<numVals;i++) {
    let rv0 = Math.random();
    if (rv0 < zeroProbability) {
      sq.push(0);
    } else {
      let rv = minVal+Math.random()*delta;
      sq.push(rv);
    }
  }
  return sq;
}

let noteProps = ['start','instrument','duration','detune','gain','rate'];

note.flatten = function () {
 // debugger;
  let fnote = {};
  noteProps.forEach((prop) => {
    let vl = this[prop];
    if (vl !== undefined) {
      fnote[prop] = vl;
    }
  });
  return fnote;
}

item.unflattenNote = function (fnote) {
  let nt = note.instantiate();
  Object.assign(nt,fnote);
  return nt;
}
 

let tuneProps = ['notes','duration','start'];
 
tune.flatten = function () {
 let notes = this.notes;
 let fnotes = notes.map((note) => note.flatten());
 let ftune ={};
 tuneProps.forEach((prop) => {
    let vl = this[prop];
    if (vl !== undefined) {
      ftune[prop] = vl;
    }
  });
  ftune.notes = fnotes;
  return ftune;
}

item.unflattenTune = function (ftune) {
  let tn = tune.instantiate();
  Object.assign(tn,ftune);
  let fnotes = ftune.notes;
  let notes = fnotes.map((fnote) => this.unflattenNote(fnote));
  tn.notes = notes;
  return tn;
}
 

let prettyJSON = 1;
tune.save = function (pretty) {
  debugger;
  let nm = this.name;
  if (!nm) {
    alert('unnamed tune');
    nm ='unnamed';
  }
  let svv =  this.flatten();
  let json = pretty?JSON.stringify(svv,null,4):JSON.stringify(svv);
  let fdst = 'jtunes/'+nm+'.json';
  core.saveJson(fdst,json, () => {
    debugger;
  });
}

item.saveSeq = function (seq,nm,pretty) {
  debugger;
  if (!nm) {
    alert('unnamed sequence');
    nm ='unnamed';
  }
  let json = pretty?JSON.stringify(seq,null,4):JSON.stringify(seq);
  let fdst = 'jseqs/'+nm+'.json';
  core.saveJson(fdst,json, () => {
    debugger;
  });
}


 
 item.fetchTune = function (nm) {
 return new Promise ((resolve,reject) => {
   let ffl = './jtunes/'+nm+'.json';
   fetch(ffl)
   .then(response => response.json())
   .then (ftn => {
     debugger;
     //let ftn = JSON.parse(jftn);
     let tn = this.unflattenTune(ftn);
     resolve(tn);
    });
 })
}

 
 item.fetchSeq = function (nm) {
 return new Promise ((resolve,reject) => {
   let ffl = './jseqs/'+nm+'.json';
   fetch(ffl)
   .then(response => response.json())
 })
}
const toDetune = function (seq) {
  return seq.map((x) => 100*x);
}

item.c_major = toDetune([0,4,7,12]);
item.g_major = toDetune([5,9,12,17]);
item.chromatic_scale = toDetune([0,1,2,3,4,5,6,7,8,9,10,11,12]);

   
}
 
export {rs}