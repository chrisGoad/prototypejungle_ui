
//core.require('/line/line.js','/grid/addLongLineGrid.js',function (linePP,addMethods) {
core.require('/shape/rectangle.js','/shape/circle.js','/line/line.js','/grid/addArcGrid.js',function (rectanglePP,circlePP,linePP,addMethods) {
debugger;
let item = svg.Element.mk('<g/>');

addMethods(item);
/*adjustable parameters  */


item.initializeProto = function () {
  core.assignPrototypes(this,'lineP1',linePP);
  this.lineP1.stroke = 'white';
  this.lineP1['stroke-width'] = .4;  
    core.assignPrototypes(this,'lineP2',linePP);
  this.lineP2.stroke = 'rgb(200,255,255)';
  this.lineP2.stroke = 'red';
  this.lineP2['stroke-width'] = .4;  
  //core.assignPrototypes(this,'shapeP1',linePP);
  core.assignPrototypes(this,'rectangleP',rectanglePP);
  this.rectangleP.fill = 'rgb(0,0,10)';
  this.rectangleP.width = 10;
  this.rectangleP.height = 20;
  this.rectangleP['stroke-width'] = 0;  
   core.assignPrototypes(this,'circleP',circlePP);
  this.circleP.fill = 'rgb(50,50,50)';
  this.circleP.fill = 'rgb(35,35,150)';
  this.circleP.fill = 'rgb(10,10,10)';
  this.circleP.dimension = 50;
  this.circleP['stroke-width'] = 0;  
}  

item.initialize = function () {
//  core.root.backgroundColor ='rgb(0,0,100)';
  core.root.backgroundColor ='rgb(70,0,0)';
  core.root.backgroundColor ='rgb(0,0,0)';
  
  this.initializeProto();
  debugger;
  this.numLines = 60;
  this.numRows= 100;
  this.numCols= 100;
  let width = 200;
  let height = 200;
  let hwd = 0.5 * width
  let hht = 0.5 * height;
  let box = geom.Rectangle.mk(Point.mk(-hwd,-hht),Point.mk(width,height));
  let lines =  this.set('lines',core.ArrayNode.mk());
 // this.addHVLines(this.lineP1,lines,box,2,5,2,10000);
  this.addHVLines(this.lineP1,lines,box,2,5,4,10000);
  
  
}	
return item;
});
      

