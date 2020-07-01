core.require('/grid/grid.js','/shape/circle.js','/shape/shadedCircle.js','/shape/arcThing2.js','/container/box.js',
 '/assembly/animation_bar.js',function (gridP,circlePP,shadedCirclePP, arcThingPP,boxPP,animationBarPP) {
  
let item = svg.Element.mk('<g/>');

/* adjustable parameters */

item.interval = 0.05;
item.endTime = 10;
item.animationBarWidth =100;
item.ballTop = 0;
item.ballAcceleration = 17;
item.ballBottom = 150;

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

let currentVariant = 'circle';

item.switchVariants = function (vrnt,proto) {
  if (currentVariant === vrnt) {
    return;
  }
  core.assignPrototype(this.grid,'elementP',proto);
  debugger;
  this.grid.elements.remove();
  //this.box.border = undefined;
  this.grid.update();
  this.grid.draw();
  currentVariant = vrnt;
}


    
item.updateForTime = function (tm) {
  console.log('tm',tm);
  if (tm < 1) {
     this.switchVariants('circle',circlePP);
  } else if ((1 < tm) && (tm < 2)) {
    this.switchVariants('arcThing',arcThingPP);
  } else if ((2 < tm) && (tm < 3)) {
    this.switchVariants('box',boxPP);
  }
  return;
  debugger;
  let ball = this.balls[0];
  let x = ball.getTranslation().x;
  //let fr = (tm-2)/2;
  //let y = interpolate(this.ballTop,this.ballBottom,fr);
  let y = ypos(this.ballTop,this.ballAcceleration, tm);
  ball.moveto(Point.mk(x,y));
}

item.transferPropsToAnimationBar = function () {
  core.setProperties(this.animationBar,this,['interval','endTime']);
  this.animationBar.width = this.animationBarWidth;
}
item.initialize = function () {
  debugger;
  gridP.initializePrototype();
  this.set('grid',gridP.instantiate()).show();
  this.grid.deltaX = 35;
  this.grid.deltaY = this.grid.deltaX +40;
  this.grid.update();
  this.grid.show();
  
  this.set('balls',core.ArrayNode.mk());
  let ball = shadedCirclePP.instantiate().show();
  ball.dimension = 10;
  this.balls.push(ball);
  ball.moveto(Point.mk(42,0));
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
     
