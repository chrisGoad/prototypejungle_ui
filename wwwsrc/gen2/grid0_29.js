
core.require('/gen1/grid0_8.js',
//core.require('/shape/rectangle.js','/line/line.js','/shape/circle.js','/gen0/grid0.js','/gen0/lines0.js',
function (rs)	{ 

	
rs.setName('grid0_8_23');
	
let newGlobalParams  = {
	widthFactor:0.7,
	heightFactor:0.7,
	maxSizeFactor:3,
	szPower:2,
	genPolygons:1,
	sizeMap:  {0:1,1:1,2:1,3:3},
	//sizeMap:  {0:0,1:0,2:0,3:1},
	opacityMap:  {0:0.2,1:0.4,2:0.5,3:0.5},
  colorMap: 
		{
			0:  (r,g,b,opacity) => `rgba(${r},0,0,${opacity})`,
		//	0:  (r,g,b,opacity) => `rgba(0,0,0,1)`,
			1:  (r,g,b,opacity) => `rgba(${r},0,0,${opacity})`,
			2:  (r,g,b,opacity) => `rgba(255,255,255,${opacity})`,
			//3:  (r,g,b,opacity) => `rgba(255,255,0,${opacity})`,
			3:  (r,g,b,opacity) => `rgba(0,0,100,1)`,
		}
};
		
let gp = rs.globalParams;
Object.assign(gp,newGlobalParams);
	
let newTopParams = {
  ordinalMap : {0:0,1:1,2:2,3:3,4:4,5:4,6:6,7:7},
	orderByOrdinal : 0,
	randomizeOrder : 1,
  //pointJiggle:4,	
  pointJiggle:0,	
  numRows : 64,
  numCols : 64,
	backgroundColor : 'yellow',
	backgroundPos: Point.mk(0,50),
	backgroundPadding:30,
}
Object.assign(rs,newTopParams);

let endA0 = Point.mk(-100,-10);
let endA1 = Point.mk(100,-10);
let arcA = geom.Arc.mk(endA0,endA1,200);
let endB0 = Point.mk(-100,100);
let endB1 = Point.mk(100,100);
let arcB = geom.Arc.mk(endB0,endB1,-200); 
rs.sideA = (fr) => arcA.pointOn(fr);
rs.sideB = (fr) => arcB.pointOn(fr);
rs.positionFunction = rs.sidesPositionFunction;

rs.finishProtos = function () {
	this.rectP.stroke = 'rgba(0,0,0,.8)';
	this.rectP['stroke-width'] = 0.2;
	this.polygonP['stroke-width'] = 0.2;
}

return rs;


});

