
core.require('/gen1/grid0_3.js',
//core.require('/shape/rectangle.js','/line/line.js','/shape/circle.js','/gen0/grid0.js','/gen0/lines0.js',
function (constructor)	{ 


  let rs = svg.Element.mk('<g/>');
  let wsq = rs.set('wsq',svg.Element.mk('<g/>'));
/*rs.initProtos = function () {
	core.assignPrototypes(this,'rectP',rectPP);	
	this.rectP.fill = 'black';
	this.rectP['stroke-width'] = 0;
}  */
rs.initWsq  = function () {
  let wsq = this.wsq;
	let bsz = 250;
	let mkR  = (nm,p) => {
	  let r = this.grid0.rectP.instantiate();
		r.fill = 'gray';
	  r.width = bsz;
	  r.height = bsz;
	  this.set(nm,r);
	  r.update();
	  r.show();
		r.moveto(p);
		return r;
	}
	let d = 150;
	let ul = mkR('ul',Point.mk(-d,-d));
	let ur = mkR('ur',Point.mk(d,-d));
	let ll = mkR('ll',Point.mk(-d,d));
	let lr = mkR('lr',Point.mk(d,d));
	let br = this.grid0.rectP.instantiate();
	br . width = 2*d - 50;
	br . height = 2*d - 50;
	this.set('big',br);
	br.fill = 'white';
	br.update();
	br.show();
	
}

	let grid0= rs.set('grid0',constructor());
	let grid1 = rs.set('grid1',constructor());
let sqd = 100;
let ar = 1;
grid0.numCols = ar*sqd;
grid1.numCols = ar*sqd;
grid0.numRows = sqd;
grid1.numRows = sqd;
let wdf = 3;
let htf = 0.5;
grid0.pointJiggle = 0;//45;
grid1.colorSetter = function (shape,fc) {
	debugger;
	let r = 100 + Math.random() * 155;
	let g = 100 +Math.random() * 155;
	let b = 100 + Math.random() * 155;
  if (fc === 0) {
		shape.fill = `rgba(${r},0,0,0.4)`;
	} else if (fc === 1) {
		shape.fill = `rgba(0,${g},0,0.4)`;
  } else if (fc === 2) {
		shape.fill = `rgba(0,0,${b},0.4)`;
	} else if (fc === 3) {
		shape.fill = 'rgba(255,255,255,0.4)';
	}
}


const shapeGenerator = function (grid,rvs,cell) {
	debugger;
	let {shapes,rectP,deltaX,deltaY} = grid;
	//let shape = rectP.instantiate();
	let shape = rectP.instantiate();
	shape.width = 50;
	shape.height = 35;
	shape.width = wdf * deltaX;
	shape.height= htf * deltaX;
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
	return shapeGenerator(this,rvs,cell);
}

grid1.shapeGenerator = function (rvs,cell) {
	return shapeGenerator(this,rvs,cell);
}

rs.initialize = function () {
	debugger;
	this.grid0.initialize();
	this.grid1.initialize();
	this.initWsq();
	let mby = 0.6 * grid1.width;
	this.grid0.moveto(Point.mk(-mby,0));
	this.grid1.moveto(Point.mk(mby,0));
		core.root.backgroundColor = 'red';

}

return rs;

});

