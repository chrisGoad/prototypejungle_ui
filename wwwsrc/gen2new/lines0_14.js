
core.require('/line/line.js','/shape/circle.js','/gen0/lines0.js','/gen0/basics.js',//'/random/addIntersectingLines4.js',
function (linePP,circlePP,addMethods,addSetName) {
debugger;
let rs = svg.Element.mk('<g/>');
//addSetName(rs);
addMethods(rs);
rs.setName('lines0_14');

/*adjustable parameters  */
let rdim = 100;
//let sideParams = {width:rdim,height:rdim,numLines:300,angleMin:-90,angleMax:90,segmentsOnly:1}
//let topParams = {width:rdim,height:rdim,numLines:100,angleMin:-90,angleMax:90,saveImage:1,focalPoint:Point3d.mk(0,0,500),focalLength:10,cameraScaling:10};
let topParams = {width:rdim,height:rdim,numLines:10,angleMin:-90,angleMax:90,saveImage:1,numTimeSteps:50,backgroundColor:'red',lineDelta:.02,randomDelta:0,
 markSpeed:100};
Object.assign(rs,topParams);
/*rs.saveImage = true;
rs.width = 400;
rs.height = 200;
rs.numLines=3000;
//rs.numLines=5;
rs.angleMin = -90;
rs.angleMax = 90;*/
//let side0 =  rs.set('side0',svg.Element.mk('<g/>'));
//let side1=  rs.set('side1',svg.Element.mk('<g/>'));


rs.initProtos = function () {
  core.assignPrototypes(this,'lineP',linePP);
  this.lineP.stroke = 'white';
  this.lineP['stroke-width'] = .07; 	
	core.assignPrototypes(this,'circleP',circlePP);
  this.circleP.stroke = 'white';
  this.circleP.fill = 'blue';
  this.circleP.dimension = 4;
  this.circleP['stroke-width'] = .07; 	
}  

//side0.initProtos = initProtos;


rs.initialize = function () {
	debugger;
	let {markSpeed,numTimeSteps} = this;
  this.initProtos();
 // core.root.backgroundColor = 'black';
 	this.initializeLines(null,0);

  this.set('mark',this.circleP.instantiate());
	this.mark.show();
	this.segNumber = 0;
	this.fractionAlong = 0;
		this.deltaD = markSpeed/numTimeSteps;
	this.initMark();


}	


rs.alongSeg = function (seg,fr) {
	let {end0,end1} = seg;
	let vec = end1.difference(end0);
	let svec = vec.times(fr);
	let p = end0.plus(svec);
	return p;
}

rs.computeFractionAlong = function (seg,p)  {
	let {end0,end1} = seg;
	let vec = end1.difference(end0);
	let {x:vx,y:vy} = vec;
	let pv = p.difference(end0);
	let {x:pvx,y:pvy} = pv;
	let rs;
	if (vx > vy) {
		rs = pvx/vx;
  } else {
		rs = pvy/vy;
	}
	return rs;
}
rs.moveMark = function (seg,fr) {
	let p = this.alongSeg(seg,fr);
	this.mark.moveto(p);
}

rs.nextPoint = function (seg,fr) {
	let {end0,end1} = seg;
	let p = this.alongSeg(seg,fr);
	let ln = seg.length();
	let vec = (end1.difference(end0)).times(1/ln);
	let rs = p.plus(vec.times(this.deltaD));
  return rs;
}

rs.initMark = function (delta) {
	debugger;
		let {numTimeSteps,timeStep,segments,fractionAlong,markSpeed,segNumber,deltaD,mark} = this;	
	let seg = segments[segNumber];
	let ln = seg.length();
	//this.deltaD = markSpeed/numTimeSteps;
	let np = this.nextPoint(seg,fractionAlong);
	mark.moveto(np);
}

rs.moveLines = function (delta) {
	//debugger;
	let {numTimeSteps,timeStep,segments,fractionAlong,markSpeed,segNumber,deltaD} = this;	
	let seg = segments[segNumber];
	let ln = seg.length();
	//this.deltaD = markSpeed/numTimeSteps;
	let np = this.nextPoint(seg,fractionAlong);
	this.moveSegments(delta);
  let p = seg.nearestPoint(np);
	let vec = p.difference(np);
	let vln = vec.length();
	console.log('deltaD vln',deltaD,vln);
	let newFr = this.computeFractionAlong(seg,p);
	this.moveMark(seg,newFr);
	this.fractionAlong = newFr;
//	console.log('dist fr',newD - );
	//this.resetSegments(delta);
	this.addLines(1);
}


rs.step = function ()   {
	this.moveLines();
}
	

rs.animate = function (resume)  {
	this.animateIt(this.numTimeSteps,100,resume);
}
	


//side0.initialize = initialize;
/*
const initSide = function (side) {
	addMethods(side);
  Object.assign(side,sideParams);
	side.initProtos = initProtos;
	side.initialize= initialize;
}

initSide(side0);
initSide(side1);

rs.initialize = function () {
	//debugger;
	side0.initialize(Affine3d.mkRotation('y',0.25*Math.PI));
side1.initialize(Affine3d.mkTranslation(Point3d.mk(100,0,0)).times(Affine3d.mkRotation	('y',0.25*Math.PI)));
}
*/
return rs;
});
      

