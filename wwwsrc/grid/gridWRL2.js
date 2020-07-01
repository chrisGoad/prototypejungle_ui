// bulls eye

//core.require('/shape/blurredCircle.js',function (elementPP) {
core.require('/random/basicRL.js','/grid/rwGrid2.js',
 function (randomLines,grid) {
  debugger;
let item = svg.Element.mk('<g/>');


 item.set('randomLines',randomLines.instantiate());
 item.set('grid',grid.instantiate());

item.initialize = function () {
  debugger;
 // th	is.randomLines.initialize();
  this.grid.numRows =32;
  this.grid.numCols = 22;
  this.grid.includeWindow = true;
  this.grid.theWindow.minx = 8;
  this.grid.theWindow.maxx = 13;
  this.grid.theWindow.miny = 8;
  this.grid.theWindow.maxy = 21;
 this.grid.circleCells.minx = 6;
  this.grid.circleCells.maxx = 15;
  this.grid.circleCells.miny = 8;
  this.grid.circleCells.maxy = 21;
   
  this.grid.windowCenterX = 10;
  this.grid.windowCenterY = 15;

  this.grid.initialize();
  this.randomLines.initialize();
  this.randomLines.setScale(0.27);
  //this.randomLines.moveto(Point.mk(0,-1.4));

  return;
  
  let lines1 = this.set('lines1',core.ArrayNode.mk());
  let {numRows,numCols} = this;
    let n = numRows*numCols;  
 
  this.addTheLines();
  this.initializeGrid();
  

}
 return item;
});
