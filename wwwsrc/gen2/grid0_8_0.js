
core.require('/gen1/grid0_8.js',
//core.require('/shape/rectangle.js','/line/line.js','/shape/circle.js','/gen0/grid0.js','/gen0/lines0.js',
function (rs)	{ 
  let numRows = 32;
	let topParams = {numRows:numRows,numCols:numRows,width:1000,height:1000};
	Object.assign(rs,topParams);
	rs.setName('grid0_8_0');
	rs.backgroundColor = 'black';
	rs.paramsByRow = [];
	let ssz = {0:1,1:1,2:2,3:3,4:4,5:0,6:0};
	let lsz = {0:5,1:4,2:3,3:2,4:1,5:0,6:0};
	const computeSizes = function (n) {
		let fr = n/numRows;
		let rvl = {}
		for (let j=0;j<7;j++) {
			let s0 = ssz[j];
			let s1 = lsz[j];
			let rsz = s0 + fr*(s1-s0);
			rvl[j] = 0.5* rsz;
		};
		return rvl;
	}
	for (let i=0;i<numRows;i++) {
		rs.paramsByRow[i] = {sizeMap: computeSizes(i)};
	}
	let oo = 0.3;
	let globalValues = {opacityMap:{0:oo,1:oo,2:oo,3:oo,4:oo,5:oo,6:oo},
	randomizeOrder: 1,	
	orderByOrdinal: 0,
	genCircles: 1,
	colorMap:{
0:(r,g,b,opacity) => `rgba(0,${r},0,${opacity})`,
1:(r,g,b,opacity) => `rgba(${r},0,0,${opacity})`,
2:(r,g,b,opacity) => `rgba(255,255,255,${opacity})`,
3:(r,g,b,opacity) => `rgba(0,${b},${b},${opacity})`,
4:(r,g,b,opacity) => `rgba(0,0,${r},${opacity})`,
5:(r,g,b,opacity) => `rgba(0,0,0,${opacity})`,
	6:(r,g,b,opacity) => `rgba(${r},${r},0,${opacity})`}};
	
Object.assign(rs.globalParams,globalValues);

return rs;
	

});

