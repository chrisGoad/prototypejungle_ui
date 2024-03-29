
//core.require('/line/line.js','/grid/grid24cons.js',function (linePP,constructor) {
//core.require('/line/line.js','/gen0/Basics.js','/mlib/grid.js','/mlib/topRandomMethods.js',
//function (linePP,rs,addGridMethods,addRandomMethods)	{ 


import {rs as linePP} from '/line/line.mjs';
import {rs as basicsP} from '/generators/basics.mjs';
import {rs as addGridMethods} from '/mlib/grid.mjs';
import {rs as addRandomMethods} from '/mlib/topRandomMethods.mjs';
let rs = basicsP.instantiate();
  addGridMethods(rs);
  addRandomMethods(rs);
	rs.setName('grid_tube');
	
	//rs.numRows= 64;
 // rs.numCols= 64;
	
  
let OR = 100;
let nr = 64;
let topParams = {numRows:nr,numCols:nr,outerRadius:OR,innerRadius:0.5*OR,angleMin:-180,angleMax:180,center:Point.mk(0,0),rotation:30,pointJiggle:1,pathLength:10,fadeIn:false,fractionToOccupy: 0.9,backStripeColor:'rgb(2,2,2)',backStripePadding:1.3*OR,backStripeVisible:0};
Object.assign(rs,topParams);
  
rs.positionFunction = rs.radialPositionFunction;

rs.initProtos = function () {
  this.bLineP = linePP.instantiate();
  this.bLineP.stroke = 'rgb(255,255,0)';
  this.bLineP['stroke-width'] = 0.4;
  this.rLineP = linePP.instantiate();
  this.rLineP.stroke = 'rgb(100,100,0)';
  this.rLineP['stroke-width'] = 0.6;
}

rs.boundaryLineGenerator = function (end0,end1,rvs,cell) {
  core.root.backgroundColor = 'black';
  let lines = this.lines;
  let line = this.bLineP.instantiate();
  lines.push(line);
  line.setEnds(end0,end1);
  let r = rvs.red;
  line.stroke = `rgba(50,50,${Math.floor(r)},0.8)`;
  line.update();
  line.show();
  return line;
}

rs.regionLineGenerator =   function (end0,end1,rvs,cell) {
  core.root.backgroundColor = 'black';
  let rlines = this.rlines;
  let line = this.rLineP.instantiate();
  rlines.push(line);
  line.setEnds(end0,end1);
  line.stroke = `yellow`;
  line.update();
  line.show();
  return line;
}

rs.initialize = function () {
  this.initProtos();
  this.addBackStripe();
  this.setupBoundaryRandomizer('red', {step:35,min:20,max:200});
  this.initializeGrid();
}
export {rs};
