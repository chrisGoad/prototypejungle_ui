
core.require(function () {
  return function (item,shape) {
/*adjustable parameters  */

OBSOLETE;
item.numRows= 31;
item.numRows = 11;
item.numCols = 11;
item.width = 100;
item.height = 100;
item.lengthThere = 10;
item.lengthMissing = 5;

item.addBrokenLine = function (start,dir,ln) {
  let {lengthThere:lThere,lengthMissing:lMissing,lines} = this;
  let cLen = 0;
  let cp = start;
  let addingThere = true;
  while (cLen < ln) {
    let nextLen = Math.min(ln-cLen,Math.random() * (addingThere?lThere:lMissing));
    let np = cp.plus(dir.times(nextLen));
    if (addingThere) {
      let newLine = this.lineP.instantiate();
      lines.push(newLine);
      newLine.setEnds(cp,np);    
      newLine.update();
      newLine.show();
      addingThere = false;
    } else {
      addingThere = true;
    }
    cLen += nextLen;
    cp = np;
  }
}
    
      
      
      
  
  
item.initializeGrid = function () {
  let {numRows,numCols,width,height} = this;
  this.set('lines',core.ArrayNode.mk());
  let dy = height/numRows;
  let cy = height/2;
  let dir = Point.mk(1,0);
  for (let i = 0;i<numRows;i++) {  
    let sp = Point.mk(-0.5*width,cy);
    this.addBrokenLine(sp,dir,width);
    cy -= dy;
  }
  let dx = width/numCols;
  let cx = -width/2;
  dir = Point.mk(0,1);
  for (let i = 0;i<numCols;i++) {  
    let sp = Point.mk(cx,-0.5*height);
    this.addBrokenLine(sp,dir,height);
    cx += dx;
  }
  
}


}
});

      

