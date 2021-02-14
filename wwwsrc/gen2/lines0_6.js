
core.require('/line/line.js','/gen0/lines0.js','/gen0/basics.js',//'/random/addIntersectingLines4.js',
function (linePP,addMethods,addSetName) {
debugger;
let rs = svg.Element.mk('<g/>');
addSetName(rs);
//addMethods(rs);
rs.setName('lines0_6');

/*adjustable parameters  */
let rdim = 300;
let sideParams = {width:rdim,height:rdim,numLines:300,angleMin:-90,angleMax:90,segmentsOnly:1}
let topParams = {saveImage:1,focalPoint:Point3d.mk(0,0,500),focalLength:10,cameraScaling:10};
Object.assign(rs,topParams);
/*rs.saveImage = true;
rs.width = 400;
rs.height = 200;
rs.numLines=3000;
//rs.numLines=5;
rs.angleMin = -90;
rs.angleMax = 90;*/
let side0 =  rs.set('side0',svg.Element.mk('<g/>'));
let side1=  rs.set('side1',svg.Element.mk('<g/>'));


const initProtos = function () {
  core.assignPrototypes(this,'lineP',linePP);
  this.lineP.stroke = 'white';
  this.lineP['stroke-width'] = .075; 	
}  

//side0.initProtos = initProtos;

const initialize = function (xf) {
	debugger;
  this.initProtos();
  
 // core.root.backgroundColor = 'black';
  let segs = this.initializeLines();
	//let segs = this.segments;
	let segs3d = segs.map((sg) => sg.to3d());
	let camera = geom.Camera.mk(rs.focalPoint,rs.focalLength,rs.cameraScaling,'z');
	//let xf = Affine3d.mk('y',0.25*Math.PI);
	let shape3d = Shape3d.mk(segs3d,xf);
	let psegs = camera.project(shape3d);
  this.segments = psegs;
	debugger;
		this.addLines();

}	

//side0.initialize = initialize;

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
return rs;
});
      

