
core.require('/gen1/grid0_20.js',
function (rs) {
 let numTimeSteps = 100;
 rs.setName('grid0_20_6');
 let bkdim = 1200;
let topParams = {width:40,height:40,numRows:40,numCols:40,pointJiggle:0,fcLineX:0.25,fcLineY:0.25,fcGonX:.5,fcGonY:.5,fcCircle:0.7,numTimeSteps:numTimeSteps,frameSpeed:0.05,timeSpeed:0.15,interpolateFromStep:undefined,interpolateSteps:undefined,
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
	this.polygonP.fill = 'blue';
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

	let p = Point.mk(x,y);
	let cntr = Point.mk(hnc,hnr);
	let dist = p.distance(cntr);
  let inPupil = dist < 0;
	if (!inPupil) {
		//return 'cross';
		return {which:'polygon',freeGons:1};
	} else {
	  let pv = HVValues[idx];
		if (pv) {
			return {which:pv,freeGons:1};
		} else {
			pv = Math.random()<0.5?'verticalLine':'horizontalLine';
			HVValues[idx] = pv;
			return {which:pv};
		}
		return {which:Math.random()<0?'verticalLine':'horizontalLine'};
	}

}

return rs;
});
 