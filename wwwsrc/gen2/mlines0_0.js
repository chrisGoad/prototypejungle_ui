
core.require('/line/line.js','/gen0/movingLines0.js',//'/random/addIntersectingLines4.js',
function (linePP,addMethods) {
debugger;
//let numTimeSteps = 100;
let rs = svg.Element.mk('<g/>');
rs.numTimeSteps = 100;
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
rs.velocityFactor = 0.1;
rs.rotationFactor = 0.02;
rs.uniformRotation = 0;
rs.moveTowardsCenter = 0
rs.crossMode = 0
	rs.numFramesToRepeat = 20;

rs.initProtos = function () {
  core.assignPrototypes(this,'lineP',linePP);
  this.lineP.stroke = 'black';
  this.lineP.stroke =  'white';
  //this.lineP.stroke =  'blue';
  this.lineP['stroke-width'] = .075; 	
}  


rs.initialize = function () {
  this.initProtos();
  
  core.root.backgroundColor = 'black';
  this.initializeLines();
}	

rs.step = function ()   {
  this.updateLines();
}
	


rs.animate = function ()  {
	this.animateIt(rs.numTimeSteps,100);
	
}
return rs;
});
      

