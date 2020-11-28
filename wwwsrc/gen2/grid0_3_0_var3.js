
core.require('/gen2/grid0_3_0_gen.js',
//core.require('/shape/rectangle.js','/line/line.js','/shape/circle.js','/gen0/grid0.js','/gen0/lines0.js',
function (rs)	{ 

	
	rs.setName('grid0_3_0_var1');

// var 3
rs.widthFactor = 0.7
rs.heightFactor = 3;
rs.backgroundColor = 'black';
return rs;
// var 3
// rs.genCircles = 1;
// end 

const colorSetter = function (shape,fc) {
	debugger;
	let r = 200 + Math.random() * 55;
	let g = 100 +Math.random() * 155;
	let b = 100 + Math.random() * 155;
  if (fc <= 1) {
				shape.fill = `rgba(${r},0,0,0.4)`;
	} else if (fc === 2) {
			shape.fill = 'rgba(255,255,255,0.4)';
  } else if (fc === 3) {
		shape.fill = `rgba(0,${b},${b},0.4)`;
	} else if (fc === 4) {
	shape.fill = 'rgba(255,255,255,0.4)';
	} else if (fc === 4) {
		shape.fill = 'white';
	}
}


rs.shapeGenerator = function (rvs,cell) {
	debugger;
	let {shapes,rectP,circleP,deltaX,deltaY,widthFactor,heightFactor,genCircles} = this;
	let shape = genCircles?circleP.instantiate():rectP.instantiate();
	if (genCircles) {
		shape.dimension = widthFactor*deltaX;
	} else {
	  shape.width = widthFactor * deltaX;
	  shape.height= heightFactor * deltaY;
	}
	shapes.push(shape);
	let fc = this.sizeFactor(rvs,cell);
	colorSetter(shape,fc);
	shape.show();
	return shape;
}

core.root.backgroundColor = 'black';

return rs;

});

