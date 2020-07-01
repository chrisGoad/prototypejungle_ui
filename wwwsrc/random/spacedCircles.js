
core.require('/shape/circle.js','/random/addSpacedPoints.js',function (elementPP,addMethods) {
debugger;
let item = svg.Element.mk('<g/>');

addMethods(item);

item.initializeProto= function () {
  core.assignPrototypes(this,'elementP',elementPP);
  elementPP.stroke = 'black';

}



item.initialize = function () {
  debugger;
  this.initializeProto();
  this.width = 150;
  this.numPoints = 200;
  this.minRadius = 2;
  this.maxRadius = 6;
  this.maxTries = 20000;
  this.generatePoints();
  
  console.log('numPoints',this.points.length);
  const setDimension = function (shape,dim) {
    shape.dimension = dim;
  }
  this.generateShapes([core.root.prototypes.elementP],[setDimension]);
  debugger;
}	
return item;
});
      

