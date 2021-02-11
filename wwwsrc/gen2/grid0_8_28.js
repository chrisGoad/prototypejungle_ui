
core.require('/gen1/grid0_8.js','/gen1/sphere_setup0.js','/gen1/layeredGrid2.js',
//core.require('/shape/rectangle.js','/line/line.js','/shape/circle.js','/gen0/grid0.js','/gen0/lines0.js',
function (rs,setupSphere,setupLayers)	{ 

	
rs.setName('grid0_8_28');

setupLayers(rs);
setupSphere(rs);

let newGlobalParams  = {
	genPolygons:1,
	genCircles:0,
};
		
let gp = rs.globalParams;
Object.assign(gp,newGlobalParams);

let bkdim = 1500;
let newTopParams  = {
	numRows:64,
	numCols:64,
	width:50,
	height:50,
	pointJiggle:5,
	backgroundWidth:bkdim,
	backgroundHeight:bkdim,
	backgroundColor : 'white',
};	
Object.assign(rs,newTopParams);

'/gen1/sphere_setup0.js',
rs.finishProtos = function () {
	this.rectP.stroke = 'rgba(0,0,0,.8)';
	//this.circleP['stroke-width'] = 0;
	this.rectP['stroke-width'] = 0.4;
}

rs.iinitialize = function () {
 let {focalPoint,focalLength,cameraScaling} = this;
 this.initProtos();
 debugger;
  this.initializeGrid();
}
return rs;


});

