
core.require('/line/line.js','/gen0/Basics.js','/mlib/grid.js',function (linePP,item,addMethods) {
debugger;
//let item = svg.Element.mk('<g/>');

addMethods(item);
/*adjustable parameters  */

item.initializeProto= function () {
  debugger;
  core.assignPrototypes(this,'lineP',linePP);
  this.rlineP = this.lineP;
  let lineP = this.lineP;
  lineP['stroke-width'] = 0.1
  lineP.stroke = 'white';
  lineP.setEnds(Point.mk(-1,0),Point.mk(1,0));
  
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
      

