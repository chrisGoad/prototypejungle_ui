import {rs as addSoundMethods} from '/mlib/sound.mjs';


let rs = core.ObjectNode.mk();

addSoundMethods(rs);

rs.initializeSound0 = function () {
  debugger;
 // const AudioContext = window.AudioContext || window.webkitAudioContext;
 // const audioCtx =  AudioContext();
 // const audioCtx = new AudioContext();
  let audioCtx = draw.audioCtx;
 //audioCtx.resume();
  let node = audioCtx.createOscillator();
  node.connect(audioCtx.destination);
  node.start(0);
  node.stop(5);
   let node2 = audioCtx.createOscillator();
  node2.connect(audioCtx.destination);
  node2.frequency.value = 880;
  node2.start(2);
  node2.stop(3);
 }
 
 
rs.initializeSound1 = function () {
  debugger;
  let audioCtx = draw.audioCtx;
  fetch('./samples/drum-fx-01.mp3')
    .then(data => data.arrayBuffer())
    .then(arrayBuffer => audioCtx.decodeAudioData(arrayBuffer))
    .then(audio => {
       let sound = audioCtx.createBufferSource();
       sound.buffer = audio;
       sound.connect(audioCtx.destination);
       sound.start(1);
       let sound2 = audioCtx.createBufferSource();
      sound2.buffer = audio;
       sound2.connect(audioCtx.destination);
       sound2.start(3);
    });
 }
 
 rs.loadAudioAssets = function () {
   return;
   debugger;
   this.assets = [0];
   this.fetchSounds(['./samples/drum-fx-01.mp3'],this.assets);
 }
 
 
rs.initializeSound = function () {
  debugger;
  this.assets = [0,0];
  this.fetchSounds(['./samples/fx-01.mp3','./samples/perc-02.mp3'],this.assets);
  setTimeout(() => {
    let assets = this.assets;
    debugger;
   let audioCtx = this.audioCtx;
  
 
    let sound = audioCtx.createBufferSource();
    sound.buffer = this.assets[0];
    sound.connect(audioCtx.destination);
    sound.start(2);
    let sound2 = audioCtx.createBufferSource();
    sound2.buffer = this.assets[1];
    sound2.connect(audioCtx.destination);
    sound2.start(2.5);
    },1000);
 }
 
 
 export {rs};