import {rs as addSoundMethods} from '/mlib/sound.mjs';


let rs = core.ObjectNode.mk();

addSoundMethods(rs);
 
rs.initializeSound = function () {
  debugger;
  let samples,assets,instruments,firstTime;
  const mkAndPlayNotes = () => {
     let notes = [this.mkNote(instruments['fx-01'],0),this.mkNote(instruments['fx-02'],1),this.mkNote(instruments['hh-01'],2),
     this.mkNote(instruments['hh-02'],3),this.mkNote(instruments['kd-01'],4),this.mkNote(instruments['perc-02'],5)];
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