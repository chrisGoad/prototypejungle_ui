
core.require('/shape/circleWithGrid.js','/shape/circle.js','/line/line.js','/random/addLinesShapes0.js',//'/random/addSpacedPoints3.js',
  function (elementPP1,circlePP,linePP,addMethods) {
debugger;
let item = svg.Element.mk('<g/>');

addMethods(item);

const initializeChaosProtos= function (chaos) {
  core.assignPrototypes(chaos,'elementP1',elementPP1);
    chaos.elementP1.fill = 'rgb(140,140,140)';
    chaos.elementP1.fill = 'red';
    chaos.elementP1.delta =20;
    chaos.elementP1.lineP['stroke-width'] = 4;
    chaos.elementP1.circleP.fill = 'black';
    chaos.elementP1.lineP.stroke = 'red';
    chaos.elementP1.lineP.stroke = 'white';
   //core.assignPrototypes(chaos,'elementP2',elementPP2);
  //chaos.elementP2.fill = 'red';
  //core.assignPrototypes(chaos,'elementP3',elementPP3);
  core.assignPrototypes(chaos,'lineP',linePP);
  chaos.lineP.stroke = 'white';  
  //chaos.elementP3.stroke = 'black';  
 // chaos.elementP3.stroke = 'magenta';  
  chaos.lineP['stroke-width'] = 0.5;
  //chaos.lineP = chaos.elementP3;
}

 


const initializeOrderProtos = function (order) {
  core.assignPrototypes(order,'lineP',linePP);
  order.lineP.stroke = 'white';
  order.lineP['stroke-width'] = .1; 
  core.assignPrototypes(order,'gridLineP',linePP);
  order.gridLineP.stroke = 'white';
  order.gridLineP['stroke-width'] = 4; 
    
   core.assignPrototypes(order,'circleP',circlePP);
  order.circleP.stroke = 'black';
  order.circleP.fill = 'black';
  //order.lineP['stroke-width'] = 1; 	
}   

/*
item.genRandomPoint = function () {
  let {width,height} = this;
  let rx = Math.floor((Math.random()-0.5) * width);
  let ry= Math.floor((Math.random()-0.5) * height);
  return Point.mk(rx,ry);
}



item.genRandomUnitVector= function () {
  let dir = Math.PI*Math.random();
  let vec = Point.mk(Math.cos(dir),Math.sin(dir));
  return vec;
}
*/

const drawGrid = function (order) {
  debugger;
  if (order.gridLines) {
    order.gridLines.length = 0;
  } else {
    order.set('gridLines',core.ArrayNode.mk());
  }
  let {delta,width,height} = order;
  let lineP = order.gridLineP;
  let numHlines = Math.ceil(height/delta);
  let numVlines = Math.ceil(width/delta);
  let hwd = width/2;
  let hht = height/2;
  const addLine =  (e0,e1) => {
    let line = lineP.instantiate();
    order.gridLines.push(line);
    line.setEnds(e0,e1);
    line.update();
    line.show();
  }
  for (let i=0;i<=numHlines;i++) {
    let cy = -hht + i*delta;
    let end0 = Point.mk(-hwd,cy);
    let end1 = Point.mk(hwd,cy);
    addLine(end0,end1);
  }
   for (let i=0;i<=numVlines;i++) {
    let cx = -hwd + i*delta;
    let end0 = Point.mk(cx,-hht);
    let end1 = Point.mk(cx,hht);
    addLine(end0,end1);
  }
 
}


const initializeOrder = function (order) {
  debugger;
  
order.delta = 20;
order.center = Point.mk(0,0);
order.width = 600;
order.height = 400;
  order.dimension = 240;
  order.numLines=1000;
  //order.numLines=110;
  order.angleMin = -90;
  order.angleMax = 90;
  //order.angleMin = -45;
 // order.angleMax = 45;
  //order.numLines=200;
  core.root.backgroundColor = 'black';
  drawGrid(order);
 let circle =  order.set('visCircle',order.circleP.instantiate());
 circle.dimension = order.dimension;
 circle.update();
 circle.show();
 

  order.initializeLines();
}	

  
item.initialize = function () {
  debugger;
  let chaos = this.set('chaos',svg.Element.mk('<g/>'));
  addMethods(chaos);
  initializeChaosProtos(chaos);
  let order = this.set('order',svg.Element.mk('<g/>'));
  addMethods(order);
  initializeOrderProtos(order);
  core.root.backgroundColor = 'blue';
  core.root.backgroundColor = 'rgb(10,10,125)';
  core.root.backgroundColor = 'black';
  chaos.width = 600;
 // chaos.width = 1200;
  chaos.height = 400;
  chaos.numPoints = 300;//0;
  chaos.numPoints = 100;
  chaos.minRadius = 2;
  chaos.maxRadius = 6;
  chaos.maxRadius = 26;
  chaos.maxTries = 20000;
  chaos.shortenBy = 0;
  chaos.numLines = 1000;
  chaos.shapeExpansionFactor = 1;
  let points = chaos.set("points",core.ArrayNode.mk());
  let radii = chaos.set("radii",core.ArrayNode.mk());
  chaos.points.push(Point.mk(0,0));
  chaos.radii.push(120);
  //chaos.generatePoints();
  
  console.log('numPoints',chaos.points.length);
  let scaleFactor = 1;
  const setDimension1 = function (grid,shape,dim) {
    let scaleFactor = 1;
    let y = shape.getTranslation().y;
    let ht = 200;
    let ry = Math.abs(y)	/ht;
    shape.dimension = scaleFactor*dim;//ry*dim;
  }
   const setDimension2 = function (grid,shape,dim) {
    shape.width = scaleFactor*dim;
    shape.height = scaleFactor*dim;
  }
  const setDimension3 = function (grid,shape,dim) {
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
   let {elementP1,elementP2,elementP3} = chaos;
 //chaos.generateShapes([elementP1,elementP2,elementP3],[setDimension1,setDimension2,setDimension3],[.1,.1]);
 //chaos.generateShapes([elementP3],[setDimension3]);
 //chaos.generateShapes([elementP1,elementP3],[setDimension1,setDimension3],[0.1]	);
chaos.generateShapes([elementP1,elementP3],[setDimension1,setDimension3],[1]	);
 //chaos.generateShapes([elementP1,elementP2],[setDimension1,setDimension2],[0.5]	);
 chaos.genSides();
 //for (let i = -20;i<20;i++) {
 for (let i = 0;i<chaos.numLines;i++) {
   let pnt = Point.mk(i*10,0);
   chaos.displaySegments(chaos.intersectionsWithLine(chaos.genRandomPoint(),chaos.genRandomUnitVector()));
 }
 order.moveto(Point.mk(700,0));
 initializeOrder(order);

}	
return item;
});
      

