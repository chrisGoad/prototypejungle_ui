
core.require('/gen1/grid0_3.js','/gen0/basics.js',
//core.require('/shape/rectangle.js','/line/line.js','/shape/circle.js','/gen0/grid0.js','/gen0/lines0.js',
function (constructor,addSetName)	{ 


  let rs = svg.Element.mk('<g/>');
	addSetName(rs);
	
	
	rs.setName('grid0_3_combo2');

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

const finishProtos = function (grid) {
	grid.rectP.stroke = 'rgba(0,0,0,.8)';
	grid.rectP['stroke-width'] = 0.2;
	grid.circleP.stroke = 'rgba(0,0,0,.8)';
	grid.circleP['stroke-width'] = 0.2;
}

let grid0= rs.set('grid0',constructor());
let grid1 = rs.set('grid1',constructor());
let sqd = 48;
let ar = 2;
	let gParams = {saveImage:true,numRows:ar*sqd,numCols:ar*sqd,width:300,height:300,pointJiggle:3,randomizeOrder:1,widthFactor:3,heightFactor:.7,backgroundColor:'yellow'};

Object.assign(grid0,gParams);
Object.assign(grid1,gParams);
// var 1 
//grid1.widthFactor = 1;
// var 2
grid1.widthFactor = 3;
grid1.heightFactor = 3;
// var 3
grid1.widthFactor = 0.7
grid1.heightFactor = 3;
grid1.backgroundColor = 'black';
// var 3
// grid1.genCircles = 1;
// end 
grid0.finishProtos  = function () {finishProtos(this);}
grid1.finishProtos  = function () {finishProtos(this);}

const colorSetter = function (grid,shape,fc) {
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


const shapeGenerator = function (grid,rvs,cell) {
	debugger;
	let {shapes,rectP,circleP,deltaX,deltaY,widthFactor,heightFactor,genCircles} = grid;
	let shape = genCircles?circleP.instantiate():rectP.instantiate();
	if (genCircles) {
		shape.dimension = widthFactor*deltaX;
	} else {
	  shape.width = widthFactor * deltaX;
	  shape.height= heightFactor * deltaY;
	}
	
	shapes.push(shape);
	let fc = grid.sizeFactor(rvs,cell);
	colorSetter(grid,shape,fc);
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
	let grid0 = this.grid0;
	let grid1 = this.grid1;
	grid1.initialize();
	grid0.initialize();
	
	let mby = 0.6 * grid1.width;
	this.grid0.moveto(Point.mk(-mby,0));
	this.grid1.moveto(Point.mk(mby,0));
		core.root.backgroundColor = 'black';
}

return rs;

});

