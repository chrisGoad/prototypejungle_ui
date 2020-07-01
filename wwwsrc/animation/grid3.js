core.require('/grid/grid.js','/shape/bullseye.js',//'/shape/arcThing2.js'
 '/assembly/animation_bar.js',function (gridP,shapePP,animationBarPP) {
  
let item = svg.Element.mk('<g/>');

/* adjustable parameters */

item.interval = 0.02;
item.interval = 0.05;

item.endTime = 10;
item.animationBarWidth =30;
item.initDelta = 21;
item.finalDelta = 7;
item.initDelta = 13;
item.finalDelta = 5;


/* end adjustable parameters */

const interpolate = function (low,high,fr) {
  return low + fr * (high - low);
}

const ypos = function (start,acc,tm) {
  return 0.5 * acc * tm * tm;
}

const nearTo = function (tm,vl) {
  return (tm > (vl-.0001)) && (tm < (vl + .0001));
}


    
item.updateForTime = function (tm) {
  console.log('tm',tm);
  if (tm > 1) {
    let fr = (tm-1)/9;
    let initDelta = this.initDelta;
    let delta = interpolate(initDelta, this.finalDelta, fr);
    this.grid.deltaX = delta;
    this.grid.deltaY = delta*1;
    debugger;
    this.grid.setScale(initDelta/delta);
   // this.grid.elementP.dimension = 10 * (initDelta/delta);
    this.grid.update();
    this.grid.draw();
  }
}

item.transferPropsToAnimationBar = function () {
  core.setProperties(this.animationBar,this,['interval','endTime']);
  this.animationBar.width = this.animationBarWidth;
}
item.initialize = function () {
  debugger;
  gridP.initializePrototype();
  core.assignPrototype(gridP,'elementP',shapePP);
  this.set('grid',gridP.instantiate()).show();
  this.grid.deltaX = this.initDelta;
  this.grid.deltaY = this.grid.deltaX*1;
  this.grid.elementP.dimension = 30;
    this.grid.elementP.lineWidthFactor = .5;
    this.grid.elementP.numCircles = 10;
//  this.grid.elementP.fill = 'rgba(0,0,0,0)';
  this.grid.update();
  this.grid.show();
  this.set('animationBar',animationBarPP.instantiate()).show();
  this.transferPropsToAnimationBar();
  this.animationBar.initialize();
  this.animationBar.moveto(Point.mk(150,50));
 
}

item.update = function () {
   this.transferPropsToAnimationBar();
   this.animationBar.updateBars();
}
/*

item.ctime = 0;
item.animate0 = function (tm) {
  if (tm >=  this.endTime) return;
  this.updatePositions(tm);
  setTimeout(() => {this.animate0(tm+this.interval)},this.interval * 1000);
}

item.animate = function () {
  this.animate0(0);
}
*/
  
 
  

return item;
});
     
