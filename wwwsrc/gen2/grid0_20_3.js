
core.require('/gen1/grid0_20.js','/gen0/animation.js',//'/gen0/basics.js',
function (part,addAnimationMethods) { //,addBasicMethods) {
 
 let rs = svg.Element.mk('<g/>');
 addAnimationMethods(rs);
 let numTimeSteps = 100;
 rs.numTimeSteps = numTimeSteps;
 rs.set('part',part);
 rs.setName('grid0_20_3');
 let threeD = 1;
 let bkdim = threeD?1200:40;
let topParams = {width:80,height:80,numRows:40,numCols:40,pointJiggle:0,fcLineX:.25,fcLineY:1,fcGonX:.7,fcGonY:.7,fcCircle:0.7,randomSpeed:0.05,
backgroundWidth:bkdim,backgroundHeight:bkdim,backgroundColor:'rgb(5,5,5)',threeD,numTimeSteps:numTimeSteps,interpolateFromStep:numTimeSteps-7,
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
	this.polygonP.fill = 'rgba(00,00,200,0.5)';
	//this.polygonP.fill = 'white';
	this.circleP['stroke-width'] = 0.25;
	core.root.backgroundColor ='rgb(30,30,30)';
	//this.polylineP['stroke'] = 'yellow';
}	

//rs.pupilValues = null;

part.chooseWhich = function (rvs, cell) {
	return {which:'polygon',freeGons:1};
	//return 'horizontalLine';
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
		return {which:'polygon'};
	} else {
		let pv = pupilValues[idx];
		if (pv) {
			return pv;
		} else {
			pv = Math.random()<0.5?'verticalLine':'horizontalLine';
			pupilValues[idx] = pv;
			return {which:pv};
		}
	}

}

rs.posX = 0;
rs.step = function () {
	let posX = this.posX + .1;
	//this.part.moveto(Point.mk(posX,0));
	this.posX = posX;
	this.part.step();
}

rs.animate = function (resume)  {
  this.part.saveVideo = this.saveVideo;
	this.part.animateIt(this.numTimeSteps,30,resume);
	
}


rs.initialize = function () {
	this.part.initialize();
}
return rs;
});
 