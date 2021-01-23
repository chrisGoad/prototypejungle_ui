
core.require('/gen1/grid0_8.js',
//core.require('/shape/rectangle.js','/line/line.js','/shape/circle.js','/gen0/grid0.js','/gen0/lines0.js',
function (rs)	{ 

	
rs.setName('grid0_8_22');

let opacity = 0.7;
let newGlobalParams  = {
	widthFactor:1,
	heightFactor:1,
	maxSizeFactor:6,
	szPower:3,
	genCircles:0,
	genPolygons:1,
	sizeMap:{0:1.5,1:1,2:2,3:3,4:4,5:0,6:0},
	//opacityMap:{0:opacity,1:opacity,2:opacity,3:opacity,4:0.8,5:1,6:1},
	opacityMap:{0:opacity,1:opacity,2:opacity,3:opacity,4:0.8,5:1,6:1},
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
		
let gp = rs.globalParams;
Object.assign(gp,newGlobalParams);
	
let newTopParams = {
  ordinalMap : {0:0,1:1,2:2,3:3,4:4,5:4,6:6,7:7},
	orderByOrdinal : 1,
	randomizeOrder : 0,
  pointJiggle:2,	
  numRows : 96,
  numCols : 96,
	backgroundColor : 'black'
}
Object.assign(rs,newTopParams);

	
	
rs.finishProtos = function () {
	//this.rectP.stroke = 'rgba(0,0,0,.8)';
	this.circleP['stroke-width'] = 0.4;
	this.polygonP.fill = 'red';
	//this.rectP['stroke-width'] = 0..2;
}
 rs.outerRadius = 200;
  rs.innerRadius = 0.1 * rs.outerRadius;
  rs.angleMin = -180;
  rs.angleMax = 180;
  rs.center = Point.mk(0,0);
rs.positionFunction = rs.radialPositionFunction;

rs.initialize = function () {
	core.root.backgroundColor = 'black';
	this.innerInitialize();
}
return rs;


});

