
core.require('/gen1/grid0_3.js',
//core.require('/shape/rectangle.js','/line/line.js','/shape/circle.js','/gen0/grid0.js','/gen0/lines0.js',
function (constructor)	{ 


let rs = svg.Element.mk('<g/>');
	
	let grid0= rs.set('grid0',constructor());
	let grid1 = rs.set('grid1',constructor());
let sqd = 40;
let ar = 1;
grid0.numCols = ar*sqd;
grid1.numCols = ar*sqd;
grid0.numRows = sqd;
grid1.numRows = sqd;
grid0.pointJiggle = 45;
grid1.colorSetter = function (shape,fc) {
	debugger;
	let r = 100 + Math.random() * 155;
	let g = 100 +Math.random() * 155;
	let b = 100 + Math.random() * 155;
  if (fc === 0) {
		shape.fill = `rgba(${g},${g},0,0.4)`;
	} else if (fc === 1) {
		shape.fill = `rgba(0,${g},0,0.4)`;
  } else if (fc === 2) {
		shape.fill = `rgba(0,0,${b},0.4)`;
	} else if (fc === 3) {
		shape.fill = 'rgba(255,255,255,0.4)';
	}
}


const shapeGenerator = function (grid,rvs,cell,genCircle) {
	debugger;
	let {shapes,rectP,circleP,deltaX,deltaY} = grid;
	//let shape = rectP.instantiate();
	let shape = genCircle?circleP.instantiate():rectP.instantiate();
	if (genCircle) {
		shape.dimension = deltaX;
	} else {
	  shape.width = deltaX;
	  shape.height = deltaY;
	}
	shapes.push(shape);
	let fc = grid.sizeFactor(rvs,cell);
	grid.colorSetter(shape,fc);
	/*if (fc === 0) {
		shape.fill = 'rgba(255,0,0,0.4)';
	} else if (fc === 1) {
		shape.fill = 'rgba(0,255,0,0.4)';
  } else if (fc === 2) {
		shape.fill = 'rgba(0,0,255,0.4)';
	} else if (fc === 3) {
		shape.fill = 'rgba(255,255,255,0.4)';S
	}*/
	shape.show();
	return shape;
}

grid0.shapeGenerator = function (rvs,cell) {
	return shapeGenerator(this,rvs,cell,1);
}

grid1.shapeGenerator = function (rvs,cell) {
	return shapeGenerator(this,rvs,cell,0);
}

rs.initialize = function () {
	debugger;
	this.grid0.initialize();
	this.grid1.initialize();
	//let mby = 0.6 * grid1.width;
	//this.grid0.moveto(Point.mk(-mby,0));
	//this.grid1.moveto(Point.mk(mby,0));
}

return rs;

});

