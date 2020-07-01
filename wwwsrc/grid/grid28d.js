
core.require('/grid/grid28cons.js',function (constructor) {
  debugger;
  let rs = constructor();
  rs.numLines = 60;
  rs.strokeWidth = 0.4;
  rs.stroke = 'white';
  rs.maxThere = 15;
  rs.minThere = 1;
  rs.maxMissing = 13;
  rs.minMissing = 5;
  rs.useCentralFactor = true;
  rs.initializeConstructor();
  return rs;
  
})
