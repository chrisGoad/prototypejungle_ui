
core.require('/gen1/grid0_8.js',
//core.require('/shape/rectangle.js','/line/line.js','/shape/circle.js','/gen0/grid0.js','/gen0/lines0.js',
function (rs)	{ 

	
rs.setName('grid0_8_20');


let newGlobalParams  = {
	widthFactor:1,
	heightFactor:1,
	maxSizeFactor:6,
	szPower:2,
	genCircles:0,
	sizeMap:{0:1.5,1:1,2:2,3:3,4:4,5:0,6:0},
};
		
let gp = rs.globalParams;
Object.assign(gp,newGlobalParams);
	
let newTopParams = {
	orderByOrdinal : 0,
	randomizeOrder : 1,
  pointJiggle:2,	
  numRows : 64,
  numCols : 128,
	width:600,
	height:300,
	backgroundColor : 'cyan'
}
Object.assign(rs,newTopParams);

	

rs.sizeFactor = function ( cell) {
	let {x,y} = cell;
	let px = this.numPowers(x,2);
	let py = this.numPowers(y,2);
	return Math.min(px,py);
}

rs.colorSetter = function (shape,fc) {
	let r = 100 + Math.random() * 155;
	let g = 100 +Math.random() * 155;
	let b = 100 + Math.random() * 155;
	if (fc >= 2) {
		shape.fill = 'rgba(255,255,255,0.5)';
	} else {
		shape.fill = `rgba(${r},${g},${b},0.5)`;
	}
}

rs.colorSetter = function (shape,fc) {
	let r = 50+ Math.random() * 155;
	let g = 50 +Math.random() * 155;
	let b = 50 + Math.random() * 155;
	if (fc >= 2) {
		shape.fill = 'rgba(255,255,255,0.5)';
	} else {
		shape.fill = `rgba(${r},${g},${b},0.5)`;
	}
}
	
rs.finishProtos = function () {
	this.rectP.stroke = 'rgba(0,0,0,.8)';
	//this.circleP['stroke-width'] = 0;
	this.rectP['stroke-width'] = 0.4;
}

return rs;


});

