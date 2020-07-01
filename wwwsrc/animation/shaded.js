core.require('/shape/shadedCircle.js','/assembly/animation_bar.js',function (circlePP,animationBarPP) {
  
let item = svg.Element.mk('<g/>');

/* adjustable parameters */
item.startFx = 0.2;
item.endFx = 0.8;
item.interval = 0.05;
item.endTime = 1;
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
  let {startFx,endFx,circle,endTime} = this;
  let tmfr = tm/endTime;
  let fx = interpolate(startFx,endFx,tmfr);
  circle.fx = fx;
  circle.update();
  circle.draw();
}

item.transferPropsToAnimationBar = function () {
  core.setProperties(this.animationBar,this,['interval','endTime']);
  this.animationBar.width = this.animationBarWidth;
}
item.initialize = function () {
  this.set('circle',circlePP.instantiate()).show();
  this.circle.midOpacity = 0.9;
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
     
