
core.require('/gen1/grid0_8.js','/gen1/layeredGrid1.js',
//core.require('/shape/rectangle.js','/line/line.js','/shape/circle.js','/gen0/grid0.js','/gen0/lines0.js',
function (rs,layeredSetup)	{ 

	
rs.setName('grid0_8_14');
layeredSetup(rs);

let newGlobalParams  = {
/*widthFactor:1,
	heightFactor:1,
	maxSizeFactor:6,
	szPower:2,*/
	genCircles:1,
	//genPolygons:1,
/*	sizeMap:{0:1.5,1:1,2:2,3:3,4:4,5:0,6:0},
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
	}*/
};
		
let gp = rs.globalParams;
Object.assign(gp,newGlobalParams);
	
let newTopParams = {
  /*ordinalMap : {0:0,1:1,2:2,3:3,4:4,5:4,6:6,7:7},
	orderByOrdinal : 1,
	randomizeOrder : 0,*/
  pointJiggle:2,	
  numRows : 96,
  numCols : 96,
	width:300,
	height:300,
	backgroundColor : 'black'
}
Object.assign(rs,newTopParams);

	
	
rs.finishProtos = function () {
	//this.rectP.stroke = 'rgba(0,0,0,.8)';
	this.circleP['stroke-width'] = 0;
	//this.rectP['stroke-width'] = 0..2;
}

return rs;


});

