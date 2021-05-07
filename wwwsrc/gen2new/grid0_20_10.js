
core.require('/gen1/grid0_20.js',
function (rs) {
 let numTimeSteps = 1000;
 rs.setName('grid0_20_6');
 let bkdim = 100;
let topParams = {width:100,height:100,numRows:2,numCols:2,pointJiggle:0,fcLineX:.01,fcLineY:.01,fcGonX:.5,fcGonY:.5,fcCircle:0.7,numTimeSteps:numTimeSteps,frameSpeed:0.05,timeSpeed:0.05,interpolateFromStep:undefined,interpolateSteps:undefined,
backgroundWidth:bkdim,backgroundHeight:bkdim,threeD:0, backgroundColor:'rgb(10,10,10)',smooth:1,vFactor:.1,
fcCrossA0:0.5,fcCrossA1:0.5,fcCrossLength:0.5,options:['polygon'],//['horizontalLine','verticalLine','cross','polygon'],
sphereCenter:Point3d.mk(0,0,-20),sphereDiameter:35,focalPoint:Point3d.mk(0,0,50),focalLength:10,cameraScaling:100};//'polygon','circle']};

Object.assign(rs,topParams);
	
rs.finishProtos = function () {
	this.lineP['stroke-width'] = 1;
	this.polylineP['stroke-width'] = .05;
	this.polygonP.stroke = 'white';
	this.polylineP.fill = 'green';
	this.polygonP['stroke-width'] =0.1;
	this.polygonP.fill = 'transparent';
	//this.polygonP.fill = 'blue';
	this.circleP['stroke-width'] = 0.25;
	core.root.backgroundColor ='rgb(30,30,30)';
	//this.polylineP['stroke'] = 'yellow';
}	


rs.chooseWhich = function (rvs, cell) {
	let {numRows:nr,numCols:nc,HVValues} = this;
  if (!HVValues) {
		this.HVValues = HVValues = [];
		HVValues.length = nr*nc;
	}
	let hnr = nr/2;
	let hnc = nc/2;
	let {x,y} = cell;
	let idx = x*nc + y;
  //if ((Math.abs(x - hnc)<5) && (Math.abs(y - hnr)<5)) {
  if ((x%2 === 0) && (y%2 === 0)) {
    return {which:'polygon',freeGons:1};
  }
  //return null;
  return {which:'polygon',freeGons:1,whichRvs:1};
  
		//return 'cross';
	

}

return rs;
});
 