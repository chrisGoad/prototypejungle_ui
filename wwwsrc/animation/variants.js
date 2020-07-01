core.require('/shape/textPlain.js','/container/box.js',
             '/line/line.js','/line/wavyLine.js','/line/connectedSpots.js','/line/bulbous.js',
             '/assembly/animation_bar.js',function (textP,boxP,linePP,wavyLinePP,spotsPP,bulbousPP,animationBarPP) {
  
let item = svg.Element.mk('<g/>');


/* adjustable parameters */
item.startHeight = 60;
item.endHeight = 30;
item.startBulbWidth1 = 5;
item.endBulbWidth1 = 25;
item.startBulbWidth0 = 10;
item.endBulbWidth0 = 2;
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

let theText = "This animation illustrates the kinds of operations on elements that can be achieved with a single step. Each frame arises from the previous one by the adjustment of one or sometimes two parameters, or by a resize, or single swap. It thus gives an idea of the flexibility of the elements. Here's what happens: (1) a series of swaps on a box, in which various kinds of lines are exchanged for each other, (2)a resize, (3) setting colors of the box lines. (4)  changing the parameters of the now bulbous line prototype. (5) adjusting parameters of a spiral.";
/*
item.initializePrototype = function () {
  core.assignPrototype(this,'vertexP',vertexPP);
}
*/

const interpolate = function (low,high,fr) {
  return low + fr * (high - low);
}

const nearTo = function (tm,vl) {
  return (tm > (vl-.0001)) && (tm < (vl + .0001));
}

let currentVariant = 'line';

item.switchVariants = function (vrnt,proto) {
  if (currentVariant === vrnt) {
    return;
  }
  core.assignPrototype(this.box.borderP,'lineP',proto);// a test
  debugger;
  this.box.border.remove();
  //this.box.border = undefined;
  this.box.update();
  this.box.draw();
  currentVariant = vrnt;
}


item.switchColor = function (sidenm,color) {
  let side = this.box.border[sidenm];
  if (side.stroke === color) {
    return false;
  }
  side.stroke = color;
  return true;
  //this.box.border = undefined;
  //this.box.update();
 // this.box.draw();
}

item.switchColors = function (top,right,bottom,left) {
  let changed = this.switchColor('top',top) || this.switchColor('right',right) || 
                this.switchColor('bottom',bottom) || this.switchColor('left',left);
  if (changed) {
    this.box.update();
    this.box.draw();
  }
}


    
item.updateForTime = function (tm) {
  console.log('tm',tm);
  if (tm < 4) {
    this.box.height = 60;
  }
  if (tm < 1) {
     this.switchVariants('line',linePP);
  } else if ((1 < tm) && (tm < 2)) {
    this.switchVariants('wavy',wavyLinePP);
  } else if ((2 < tm) && (tm < 3)) {
    this.switchVariants('spots',spotsPP);
  }  else if (3 < tm) {
    this.switchVariants('bulbous',bulbousPP);
  } 
  if ((4  < tm) && (tm < 5)) {
    let fr = tm-4;
    this.box.height = interpolate(this.startHeight,this.endHeight,fr);
    this.box.update();
    this.box.draw();
  }
  if (tm <= 6) {
    this.switchColors('black','black','black','black');
  }
  let scc = 6;//start color change
  if ((scc < tm)&&(tm < (scc+.5))) {
    this.switchColors('blue','black','black','black');
  }
  if (((scc+.5) < tm)&&(tm < (scc+1))) {
    this.switchColors('blue','orange','black','black');
  }
  if (((scc+1) < tm)&&(tm < (scc+1.5))) {
    this.switchColors('blue','orange','green','black');
  }
   if ((scc + 1.5)< tm) {
    this.switchColors('blue','orange','green','red');
  }  
  if ((8  < tm) && (tm < 10)) {
    debugger;
    let lineProto = Object.getPrototypeOf(this.box.border.top);
    let fr = (tm-7.5)/2
    lineProto.bulbWidth0 = interpolate(this.startBulbWidth0,this.endBulbWidth0,fr);
    lineProto.bulbWidth1 = interpolate(this.startBulbWidth1,this.endBulbWidth1,fr);
    this.box.update();
    this.box.draw();
  }
 
}

item.transferPropsToAnimationBar = function () {
  core.setProperties(this.animationBar,this,['interval','endTime']);
  this.animationBar.width = this.animationBarWidth;
}
item.initialize = function () {
  this.set('box',boxP.instantiate()).show();
  this.set('txt',textP.instantiate()).show();
  this.txt.text = theText;
   // this.txt.text = 'foob foob';

  this.txt['font-size'] = 5;
  this.txt.width = 150;
  this.txt.height = 100;
  this.box.height = 60;
//  core.assignPrototype(this.box.borderP,'lineP',wavyLinePP);// a test
  this.box.update();
  this.box.show();
  this.txt.update();
  this.set('animationBar',animationBarPP.instantiate()).show();
  this.transferPropsToAnimationBar();
  this.animationBar.initialize();
  this.animationBar.moveto(Point.mk(0,40));
  this.txt.moveto(Point.mk(0,50));
 
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
     
