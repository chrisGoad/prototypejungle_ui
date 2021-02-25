
core.require('/line/line.js','/gen0/lines0.js','/gen0/basics.js',//'/random/addIntersectingLines4.js',
function (linePP,addMethods,addSetName) {
debugger;
let rs = svg.Element.mk('<g/>');
//addSetName(rs);
addMethods(rs);
rs.setName('lines0_7');

/*adjustable parameters  */
let rdim = 100;
//let sideParams = {width:rdim,height:rdim,numLines:300,angleMin:-90,angleMax:90,segmentsOnly:1}
//let topParams = {width:rdim,height:rdim,numLines:100,angleMin:-90,angleMax:90,saveImage:1,focalPoint:Point3d.mk(0,0,500),focalLength:10,cameraScaling:10};
let topParams = {width:rdim,height:rdim,numLines:100,angleMin:-10,angleMax:10,saveImage:1,numTimeSteps:100,
focalPoint:Point3d.mk(0,0,500),focalLength:10,cameraScaling:10};
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
}  

//side0.initProtos = initProtos;

rs.moveShapeTo = function (xf,update) {
	let {shape3d,camera} = this;
	shape3d.set('transform',xf);
	let psegs = camera.project(shape3d);
  this.segments = psegs;
	debugger;
	//this.lines.remove();
		this.addLines(update);
}

rs.initialize = function () {
	debugger;
  this.initProtos();
 // core.root.backgroundColor = 'black';
 let hdim = 50;
 
	const mkSide =  (xf,normal) => {
	 // this.initProtos();
		
	 // core.root.backgroundColor = 'black';
		let segs = this.initializeLines(null,1);
		//let segs = this.segments;
		let segs3d = segs.map((sg) => sg.to3d());
		//let xf = Affine3d.mk('y',0.25*Math.PI);
		let shape3d = Shape3d.mk(segs3d,xf);
		return shape3d;

	}	

 let side0 = mkSide(Affine3d.mkTranslation(Point3d.mk(-hdim,0,0)).times(Affine3d.mkRotation('y',0.5*Math.PI)));
 let side1 = mkSide(Affine3d.mkTranslation(Point3d.mk(hdim,0,0)).times(Affine3d.mkRotation('y',0.5*Math.PI)));
 let side2 = mkSide(Affine3d.mkTranslation(Point3d.mk(0,-hdim,0)).times(Affine3d.mkRotation('x',0.5*Math.PI)));
 let side3 = mkSide(Affine3d.mkTranslation(Point3d.mk(0,hdim,0)).times(Affine3d.mkRotation('x',0.5*Math.PI)));
 let top = mkSide(Affine3d.mkTranslation(Point3d.mk(0,0,hdim)));
 let bottom = mkSide(Affine3d.mkTranslation(Point3d.mk(0,0,-hdim)));
 //let side2 = mkSide(Affine3d.mkTranslation(Point3d.mk(0,-dim,0)));
 //let side2 = mkSide(Affine3d.mkTranslation(Point3d.mk(0,0,hdim)).times(Affine3d.mkRotation('x',0.000*Math.PI)));
 //let side2 = mkSide(Affine3d.mkRotation('z',0.25*Math.PI));
 //let sides  = [side2];
 //let sides  = [side0,side1,side2];
 let sides  = [side0,side1,side2,side3,top,bottom];
	//let segs = this.segments;
	let camera = this.camera = geom.Camera.mk(rs.focalPoint,rs.focalLength,rs.cameraScaling,'z');
	//let xf = Affine3d.mk('y',0.25*Math.PI);
	//let shape3d = Shape3d.mk(sides,Affine3d.mkRotation('y',0.35*Math.PI));
	//let shape3d = this.shape3d = Shape3d.mk(sides,Affine3d.mkRotation('x',0.35*Math.PI));
	this.shapeAngle = 0;
	this.shapeDelta = 0.02 * Math.PI;
	let shape3d = this.shape3d = Shape3d.mk(sides);
	this.moveShapeTo(Affine3d.mkRotation('x',this.shapeAngle));
	//let shape3d = Shape3d.mk(sides);
	//let psegs = camera.project(shape3d);
  //this.segments = psegs;
	//debugger;
	//	this.addLines();

}	


rs.step = function ()   {
	let {shapeAngle} = this;
	shapeAngle = this.shapeAngle = shapeAngle + this.shapeDelta;
	this.moveShapeTo(Affine3d.mkRotation('x',this.shapeAngle).times(Affine3d.mkRotation('y',this.shapeAngle)),true);

}
	

rs.animate = function (resume)  {
	this.animateIt(this.numTimeSteps,40,resume);
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
      

