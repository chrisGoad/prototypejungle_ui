
core.require('/gen1/grid0_8.js','/gen1/sphere_setup0.js','/gen1/layeredGrid0.js',

function (rs,sphereSetup,layeredSetup)	{ 
	
rs.setName('grid0_8_24');
sphereSetup(rs);
layeredSetup(rs);
let newGlobalParams  = {
	genPolygons:1,
	genCircles:0,
};
		
let gp = rs.globalParams;
Object.assign(gp,newGlobalParams);

let bkdim = 1300;

let newTopParams = {
  pointJiggle:5,	
  numRows : 96,
 numCols : 96,
	width:50,
	height:50,
	backgroundWidth:bkdim,
	backgroundHeight:bkdim,
	backgroundColor : 'white',
}
Object.assign(rs,newTopParams);

rs.finishProtos = function () {
	this.rectP.stroke = 'rgba(0,0,0,.8)';
	this.rectP['stroke-width'] = 0.2;
}

rs.initialize = function () {
 let {focalPoint,focalLength,cameraScaling} = this;
 this.initProtos();
 debugger;
  this.initializeGrid();
}


return rs;


});

