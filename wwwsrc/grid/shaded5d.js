
core.require('/grid/shaded5cons.js',function (constructor) {
  let rs = constructor();
  rs.backgroundColor = 'black';
  rs.color2rgb = function (r,g,b) {
    debugger;
    return `rgb(${Math.floor(r)},${Math.floor(r)},0)`;
  }
  rs.numRows = 100;
  rs.numCols = 100;
  rs.pixelDim = 5;
	rs.constantFirstRow = 40;
  rs.redP = {step:25,min:40,max:250};
  rs.greenP = {step:25,min:40,max:250};
  rs.blueP = {step:25,min:40,max:250};
  rs.initializeConstructor();
  return rs;
  
})
