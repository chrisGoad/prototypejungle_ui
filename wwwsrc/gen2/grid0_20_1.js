
core.require('/gen1/grid0_20.js','/gen0/animation.js',
function (part,addAnimationMethods) {
 
 let rs = svg.Element.mk('<g/>');
 addAnimationMethods(rs);
 rs.numTimeSteps = 400;
 rs.set('part',part);
 //rs.setName('grid0_20_0');
 let threeD = 0;
 let bkdim = threeD?1200:40;
let topParams = {width:80,height:40,numRows:20,numCols:20,pointJiggle:0,fcLineX:.25,fcLineY:1,fcGonX:.5,fcGonY:.5,fcCircle:0.7,randomSpeed:0.2,
backgroundWidth:bkdim,backgroundHeight:bkdim,backgroundColor:'rgb(5,5,5)',threeD,numTimeSteps:200,
fcCrossA0:0.5,fcCrossA1:0.5,fcCrossLength:0.5,options:['polygon','verticalLine','horizontalLine','cross'],//['horizontalLine','verticalLine','cross','polygon'],
sphereCenter:Point3d.mk(0,0,-20),sphereDiameter:35,focalPoint:Point3d.mk(0,0,50),focalLength:10,cameraScaling:100};//'polygon','circle']};

Object.assign(part,topParams);
	
part.finishProtos = function () {
	let threeD = this.threeD;
	
	this.lineP['stroke-width'] = threeD?1:.1;
	this.polylineP['stroke-width'] = threeD?1.75:.1;
	this.polygonP.stroke = 'white';
	this.polylineP.stroke = 'white';
	this.polygonP['stroke-width'] = threeD?1:0.1;
	this.polygonP.fill = 'transparent';
	this.polygonP.fill = 'white';
	this.circleP['stroke-width'] = 0.25;
	core.root.backgroundColor ='rgb(30,30,30)';
	//this.polylineP['stroke'] = 'yellow';
}	

//rs.pupilValues = null;

part.chooseWhich = function (rvs, cell) {
	return 'horizontalLine';
	let {numRows:nr,numCols:nc,pupilValues} = this;
  if (!pupilValues) {
		this.pupilValues = pupilValues = [];
		pupilValues.length = nr*nc;
	}
	let hnr = nr/2;
	let hnc = nc/2;
	let {x,y} = cell;
	let idx = x*nc + y;
	let p = Point.mk(x,y);
	let cntr = Point.mk(hnc,hnr);
	let dist = p.distance(cntr);
  let inPupil = dist < 10;
	
	if (!inPupil) {
		//return 'cross';
		return 'polygon';
	} else {
		let pv = pupilValues[idx];
		if (pv) {
			return pv;
		} else {
			pv = Math.random()<0.5?'verticalLine':'horizontalLine';
			pupilValues[idx] = pv;
			return pv;
		}
	}

}

rs.posX = 0;
rs.step = function () {
	let posX = this.posX + .1;
	this.part.moveto(Point.mk(posX,0));
	this.posX = posX;
	this.part.step();
}

rs.animate = function (resume)  {
	this.animateIt(this.numTimeSteps,10,resume);
	
}


rs.initialize = function () {
	this.part.initialize();
}
return rs;
});
 