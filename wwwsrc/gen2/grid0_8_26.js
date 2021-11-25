
core.require('/gen1/grid0_8.js','/gen1/sphere_setup0.js','/gen1/layeredGrid1.js',

function (rs,sphereSetup,layeredSetup)	{ 
	
rs.setName('grid0_8_26');
layeredSetup(rs);
sphereSetup(rs);
let newGlobalParams  = {
	genPolygons:1,
	genCircles:0,
};
		
let gp = rs.globalParams;
Object.assign(gp,newGlobalParams);

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
	genCircles:0
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
  // core.root.backgroundColor = 'black';

  this.initializeGrid();
}


return rs;


});

