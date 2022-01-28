const rs = function (item) {

item.tempo = 1;
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
      debugger;
      console.log('fetched ',src);
      rs[src] = audio;});
    }
 }
}

item.mkEvenRhythm = function(numNotes,dur) {
  let rs = [];
  for (let i=0; i<numNotes;i++) {
    rs.push(i*dur);
  }
  return rs;
}

const instrument = core.ObjectNode.mk();

const sbInstrument = instrument.instantiate();

//sbInstrument.context = item;


const note = core.ObjectNode.mk();
const tune = core.ObjectNode.mk();

//note.context = item;

item.mkNotee = function(instrument,start,gain,rate,detune) {
  let nt = note.instantiate();
  nt.instrument = instrument;
  nt.start = start;
  nt.gain = gain;
  nt.playbackRate = rate;
  return nt;
}

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

/*
item.mkBlankTune = function (n,duration,instrument) {
  let tuneI = tune.instantiate();
  let notes = [];
  for (let i=0;i<n;i++) {
    rs.push([instrument,undefined]);
  }
  return rs;
}

*/

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

/*
item.assignRhythm = function (noteDs,rhythm) {
  let ln = noteDs.length;
  for (let i=0;i<ln;i++) {
    noteDs[i][1] = rhythm[i];
  }
}

*/

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

tune.assignRhythm = function (values) {
  this.assignPropValues('start',values);
}
/*
item.assignGains = function (noteDs,gains) {
  debugger;
  let ln = noteDs.length;
  for (let i=0;i<ln;i++) {
    let note = noteDs[i];
    let params = note[2];
    params.gain = gains[i];
  }
}
*/
tune.assignGains = function (values) {
  // debugger;
  this.assignPropValues('gain',values);
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
/*
sbInstrument.play = function (note) {
  debugger;
  let ctx = theItem;
  let tempo = ctx.tempo;
  let audioCtx = ctx.audioCtx;
  let {gain,rate,detune} = note;
  let start;
  if (ctx.playingNotes) {
    start = note.start/tempo + ctx.notesStart;
  } else {
    start = note.start/tempo;
  }
  let sound = audioCtx.createBufferSource();
  sound.buffer = this.buffer;
  if (rate) {
    sound.playbackRate.value = rate;
  }
   if (detune) {
    sound.detune.value = detune;
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
  console.log('playing note ',note,' at ',start);
  sound.start(start);
 }
*/



note.play = function () {
  debugger;
  let isOscillator =0;
  let ins = this.instrument;
  if (typeof ins === 'string') {
//    let ctx = this.context;
 //   let ctx = this.context;
   // ins = ctx.instruments[ins];
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
//    let inote =
//    return inote;
//  });
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
/*
tune.combine = function (tune2) {
  let nnotes = this.notes.concat(tune2.notes);
  let rs = tune.instantiate();
  let {duration:dur1,start:start1} = this;
  let {duration:dur2,start:start2} = this;
  let start = Math.min(start1,start2);
  let end1 =  start1 + dur1;
  let end2 =  start2 + dur2;
  let theEnd = Math.max(end1,end2);
  rs.duration = theEnd - start;
  rs.start = start;
  rs.notes = nnotes;
  rs.sortNotes();
  return rs;
}
*/

//tune.combine = function (instantiateNotes,...theArgs) {
tune.combine = function (...theArgs) {
debugger;
  let notesArray = [];
  theArgs.forEach((tn) => notesArray.push(tn.notes));
  let notes = this.notes;
  let nnotes = notes.concat.apply(notes,notesArray);
  let inotes;
 /* if (instantiateNotes) {
     inotes = nnotes.map((note) => note.instantiate());
  } else {
    inotes = nnotes;
  }*/
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

item.mkRandomIntSequence = function (numVals,minVal,maxVal) {
  let sq = [];
  let delta = maxVal-minVal;
  for (let i = 0;i<numVals;i++) {
    let rv = minVal + Math.floor(Math.random()*delta);
    sq.push(rv);
  }
  return sq;
}

item.mkRandomRealSequence = function (numVals,minVal,maxVal) {
  let sq = [];
  let delta = maxVal-minVal;
  for (let i = 0;i<numVals;i++) {
    let rv = minVal+Math.random()*delta;
    sq.push(rv);
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
item.fetchTune = function (nm) {
   let ffl = './jtunes/'+nm+'.json';
   fetch(ffl)
   .then(response => response.json())
   .then (ftn => {
     debugger;
     //let ftn = JSON.parse(jftn);
     let tn = this.unflattenTune(ftn);
     this.tune = tn;
    });
 }

   
}
 
export {rs}