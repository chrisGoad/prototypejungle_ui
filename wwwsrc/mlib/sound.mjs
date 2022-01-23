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

item.mkNote = function(instrument,start) {
  let nt = note.instantiate();
  nt.instrument = instrument;
  nt.start = start;
  return nt;
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
  let start;
  if (ctx.playingNotes) {
    start = note.start + ctx.notesStart;
  } else {
    start = note.start;
  }
  let sound = audioCtx.createBufferSource();
  sound.buffer = this.buffer;
  sound.connect(audioCtx.destination);
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