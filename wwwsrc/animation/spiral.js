core.require('/shape/spiral.js','/assembly/animation_bar.js',function (spiralPP,animationBarPP) {
  
let item = svg.Element.mk('<g/>');

/* adjustable parameters */
item.startNumTurns = 0.5;
item.startWidthFactor = 0.001;
item.endWidthFactor = 0.1;
item.endNumTurns = -0.5;
item.startDimension = 10;
item.endDimension = 50;
item.interval = 0.05;
item.endTime = 10;
item.animationBarWidth =100;
/* end adjustable parameters */


item.isKit = true;
item.hideAdvancedButtons = true;

/*
item.initializePrototype = function () {
  core.assignPrototype(this,'vertexP',vertexPP);
}
*/

const interpolate = function (low,high,fr) {
  return low + fr * (high - low);
}

item.updateForTime = function (tm) {
  debugger;
  let {startNumTurns,endNumTurns,endTime,spiral,startWidthFactor,endWidthFactor,
        startDimension,endDimension} = this;
  let tmfr = tm/endTime;
  let numTurns = startNumTurns + tmfr * (endNumTurns - startNumTurns);
  let widthFactor = startWidthFactor + tmfr * (endWidthFactor - startWidthFactor);
  spiral.dimension = interpolate(startDimension,endDimension,tmfr);
  spiral.widthAtEndFactor = widthFactor;
  spiral.widthAtStartFactor = widthFactor;
  spiral.numTurns = numTurns;
  spiral.update();
  spiral.draw();
}

item.transferPropsToAnimationBar = function () {
  core.setProperties(this.animationBar,this,['interval','endTime']);
  this.animationBar.width = this.animationBarWidth;
}
item.initialize = function () {
  this.set('spiral',spiralPP.instantiate()).show();
  this.set('animationBar',animationBarPP.instantiate()).show();
  this.transferPropsToAnimationBar();
  this.animationBar.initialize();
  this.animationBar.moveto(Point.mk(0,40));
 
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
     
