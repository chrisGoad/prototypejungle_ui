
//core.require('/line/line.js','/grid/addLongLineGrid.js',function (linePP,addMethods) {
core.require('/grid/grid28cons.js',function (constructor) {
  let rs = constructor();
  rs.numLines = 600;
  rs.strokeWidth = 0.2;
  rs.stroke = 'white';
  rs.rgb2color =  (r,g,b) => `rgb(${r},${r},${r})`;
  rs.thereP = {step:5,min:3,max:35};
  rs.missingP = {step:8,min:3,max:35};
  rs.redP = {step:25,min:100,max:250};
  rs.greenP = {step:25,min:100,max:250};
  rs.blueP = {step:25,min:100,max:250};
  debugger;
  rs.initializeConstructor();
  return rs;
  
})
/*
    a (r,g,b) => `rgb(${r},${r},${r})`;break;
    b (r,g,b) => `rgb(${r},${g},0)`;break;
    c (r,g,b) => `rgb(${r},${g},${b})`;break;
  }
 
 */