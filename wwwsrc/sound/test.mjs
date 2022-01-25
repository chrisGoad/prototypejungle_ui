import {rs as addSoundMethods} from '/mlib/sound.mjs';


let rs = core.ObjectNode.mk();

addSoundMethods(rs);
rs.tempo = 4;

rs.samples = ['fx-01','fx-02','hh-01','hh-02','kd-01','perc-02'];
/*rs.tune = rs.mkNotes(
  [['fx-01',0],['fx-02',1,{gain:1,detune:200}],['fx-02',2],['hh-01',3,{rate:0.05}],['hh-02',4],
   ['hh-02',5],['kd-01',6],['perc-02',7,{gain:10}],['perc-02',8,{gain:2}]]);*/
debugger;
//let tune = rs.mkBlankTune(6,0,4,'hh-01');
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


 
 export {rs};