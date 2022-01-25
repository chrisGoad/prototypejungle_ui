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
     fetch('./samples/'+srcs[i]+'.mp3')
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

item.mkBlankTune = function (n,duration,instrument) {
  let tuneI = tune.instantiate();
  let notes = [];
  for (let i=0;i<n;i++) {
    notes.push(this.mkNote(instrument,undefined));
  }
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
  debugger;
  let notes = this.notes;
  let ln = notes.length;
  for (let i=0;i<ln;i++) {
    notes[i][prop] = values[i];
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
  debugger;
  this.assignPropValues('gain',values);
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
  if (gain) {
    debugger;
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
 
note.play = function () {
  let ins = this.instrument;
  if (typeof ins === 'string') {
//    let ctx = this.context;
 //   let ctx = this.context;
   // ins = ctx.instruments[ins];
    ins = theItem.instruments[ins];
  }
  ins.play(this);
}

tune.play = function () {
  debugger;
  let notes = this.notes;
  //this.notesStart = this.context.audioCtx.currentTime;
  theItem.notesStart = theItem.audioCtx.currentTime;
  console.log('notesStart',theItem.notesStart);
  theItem.playingNotes = 1;
  notes.forEach((note) => note.play());
  theItem.playingNotes = 0;
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

} 
export {rs}