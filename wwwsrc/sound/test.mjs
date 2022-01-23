import {rs as addSoundMethods} from '/mlib/sound.mjs';


let rs = core.ObjectNode.mk();

addSoundMethods(rs);
 
rs.initializeSound = function () {
//debugger;
  let samples,assets,instruments,firstTime;
  const mkAndPlayNotes = () => {
     //let notes = [this.mkNote('fx-01',0),this.mkNote('fx-02',1),this.mkNote('hh-01',2),this.mkNote('hh-02',3),this.mkNote('kd-01',4),this.mkNote('perc-02',5)];
     let notes = this.mkNotes([['fx-01',0],['fx-02',1,{gain:1,detune:200}],['fx-02',2],['hh-01',3,{rate:0.05}],['hh-02',4],['hh-02',5],['kd-01',6],['perc-02',7,{gain:10}],['perc-02',8,{gain:2}]]);
     debugger;
     this.playNotes(notes);
  }
  if (!this.samples) {
    firstTime = 1;
    samples = this.samples = ['fx-01','fx-02','hh-01','hh-02','kd-01','perc-02'];
    assets = this.assets = {};
    instruments = this.instruments = {};
    this.fetchSamples(samples,assets);
    setTimeout(() => {
      //debugger;
      this.mkSimpleBufferInstruments();
      mkAndPlayNotes();
      },1000);
  } else {
    instruments = this.instruments;
    mkAndPlayNotes();
  }
 }
 
 export {rs};