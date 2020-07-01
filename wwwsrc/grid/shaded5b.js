
core.require('/grid/shaded5cons.js',function (constructor) {
  debugger;
  let rs = constructor();
  rs.backgroundColor = 'black';
  rs.color2rgb = function (r,g,b) {
   // let [r,g,b] = ic;
   // let c = [r,r,r]; //white
    return `rgb(${Math.floor(r)},${Math.floor(g)},${Math.floor(b)}`;
  }
  rs.numRows = 200;
  rs.numCols = 200;
  rs.pixelDim = 5;
  rs.redP = {step:25,min:40,max:250};
  rs.greenP = {step:25,min:40,max:250};
  rs.blueP = {step:25,min:40,max:250};
  rs.initializeConstructor();
  return rs;
  
})
