
core.require('/gen1/grid0_8.js',
//core.require('/shape/rectangle.js','/line/line.js','/shape/circle.js','/gen0/grid0.js','/gen0/lines0.js',
function (rs)	{ 
  let numRows = 64;
	let topParams = {numRows:numRows,numCols:numRows,width:1000,height:1000,randomizeOrder:1,orderByOrdinal:0,backgroundColor:'green'};
	Object.assign(rs,topParams);
	debugger;
	rs.setName('grid0_8_1');
	rs.paramsByRow = [];
	
rs.finishProtos = function () {
	debugger;
	this.rectP.stroke = 'rgba(0,0,0,.8)';
	this.rectP['stroke-width'] = 0.2;
	this.circleP.stroke = 'rgba(0,0,0,.8)';
	this.circleP['stroke-width'] = 2;
}

	let oo = 0.3;
	let globalValues = {opacityMap:{0:oo,1:oo,2:oo,3:oo,4:oo,5:oo,6:oo},
	randomizeOrder: 1,	
	orderByOrdinal: 0,
	genCircles: 1,
  sizeMap:{0:1,1:2,2:4,3:8,4:0,5:0,6:0},
 // sizeMap:{0:1,1:1,2:2,3:3,4:0,5:0,6:0},
	colorMap:{
	0:rs.toFun('white'),
	1:rs.toFun('white'),
	2:rs.toFun('white'),

	3:rs.toFun('white'),

	4:(r,g,b,opacity) => `rgba(0,0,255,${opacity})`,

	5:(r,g,b,opacity) => `rgba(0,0,0,${opacity})`,
	6:(r,g,b,opacity) => `rgba(${r},${r},0,${opacity})`}};
Object.assign(rs.globalParams,globalValues);
debugger;
return rs;

});

