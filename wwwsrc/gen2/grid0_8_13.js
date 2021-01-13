
core.require('/gen1/grid0_8.js',
//core.require('/shape/rectangle.js','/line/line.js','/shape/circle.js','/gen0/grid0.js','/gen0/lines0.js',
function (rs)	{ 

	
rs.setName('grid0_8_13');
	
let newGlobalParams  = {
	widthFactor:3,
	heightFactor:3,
	maxSizeFactor:3,
	szPower:2,
	sizeMap:  {0:1,1:1,2:1,3:1},
	opacityMap:  {0:0.4,1:0.4,2:0.4,3:0.4},
  colorMap: 
		{
			0:  (r,g,b,opacity) => `rgba(${r},0,0,${opacity})`,
			1:  (r,g,b,opacity) => `rgba(${r},0,0,${opacity})`,
			2:  (r,g,b,opacity) => `rgba(255,255,255,${opacity})`,
			3:  (r,g,b,opacity) => `rgba(0,150,150,${opacity})`,
		}
};
		
let gp = rs.globalParams;
Object.assign(gp,newGlobalParams);
	
let newTopParams = {
  ordinalMap : {0:0,1:1,2:2,3:3,4:4,5:4,6:6,7:7},
	orderByOrdinal : 0,
	randomizeOrder : 1,
  pointJiggle:5,	
  numRows : 96,
  numCols : 96,
	backgroundColor : 'gray'
}
Object.assign(rs,newTopParams);

	
	
rs.finishProtos = function () {
	this.rectP.stroke = 'rgba(0,0,0,.8)';
	this.rectP['stroke-width'] = 0.2;
}

return rs;


});

