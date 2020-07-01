
core.require('/line/arc.js','/shape/circle.js','/random/addIntersectingLines4.js',function (linePP,circlePP,addMethods) {
debugger;
let item = svg.Element.mk('<g/>');

addMethods(item);
/*adjustable parameters  */


item.initializeProto = function () {
  core.assignPrototypes(this,'lineP',linePP);
  this.lineP.stroke = 'black';
  this.lineP['stroke-width'] = .075; 	
  this.lineP.radius =700;
  core.assignPrototypes(this,'circleP',circlePP);
  this.circleP.fill = 'black';
  this.circleP.fill = 'rgba(0,0,0,.5)';
  this.circleP['stroke-width'] = 0;
  this.circleP.dimension = 2;
}  


item.initialize = function () {
  this.initializeProto();
  this.width = 400;
  this.height = 200;
  this.numLines=3000;
  //this.numLines=200;
  this.angleMin = -90;
  this.angleMax = 90;
  this.angleMin = -15;
 this.angleMax = 15;
 this.arcRadius = 500;
  //this.numLines=200;
 // core.root.backgroundColor = 'black';
  this.initializeLines();
}	
return item;
});
      

