
core.require('/grid/grid24cons.js',function (constructor) {
  debugger;
  let rs = constructor();
  rs.rgb2color = function (r,g,b) {
    return `rgb(${Math.floor(r)},${Math.floor(r)},${Math.floor(r)}`;
  }
 
  rs.numRows= 81;
 
  rs.numCols= 81;
  //let numRows = this.numRows= 41;
  rs.width = 180;
  rs.height = 100;
  rs.visChance= 1;
  rs.boundaryStrokeWidth =0.2;
  rs.shapeStrokeWidth =0.2;
  rs.shapeStroke = 'red';
  rs.shapeLengthRatio = 0.25;
  rs.redP = {step:35,min:20,max:250};
  rs.greenP = {step:35,min:20,max:250};
  rs.blueP = {step:35,min:20,max:250};
  rs.pointJiggle = 3;
  rs.includeShapes = true;
  
  rs.initializeConstructor();
  return rs;
})
