core.require('/gen0/lines2.js','/gen1/sphere_methods0.js','/shape/rectangle.js',//'/random/addIntersectingLines4.js',
function (lineMethods,sphereMethods,rectPP) {
debugger;
let rs = svg.Element.mk('<g/>');
lineMethods(rs);
sphereMethods(rs);

let params = {radius:10,segLength:2,numLines:1000,numTimeSteps:200,fixedSpin : 0.25*Math.PI,
focalPoint:Point3d.mk(0,0,500),focalLength:10,cameraScaling:100};

Object.assign(rs,params);


rs.setName('sphere2_2');

//rs.radius = 100;
//rs.segLength // as fraction of radius


rs.finishProtos = function () {	
  core.assignPrototypes(this,'rectP',rectPP);
  this.rectP.fill = 'transparent';
	this.rectP.stroke = 'transparent'
	this.rectP['stroke-width'] = 0.005;
	
	this.lineP.stroke = 'white';
	this.lineP.stroke = 'blue';
	this.lineP['stroke-width'] = 0.05;
}  
const randomTheta =  () => Math.random() * Math.PI;
const randomPhi =  () => 2* Math.random() * Math.PI;

rs.lineColor = 'yellow';

rs.lineColors = ['white','purple','cyan'];

rs.initialize = function () {
	let {dim,focalPoint,focalLength,cameraScaling,numLines,radius,segLength} = this;
	debugger;
	this.initProtos();
	let rect = this.set('rect',this.rectP.instantiate());
	let bk = 'white';
	let bkdim = 50;
	rect.width = bkdim;
	rect.height = bkdim;
	rect.fill = bk;
	rect.show();
	this.camera = geom.Camera.mk(focalPoint,focalLength,cameraScaling,'z');
  core.root.backgroundColor =bk;
	this.segLengthA = radius * segLength;
	debugger;
	let sgs = core.ArrayNode.mk();
	this.genRandomPolars(numLines);
	this.genSegsFromPolars(sgs);
	let shp = Shape3d.mk(sgs);
	this.set('shape3d',shp);
	//this.addSegs();
	debugger;
	rs.initializeLines();
}


rs.step = function ()   {
	let {fixedSpin,numLines} = this;
	this.fixedSpin = fixedSpin + 0.02 * Math.PI;
	let sgs = core.ArrayNode.mk();
	//this.genRandomPolars(numLines);
	this.genSegsFromPolars(sgs);
	let shp = Shape3d.mk(sgs);
	this.set('shape3d',shp);
	//this.addSegs();
	debugger;
	rs.initializeLines();
}
	

rs.animate = function (resume)  {
	this.animateIt(this.numTimeSteps,10,resume);
}
	


return rs;
});