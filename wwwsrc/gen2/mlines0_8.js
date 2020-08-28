
core.require('/line/line.js','/gen0/movingLines0.js',//'/random/addIntersectingLines4.js',
function (linePP,addMethods) {
debugger;
//let numTimeSteps = 100;
let rs = svg.Element.mk('<g/>');
rs.numTimeSteps = 500;
addMethods(rs);
/*adjustable parameters  */
rs.saveImage = true;
rs.setName('mlines0_8');
rs.width = 400;
rs.height = 400;
rs.numLines=2000;//00;//00;//0;//0;//00;
//rs.numLines=5;
rs.angleMin = -90;
rs.angleMax = 90;
rs.velocityFactor = 0.1;
rs.rotationFactor = 0.02;
rs.rotationFactor = 0.005;
rs.uniformRotation = 0;
rs.moveTowardsCenter = 0;
rs.crossMode = 0;
rs.acrossCircle = geom.Circle.mk(Point.mk(0,0),150);
rs.secondColor = 'white';
	rs.numFramesToRepeat = 20;
	
rs.initProtos = function () {
  core.assignPrototypes(this,'lineP',linePP);
  this.lineP.stroke = 'black';
  //this.lineP.stroke =  'gray';
  //this.lineP.stroke =  'blue';
  this.lineP['stroke-width'] = .1;///45; 	
}  


rs.initialize = function () {
  this.initProtos();
  
  core.root.backgroundColor = 'gray';
 // core.root.backgroundColor = 'rgb(0,0,30)';
  this.initializeLines();
	//this.addBox(20,'white');
}	

return rs;
});
      

