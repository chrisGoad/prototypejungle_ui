
core.require('/gen1/grid0_3.js',
//core.require('/shape/rectangle.js','/line/line.js','/shape/circle.js','/gen0/grid0.js','/gen0/lines0.js',
function (constructor)	{ 

let rs = constructor();
rs.setName('grid0_3_2');
let sqd = 100;
let ar = 2;
rs.numCols = ar*sqd;
rs.numRows = sqd;
rs.pointJiggle = 15;

rs.shapeGenerator = function (rvs,cell) {
	debugger;
	let {shapes,rectP} = this;
	//let shape = rectP.instantiate();
	let shape = rectP.instantiate();
	shape.width = 50;
	shape.height = 35;
	shapes.push(shape);
	let fc = this.sizeFactor(rvs,cell);
	if (fc >= 2) {
		shape.fill = 'rgba(255,255,255,0.4)';
	} else {
		shape.fill = 'rgba(0,0,255,0.4)';
	}
	shape.show();
	return shape;
}

return rs;

});

