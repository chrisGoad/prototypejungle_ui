// bulls eye

//core.require('/shape/blurredCircle.js',function (elementPP) {
  debugger;
core.require('/random/addRandomLines.js', function (builder) {
  
  
  const initializer = function (itm) {
    debugger;
    let {lines1, numRows,numCols} = itm;
    if (lines1) {
      return;
    }
    lines1 = itm.set('lines1',core.ArrayNode.mk());
    
    let randoms = itm.set('randoms',core.ArrayNode.mk());
   let n = numRows*numCols;  
   for (let i=0;i<n;i++) {
      randoms.push(Math.random());
    }
   
    for (let i=0;i<n;i++) {
      lines1.push(null);
    }
    let line;
    for (let i=0;i<numRows;i++) {
      for (let j=0;j<numCols;j++) {
        if (i === j) {
          line = itm.genLine(lines1,i,j,0.75 * Math.PI);
          
        } else if ((i+j) === (numRows-1)) {
          line = itm.genLine(lines1,i,j,0.25 * Math.PI);
        }
        line.stroke = 'red';
      }
    }
  }
 return builder(initializer);
});
