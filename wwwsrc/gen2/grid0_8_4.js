
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

});

