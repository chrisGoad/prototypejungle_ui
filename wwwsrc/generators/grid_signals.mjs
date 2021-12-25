
import {rs as basicP} from '/generators/basics.mjs';
import {rs as signalP} from '/generators/grid_signal.mjs';

let rs = basicP.instantiate();
rs.setName('grid_signals');
let grid1 = signalP.instantiate();
let grid2 = signalP.instantiate();
let grid3 = signalP.instantiate();
let grid4 = signalP.instantiate();
let wd = 2.0*grid1.width;
let topParams = {width:wd,height:wd,backgroundColor:'rgb(2,2,2)',backgroundPadding:0.1*wd};
Object.assign(rs,topParams);
grid1.globalParams = Object.assign({},grid1.globalParams);
grid2.globalParams = Object.assign({},grid1.globalParams);
grid3.globalParams = Object.assign({},grid1.globalParams);
grid4.globalParams = Object.assign({},grid1.globalParams);
grid1.globalParams.randomizingFactor = 1.5;
grid2.globalParams.randomizingFactor = 1.5;
grid3.globalParams.randomizingFactor = 0;
grid4.globalParams.randomizingFactor = 2;

rs.initialize = function () {
  debugger;
  let {width} = grid1;
  this.addBackground();
  this.set('grid1',grid1);
  this.set('grid2',grid2);
  this.set('grid3',grid3);
  this.set('grid4',grid4);
  grid1.initialize();
  grid2.initialize();
  grid3.initialize();
  grid4.initialize();
  let mv = 0.5*width;
  grid1.moveto(Point.mk(-mv,-mv));
  grid2.moveto(Point.mk(mv,-mv));
  grid3.moveto(Point.mk(-mv,mv));
  grid4.moveto(Point.mk(mv,mv));
        
}
export {rs};
