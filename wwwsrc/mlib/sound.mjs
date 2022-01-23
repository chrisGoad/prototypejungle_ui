const rs = function (item) {

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

sbInstrument.context = item;


const note = core.ObjectNode.mk();

note.context = item;

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
  if (typeof instrument === 'string') {
    instrument = this.instruments[instrument];
  }
  nt.instrument = instrument;
  nt.start = start;
  Object.assign(nt,params);
  return nt;
}

item.mkNoteFromD = function (noteD) {
  let ln = noteD.length;
  let instrument = noteD[0]
  let start = noteD[1];
  let params = (ln>2)?noteD[2]:undefined;
  return this.mkNote(instrument,start,params);
}

item.mkNotes = function (noteDs) {
  let rs = noteDs.map((noteD) => this.mkNoteFromD(noteD));
  return rs;
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
  let ctx = this.context;
  let audioCtx = ctx.audioCtx;
  let {gain,rate,detune} = note;
  let start;
  if (ctx.playingNotes) {
    start = note.start + ctx.notesStart;
  } else {
    start = note.start;
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
  sound.start(start);
 }
 
note.play = function () {
  let ins = this.instrument;
  ins.play(this);
}

item.playNotes = function (notes) {
  this.notesStart = this.audioCtx.currentTime;
  this.playingNotes = 1;
  notes.forEach((note) => note.play());
  this.playingNotes = 0;
}

}
    
export {rs}