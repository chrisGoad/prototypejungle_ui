// bulls eye

//core.require('/shape/blurredCircle.js',function (elementPP) {
  debugger;
core.require('/random/addRandomLines.js', function (builder) {
  
  
  const initializer = function (itm) {
    debugger;
    itm.numRows = 30;
    itm.numCols = 30;
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
        let center = itm.cellCenter(i,j);
        let nrm = center.normal();
        let a = Math.atan2(nrm.y,nrm.x);
        let ln = center.length();
         if ((ln>35) &&(ln < 40)) {
          itm.genLine(lines1,i,j,a);//0.25 * Math.PI);
         // itm.genLine(i,j,0);//0.25 * Math.PI);
        } else if (ln < 20) {
          itm.noLineAt(i,j);
        }
        if (0 && (i === j)) {
          itm.genLine(lines1,i,j,0.25 * Math.PI);
        }
      }
    }
  }
 return builder(initializer);
 });
  /*
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
        let center = itm.cellCenter(i,j);
        let nrm = center.normal();
        let a = Math.atan2(nrm.y,nrm.x);
        let ln = center.length();
         if ((ln>35) &&(ln < 40)) {
          itm.genLine(i,j,a);//0.25 * Math.PI);
         // itm.genLine(i,j,0);//0.25 * Math.PI);
        } else if (ln < 20) {
          itm.noLineAt(i,j);
        }
        if (0 && (i === j)) {
          itm.genLine(i,j,0.25 * Math.PI);
        }
      }
    }
  }
 return builder(initializer);
});*/
