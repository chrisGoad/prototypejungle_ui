
core.require('/gen1/grid0_8.js','/gen1/layeredGrid0.js',
//core.require('/shape/rectangle.js','/line/line.js','/shape/circle.js','/gen0/grid0.js','/gen0/lines0.js',
function (rs,layeredSetup)	{ 
debugger;
	
rs.setName('grid0_8_13');
layeredSetup(rs);

let newGlobalParams  = {
	genPolygons:0,
	genCircles:0,
	//maxSizeFactor:6,
};
		
let gp = rs.globalParams;
Object.assign(gp,newGlobalParams);
let newTopParams = {
  pointJiggle:5,	
  numRows : 96,
  numCols : 96,
	width:300,
	height:300,
	backgroundColor : 'gray'
}
Object.assign(rs,newTopParams);


	
rs.finishProtos = function () {
	this.rectP.stroke = 'rgba(0,0,0,.8)';
	this.rectP['stroke-width'] = 0.2;
}

//rs.initialize = rs.innerInitialize;


return rs;


});

