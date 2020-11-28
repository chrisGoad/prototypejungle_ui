
core.require('/gen1/grid0_3.js','/gen0/basics.js',
//core.require('/shape/rectangle.js','/line/line.js','/shape/circle.js','/gen0/grid0.js','/gen0/lines0.js',
function (constructor,addSetName)	{ 


  let rs =constructor();
	addSetName(rs);
	
	
	rs.setName('grid0_3_combo2');

rs.finishProtos = function () {
	this.rectP.stroke = 'rgba(0,0,0,.8)';
	this.rectP['stroke-width'] = 0.2;
	this.circleP.stroke = 'rgba(0,0,0,.8)';
	this.circleP['stroke-width'] = 0.2;
}
let sqd = 48;
let ar = 2;
	let gParams = {saveImage:true,numRows:ar*sqd,numCols:ar*sqd,width:300,height:300,pointJiggle:3,
	 opacity:0.4,opacity0:0.4,randomizeOrder:1,widthFactor:3,heightFactor:.7,backgroundColor:'yellow'};

Object.assign(rs,gParams);

const colorSetter = function (shape,fc,op0,op) {
	debugger;
	let r = 200 + Math.random() * 55;
	let g = 100 +Math.random() * 155;
	let b = 100 + Math.random() * 155;
  if (fc <= 1) {
				shape.fill = `rgba(${r},0,0,${op0})`;
	} else if (fc === 2) {
			shape.fill = 'rgba(255,255,255,0.4)';
		//	shape.fill = `rgba(${r},${r},0,0.4)`;
  } else if (fc === 3) {
		shape.fill = `rgba(0,${b},${b},${op})`;
	} else if (fc === 4) {
	shape.fill = 'rgba(255,255,255,0.4)';
	} else if (fc === 4) {
		shape.fill = 'white';
	}
}


rs.shapeGenerator = function (rvs,cell) {
	debugger;
	let {shapes,rectP,circleP,deltaX,deltaY,widthFactor,heightFactor,genCircles,opacity0,opacity} = this;
	let shape = genCircles?circleP.instantiate():rectP.instantiate();
	if (genCircles) {
		shape.dimension = widthFactor*deltaX;
	} else {
	  shape.width = widthFactor * deltaX;
	  shape.height= heightFactor * deltaY;
	}
	shapes.push(shape);
	let fc = this.sizeFactor(rvs,cell);
	colorSetter(shape,fc,opacity0,opacity);
	shape.show();
	return shape;
}

core.root.backgroundColor = 'black';

return rs;

});

