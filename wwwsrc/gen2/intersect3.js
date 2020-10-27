
core.require('/line/line.js','/shape/circle.js','/gen0/lines0.js',//'/random/addIntersectingLines4.js',
function (linePP,circlePP,addMethods) {
debugger;
let item = svg.Element.mk('<g/>');

addMethods(item);
/*adjustable parameters  */


item.initializeProto = function () {
  core.assignPrototypes(this,'lineP',linePP);
  this.lineP.stroke = 'black';
  this.lineP['stroke-width'] = (0 && this.interpolate)?0.2:.025; 		
   core.assignPrototypes(this,'circleP',circlePP);
  this.lineP.stroke = 'black';
  //this.lineP['stroke-width'] = 1; 	
}  


item.initialize = function () {
  this.interpolate = true;
  this.initializeProto();
  this.dimension = 200;
  this.numLines=5000;
  if (0 && this.interpolate) {
    this.numLines=800;
  }
  //this.numLines=110;
  this.angleMin = -90;
  this.angleMax = 90;
  //this.angleMin = -45;
 // this.angleMax = 45;
  //this.numLines=200;
 // core.root.backgroundColor = 'black';
 let circle =  this.set('visCircle',this.circleP.instantiate());
 circle.dimension = this.dimension;
 circle.update();
 circle.show();
  this.originatingShapes = [geom.Circle.mk(Point.mk(0,0),5)];
 
 //this.lineCenterDistance = 40;
 
  this.initializeLines();
}	
return item;
});
      

