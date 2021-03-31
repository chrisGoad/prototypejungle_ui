
core.require('/gen1/grid0_20.js',
function (rs,addBasicMethods) {
 let numTimeSteps = 100;
let topParams = {width:800,height:400,numRows:40,numCols:80,pointJiggle:10,fcLineX:.5,fcLineY:.51,fcGonX:0.5,fcGonY:0.5,fcCircle:0.7,threeD:0,interpolateSteps:4,interval:30,numTimeSteps,
fcCrossA0:0.5,fcCrossA1:0.5,fcCrossLength:0.5,options:['cross','horizontalLine','verticalLine','polygon'],frameSpeed:0.05,timeSpeed:0.15,interpolateFromStep:undefined};//'polygon','circle']};

rs.setName('grid0_20_8');

Object.assign(rs,topParams);
	
const finishProtos = function () {
	this.lineP['stroke-width'] = 1;
	this.polylineP['stroke-width'] = 0.75;
	this.polylineP.stroke = 'yellow';
	this.polygonP['stroke-width'] = 0.05;
	this.polygonP['stroke-width'] = 1;
	this.polygonP.fill = 'transparent';
	this.polygonP.fill = 'white';
	this.circleP['stroke-width'] = 0.25;
	//this.polylineP['stroke'] = 'yellow';
}	

const chooseWhich = function (rvs, cell) {
	let {numRows:nr,numCols:nc} = this;
	let hnr = nr/2;
	let hnc = nc/2;
	let {x,y} = cell;
	let p = Point.mk(x,y);
	let cntr = Point.mk(hnc,hnr);
	let cp = 20;
	let lowCC = Point.mk(hnc,hnr-cp);
	let highCC = Point.mk(hnc,hnr+cp);
	let cd = 40;
	let inCornea = (p.distance(lowCC)<cd) && (p.distance(highCC)<cd);
	let dist = p.distance(cntr);
	let inPupil = dist < 10;
	console.log(x,y,cntr.x,cntr.y,dist);
	let rs;
	let clr  = 'yellow';
	if (inPupil) {
		rs = {which:'polygon',freeGons:1};
	} else if (inCornea) {
		//rs = 'cross';
		clr = 'white';
	//	rs = {which:'horizontalLine',whichRvs:1};
		rs = {which:'polygon',whichRvs:1,freeGons:1};
	} else {
		//rs = {which:'horizontalLine'};
		rs = {which:'polygon',freeGons:1};
	}
	return rs;
	
}

rs.chooseWhich = chooseWhich;
rs.finishProtos = finishProtos;
rs.initializeee = function () {
	debugger;
	let {width} = this.left;
	let mvd = 0.6*width;
	//this.left.moveto(Point.mk(-mvd,0));
	//this.right.moveto(Point.mk(mvd,0));
	this.left.initialize();
	//this.right.initialize();
}
return rs;
});
 