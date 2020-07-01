core.require(function () {
//core.require('/shape/circle.js',function (atPP) {let item =  svg.Element.mk('<g/>');

let item = core.ObjectNode.mk();

const inPattern = function (itm,i,j) {
  return (i === j) || ((itm.numRows - j) === (i+1));
}
item.gridUpdate = function () {
  let {numRows,numCols,deltaX,deltaY,sizeFactor1,sizeFactor2,elementP1,elementP2} = this;
/*  = this.numRows;
  let numCols = this.numCols;
  let deltaX = this.deltaX;
  let deltaY = this.deltaY;
  let sizeFactor = this.sizeFactor;
  let randomSize = this.randomSize;*/
  let n = numRows * numCols;
  let elements = this.elements;
  let elementP = this.elementP;
   // row major order
  if (!elements  || (elements.length !== n)) {
    elements = core.ArrayNode.mk();
    this.set('elements',elements);
    for (let i=0;i<numRows;i++) {
      for (let j=0;j<numCols;j++) {
        let inPat = inPattern(this,i,j);
        elements.push((inPat?elementP1:elementP2).instantiate().show());
      }
    }
  }
  elementP1.dimension = sizeFactor1 * deltaX;
  elementP2.dimension = sizeFactor2 * deltaX;
  for (let i=0;i<numRows;i++) {
    for (let j=0;j<numCols;j++) {
      let idx = i*numCols + j;
      let element = this.elements[idx];
      element.__update();
      element.moveto(Point.mk(i*deltaX,j*deltaY));
    }
  }
}

item.elementAt = function (i,j) {
  let idx = j*this.numCols + i;
  return this.elements[idx];
}
  
item.installGridMethods = function (grid,elementPP) {
  grid.initializePrototype = function () {
    core.assignPrototypes(this,'elementP1',elementPP);
    core.assignPrototypes(this,'elementP2',elementPP);

  }
  grid.stdUpdate = this.gridUpdate;
  grid.update = this.gridUpdate;
  grid.elementAt = this.elementAt;
}




return item;
});


