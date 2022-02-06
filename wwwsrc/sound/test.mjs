import {rs as addSoundMethods} from '/mlib/sound.mjs';


let rs = core.ObjectNode.mk();

addSoundMethods(rs);
rs.tempo = 16;
let banjo = 'one-string-banjo_D_major.wav';
let tom = 'one-shot-drum-tom-7.wav';
let crash = 'one-shot-drum-crash-7.wav';
let kick = 'one-shot-drum-kick_A_major.wav';
let piano = 'keyscape-piano_C.wav';
let cello = 'cello_G_major.wav';
rs.samples = [tom,'fx-01.mp3','fx-02.mp3',banjo,kick,crash,piano,cello,'hh-01.mp3','hh-02.mp3','ir-hall.mp3','kd-01.mp3',
'kd-02.mp3','oh-01.mp3','oh-02.mp3','perc-01.mp3',
'perc-02.mp3','sd-01.mp3','sd-02.mp3'];
/*rs.tune = rs.mkNotes(
  [['fx-01',0],['fx-02',1,{gain:1,detune:200}],['fx-02',2],['hh-01',3,{rate:0.05}],['hh-02',4],
   ['hh-02',5],['kd-01',6],['perc-02',7,{gain:10}],['perc-02',8,{gain:2}]]);*/
debugger;


const mkTune0 = function () {
  let samples = rs.samples;
  let numNotes = samples.length;
  let evr = rs.mkEvenRhythm(numNotes,1);
  let tn = rs.mkAtune({insts:samples,rhythm:evr,duration:numNotes});
  return tn;
}

const mkOTune0 = function () {
  debugger;
  let freqs = [440,440];
  let noteDuration = 0.9;
  let numNotes = freqs.length;
  let evr = rs.mkEvenRhythm(numNotes,.5);
  let tn = rs.mkAtune({insts:freqs,types:['square','sawtooth'],rhythm:evr,duration:numNotes,noteDurations:noteDuration,detunes:[0,400]});
  return tn;
}



const mkRTune0 = function (ins,n) {
  debugger;
 // let tune = rs.mkBlankTune(numNotes,0,noteDur*numNotes,'fx-02');
  let evr = rs.mkEvenRhythm(n,1);
 // let gains = [2,0.05,0.5,0.0,0.05];
  let detunes0 = rs.mkRandomIntSequence(n,0,0);
  let detunes = detunes0.map((vl) => 100*vl);
  //let gains = rs.mkRandomRealSequence(n,1,2);
  let gains = rs.mkRandomRealSequence(n,0,4,0.3);
  let tn =rs.mkAtune({insts:ins,rhythm:evr,gains:gains,duration:n,detunes:detunes});
 

  return tn;
}

const mkTune1 = function (gains,detunes) {
 // debugger;
  let numNotes = 5;
 // let tune = rs.mkBlankTune(numNotes,0,noteDur*numNotes,'fx-02');
  let evr = rs.mkEvenRhythm(numNotes,0.5);
 // let gains = [2,0.05,0.5,0.0,0.05];
  let tn = rs.mkAtune({insts:banjo,rhythm:evr,gains:gains,duration:numNotes,detunes:detunes});
  return tn;
}
const mkTune2 = function () {
  debugger;
  let tn0 = mkTune1([2,0.2,0.001,0.2,0.2],[0,100,200,300,400]);
  let rtn0 = tn0.repeat(2);
//  debugger;
 //return rtn0;
  //let rtn0 = tn0.repeat(2);
  let tn1 = mkTune1([2,0.05,0.05,0.5,0.001],[0,100,200,300,400]);
  let rtn1 = tn1.repeat(2);
  let tn = rtn0.append(rtn1);
  let rtn = tn.repeat(5)
  return rtn;
}

/*
  une.assignRhythm(evr);
  tune.assignGains([2,0.05,0.5,0.05,0.05]);
  let rtune = tune.repeat(4);
  return rtune;
}
*/

