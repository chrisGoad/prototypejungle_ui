
core.require('/gen1/grid0_20.js',
function (rs) {
 let numTimeSteps = 200;
 rs.setName('grid0_20_7');
 let bkdim = 1200;
let topParams = {width:40,height:40,numRows:40,numCols:40,pointJiggle:0,fcLineX:0.25,fcLineY:0.25,fcGonX:7,fcGonY:7,fcCircle:0.7,numTimeSteps:numTimeSteps,frameSpeed:0.05,timeSpeed:0.15,interpolateFromStep:undefined,interpolateSteps:10,interval:10,
backgroundWidth:bkdim,backgroundHeight:bkdim,backgroundColor:'rgb(10,10,10)',threeD:1,
fcCrossA0:0.5,fcCrossA1:0.5,fcCrossLength:0.5,options:['polygon'],//['horizontalLine','verticalLine','cross','polygon'],
sphereCenter:Point3d.mk(0,0,-20),sphereDiameter:35,focalPoint:Point3d.mk(0,0,50),focalLength:10,cameraScaling:100};//'polygon','circle']};

Object.assign(rs,topParams);
	
rs.finishProtos = function () {
	this.lineP['stroke-width'] = 1;
	this.polylineP['stroke-width'] = 1.75;
	this.polygonP.stroke = 'white';
	this.polylineP.stroke = 'white';
	this.polygonP['stroke-width'] = 1;
	this.polygonP.fill = 'transparent';
	this.polygonP.fill = 'rgba(0,0,255,.1)';
	this.circleP['stroke-width'] = 0.25;
	core.root.backgroundColor ='rgb(30,30,30)';
	//this.polylineP['stroke'] = 'yellow';
}	


rs.chooseWhich = function (rvs, cell) {
  return {which:'polygon',freeGons:1};
}


return rs;
});
 