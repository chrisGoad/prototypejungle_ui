
core.require('/gen1/grid0_8.js',
//core.require('/shape/rectangle.js','/line/line.js','/shape/circle.js','/gen0/grid0.js','/gen0/lines0.js',
function (rs)	{ 

	
rs.setName('grid0_8_18');
	
let gpInner  = {
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

let gpOuter  = {
	widthFactor:1,
	heightFactor:1,
	maxSizeFactor:3,
	szPower:3,
	sizeMap:  {0:1,1:1,2:2,3:4},
	//opacityMap:  {0:0.4,1:0.4,2:0.4,3:0.4},
	opacityMap:  {0:0.4,1:0.4,2:0.4,3:1},
  colorMap: 
		{
			0:  (r,g,b,opacity) => `rgba(${r},0,0,${opacity})`,
			1:  (r,g,b,opacity) => `rgba(${r},0,0,${opacity})`,
			2:  (r,g,b,opacity) => `rgba(255,255,255,${opacity})`,
		//	3:  (r,g,b,opacity) => `rgba(0,150,150,${opacity})`,
			3:  (r,g,b,opacity) => `rgba(0,0,0,${opacity})`,
		}
};
rs.paramsByCell = function (cell) {
	let {numRows,numCols} = this;
	let {x,y} = cell;
	let cx = numCols/2;
	let cy = numRows/2;
	let maxd = Math.sqrt(cx*cx + cy*cy);
	let xdc = x - cx;
	let ydc = y - cy;
	let cd = Math.sqrt(xdc*xdc + ydc*ydc);
	let df = cd/maxd;
	let yf = y/numRows;
	let lwf = 0;
	let hwf = 1.2;
	let wf = lwf + df * (hwf-lwf);
	//let wf = lwf + yf * (hwf-lwf);
	gpOuter.widthFactor = wf
	gpOuter.heightFactor = wf
	return gpOuter;
	return (y < numRows/2)?gpInner:gpOuter;
}
	
//let gp = rs.globalParams;
//Object.assign(gp,newGlobalParams);
	
let newTopParams = {
  ordinalMap : {0:0,1:1,2:2,3:3,4:4,5:4,6:6,7:7},
	orderByOrdinal : 0,
	randomizeOrder : 1,
  pointJiggle:5,	
  numRows : 96,
  numCols : 96,
	backgroundColor : 'red'
}
Object.assign(rs,newTopParams);

	
	
rs.finishProtos = function () {
	this.rectP.stroke = 'rgba(0,0,0,.8)';
	this.rectP['stroke-width'] = 0.2;
}

return rs;


});

