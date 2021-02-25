
core.require('/line/line.js','/shape/rectangle.js','/gen0/lines0.js','/gen0/basics.js',//'/random/addIntersectingLines4.js',
function (linePP,rectPP,addMethods,addSetName) {
debugger;
let rs = svg.Element.mk('<g/>');
//addSetName(rs);
addMethods(rs);
rs.setName('lines0_11');

/*adjustable parameters  */
let rdim = 100;
//let sideParams = {width:rdim,height:rdim,numLines:300,angleMin:-90,angleMax:90,segmentsOnly:1}
//let topParams = {width:rdim,height:rdim,numLines:100,angleMin:-90,angleMax:90,saveImage:1,focalPoint:Point3d.mk(0,0,500),focalLength:10,cameraScaling:10};
//let topParams = {width:rdim,height:rdim,numLines:1000,angleMin:-90,angleMax:90,saveImage:1,numTimeSteps:1000};
let speed = 4;
let topParams = {width:rdim,height:rdim,numLines:400,angleMin:-90,angleMax:90,saveImage:1,numTimeSteps:120,
segmentDelta:speed * 0.0004*Math.PI,
shapeDeltaX:speed*0.0004 * Math.PI,
shapeDeltaY:speed*0.0009 * Math.PI,
shapeAngleX: 0.35 * Math.PI,
shapeAngleY: 0.25 * Math.PI,
//shapeDelta:0.0 * Math.PI,
focalPoint:Point3d.mk(0,0,5000),focalLength:10,cameraScaling:100};
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
  this.lineP['stroke-width'] = .025; 	
	  core.assignPrototypes(this,'rectP',rectPP);
  this.rectP.stroke = 'white';
  this.rectP.fill = 'transparent';
  this.rectP['stroke-width'] = .025; 	
}  

//side0.initProtos = initProtos;



rs.initialize = function () {
	debugger;
  this.initProtos();
	let rect = this.set('rect',this.rectP.instantiate());
	let rdim = 50;
	rect.width = 20;
	rect.height = 40;
	rect.moveto(Point.mk(0,5));
	rect.show();
	rect.update();
 // core.root.backgroundColor = 'black';
 let hdim = 50;
 
	const mkSide =  (name,xf,normal) => {
	 // this.initProtos();
		
	 // core.root.backgroundColor = 'black';
		let segs = this.initializeLines(null,1);
		//let segs = this.segments;
		let segs3d = segs.map((sg) => sg.to3d());
		//let xf = Affine3d.mk('y',0.25*Math.PI);
		let shape3d = Shape3d.mk(segs3d,xf,normal);
		return {name,shape:shape3d,segments:segs,xf}

	}	
 let side0xf = Affine3d.mkTranslation(Point3d.mk(-hdim,0,0)).times(Affine3d.mkRotation('y',0.5*Math.PI));
 let side1xf = Affine3d.mkTranslation(Point3d.mk(hdim,0,0)).times(Affine3d.mkRotation('y',0.5*Math.PI));
 let side2xf = Affine3d.mkTranslation(Point3d.mk(0,-hdim,0)).times(Affine3d.mkRotation('x',0.5*Math.PI));
 let side3xf = Affine3d.mkTranslation(Point3d.mk(0,hdim,0)).times(Affine3d.mkRotation('x',0.5*Math.PI));
 let topXf = Affine3d.mkTranslation(Point3d.mk(0,0,hdim));
 let bottomXf = Affine3d.mkTranslation(Point3d.mk(0,0,-hdim));
 
 let side0 = mkSide('side0',side0xf);
 let side1 = mkSide('side1',side1xf);
 let side2 = mkSide('side2',side2xf);
 let side3 = mkSide('side3',side3xf);
 let top = mkSide('top',topXf);
 let bottom = mkSide('bottom',bottomXf);

 /*
 let side0 = mkSide(Affine3d.mkTranslation(Point3d.mk(-hdim,0,0)).times(Affine3d.mkRotation('y',0.5*Math.PI)));
 let side1 = mkSide(Affine3d.mkTranslation(Point3d.mk(hdim,0,0)).times(Affine3d.mkRotation('y',0.5*Math.PI)));
 let side2 = mkSide(Affine3d.mkTranslation(Point3d.mk(0,-hdim,0)).times(Affine3d.mkRotation('x',0.5*Math.PI)));
 let side3 = mkSide(Affine3d.mkTranslation(Point3d.mk(0,hdim,0)).times(Affine3d.mkRotation('x',0.5*Math.PI)));
 let top = mkSide(Affine3d.mkTranslation(Point3d.mk(0,0,hdim)));
 let bottom = mkSide(Affine3d.mkTranslation(Point3d.mk(0,0,-hdim)));
 */
  let sides  = this.sides = [side0,side1,side2,side3,top,bottom];
	let sideShapes = sides.map((side) => side.shape);
	this.sideSegs = sides.map((side) => side.segments);
	let camera = this.camera = geom.Camera.mk(rs.focalPoint,rs.focalLength,rs.cameraScaling,'z');
  //this.shapeAngle = 0.25 * Math.PI;
	let shape3d = this.shape3d = Shape3d.mk(sideShapes);
		this.moveShapeTo(Affine3d.mkRotation('x',this.shapeAngleX).times(Affine3d.mkRotation('y',this.shapeAngleY)));

	//this.moveShapeTo(Affine3d.mkRotation('x',this.shapeAngle));
//	this.initializeLines(null,0);

}	

/*
rs.moveLines = function (delta) {
	debugger;
	this.moveSegments(delta);
	//this.resetSegments(delta);
	this.addLines(1);
}
*/

rs.rebuildSide = function (side) {
	debugger;
	let {segmentDelta} = this;
	let {segments,shape} = side;
	segments.forEach( (seg) => {
	    this.moveSegment(seg,segmentDelta);
	 });
	let segs3d = segments.map((sg) => sg.to3d());
	shape.parts = segs3d;
}

rs.moveShapeTo = function (xf,update) {
	let {shape3d,camera} = this;
	if (xf) {
	  shape3d.set('transform',xf);
	}
	let psegs = camera.project(shape3d);
  this.segments = psegs;
	debugger;
	//this.lines.remove();
		this.addLines(update);
}


rs.step = function ()   {
	let {shapeAngleX,shapeAngleY,sides,shapeDeltaX,shapeDeltaY,timeStep} = this;
	sides.forEach( (side) => {
		if (side.name === 'side3') {
			this.rebuildSide(side);
		}
	});
	if (timeStep > 68) {
		this.moveShapeTo(null,1);
		return;
	}
	shapeAngleX = this.shapeAngleX = shapeAngleX +shapeDeltaX;
	shapeAngleY = this.shapeAngleY = shapeAngleY +shapeDeltaY;
	this.moveShapeTo(Affine3d.mkRotation('x',this.shapeAngleX).times(Affine3d.mkRotation('y',this.shapeAngleY)),true);

	//this.moveLines(0.005);
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
      

