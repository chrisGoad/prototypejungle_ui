
//core.require('/shape/rectangle.js','/line/line.js','/generators/basics.js','/mlib/drop.js','/mlib/segsets.js','/mlib/topRandomMethods.js','/mlib/drop_seeds.js',
//function (rectPP,linePP,rs,addDropMethods,addRandomMethods,addSegsetMethods,addSeedMethods) {

import {rs as rectPP} from '/shape/rectangle.mjs';
import {rs as linePP} from '/line/line.mjs';
import {rs as basicsP} from '/generators/basics.mjs';
import {rs as addDropMethods} from '/mlib/drop.mjs';
import {rs as addSegsetMethods} from '/mlib/segsets.mjs';
import {rs as addRandomMethods} from '/mlib/topRandomMethods.mjs';
let rs = basicsP.instantiate();
addDropMethods(rs);
addRandomMethods(rs);
addSegsetMethods(rs);

rs.setName('drop_leaves');
let ht = 300;
let wd = 1.5 * ht;

let topParams = {width:wd,height:ht,numSeedRows:0,numSeedCols:0,dropTries:500,lineLength:5,backStripeColor:'rgb(2,2,2)',backStripePadding:0.17*ht,backStripeVisible:0,minSeparation:0,rectangleDim:0.2,gridPadding:60,fromEnds:1,sepNext:0.01,onlyFromSeeds:1,extendWhich:'first',numSeeds:60,splitChance:.10,splitAmount:0.005 * Math.PI,endLoops:3000,seedDirections:[0*Math.PI],directionChange:0.0*Math.PI,randomDirectionChange:0.051*Math.PI,lineExt:0}

Object.assign(rs,topParams);


rs.initProtos = function () {
	core.assignPrototypes(this,'lineP',linePP);
	this.lineP.stroke = 'white';
	this.lineP['stroke-width'] = .5;
}  

rs.genSeeds = function () {
	let {width,height} = this;
	let hw = 0.5 * width;
	let hh = 0.5 * height;
	let [segs,lines] = [[],[]];//this.gridSeeds('white');
	let dc = 35;
	let LL = Point.mk(dc - hw,hh-dc);
	let LLS = this.genSingletonUnit(LL,-0.5*Math.PI,'white');
	segs.push(LLS[0][0]);
	lines.push(LLS[1][0]);
	let UL = Point.mk(dc - hw,dc-hh);
	let ULS = this.genSingletonUnit(UL,0,'white');
	segs.push(ULS[0][0]);
	let LR = Point.mk(hw-dc,hh-dc);
	let LRS = this.genSingletonUnit(LR,Math.PI,'white');
	segs.push(LRS[0][0]);
	lines.push(LRS[1][0]);	lines.push(ULS[1][0]);
	return [segs,lines];
}



rs.genSegments = function (p) {
  return this.genSegmentsFan(p,'white');//,params);
}


rs.initialSegments = function () {
  let {width,height} = this; 
  let segs = this.rectangleSegments(width,height);
  let lines = segs.map((sg) => this.genLine(sg)); 
  return [segs,lines];
}

rs.initialize = function () {
  core.root.backgroundColor = 'black';
  this.addBackStripe();
  this.initProtos();
	this.initializeDrop();
}

export {rs};


