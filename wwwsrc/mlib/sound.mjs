const rs = function (item) {
/*
item.fetchSound = function (src,bufferSource) {
  debugger;
  let audioCtx = this.audioCtx;
  fetch(src)
    .then(data => data.arrayBuffer())
    .then(arrayBuffer => audioCtx.decodeAudioData(arrayBuffer))
    .then(audio => {
       bufferSource.buffer = audio;
    });
 }
 */
 item.fetchSound = function (src) {
  debugger;
  let audioCtx = this.audioCtx;
  return fetch(src)
    .then(data => data.arrayBuffer())
    .then(arrayBuffer => {
      return audioCtx.decodeAudioData(arrayBuffer);
    })
 }
item.fetchSounds= function (srcs,rs) {
   debugger;
  const AudioContext = window.AudioContext || window.webkitAudioContext;
   let audioCtx = this.audioCtx = new  AudioContext();
  let ln = srcs.length;
  // let audioCtx = this.audioCtx;
  for (let i=0;i<ln;i++) {
   fetch(srcs[i])
    .then(data => data.arrayBuffer())
    .then(arrayBuffer => {
      return audioCtx.decodeAudioData(arrayBuffer);
    })
    .then(audio => {debugger;
    rs[i] = audio;});
 }
/*item.playNotes = function (unit) {
  let notes = unit.notes;
  notes.forEach( (note) => {
    note.start*/
}
}
    
export {rs}