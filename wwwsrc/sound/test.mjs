import {rs as addSoundMethods} from '/mlib/sound.mjs';


let rs = core.ObjectNode.mk();

addSoundMethods(rs);
rs.tempo = 8;
let banjo = 'one-string-banjo_D_major.wav';

rs.samples = ['fx-01.mp3','fx-02.mp3',banjo];/*,'hh-01','hh-02','ir-hall','kd-01',
'kd-02','oh-01','oh-02','perc-01',
'perc-02','sd-01','sd-02'];*/
/*rs.tune = rs.mkNotes(
  [['fx-01',0],['fx-02',1,{gain:1,detune:200}],['fx-02',2],['hh-01',3,{rate:0.05}],['hh-02',4],
   ['hh-02',5],['kd-01',6],['perc-02',7,{gain:10}],['perc-02',8,{gain:2}]]);*/
debugger;
/* const mkAtune = function () {
  debugger;
  let noteDur = 1;
  let numNotes = 13;
  let tune = rs.mkBlankTune(numNotes,0,noteDur*numNotes);
  tune.assignInstruments(rs.samples);
  let evr = rs.mkEvenRhythm(numNotes,noteDur);
  tune.assignRhythm(evr);
  return tune;
}

const mkAtune = function (instruments,rhythm,gains,duration) {
  debugger;
  let tune = rs.mkBlankTune(rhythm.length,0,duration);
  tune.assignInstruments(instruments);
  tune.assignRhythm(rhythm);
  if (gains) {
    tune.assignGains(gains);
  }
  return tune;
}*/

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



const mkRTune0 = function (n) {
  debugger;
 // let tune = rs.mkBlankTune(numNotes,0,noteDur*numNotes,'fx-02');
  let evr = rs.mkEvenRhythm(n,1);
 // let gains = [2,0.05,0.5,0.0,0.05];
  let detunes0 = rs.mkRandomIntSequence(n,0,24);
  let detunes = detunes0.map((vl) => 100*vl);
  let gains = rs.mkRandomRealSequence(n,0,2);
  let tn =rs.mkAtune({insts:banjo,rhythm:evr,gains:gains,duration:n,detunes:detunes});
  let tnc = tn.clone();
  let rtn = tnc.repeat(5)

  return rtn;
}

const mkTune1 = function (gains,detunes) {
 // debugger;
  let numNotes = 5;
 // let tune = rs.mkBlankTune(numNotes,0,noteDur*numNotes,'fx-02');
  let evr = rs.mkEvenRhythm(numNotes,1);
 // let gains = [2,0.05,0.5,0.0,0.05];
  let tn = rs.mkAtune({insts:banjo,rhythm:evr,gains:gains,duration:numNotes,detunes:detunes});
  let tnc = tn.clone();

  return tnc;
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
/*
let tn = mkRTune0(8);
tn.name = 'random2';
debugger;
let ftn = tn.flatten();
let tnuf = rs.unflattenTune(ftn);
rs.tune = tnuf;
tn.save(1);
*/
let tn = rs.fetchTune('random');

//rs.tune = mkTune0();
//rs.tune = mkRTune0(16);
//rs.tune = mkTune2();
//rs.tune = mkTune1([2,0.05,0.5,0.05,0.05]);
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
rs.tune = rtune;
//rs.tune = tune;
*/

 
 export {rs};