
//core.require('/shape/rectangle.js','/gen0/Basics.js','/mlib/grid.js','/mlib/topRandomMethods.js',

//core.require(,'/grid/grid24cons.js','/grid/dim2dWalker2.js',
//function (rectPP,rs,addGridMethods,addRandomMethods) {


import {rs as rectPP} from '/shape/rectangle.mjs';
import {rs as basicsP} from '/generators/basics.mjs';
import {rs as addGridMethods} from '/mlib/grid.mjs';
import {rs as addRandomMethods} from '/mlib/topRandomMethods.mjs';
let rs = basicsP.instantiate();

let wd = 300;
let nmc  = 200;
let topParams = {width:wd,height:wd,numRows:nmc,numCols:nmc,backgroundColor:'rgb(2,2,2)',backgroundPadding:0.1*wd}

addGridMethods(rs);
addRandomMethods(rs);
Object.assign(rs,topParams);

//rs.saveImage = true;
rs.setName('grid_smoke_1');
//rs.loadFromPath = 0;
//rs.numRows= 200;
//rs.numCols = 200;
//rs.width = 300;
//rs.height = 300;

rs.initProtos = function () {
	this.rectP = rectPP.instantiate();
	this.rectP['stroke-width'] = 0;
	this.rectP.dimension = 4;
}  

rs.shapeGenerator = function (rvs) {
	debugger;
	let {rectP,deltaX,deltaY,shapes} = this;
	let shape = rectP.instantiate();
	shapes.push(shape);
	let fc = 1.1;
	shape.width = fc*deltaX;
	shape.height = fc*deltaY;
	let r = rvs.red;
	let ir = Math.floor(r/50)*50;
	shape.fill = `rgb(${Math.floor(r)},${Math.floor(r)},0)`;
	shape.update();
	shape.show();
	return shape;
}

rs.initialize = function () {
  let {numRows,numCols } = this;
  this.addBackStripe();
	this.initProtos();
	let rnp = {correlated:true};
	const walkParams = function (i,j) {
		let fri = i/numRows;
		let frj = j/numCols;
		if ((frj>0.4) && (frj<.6) && (fri>.45) && (fri<0.5)) {
			rnp.stepx = 30;
			rnp.stepy = 50;
			rnp.max=0;
			rnp.min=0;
		} else if ((fri > 0.5) && (frj>0.4) && (frj<.6)) {
			rnp.stepx = 5;
			rnp.stepy = 30;
		} else {
			rnp.stepx = 15;
			rnp.stepy = 30;
			rnp.min = 50;
			rnp.max = 250;
		}
		return rnp;
	}
	this.setupShapeRandomizer('red', {walkParams,numRows,numCols});
  this.initializeGrid();
}
export {rs};


