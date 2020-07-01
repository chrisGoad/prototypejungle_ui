core.require('/shape/regularPolygon.js','/shape/rectangle.js','/line/line.js',function (polygonPP,rectanglePP,linePP) {
  
let item = svg.Element.mk('<g/>');

/* adjustable parameters */
item.interval = 0.1;
item.endTime = 5;
/* end adjustable parameters */


item.resizable = true;
item.isKit = true;
item.hideAdvancedButtons = true;
item.width = 300;// the width of the progress bar

item.speedUp = 2;

item.onBarClick = function (clickedPoint) {
  debugger;
  let wd = this.width;
  let fr = (clickedPoint.x + wd/2)/wd;
  console.log('fr',fr);
  this.ctime = fr * this.endTime;
  if (this.timer) {
    clearInterval(this.timer);
  }
  this.setPaused(true);
  this.updateBar();
  this.__parent.updateForTime(this.ctime);
}


item.initialize = function () {
  core.assignPrototype(this,'rectangleP',rectanglePP,'lineP',linePP);
  this.rectangleP.width = 2;
  this.rectangleP.height = 6;
  this.rectangleP.fill = 'black';
  this.set('rLeft',this.rectangleP.instantiate());
  this.set('rRight',this.rectangleP.instantiate());
  this.rLeft.moveto(Point.mk(-2,8));
  this.rRight.moveto(Point.mk(2,8));
  this.rLeft.onClick = () => this.pause();
  this.rRight.onClick = () => this.pause();
  let triangle = this.set('triangle',polygonPP.instantiate()).show();
  triangle.dimension = 6;
  triangle.moveto(Point.mk(0,8));
  triangle.onClick = () => this.animate();
  triangle.numberOfSides = 3;
  triangle.theta = 90;  
  triangle.update();
  this.set('progressBackground',linePP.instantiate()).show;
  this.progressBackground.stroke = 'gray';
  this.set('progress',linePP.instantiate()).show;
  this.progress.stroke = 'yellow';
  this.updateBackgroundBar();
  this.updateBar();
  this.progress.onClick = (p) => this.onBarClick(p);
  this.progressBackground.onClick = (p) => this.onBarClick(p);
  
}




item.updateBackgroundBar = function () {
  let wd = this.width;
  let e0 = Point.mk(-wd/2,0);
  let e1 = Point.mk(wd/2,0);
  this.progressBackground.setEnds(e0,e1);
  this.progressBackground.update();
  this.progressBackground.draw();
}

item.updateBar = function () {
  let wd = this.width;
  let tmfr = this.ctime/this.endTime;
  let e0 = Point.mk(-wd/2,0);
  let e1 = Point.mk(-wd/2 + tmfr * wd,0);
  this.progress.setEnds(e0,e1);
  this.progress.update();
  this.progress.draw();
}
 
item.updateBars = function () {
  this.updateBackgroundBar();
  this.updateBar();
}

item.setPaused = function (vl) {
  if (vl) {
    this.timer = undefined;
    this.triangle.show();
    this.rLeft.hide();
    this.rRight.hide();
  } else {
    this.rLeft.show();
    this.rRight.show();
    this.triangle.hide();
  }
}
    
item.ctime = 0;
item.timeStep = function () {
  this.__parent.updateForTime(this.ctime);
  this.ctime = this.ctime + this.interval;
  this.updateBar();
  if (this.ctime >=  this.endTime) {
    clearInterval(this.timer);
    this.ctime = 0;
    this.setPaused(true);
    //this.timer = undefined;
    //this.triangle.show();
    //this.rLeft.hide();
    this.rRight.hide();
  }
}

item.pause = function () {
  if (this.timer) {
    clearInterval(this.timer);
  }
  this.setPaused(true);
}
  
item.animate = function () {
  if (!this.timer) {
    this.setPaused(false);
    this.timer = setInterval(() => this.timeStep(),(this.interval * 1000)/(this.speedUp));
  }
}

  

return item;
});
     
