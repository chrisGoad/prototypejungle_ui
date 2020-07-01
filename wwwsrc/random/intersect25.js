
core.require('/line/line.js','/shape/circle.js','/shape/rectangle.js','/random/addLinesShapes0.js','/grid/dim2dWalker2.js',//'/random/addIntersectingLines4.js',
function (linePP,circlePP,rectanglePP,addMethods,addRandomMethods) {
debugger;
let item = svg.Element.mk('<g/>');

addMethods(item);
/*adjustable parameters  */


item.initializeProto = function () {
  
  core.assignPrototypes(this,'lineP',linePP);
  this.lineP.stroke = 'black';
  this.lineP.stroke = 'white';
  this.lineP['stroke-width'] = .075; 
  core.assignPrototypes(this,'rectP',rectanglePP);
  this.rectP.stroke = 'transparent';
  this.rectP['stroke-width'] = 0; 		
  core.assignPrototypes(this,'circleP',circlePP);
  this.circleP.fill = 'black';
  this.circleP.fill = 'rgba(0,0,0,.5)';
  this.circleP['stroke-width'] = 0;
  this.circleP.dimension = 2;
}  


item.initialize = function () {
  core.root.backgroundColor = 'black';
  this.initializeProto();
  this.width = 400;
  this.height = 400;
  this.numLines=3000;
  this.angleMin = -90;
  this.angleMax = 90;
  this.numRows = 100;
  this.numCols = 200;
  debugger;
  let rm = this.randomizer = {};
  
  addRandomMethods(rm);
 // let  rParams = {step:0.1,min:0,max:1,numRows:this.rDivisions,numCols:this.rDivisions};
  let  oParams = {step:.2,min:0,max:0.7,numRows:this.numRows,numCols:this.numCols};
  this.opacities  = rm.genRandomGrid(oParams);
  this.initializeLines();
  this.addOpaqueLayer();
}	
return item;
});
      

