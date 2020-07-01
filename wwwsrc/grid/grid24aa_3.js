
core.require('/grid/grid24aa.js',
function (constructor) {
  debugger;	
  let rs = constructor();
  rs.initProtos();
  let  dimParams = {step:.3,min:0.5,max:4,numRows:rs.numRows,numCols:rs.numCols};
  rs.setupShapeRandomizer('dimension',dimParams); 
  return rs;
});

