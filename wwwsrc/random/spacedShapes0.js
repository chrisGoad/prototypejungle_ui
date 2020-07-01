
core.require('/shape/circle.js','/shape/rectangle.js','/random/addSpacedPoints.js',
  function (elementPP1,elementPP2,addMethods) {
debugger;
let item = svg.Element.mk('<g/>');

addMethods(item);

item.initializeProtos= function () {
  core.assignPrototypes(this,'elementP1',elementPP1);
    this.elementP1.fill = 'blue';

   core.assignPrototypes(this,'elementP2',elementPP2);
  this.elementP2.fill = 'red';
}



item.initialize = function () {
  debugger;
  this.initializeProtos();
  this.width = 150;
  this.numPoints = 200;
  this.minRadius = 2;
  this.maxRadius = 6;
  this.maxTries = 20000;
  this.generatePoints();
  
  console.log('numPoints',this.points.length);
  const setDimension1 = function (shape,dim) {
    shape.dimension = dim;
  }
   const setDimension2 = function (shape,dim) {
    shape.width = dim;
    shape.height = dim;
  }
  this.generateShapes([this.elementP1,this.elementP2],
                      [setDimension1,setDimension2]);
  debugger;
}	
return item;
});
      

