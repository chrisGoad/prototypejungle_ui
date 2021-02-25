
core.require('/line/line.js','/gen0/lines0.js','/gen1/cube_methods0.js',//'/random/addIntersectingLines4.js',
function (linePP,addLineMethods,addCubeMethods) {
debugger;
let rs = svg.Element.mk('<g/>');
//addSetName(rs);
addLineMethods(rs);
addCubeMethods(rs);
rs.setName('lines0_13');

/*adjustable parameters  */

let topParams = {cubeDim:100,numLines:300,saveImage:1,numTimeSteps:1000,
focalPoint:Point3d.mk(0,0,500),focalLength:10,cameraScaling:10,segGap:0.6,
shapeAngleX:0,shapeDeltaX:.01*Math.PI,
shapeAngleY:0,shapeDeltaY:.01*Math.PI,
};
Object.assign(rs,topParams);



rs.initProtos = function () {
  core.assignPrototypes(this,'lineP',linePP);
  this.lineP.stroke = 'white';
  this.lineP['stroke-width'] = .01; 	
}  

rs.splitSegments = function (segs) {
	let segGap = this.segGap;
	let rss = [];
	segs.forEach((seg) => {
		let spl = seg.split(segGap);
		rss.push(spl[0]);
		rss.push(spl[1]);
	});
	return rss
}
//side0.initProtos = initProtos;


rs.initialize = function () {
	debugger;
	let {cubeDim,numLines,focalPoint,focalLength,cameraScaling} = this;
  this.initProtos();
	let camera = this.camera = geom.Camera.mk(focalPoint,focalLength,cameraScaling,'z');
	let cube =this.theCube = Cube.mk(cubeDim);
 // core.root.backgroundColor = 'black';
  let segments3d = this.randomSegments3d(cube,numLines);
	let splitSegs = this.splitSegments(segments3d)
	let shape3d = this.shape3d = Shape3d.mk(splitSegs);
	let psegs = camera.project(shape3d);
  this.segments = psegs;
	//this.lines.remove();
	this.addLines();

}	


rs.moveShapeTo = function (xf,update) {
	let {shape3d,camera} = this;
	shape3d.set('transform',xf);
	let psegs = camera.project(shape3d);
  this.segments = psegs;
	debugger;
	//this.lines.remove();
		this.addLines(update);
}
	
rs.step = function ()   {
	let {shapeAngleX,shapeAngleY,shapeDeltaX,shapeDeltaY} = this;
	shapeAngleX = this.shapeAngleX = shapeAngleX + shapeDeltaX;
	shapeAngleY = this.shapeAngleY = shapeAngleY + shapeDeltaY;
	this.moveShapeTo(Affine3d.mkRotation('x',shapeAngleX).times(Affine3d.mkRotation('y',shapeAngleY)),true);

}
	
rs.animate = function (resume)  {
	this.animateIt(this.numTimeSteps,10,resume);
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
	debugger;
	side0.initialize(Affine3d.mkRotation('y',0.25*Math.PI));
side1.initialize(Affine3d.mkTranslation(Point3d.mk(100,0,0)).times(Affine3d.mkRotation	('y',0.25*Math.PI)));
}
*/
return rs;
});
      

