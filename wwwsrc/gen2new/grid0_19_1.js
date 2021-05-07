
core.require('/gen1/grid0_19.js',
function (rs) {
 
 rs.setName('grid0_19_1');
 let bkdim = 1200;
let topParams = {width:40,height:40,numRows:40,numCols:40,pointJiggle:0,fcLineX:.25,fcLineY:.25,fcGonX:.5,fcGonY:.5,fcCircle:0.7,randomSpeed:0.2,
backgroundWidth:bkdim,backgroundHeight:bkdim,backgroundColor:'rgb(5,5,5)',threeD:1,
fcCrossA0:0.5,fcCrossA1:0.5,fcCrossLength:0.5,options:['polygon','verticalLine','horizontalLine','cross'],//['horizontalLine','verticalLine','cross','polygon'],
sphereCenter:Point3d.mk(0,0,-20),sphereDiameter:35,focalPoint:Point3d.mk(0,0,50),focalLength:10,cameraScaling:100};//'polygon','circle']};

Object.assign(rs,topParams);
	
rs.finishProtos = function () {
	let threeD = this.threeD;
	
	this.lineP['stroke-width'] = threeD?1:.1;
	this.polylineP['stroke-width'] = threeD?1.75:.175;
	this.polygonP.stroke = 'white';
	this.polylineP.stroke = 'white';
	this.polygonP['stroke-width'] = threeD?1:0.1;
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
  let inPupil = dist < 10;
	if (!inPupil) {
		//return 'cross';
		return 'polygon';
	} else {
		return Math.random()<0.5?'verticalLine':'horizontalLine';
	}

}

return rs;
});
 