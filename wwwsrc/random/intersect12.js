
core.require('/line/line.js','/shape/circle.js','/random/addLinesShapes0.js',//'/random/addIntersectingLines4.js',
function (linePP,circlePP,addMethods) {
debugger;
let item = svg.Element.mk('<g/>');

addMethods(item);
/*adjustable parameters  */


item.initializeProto = function () {
  core.assignPrototypes(this,'lineP',linePP);
  this.lineP.stroke = 'white';
  this.lineP['stroke-width'] = .1; 
  core.assignPrototypes(this,'gridLineP',linePP);
  this.gridLineP.stroke = 'white';
  this.lineP['stroke-width'] = .1; 
    
   core.assignPrototypes(this,'circleP',circlePP);
  this.circleP.stroke = 'black';
  this.circleP.fill = 'black';
  //this.lineP['stroke-width'] = 1; 	
}  


item.delta = 10;
item.center = Point.mk(0,0);
item.width = 300;
item.height = 200;

item.drawGrid = function () {
  debugger;
  if (this.gridLines) {
    this.gridLines.length = 0;
  } else {
    this.set('gridLines',core.ArrayNode.mk());
  }
  let {delta,width,height} = this;
  let lineP = this.gridLineP;
  let numHlines = Math.ceil(height/delta);
  let numVlines = Math.ceil(width/delta);
  let hwd = width/2;
  let hht = height/2;
  const addLine =  (e0,e1) => {
    let line = lineP.instantiate();
    this.gridLines.push(line);
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


item.initialize = function () {
  this.initializeProto();
  this.dimension = 120;
  this.numLines=1000;
  //this.numLines=110;
  this.angleMin = -90;
  this.angleMax = 90;
  //this.angleMin = -45;
 // this.angleMax = 45;
  //this.numLines=200;
  core.root.backgroundColor = 'black';
   this.drawGrid();
 let circle =  this.set('visCircle',this.circleP.instantiate());
 circle.dimension = this.dimension;
 circle.update();
 circle.show();
 
 //this.lineCenterDistance = 40;
 /* 
   let circle = this.set('circle',circleP.instantiate());
   circle.dimension = this.circleDimension;
   circle.update();
   circle.show();
 */  

  this.initializeLines();
}	
return item;
});
      

