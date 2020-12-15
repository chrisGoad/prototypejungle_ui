
core.require('/gen1/grid0_5.js',
//core.require('/shape/rectangle.js','/line/line.js','/shape/circle.js','/gen0/grid0.js','/gen0/lines0.js',
function (rs)	{ 

	
	rs.setName('grid0_5_9');

const toFun = function (v) {
	return () => v;
}
// var 3
rs.saveJson = 0;
rs.loadFromPath = 0;
rs.randomizeOrder = 0;
rs.orderByOrdinal = 1;
rs.widthFactor = .4;
rs.heightFactor = .4;
rs.numRows = 32;
rs.numCols = 64;
rs.width = 300;
rs.height = 300;
rs.genCircles = 1;
rs.backgroundColor = 'black';
rs.randomizingFactor = 0.5;
rs.pointJiggle =0;
rs.colorMap[0] =  (r,g,b,opacity) => `rgba(0,${r},0,${opacity})`;
rs.colorMap[0] =  toFun('white');
rs.colorMap[1]=  (r,g,b,opacity) => `rgba(${r},0,0,${opacity})`,
rs.colorMap[1]=  toFun('white');
rs.colorMap[2] = (r,g,b,opacity) => `rgba(255,255,255,${opacity})`,
rs.colorMap[2]=  toFun('white');

rs.colorMap[3] = (r,g,b,opacity) => `rgba(0,${b},${b},${opacity})`;
rs.colorMap[3]=  toFun('white');

rs.colorMap[4] =  (r,g,b,opacity) => `rgba(0,0,${r},${opacity})`;
rs.colorMap[4] =  (r,g,b,opacity) => `rgba(0,0,255,${opacity})`;
rs.colorMap[5] =  (r,g,b,opacity) => `rgba(${r/2},${r/2},${r},${opacity})`;
rs.colorMap[5] =  (r,g,b,opacity) => `rgba(${r/2},0,0,${opacity})`;
rs.colorMap[5] =  (r,g,b,opacity) => `rgba(0,0,0,${opacity})`;
rs.colorMap[6] =  (r,g,b,opacity) => `rgba(${r},${r},0,${opacity})`;
rs.sizeMap = {0:0,1:1,2:2,3:3,4:4,5:0,6:0};
rs.sizeMap = {0:1.5,1:1,2:2,3:3,4:0,5:0,6:0};
rs.sizeMap = {0:1,1:2,2:4,3:8,4:0,5:0,6:0};
rs.opacityMap = {0:0.4,1:0.4,2:0.4,3:0.4,4:0.8,5:1,6:1};
rs.opacityMap = {0:1,1:1,2:1,3:1,4:0.8,5:1,6:1};
//	rs.sizeMap = {0:1,1:0,2:0,3:0,4:0,5:0,6:0};

return rs;


});

