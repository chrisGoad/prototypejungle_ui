
core.require('/grid/shaded5cons.js',function (constructor) {
  core.tlog('begin');
  let rs = constructor();
  rs.backgroundColor = 'black';
  rs.color2rgb = function (r,g,b) {
    debugger;
    return `rgb(${Math.floor(r)},${Math.floor(r)},0)`;
  }
  rs.numRows = 30;
  rs.numCols = 30;
  rs.pixelDim = 5;
  rs.redP = {step:25,min:40,max:250};
  rs.greenP = {step:25,min:40,max:250};
  rs.blueP = {step:25,min:40,max:250};
  core.tlog('start');
  rs.initializeConstructor();
   core.tlog('finish');
 
  return rs;
  
})
