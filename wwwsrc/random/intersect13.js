
core.require('/line/line.js','/shape/circle.js','/random/addLinesShapes0.js',//'/random/addIntersectingLines4.js',
function (linePP,circlePP,addMethods) {
debugger;
let item = svg.Element.mk('<g/>');

addMethods(item);
/*adjustable parameters  */


item.initializeProto = function () {
  core.assignPrototypes(this,'lineP',linePP);
  this.lineP.stroke = 'rgb(255,255,255)';
  this.lineP['stroke-width'] = .5; 	
  core.assignPrototypes(this,'circleP',circlePP);
  this.circleP.fill = 'blue';
 // this.circleP.fill = 'rgba(0,0,0,.5)';
  this.circleP['stroke-width'] = 0;
  this.circleP.dimension = 2;
}  


item.initialize = function () {
  core.root.backgroundColor = 'black';
  this.initializeProto();
  this.width = 400;
  this.height = 200;
  this.numLines=1000;
  //this.numLines=20;
  this.angleMin = -90;
  this.angleMax = 90;
  //this.angleMin = -10;
 // this.angleMax = 10;
  //this.numLines=200;
 // core.root.backgroundColor = 'black';
  this.initializeLines();
  let scaleFactor = 1;
  const setDimension1 = function (grid,shape,dim) {
    shape.dimension = scaleFactor*dim;//ry*dim;
  }
  return;
  debugger;
  this.numPoints = 600;
  this.minRadius = 7;
  this.maxRadius = 10;
  this.maxTries = 20000;
  this.generatePoints();
  this.generateShapes([this.circleP],[setDimension1],[1]	);

}	
return item;
});
      

