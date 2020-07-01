
core.require('/grid/grid24cons.js',function (constructor) {
  debugger;
  let rs = constructor();
  rs.rgb2color = function (r,g,b) {
    return `rgb(${Math.floor(r)},${Math.floor(r)},${Math.floor(r)})`;
  }
 
  rs.numRows= 11;//81;
 
  rs.numCols= 31//81;
  //let numRows = this.numRows= 41;
  rs.width = 180;
  rs.height = 50;
  rs.visChance= 1;
  rs.boundaryStrokeWidth =0.5;
  rs.shapeStrokeWidth =0.2;
  rs.redP = {step:35,min:0,max:250};
  rs.greenP = {step:35,min:0,max:250};
  rs.blueP = {step:35,min:0,max:250};
  rs.pointJiggle =  3;
  rs.animateIt = true;
  rs.initializeConstructor();

 /* if (rs.animate) {
    rs.animateStep(0,0.5);
    
    core.root.draw();

  }*/
  debugger;
  return rs;
  
})
