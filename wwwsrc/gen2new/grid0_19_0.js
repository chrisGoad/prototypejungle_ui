
core.require('/gen1/grid0_19.js',
function (rs) {
 
 rs.setName('grid0_19_0');
 let bkdim = 1200;
let topParams = {width:40,height:40,numRows:40,numCols:40,pointJiggle:0,fcLineX:2.25,fcLineY:2.25,fcGonX:.5,fcGonY:.5,fcCircle:0.7,
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
	this.circleP['stroke-width'] = 0.25;
	core.root.backgroundColor ='rgb(30,30,30)';
	//this.polylineP['stroke'] = 'yellow';
}	

rs.chooseWhich = function (rvs, cell) {
	let {numRows:nr,numCols:nc} = this;
	let hnr = nr/2;
	let hnc = nc/2;
	let {x,y} = cell;
	let p = Point.mk(x,y);
	let cntr = Point.mk(hnc,hnr);
	let dist = p.distance(cntr);
  let inPupil = dist < 30;
	if (!inPupil) {
		//return 'cross';
		return 'polygon';
	} else {
		return Math.random()<0.5?'verticalLine':'horizontalLine';
	}

}

return rs;
});
 