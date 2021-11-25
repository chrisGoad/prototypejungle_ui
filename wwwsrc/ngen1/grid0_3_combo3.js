
core.require('/gen1/grid0_3.js','/gen0/basics.js',
//core.require('/shape/rectangle.js','/line/line.js','/shape/circle.js','/gen0/grid0.js','/gen0/lines0.js',
function (constructor,addSetName)	{ 


  let rs = svg.Element.mk('<g/>');
	let bsz = 250;
  let ht = 450;
	let topParams = {width:1.5*ht,height:ht,backgroundColor:'rgb(2,2,2)',backgroundPadding:0.1*ht};
	addSetName(rs);
	Object.assign(rs,topParams);
	
	
	rs.setName('grid0_3_combo3');
	rs.addBackground();

  let wsq = rs.set('wsq',svg.Element.mk('<g/>'));
/*rs.initProtos = function () {
	core.assignPrototypes(this,'rectP',rectPP);	
	this.rectP.fill = 'black';
	this.rectP['stroke-width'] = 0;
}  */
rs.initWsq  = function () {
  let wsq = this.wsq;
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
	//grid.rectP.stroke = 'rgba(255,255,0,.9)';
	grid.rectP['stroke-width'] = 0.2;
}

	let grid0= rs.set('grid0',constructor());
	let grid1 = rs.set('grid1',constructor());
	/*let rdim = 32;
	let topVars = {numRows:rdim,numCols:rdim}
	Object.assign(grid0,topVars)
	Object.assign(grid1,topVars)
	rs.numRows = rdim;
	rs.numCols = rdim;*/
	let sqd = 32;
  let ar = 2;
	let gParams = {saveImage:true,numRows:ar*sqd,numCols:ar*sqd,width:300,height:300,pointJiggle:3,randomizeOrder:1,backgroundColor:'yellow'};
	Object.assign(grid0,gParams);
	Object.assign(grid1,gParams);
	grid0.finishProtos  = function () {finishProtos(this);}
	grid1.finishProtos  = function () {finishProtos(this);}
/*let sqd = 100;
let ar = 1;
grid0.numCols = ar*sqd;
grid1.numCols = ar*sqd;
grid0.numRows = sqd;
grid1.numRows = sqd;*/
let wdf = 6/ar;
let htf = .7;
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
			//	shape.fill = 'rgba(255,255,255,0.4)';

	} else if (fc === 3) {
		shape.fill = 'rgba(255,255,255,0.4)';
	} else if (fc === 4) {
		shape.fill = 'white';
	}
}
const colorSetter = function (grid,shape,fc) {
	debugger;
	let r = 200 + Math.random() * 55;
	let g = 100 +Math.random() * 155;
	let b = 100 + Math.random() * 155;
	//shape.fill  = 'black';
  if (fc <= 1) {
				shape.fill = `rgba(${r},0,0,0.4)`;

	} else if (fc === 2) {
			shape.fill = 'rgba(255,255,255,0.4)';

	//	shape.fill = `rgba(0,${g},0,0.4)`;
  } else if (fc === 3) {
			//	shape.fill = 'rgba(255,255,255,0.4)';
		shape.fill = `rgba(0,${b},${b},0.4)`;

	} else if (fc === 4) {
			//shape.fill = `rgba(0,${g},0,0.4)`;
	shape.fill = 'rgba(255,255,255,0.4)';
	} else if (fc === 4) {
		shape.fill = 'white';
	}
}


const shapeGenerator = function (grid,rvs,cell) {
	debugger;
	let {shapes,rectP,deltaX,deltaY} = grid;
	//let shape = rectP.instantiate();
	let shape = rectP.instantiate();
	//shape.width = 50;
	//shape.height = 35;
	shape.width = wdf * deltaX;
	shape.height= htf * deltaY;
	shapes.push(shape);
	let fc = grid.sizeFactor(rvs,cell);
	colorSetter(grid,shape,fc);
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
	let grid0 = this.grid0;
	let grid1 = this.grid1;
	grid1.initialize();
	grid0.initialize();
	
	//this.initWsq();
	let mby = 0.6 * grid1.width;
	this.grid0.moveto(Point.mk(-mby,0));
	this.grid1.moveto(Point.mk(mby,0));
		core.root.backgroundColor = 'black';
	//core.root.backgroundColor = 'white';

}

return rs;

});

