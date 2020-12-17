
core.require('/gen1/grid0_8.js',
//core.require('/shape/rectangle.js','/line/line.js','/shape/circle.js','/gen0/grid0.js','/gen0/lines0.js',
function (rs)	{ 

	
	rs.setName('grid0_8_4');

const toFun = function (v) {
	return () => v;
}
// var 3
let topParams = {randomizeOrder:0,orderByOrdinal:1,widthFactor:1,heightFactor:1,width:300,height:300,poinJiggle:3,backgroundColor:'black',numRows:96,numCols:94}

Object.assign(rs,topParams);


let oo = 0.4;
rs.globalParams = {
	opacityMap:{0:oo,1:oo,2:oo,3:oo,4:oo,5:oo,6:oo},
	widthFactor:1,
	heightFactor:1,
	sizePower:2,
	genCircles: 1,
	randomizingFactor:0,
	colorMap:{
0:(r,g,b,opacity) => `rgba(0,${r},0,${opacity})`,
1:(r,g,b,opacity) => `rgba(${r},0,0,${opacity})`,
2:(r,g,b,opacity) => `rgba(255,255,255,${opacity})`,
3:(r,g,b,opacity) => `rgba(0,${b},${b},${opacity})`,
4:(r,g,b,opacity) => `rgba(0,0,${r},${opacity})`,
5:(r,g,b,opacity) => `rgba(0,0,0,${opacity})`,
6:(r,g,b,opacity) => `rgba(${r},${r},0,${opacity})`},
sizeMap:{0:1.5,1:1,2:2,3:3,4:4,5:0,6:0},
opacityMap:{0:0.4,1:0.4,2:0.4,3:0.4,4:0.8,5:1,6:1}};



return rs;
rs.randomizeOrder = 0;
rs.orderByOrdinal = 1;
rs.widthFactor = 1;
rs.heightFactor = 1;
rs.width = 300;
rs.height = 300;
rs.numRows = 96;//128;
//rs.numRows = 81;//128;
rs.numCols = 94;
//rs.numCols = 81;
rs.sizePower = 2;
rs.genCircles = 1;
rs.backgroundColor = 'black';
rs.randomizingFactor = 0;
rs.pointJiggle =0;
rs.colorMap[0] =  (r,g,b,opacity) => `rgba(0,${r},0,${opacity})`;
//rs.colorMap[0] =  toFun('white');
rs.colorMap[1]=  (r,g,b,opacity) => `rgba(${r},0,0,${opacity})`,
//rs.colorMap[1]=  toFun('white');
rs.colorMap[2] = (r,g,b,opacity) => `rgba(255,255,255,${opacity})`,
//rs.colorMap[2]=  toFun('white');

rs.colorMap[3] = (r,g,b,opacity) => `rgba(0,${b},${b},${opacity})`;
//rs.colorMap[3]=  toFun('white');

rs.colorMap[4] =  (r,g,b,opacity) => `rgba(0,0,${r},${opacity})`;
//rs.colorMap[4] =  (r,g,b,opacity) => `rgba(0,0,255,${opacity})`;
rs.colorMap[5] =  (r,g,b,opacity) => `rgba(${r/2},${r/2},${r},${opacity})`;
rs.colorMap[5] =  (r,g,b,opacity) => `rgba(${r/2},0,0,${opacity})`;
rs.colorMap[5] =  (r,g,b,opacity) => `rgba(0,0,0,${opacity})`;
rs.colorMap[6] =  (r,g,b,opacity) => `rgba(${r},${r},0,${opacity})`;
rs.sizeMap = {0:1.5,1:1,2:2,3:3,4:4,5:0,6:0};
//rs.sizeMap = {0:1.5,1:1,2:2,3:3,4:0,5:0,6:0};
//rs.sizeMap = {0:1.5,1:1,2:2,3:3,4:0,5:0,6:0};
//rs.sizeMap = {0:1,1:2,2:4,3:5,4:0,5:0,6:0};
rs.opacityMap = {0:0.4,1:0.4,2:0.4,3:0.4,4:0.8,5:1,6:1};
//rs.opacityMap = {0:1,1:1,2:1,3:1,4:0.8,5:1,6:1};
//	rs.sizeMap = {0:1,1:0,2:0,3:0,4:0,5:0,6:0};

return rs;


});

