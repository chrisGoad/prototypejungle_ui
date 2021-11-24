
//core.require('/gen1/grid0_8.js','/gen1/sphere_setup0.js','/gen1/layeredGrid1.js','/mlib/ParamsByCell.js',

core.require('/shape/rectangle.js','/gen0/Basics.js','/mlib/grid.js','/mlib/sphere.js','/mlib/ParamsByCell.js',
function (rectPP,rs,addGridMethods,addSphereMethods,addParamsByCellMethods) {

addGridMethods(rs);
addSphereMethods(rs);
addParamsByCellMethods(rs);
//function (rs,sphereSetup,layeredSetup)	{ 
	
rs.setName('grid0_8_26');



rs.globalParams  = {
	widthFactor:1,
	heightFactor:1,
	maxSizeFactor:6,
	szPower:2,
	//*genCircles:1,
	sizeMap:{0:1.5,1:1,2:2,3:3,4:4,5:0,6:0},
	//opacityMap:{0:0.4,1:0.4,2:0.4,3:0.4,4:0.8,5:1,6:1},
	opacityMap:{0:.4,1:0.4,2:0.4,3:0.4,4:0.8,5:1,6:1},
  colorMap:{
		0:(r,g,b,opacity) => `rgba(0,${r},0,${opacity})`,
		1:(r,g,b,opacity) => `rgba(${r},0,0,${opacity})`,
		2:(r,g,b,opacity) => `rgba(255,255,255,${opacity})`,
		3:(r,g,b,opacity) => `rgba(0,${b},${b},${opacity})`,
		4:(r,g,b,opacity) => `rgba(0,0,${r},${opacity})`,
		5:(r,g,b,opacity) => `rgba(0,0,0,${opacity})`,
		6:(r,g,b,opacity) => `rgba(${r},${r},0,${opacity})`
	}
};
		
//let gp = rs.globalParams;
//Object.assign(gp,newGlobalParams);
	/*
let newTopParams = {
  ordinalMap : {0:0,1:1,2:2,3:3,4:4,5:4,6:6,7:7},
	orderByOrdinal : 1,
	randomizeOrder : 0,

  numRows : 96,
  numCols : 96,
	backgroundColor : 'black'
}
Object.assign(rs,newTopParams);

layeredSetup(rs);
sphereSetup(rs);
let newGlobalParams  = {
	genPolygons:1,
	genCircles:0,
};
		
let gp = rs.globalParams;
Object.assign(gp,newGlobalParams);
*/
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
	let rectP = this.set('rectP',rectPP.instantiate()).hide();
	this.rectP.stroke = 'rgba(0,0,0,.8)';
	this.rectP['stroke-width'] = 0.2;
}


rs.shapeGenerator = function (rvs,cell,center) {
	let {shapes,rectP,circleP,polygonP} = this;
	if (this.hideThisCell(cell)) {
	  let {x,y} = cell;
		console.log('hideCell',x,y);
		return;
	}
	let genCircles = this.getParam(cell,'genCircles');
	let genPolygons = this.getParam(cell,'genPolygons');
	let shape = genCircles?circleP.instantiate():
	    (genPolygons?polygonP.instantiate():rectP.instantiate());
	shapes.push(shape);
	shape.show();
	//this.shapeUpdater(shape,rvs,cell,center);
	return shape;
}

rs.initialize = function () {
 let {focalPoint,focalLength,cameraScaling} = this;
 this.initProtos();
 debugger;
  // core.root.backgroundColor = 'black';
 this.camera = geom.Camera.mk(focalPoint,focalLength,cameraScaling,'z');
  this.initializeGrid();
}


return rs;


});

