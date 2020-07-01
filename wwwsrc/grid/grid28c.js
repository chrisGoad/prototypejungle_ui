
core.require('/grid/grid28cons.js',function (constructor) {
  debugger;
  let rs = constructor();
  rs.numLines = 60;
  rs.strokeWidth = 0.4;
  rs.stroke = 'white';
  let width = 200;
  let height = 200;
  let hwd = 0.5 * width
  let hht = 0.5 * height;
  let box = geom.Rectangle.mk(Point.mk(-hwd,-hht),Point.mk(width,height));
  rs.hvParams = {box,minLen:2,maxLen:5,sep:4,numTries:10000};
  //this.addHVLines(this.lineP1,lines,box,2,5,4,10000);

  rs.initializeConstructor();
  return rs;
  
})

  //let {lineP,lines,box,minLen,maxLen,sep,numTries} = params;
