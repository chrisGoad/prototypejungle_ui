
core.require('/line/line.js','/gen0/movingLines0.js',//'/random/addIntersectingLines4.js',
function (linePP,addMethods) {
debugger;
let rs = svg.Element.mk('<g/>');

addMethods(rs);
/*adjustable parameters  */
rs.saveImage = true;
rs.setName('mlines0_0');
rs.width = 400;
rs.height = 200;
rs.numLines=3000;
//rs.numLines=5;
rs.angleMin = -90;
rs.angleMax = 90;

rs.initProtos = function () {
  core.assignPrototypes(this,'lineP',linePP);
  this.lineP.stroke = 'black';
  this.lineP['stroke-width'] = .075; 	
}  


rs.initialize = function () {
  this.initProtos();
  
 // core.root.backgroundColor = 'black';
  this.initializeLines();
}	
return rs;
});
      

