
//core.require('/line/line.js','/generators/basics.js','/mlib/drop.js','/mlib/segsets.js','/mlib/topRandomMethods.js','/mlib/drop_seeds.js',
//function (linePP,rs,addDropMethods,addSegsetMethods,addRandomMethods,addSeedMethods) {

import {rs as linePP} from '/line/line.mjs';
import {rs as basicsP} from '/generators/basics.mjs';
import {rs as addDropMethods} from '/mlib/drop.mjs';
import {rs as addSegsetMethods} from '/mlib/segsets.mjs';
import {rs as addRandomMethods} from '/mlib/topRandomMethods.mjs';
let rs = basicsP.instantiate();
addDropMethods(rs);
addRandomMethods(rs);
addSegsetMethods(rs);
//addSeedMethods(rs);

rs.setName('drop_iris');
let ht = 160;
 ht = 700;
let topParams = {saveState:1,width:ht,height:ht,numRows:20,numCols:30,dropTries:20,endLoopss:1000,lineLength:10,backStripeColor:'rgb(2,2,2)',backStripePadding:0.1*ht,backStripeVisible:0,separation:0,randomDirectionChange:0.3*Math.PI,fromEnds:1,sepNext:.1,lineExt:.2,onlyFromSeeds:1,extendWhich:'random',numSeeds:100,splitChance:0.5,splitAmount:0.08 * Math.PI,directionChange:0.025 * Math.PI}
	
Object.assign(rs,topParams);

rs.initProtos = function () {
	core.assignPrototypes(this,'lineP',linePP);
	this.lineP.stroke = 'white';
	this.lineP['stroke-width'] = 2;
}  

rs.genSegments = function (p,rvs) {
  let {r,g,b} = rvs;
	let clr = `rgb(${r},${g},${b})`;
  return this.genSegmentsFan(p,clr);
}


rs.genSeeds = function () {
  let {width,height,ringRadius} = this;
  this.ringRadius = 0.3 * 0.5 * width;
	let exc = geom.Circle.mk(Point.mk(0,0),this.ringRadius - 1);
	this.exclusionZones = [exc];
	let dnc = geom.Circle.mk(Point.mk(0,0),3* this.ringRadius);
	this.doNotExit= [dnc];
  let seeds =this.ringSeeds('white');
	return seeds;
}


rs.computeState  = function () {
   return [["randomGridsForShapes",this.randomGridsForShapes]];
}

  
rs.initialize = function () {
  core.root.backgroundColor = 'black';
	this.initProtos();
  this.addBackStripe();
  if (this.saveState) {
    this.setupColorRandomizer({step:10,min:100,max:240});
    this.saveTheState();
    this.initializeDrop();
  } else {
    this.getTheState(() => {
      debugger;
      this.initializeDrop();
    });
  }
}

export {rs};


