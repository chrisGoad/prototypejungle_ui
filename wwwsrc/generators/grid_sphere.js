

core.require('/shape/polygon.js','/gen0/Basics.js','/mlib/grid.js','/mlib/sphere.js','/mlib/ParamsByCell.js',
function (polygonPP,rs,addGridMethods,addSphereMethods,addParamsByCellMethods) {

addGridMethods(rs);
addSphereMethods(rs);
addParamsByCellMethods(rs);
	
rs.setName('grid_sphere');

let opa = 0.3;
let r = 255;
let b = 255;
rs.globalParams  = {
	widthFactor:1,
	heightFactor:1,
	maxSizeFactor:6,
	sizePower:2,
	genPolygons:1,
	sizeMap:{0:.5,1:1,2:2,3:3,4:4,5:0,6:0},
	//opacityMap:{0:1,1:0.4,2:0.4,3:0.4,4:0.8,5:1,6:1},
  colorMap:{
		0:'rgba(0,255,0,1)',
		1:'rgba(255,0,0,0.4)',
		2:'rgba(255,255,255,0.4)',
		3:'rgba(0,255,255,0.4)',
		4:'rgba(0,0,255,0.8)',
		5:'rgba(0,0,0,1)',
		6:'rgba(255,255,0,1)'
	}
};
		
 

let bkdim = 1200;

	
	
let newTopParams = {
  pointJiggle:0,	
  numRows : 96,
 numCols : 96,
	width:50,
	height:50,
		backgroundWidth:bkdim,
	backgroundHeight:bkdim,
	backgroundColor : 'black',
	sphereCenter:Point3d.mk(0,0,-20),
	sphereDiameter:35,
	focalPoint:Point3d.mk(0,0,50),
	focalLength:10,
	cameraScaling:100
}
Object.assign(rs,newTopParams);

rs.initProtos = function () {
	let polygonP = this.set('polygonP',polygonPP.instantiate()).hide();
	polygonP.stroke = 'rgba(0,0,0,.8)';
	polygonP['stroke-width'] = 0;
}



rs.initialize = function () {
 let {focalPoint,focalLength,cameraScaling} = this;
 this.initProtos();
 core.root.backgroundColor = 'black';
 this.camera = geom.Camera.mk(focalPoint,focalLength,cameraScaling,'z');
  this.initializeGrid();
}


return rs;


});

