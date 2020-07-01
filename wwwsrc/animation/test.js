core.require('/container/circle.js','/assembly/animation_bar.js',function (vertexPP,animationBarPP) {
  
let item = svg.Element.mk('<g/>');

/* adjustable parameters */
item.velocity = 10;
item.interval = 0.05;
item.endTime = 3;
item.animationBarWidth =100;
/* end adjustable parameters */


item.isKit = true;
item.hideAdvancedButtons = true;

/*
item.initializePrototype = function () {
  core.assignPrototype(this,'vertexP',vertexPP);
}
*/


item.updateForTime = function (tm) {
  debugger;
  let {v0,v1,velocity} = this;
  let pos0 = Point.mk(tm * velocity,0);
  let pos1 = Point.mk(-tm * velocity,0);
  v0.moveto(pos0);
  v1.moveto(pos1);
  this.draw();
}

item.transferPropsToAnimationBar = function () {
  core.setProperties(this.animationBar,this,['interval','endTime']);
  this.animationBar.width = this.animationBarWidth;
}
item.initialize = function () {
  core.assignPrototype(this,'vertexP',vertexPP);
  this.set('animationBar',animationBarPP.instantiate()).show();
  this.transferPropsToAnimationBar();
  this.animationBar.initialize();
  this.animationBar.moveto(Point.mk(0,40));
  this.set('v0',this.vertexP.instantiate()).show();
  this.set('v1',this.vertexP.instantiate()).show();
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
  
 
item.actions = function () {
  let rs = [];
  rs.push({title:'Animate',action:'animate'});
  return rs;
}


  

return item;
});
     
