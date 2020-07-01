// bulls eye

//core.require('/shape/blurredCircle.js',function (elementPP) {
  debugger;
core.require('/random/addRandomLines.js', function (builder) {
  
  
  const initializer = function (itm) {
    debugger;
    let {lines,numRows,numCols} = itm;
    if (lines) {
      return;
    }
    lines = itm.set('lines',core.ArrayNode.mk());
    let n = numRows*numCols;
    for (let i=0;i<n;i++) {
      lines.push(null);
    }
    for (let i=0;i<numRows;i++) {
      for (let j=0;j<numCols;j++) {
        if (i === j) {
          itm.genLine(i,j,0.75 * Math.PI);
        } else if ((i+j) === (numRows-1)) {
          itm.genLine(i,j,0.25 * Math.PI);
        }
      }
    }
  }
 return builder(initializer);
});
