
core.require('/line/line.js','/gen0/grid0.js',function (shapePP,addMethods) {
debugger;
let item = svg.Element.mk('<g/>');

addMethods(item);
/*adjustable parameters  */

item.initializeProto= function () {
  debugger;
  core.assignPrototypes(this,'shapeP',shapePP);
  let shapeP = this.shapeP;
  shapeP['stroke-width'] = 0.1
  shapeP.stroke = 'white';
  shapeP.setEnds(Point.mk(-1,0),Point.mk(1,0));
  
}
item.initialize = function () {
  this.initializeProto();
  this.numRows= 31;
  this.numCols= 31;
  this.visChance= 1;
  this.generative = true;
  core.root.backgroundColor = 'black';
  this.initializeGrid();
}	
return item;
});
      

