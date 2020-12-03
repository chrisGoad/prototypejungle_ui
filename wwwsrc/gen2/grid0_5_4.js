
core.require('/gen1/grid0_5.js',
//core.require('/shape/rectangle.js','/line/line.js','/shape/circle.js','/gen0/grid0.js','/gen0/lines0.js',
function (rs)	{ 

	
	rs.setName('grid0_5_4');

// var 3
rs.randomizeOrder = 0;
rs.orderByOrdinal = 1;
rs.widthFactor = 1;
rs.heightFactor = 1;
rs.genCircles = 1;
rs.backgroundColor = 'black';
rs.colorMap[0] =  (r,g,b,opacity) => `rgba(0,${r},0,${opacity})`;
rs.colorMap[4] =  (r,g,b,opacity) => `rgba(0,0,${r},${opacity})`;
rs.colorMap[4] =  (r,g,b,opacity) => `rgba(0,0,255,${opacity})`;
rs.colorMap[5] =  (r,g,b,opacity) => `rgba(${r/2},${r/2},${r},${opacity})`;
rs.colorMap[5] =  (r,g,b,opacity) => `rgba(${r/2},0,0,${opacity})`;
rs.colorMap[5] =  (r,g,b,opacity) => `rgba(0,0,0,${opacity})`;
rs.colorMap[6] =  (r,g,b,opacity) => `rgba(${r},${r},0,${opacity})`;
rs.sizeMap = {0:1,1:1,2:2,3:3,4:4,5:0,6:0};
rs.sizeMap = {0:1.5,1:1,2:2,3:3,4:4,5:0,6:0};
rs.opacityMap = {0:0.4,1:0.4,2:0.4,3:0.4,4:0.8,5:1,6:1};
//	rs.sizeMap = {0:1,1:0,2:0,3:0,4:0,5:0,6:0};

return rs;


});

