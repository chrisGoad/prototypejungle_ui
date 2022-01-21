

let rs = core.ObjectNode.mk();


rs.initializeSound = function () {
  debugger;
 // const AudioContext = window.AudioContext || window.webkitAudioContext;
 // const audioCtx =  AudioContext();
 // const audioCtx = new AudioContext();
  let audioCtx = draw.audioCtx;
 //audioCtx.resume();
  let node = audioCtx.createOscillator();
  node.connect(audioCtx.destination);
  node.start(0);
  node.stop(1);
 }
 
 export {rs};