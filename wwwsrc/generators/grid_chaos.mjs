//core.require('/line/line.js','/shape/circle.js','/shape/rectangle.js','/gen0/basics.js','/mlib/grid.js','/mlib/topRandomMethods.js',
let radial = 0;
//function (linePP,circlePP,rectPP,rs,addGridMethods,addRandomMethods) {
import {rs as linePP} from '/line/line.mjs';
import {rs as circlePP} from '/shape/circle.mjs';
import {rs as rectPP} from '/shape/rectangle.mjs';
import {rs as basicsP} from '/generators/basics.mjs';
import {rs as addGridMethods} from '/mlib/grid.mjs';
import {rs as addRandomMethods} from '/mlib/topRandomMethods.mjs';

let rs = basicsP.instantiate();
let grid1 = rs.set('grid1',basicsP.instantiate());
let grid2 = rs.set('grid2',basicsP.instantiate());
addGridMethods(grid1);
addRandomMethods(grid1);	
addGridMethods(grid2);
addRandomMethods(grid2);
rs.setName('grid_chaos');
	
const initProtos = function (grid) {
	grid.rectP  = rectPP.instantiate();
	grid.rectP.fill = 'white';
	//grid.rectP.fill = 'black';
	//grid.rectP.fill = 'rgba(55,55,55,0.6)';
	//grid.rectP.fill = 'red';
	grid.rectP['stroke-width'] = 0;
	grid.rectP.width = .5;
	grid.rectP.height = .5;
  grid.blineP  = linePP.instantiate();
  grid.blineP['stroke-width'] = 0.2;
  grid.blineP.stroke = 'cyan';
  grid.blineP.stroke = 'white';

}  

grid1.initProtos = function () {
  initProtos(this);
}

grid2.initProtos = function () {
  initProtos(this);
}

let nr = 64;
let wd = 200;
let topParams;
if (radial) {
  topParams = {numRows:0.5*nr,numCols:nr,width:wd,height:wd,outerRadius:wd,innerRadius:0.2*wd,angleMin:-180,angleMax:180,center: Point.mk(0,0),rotation:30,backStripeColor:'rgb(2,2,2)',pointJiggle:4,backStripePadding:0.15*wd};
} else {
  topParams = {numRows:nr,numCols:nr,width:wd,height:wd,backStripeColor:'rgb(2,2,2)',pointJiggle:4,backStripePadding:0.15*wd};
}

Object.assign(grid1,topParams);
Object.assign(grid2,topParams);
Object.assign(grid2,{width:1.1*wd,height:0.9*wd});
//Object.assign(grid2,{width:1.05*wd,height:0.95*wd});
//Object.assign(grid2,{width:1.02*wd,height:0.98*wd});

	
const shapeGenerator = function (grid,rvs,cell) {
	 debugger;
		let {rectP,shapes} = grid;
	//	let v = rvs.v;
		let shape = rectP.instantiate().show();
		shapes.push(shape);
    debugger;
		return shape;
}

grid1.shapeGenerator = function (rvs,cell) {
  return shapeGenerator(this,rvs,cell);
}


grid2.shapeGenerator = function (rvs,cell) {
   return shapeGenerator(this,rvs,cell);
}
  
  

const boundaryLineGenerator= function (grid,end0,end1,rvs,cell) {
	let {blineP,showMissing,lines,updating,lineIndex} =grid;
	//let line = this.nextLine(blineP);
	let line = blineP.instantiate().show();
	lines.push(line);
  line.setEnds(end0,end1);
	return line;
}

grid1.boundaryLineGenerator = function (end0,end1,rvs,cell) {
  boundaryLineGenerator(this,end0,end1,rvs,cell);
}


grid2.boundaryLineGenerator = function (end0,end1,rvs,cell) {
  boundaryLineGenerator(this,end0,end1,rvs,cell);
}

if (radial) {
  grid1.positionFunction = grid1.radialPositionFunction;
  grid2.positionFunction = grid2.radialPositionFunction;
}

rs.initialize = function () {
  debugger;
 // core.root.backgroundColor = 'blue';
  this.grid1.initProtos();
  this.grid1.initializeGrid();
  this.grid2.initProtos();
  this.grid2.initializeGrid();  
  this.addBackStripe();
}
export {rs};


