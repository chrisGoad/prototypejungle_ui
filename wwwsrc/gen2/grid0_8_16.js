
core.require('/gen1/grid0_8.js',
//core.require('/shape/rectangle.js','/line/line.js','/shape/circle.js','/gen0/grid0.js','/gen0/lines0.js',
function (rs)	{ 

	
rs.setName('grid0_8_16');


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
  numCols : 64,
	backgroundColor : 'black'
}
debugger;
Object.assign(rs,newTopParams);

	


rs.shapeGenerator = function (rvs,cell) {
	debugger;
	let {shapes,rectP} = this;
	//let shape = rectP.instantiate();
	let shape = rectP.instantiate();
	shape.width = 50;
	shape.height = 35;
	shapes.push(shape);
	let fc = this.sizeFactor(cell);
	if (fc >= 2) {
		shape.fill = 'rgba(255,255,255,0.4)';
	} else {
		shape.fill = 'rgba(0,0,255,0.4)';
	}
	shape.show();
	return shape;
}

	
rs.finishProtos = function () {
	this.rectP.stroke = 'rgba(0,0,0,.8)';
	//this.circleP['stroke-width'] = 0;
	this.rectP['stroke-width'] = 0.4;
}

return rs;


});

