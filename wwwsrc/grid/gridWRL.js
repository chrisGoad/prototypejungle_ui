// bulls eye

//core.require('/shape/blurredCircle.js',function (elementPP) {
core.require('/line/line.js','/shape/circle.js','/shape/rectangle.js','/grid/addGrid.js','/random/addRandomLines2.js', 
 function (linePP,circlePP,rectanglePP,addGridMethods,addRLmethods) {
  debugger;
let item = svg.Element.mk('<g/>');

addGridMethods(item);
addRLmethods(item);

item.initializePrototype = function () {
  core.assignPrototypes(this,'lineP',linePP);
  this.lineP.stroke = 'black';
  this.lineP['stroke-width'] = 0.3; 
  core.assignPrototypes(this,'circleP',circlePP);
  this.circleP.fill = 'red';
  this.circleP.dimension = item.deltaX*0.3;
  this.circleP['stroke-width'] = 0.05; 

  core.assignPrototypes(this,'rectangleP',rectanglePP);
  this.rectangleP.fill = 'black';
  this.rectangleP.stroke = 'transparent';
  this.rectangleP.width = item.deltaX*0.5;
  this.rectangleP.height = item.deltaX*0.05;
}  

item.initialize = function () {
  debugger;
  let lines1 = this.set('lines1',core.ArrayNode.mk());
  let {numRows,numCols} = this;
    let n = numRows*numCols;  
  this.xdim =25;
  this.ydim = 25;
  this.numRows = 11;
  this.numCols = 11;
  this.addTheLines();
  this.initializeGrid();
  

}
 return item;
});
