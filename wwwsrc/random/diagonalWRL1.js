// bulls eye

//core.require('/shape/blurredCircle.js',function (elementPP) {
  debugger;
core.require('/random/addRandomLines.js', function (builder) {
  
  
  const initializer = function (itm) {
    debugger;
    let {lines1,olines2, numRows,numCols} = itm;
    if (lines1) {
      return;
    }
    lines1 = itm.set('lines1',core.ArrayNode.mk());
   olines2 = itm.set('olines2',svg.Element.mk('<g/>'));
   
   let lines2 = olines2.set('lines2',core.ArrayNode.mk());
   let randoms = itm.set('randoms',core.ArrayNode.mk());

   let n = numRows*numCols;
    for (let i=0;i<n;i++) {
      randoms.push(Math.random());
    }
    for (let i=0;i<n;i++) {
      lines1.push(null);
    }
     for (let i=0;i<n;i++) {
      lines2.push(null);
    }
    olines2.setScale(2);
    olines2.moveto(Point.mk(200,300));	
    for (let i=0;i<numRows;i++) {
      for (let j=0;j<numCols;j++) {
        if (i === j) {
          itm.genLine(lines1,i,j,0.25 * Math.PI);
          itm.genLine(lines2,i,j,0.25 * Math.PI);
        } else if ((i+j) === (numRows-1)) {
          itm.genLine(lines1,i,j,0.75 * Math.PI);
          itm.genLine(lines2,i,j,0.75 * Math.PI);
        }
      }
    }
  }
 return builder(initializer);
});
