//core.require('/line/line.js','/shape/circle.js','/shape/rectangle.js','/gen0/basics.js','/mlib/grid.js','/mlib/topRandomMethods.js',
let radial = 0;
//function (linePP,circlePP,rectPP,rs,addGridMethods,addRandomMethods) {
import {rs as addAnimateMethods} from '/mlib/animate.mjs';
import {rs as linePP} from '/line/line.mjs';
import {rs as circlePP} from '/shape/circle.mjs';
import {rs as rectPP} from '/shape/rectangle.mjs';
import {rs as basicsP} from '/generators/basics.mjs';
import {rs as addGridMethods} from '/mlib/grid.mjs';
import {rs as addRandomMethods} from '/mlib/topRandomMethods.mjs';

let rs = basicsP.instantiate();
addGridMethods(rs);
addRandomMethods(rs);	
addAnimateMethods(rs);	
rs.setName('grid_simple_example');
	
rs.initProtos = function () {
	rs.rectP  = rectPP.instantiate();
	rs.rectP.fill = 'red';
	rs.rectP.fill = 'white';
	//rs.rectP.fill = 'rgba(55,55,55,0.6)';
	//rs.rectP.fill = 'red';
	rs.rectP['stroke-width'] = 0;
	rs.rectP.width = .5;
	rs.rectP.height = .5;
  rs.blineP  = linePP.instantiate();
  rs.blineP['stroke-width'] = 0.2;
  rs.blineP.stroke = 'cyan';
  rs.blineP.stroke = 'white';

}  

let nr = 64;
nr = 16;
let wd = 200;
let topParams;
if (radial) {
  topParams = {numRows:0.5*nr,numCols:nr,width:wd,height:wd,outerRadius:wd,innerRadius:0.2*wd,angleMin:-180,angleMax:180,center: Point.mk(0,0),rotation:30,backStripeColor:'rgb(2,2,2)',pointJiggle:4,backStripePadding:0.15*wd};
} else {
  topParams = {numRows:nr,numCols:nr,width:wd,height:wd,backStripeColor:'rgb(2,2,2)',pointJiggle:4,backStripePadding:0.15*wd,numTimeSteps:10};
}

Object.assign(rs,topParams);

	
rs.shapeGenerator = function (rvs,cell) {
	 debugger;
		let {rectP,shapes} = this;
	//	let v = rvs.v;
		let shape = rectP.instantiate().show();
		shapes.push(shape);
     let {r,g,b} = rvs;
	let rgb = `rgb(${Math.floor(r)},${Math.floor(r)},${Math.floor(r)})`;
//	shape.fill = rgb;
    debugger;
		return shape;
}


  

rs.boundaryLineGenerator= function (end0,end1,rvs,cell) {
	let {blineP,showMissing,lines,updating,lineIndex} =this;
	//let line = this.nextLine(blineP);
	let line = blineP.instantiate().show();
	lines.push(line);
  line.setEnds(end0,end1);
  let {r,g,b} = rvs;
	let rgb = `rgb(${Math.floor(r)},${Math.floor(r)},${Math.floor(r)})`;
//	line.stroke = rgb;
	return line;
}


rs.initialize = function () {
  debugger;
   let rparams = {step:30,min:0,max:250}
  this.initProtos();
  this.initializeGrid();
  this.addBackStripe();
}



rs.step = function ()   {
	debugger;
	this.stepBoundaryRandomizer('jiggleX');
  this.updateGrid();
 }
 
 
rs.animate = function (resume)  {
	this.animateIt(this.numTimeSteps,50,resume);
	
}
export {rs};


