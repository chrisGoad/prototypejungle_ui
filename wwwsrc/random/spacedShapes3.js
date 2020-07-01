
core.require('/shape/circle.js','/shape/rectangle.js','/line/line.js','/random/addSpacedPoints2.js',
  function (elementPP1,elementPP2,elementPP3,addMethods) {
debugger;
let item = svg.Element.mk('<g/>');

addMethods(item);

item.initializeProtos= function () {
  core.assignPrototypes(this,'elementP1',elementPP1);
    this.elementP1.fill = 'blue';

   core.assignPrototypes(this,'elementP2',elementPP2);
  this.elementP2.fill = 'red';
  core.assignPrototypes(this,'elementP3',elementPP3);
  this.elementP3.stroke = 'white';  
 // this.elementP3.stroke = 'magenta';  
  this.elementP3['stroke-width'] = 0.5;
}

  



item.initialize = function () {
  debugger;
  this.initializeProtos();
  core.root.backgroundColor = 'black';
  this.width = 300;
  this.height = 200;
  this.numPoints = 600;
  this.minRadius = 2;
  this.maxRadius = 6;
  this.maxTries = 20000;
  this.generatePoints();
  
  console.log('numPoints',this.points.length);
  let scaleFactor = 0.5;
  const setDimension1 = function (shape,dim) {
    let y = shape.getTranslation().y;
    let ht = 200;
    let ry = Math.abs(y)	/ht;
    shape.dimension = scaleFactor*dim;//ry*dim;
  }
   const setDimension2 = function (shape,dim) {
    shape.width = scaleFactor*dim;
    shape.height = scaleFactor*dim;
  }
  const setDimension3 = function (shape,dim) {
    //let dir = 0;// Math.random() * 2 * Math.PI;
    let y = shape.getTranslation().y;
    let ht = 200;
    let ry = Math.abs(y)	/ht;
    let dir = (Math.random() -0.5) * ry * Math.PI;
    let lineLength = dim * 1.0;//lineLengthRatio;
    let vec = Point.mk(Math.cos(dir),Math.sin(dir)).times(lineLength/2);
    let end0 = vec.minus();
    let end1 = vec;
    shape.setEnds(end0,end1);
  }
   let {elementP1,elementP2,elementP3} = this;
 //this.generateShapes([elementP1,elementP2,elementP3],[setDimension1,setDimension2,setDimension3],[.1,.1]);
 //this.generateShapes([elementP3],[setDimension3]);
// this.generateShapes([elementP1,elementP3],[setDimension1,setDimension3],[0.1]	);
 // this.generateShapes([elementP1],[setDimension1]);
   this.generateShapes([elementP1,elementP2],[setDimension1,setDimension2],[1]);
debugger;
}	
return item;
});
      