//let tn = mkTune0(8);
let wh = 2;
const mkTune3 = function () {
 rs.fetchTune('random9').then((tn) => {
  debugger;
  let gseq = tn.getPropValues('gain');
  let sseq = tn.getPropValues('start');
  tn.assignInstruments(banjo)
  tn.assignInstruments(piano)
  tn.assignInstruments(cello)
  //tn.assignInstruments(tom)
  tn.assignRates(0.5);
  tn.assignRates(1);
  tn.scaleGains(0.5);
 // let detunes0 = rs.repeatSequence(4,rs.g_major);
  let detunes0 = rs.c_major.concat(rs.g_major,rs.c_major,rs.g_major);
  tn.assignDetunes(detunes0);
  let rtn = tn.repeat(8);
  //let detunes = rs.mkRandomIntSequence({numVals:7,minVal:-12,maxVal:12});
  let nv =16;
 let detunesC = rs.mkRandomIntSequence({numVals:nv,fromSeq:rs.c_major});
  let detunesCsharp = rs.mkRandomIntSequence({numVals:nv,fromSeq:rs.c_sharp_major});
  let detunesF= rs.mkRandomIntSequence({numVals:nv,fromSeq:rs.f_major});
  let detunesA= rs.mkRandomIntSequence({numVals:nv,fromSeq:rs.a_minor});
  let detunesG= rs.mkRandomIntSequence({numVals:nv,fromSeq:rs. g_major});
 // let detunes = detunesC.concat(detunesF,detunesA,detunesG);
  let detunes = detunesC.concat(detunesCsharp,detunesA,detunesG);
debugger;
 let rrtn = tn.repeat(4);
 let ftn = rrtn.assignDetunes(detunes);
 //let ftn = tn.assignDetunes((rs.c_major).concat(rs.c_sharp_major));
 //ftn = tn.assignDetunes(rs.c_sharp_major);
 rs.tune = ftn;
 return;
 
 // let detunes = (rs.c_major).concat(rs.c_sharp_major)
  let ndetunes =  detunes.map((nt) => 100*nt);
  let rdetunes = rs.repeatSequence(60,detunes	);
 rtn.assignDetunes(rdetunes);
  let evr = rs.mkEvenRhythm(4*8,4,1/8);
  //let gai = rs.mkRandomRealSequence(16*8,0.2,4);
  let gains = rs.repeatSequence(8*4,[0.5,1,0.7,0.21]);
  let rates = rs.repeatSequence(8*4,[1,1,1,0.3]);
  //let insts = rs.repeatSequence(8*4,[tom,kick,tom,crash]);
  //let insts = rs.repeatSequence(8*4,[tom,kick,tom,kick,tom,kick,tom,crash]);
  let insts = rs.repeatSequence(8*2,[tom,kick,tom,kick,tom,kick,tom,kick,tom,kick,tom,kick,tom,kick,tom,crash]);
  let dt = rs.mkAtune({insts:insts,rates:rates,gains:gains,rhythm:evr,duration:4*4*5});
 // dt.assignGains(dt,15);
 // dt.assignRates(dt,1);
 dt.scaleGains(2.5);
  debugger;
 // rs.tune = rtn;
 // rs.tune = dt;
 // rs.tune = rtn.combine(dt);
})
}
mkTune3();
debugger;
/*let ftn = tn.flatten();
let tnuf = rs.unflattenTune(ftn);
rs.tune = tnuf;
//rs.tune = mkTune0();
//rs.tune = mkRTune0(16);
//rs.tune = mkTune2();
//rs.tune = mkTune1([2,0.05,0.5,0.05,0.05]);
*/
/*
let tune = rs.mkBlankTune(6,0,4,'perc-02');
let tune = rs.mkBlankTune(6,0,4,'perc-02');
//let tune = rs.mkBlankTune(6,0,4,'fx-01');
tune.assignRhythm([0,0.5,1,2,2.5,3]);
//rs.assignPropValues(tune,'start',[0,0.5,1,2,2.5,3]);
tune.assignGains([2,0.1,0.1,2,0.1,0.1]);
let repop = function (tune,i) {
  tune.assignDetunes(i*200);
}
//rs.assignPropValues(tune,'gain',[2,0.1,0.1,2,0.1,0.1]);
let tune2 = tune.clone();
tune2.delay(1.5);;
let ctune = tune.combine(tune2);
//ctune.delay(1);
let rtune = ctune.repeat(4,repop);
//let rtune = tune2.repeat(4,repop);
debugger;
//rs.tune = rtune;
//rs.tune = tune;
*/

 
 export {rs};