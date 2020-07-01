
core.require('/grid/grid28cons.js',function (constructor) {
  debugger;
  let rs = constructor();
  rs.numLines = 60;
  rs.strokeWidth = 0.4;
  rs.stroke = 'white';
  rs.maxThere = 5;
  rs.minThere = 0;
  rs.maxMissing = 3;
  rs.minMissing = 0;
  rs.initializeConstructor();
  return rs;
  
})
