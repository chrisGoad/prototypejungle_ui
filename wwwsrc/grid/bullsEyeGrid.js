
core.require('/shape/bullsEye2.js','/grid/addGridMethods.js',function (elementPP,addMethods) {
//core.require('/shape/bullsEye2.js','/grid/addGrid3.js',function (elementPP,addMethods) {
debugger;
let item = svg.Element.mk('<g/>');


item.initializeProto= function () {
  core.assignPrototypes(this,'elementP',elementPP);
  elementPP.stroke = 'black';
  elementPP.dimension = this.dimension;

}
const positionFunction = function (grid,i,j) {
  let {deltaX,numCols} = grid;
  let dx = deltaX + (1/8)*deltaX * i;
 // let dx = deltaX*(1 + (1/4)*(Math.random() - 0.5));
  let lowX = -((numCols-1)*dx)/2;
  return Point.mk(lowX + j*dx,i*grid.deltaY);
}
addMethods(item,elementPP);
/*
item.updateGrid = function () {
  debugger;
  let {numRows,numCols,deltaX,deltaY,sizeFactor,randomSize,jiggle,numElements} = this;
  let sz = numRows * numCols;
  let elements = this.elements;
  elements.forEach(function (el) {
    el.__update();
  });
}
*/
/*adjustable parameters  */
item.initialize = function () {
  item.numRows = 8;
  item.numCols = 8;
  this.initializeProto();
  this.elementP.numCircles = 12;
  this.elementP.lineWidthFactor = .1;
  this.elementP.ringVisProbability = 0.999;
  this.includeCellBoundaries = 0;
//  this.positionFunction = positionFunction;
  this.initializeGrid();
  //debugger;
  editor.setDim(254);
  //this.setRowDimensions([40,40,20,20,20,40,40]);
//  this.setRowDimensions([40,30,20,10,20,30,40]);
  //this.setDim(180);
}	

item.update = function () {
  this.updateGrid();
}
return item;
});
      

