
core.require('/gen1/grid0_18.js',
function (proto) {
  
let topParams = {width:800,height:400,numRows:40,numCols:80,pointJiggle:10,fcLineX:1,fcLineY:.11,fcGonX:0.5,fcGonY:0.5,fcCircle:0.7,
fcCrossA0:0.5,fcCrossA1:0.5,fcCrossLength:0.5,options:['cross','horizontalLine','verticalLine','polygon']};//'polygon','circle']};

let rs = svg.Element.mk('<g/>');
//rs.setName('grid0_18_1');

let left = rs.set('left',proto.instantiate());
let right = rs.set('right',proto.instantiate());

Object.assign(left,topParams);
Object.assign(right,topParams);
	
const finishProtos = function () {
	this.lineP['stroke-width'] = 1;
	this.polylineP['stroke-width'] = 0.75;
	this.polylineP.stroke = 'yellow';
	this.polygonP['stroke-width'] = 0.25;
	this.polygonP.fill = 'transparent';
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
		rs = 'polygon';
	} else if (inCornea) {
		//rs = 'cross';
		clr = 'white';
		rs = 'verticalLine';
	} else {
		rs = 'horizontalLine';
	}
	return {which:rs,color:clr};
	
}

left.chooseWhich = chooseWhich;
right.chooseWhich = chooseWhich;
left.finishProtos = finishProtos;
right.finishProtos = finishProtos;
rs.initialize = function () {
	debugger;
	let {width} = this.left;
	let mvd = 0.6*width;
	this.left.moveto(Point.mk(-mvd,0));
	this.right.moveto(Point.mk(mvd,0));
	this.left.initialize();
	this.right.initialize();
}
return rs;
});
 