
//core.require('/gen1/grid0_3.js','/gen0/basics.js','/mlib/ParamsByCell'
core.require('/shape/rectangle.js','/gen0/Basics.js','/mlib/grid.js','/mlib/topRandomMethods.js','/mlib/ParamsByCell.js',
//core.require('/shape/rectangle.js','/line/line.js','/shape/circle.js','/gen0/grid0.js','/gen0/lines0.js',
//function (constructor,addSetName)	{ 
function (rectPP,rs,addGridMethods,addRandomMethods,addParamsByCellMethods)	{ 

//let rs = basicP.instantiate().show();
addGridMethods(rs);
addRandomMethods(rs);
addParamsByCellMethods(rs);
 // let rs = svg.Element.mk('<g/>');
	let bsz = 250;
  let ht = 450;
  let sqd = 32;
  let ar = 2;
	let topParams = {saveImage:true,numRows:ar*sqd,numCols:ar*sqd,width:300,height:300,pointJiggle:3,randomizeOrder:1,backgroundColor:'yellow'};
	//let topParams = {width:1.5*ht,height:ht,backgroundColor:'rgb(2,2,2)',backgroundPadding:0.1*ht};
	Object.assign(rs,topParams);
	
	rs.globalParams  = {
	widthFactor:0.7,
	heightFactor:0.7,
	maxSizeFactor:3,
	sizePower:2,
	genPolygons:0,
  randomizingFactor:0,sizePower:2,genCircles:0,genPolygons:0,
	sizeMap:  {0:1,1:1,2:1,3:1},
	//sizeMap:  {0:0,1:0,2:0,3:1},
	opacityMap:  {0:0.2,1:0.4,2:0.5,3:0.5},
  colorMap: 
		{
			0:  (r,g,b,opacity) => `rgba(${r},0,0,${opacity})`,
			1:  (r,g,b,opacity) => `rgba(${r},0,0,${opacity})`,
			2:  (r,g,b,opacity) => `rgba(255,255,255,${opacity})`,
			3:  (r,g,b,opacity) => `rgba(255,255,0,${opacity})`,
		}
};
	rs.setName('grid0_3');
//	rs.addBackground();
/*
  let wsq = rs.set('wsq',svg.Element.mk('<g/>'));

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
*/
rs.initProtos = function () {
  core.assignPrototypes(this,'rectP',rectPP);

	this.rectP.stroke = 'rgba(0,0,0,.8)';
	//grid.rectP.stroke = 'rgba(255,255,0,.9)';
  this.rectP['stroke-width'] = 0.2;
}
/*let grid0 = rs.set('grid0',basicP.instantiate().show());
let grid1 = rs.set('grid1',basicP.instantiate().show());
addGridMethods(grid0);
addGridMethods(grid1);
addRandomMethods(grid0);
addRandomMethods(grid1);

//	let grid0= rs.set('grid0',constructor());
//	let grid1 = rs.set('grid1',constructor());

	let sqd = 32;
  let ar = 2;
	let gParams = {saveImage:true,numRows:ar*sqd,numCols:ar*sqd,width:300,height:300,pointJiggle:3,randomizeOrder:1,backgroundColor:'yellow'};
	Object.assign(grid0,gParams);
	Object.assign(grid1,gParams);
	grid0.finishProtos  = function () {finishProtos(this);}
	grid1.finishProtos  = function () {finishProtos(this);}
*/

rs.sizeFactor = function ( cell) {
	let {x,y} = cell;
	let px = this.numPowers(x,2);
	let py = this.numPowers(y,2);
	return Math.min(px,py);
	return px+py;
}
let wdf = 6/ar;
let htf = .7;
rs.colorSetter = function (shape,fc) {
	debugger;
	let r = 100 + Math.random() * 155;
	let g = 100 +Math.random() * 155;
	let b = 100 + Math.random() * 155;
	
  if (fc === 0) {
		shape.fill =`rgba(${r},${r},0,0.4)`;
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
const colorSetter = function (shape,fc) {
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


rs.shapeGenerator = function (rvs,cell) {
	debugger;
	let {shapes,rectP,deltaX,deltaY} = this;
	//let shape = rectP.instantiate();
	let shape = rectP.instantiate();
	//shape.width = 50;
	//shape.height = 35;
	let fc = this.sizeFactor(rvs,cell);

	shape.width = wdf * deltaX*fc;
	shape.height= htf * deltaY;
	shapes.push(shape);
	this.colorSetter(shape,fc);
	
	shape.show();
	return shape;
}
/*
grid0.shapeGenerator = function (rvs,cell) {
	return shapeGenerator(this,rvs,cell);
}

grid1.shapeGenerator = function (rvs,cell) {
	return shapeGenerator(this,rvs,cell);
}
*/
rs.initialize = function () {
	debugger;
  this.initProtos();
  this.initializeGrid();
/*	let grid0 = this.grid0;
	let grid1 = this.grid1;
	grid1.initializeGrid();
	grid0.initializeGrid();
	
	//this.initWsq();
	let mby = 0.6 * grid1.width;
	this.grid0.moveto(Point.mk(-mby,0));
	this.grid1.moveto(Point.mk(mby,0));
		core.root.backgroundColor = 'black';
	//core.root.backgroundColor = 'white';
*/
}

return rs;

});

