
//core.require('/gen0/drop0.js',function (addDropMethods) {
core.require('/gen1/drop0_1.js','/gen1/sphere_setup_for_drop0.js',function (rs,sphereSetup) {

rs.setName('drop0_1_27');
//sphereSetup(rs);
let ht = 160;
 ht = 700;
let topParams = {width:ht,height:ht,numRows:20,numCols:30,maxDrops:6000,maxTries:10,endLoopss:1000,lineLength:10,backgroundColor:'rgb(2,2,2)',backgroundPadding:0.1*ht,separation:0,randomDirectionChange:0.3*Math.PI,fromEnds:1,sepNext:.1,lineExt:.2,onlyFromSeeds:1,extendWhich:'random',numSeeds:100,splitChance:0.5,splitAmount:0.08 * Math.PI,directionChange:0.025 * Math.PI}

topParams = {width:ht,height:ht,numRows:20,numCols:30,maxDrops:6000,maxTries:10,endLoopss:1000,lineLength:10,backgroundColor:'rgb(2,2,2)',backgroundPadding:0.1*ht,separation:0,randomDirectionChange:0.3*Math.PI,fromEnds:1,sepNext:.1,lineExt:.2,onlyFromSeeds:1,extendWhich:'random',numSeeds:100,splitChance:0.5,splitAmount:0.08 * Math.PI,directionChange:0.25 * Math.PI}

Object.assign(rs,topParams);


rs.finishProtos = function () {
	this.lineP.stroke = 'white';
	//this.lineP.stroke = 'transparent';
	//this.lineP.stroke = 'yellow';
	//this.lineP.stroke = 'black';
	this.lineP['stroke-width'] = .1;
	this.lineP['stroke-width'] = .6;
	this.lineP['stroke-width'] = 2;
}  

rs.genSegments = function (p,rvs) {
  debugger;
 // let {r,g,b} = this.randomizerColor(p);
  let {r,g,b} = rvs;
	let clr = `rgb(${r},${g},${b})`;
  return this.genSegmentsFan(p,clr);
}


rs.genSeeds = function () {
  debugger;
  let {width,height,ringRadius} = this;
//	let rsgs = this.rectangleSegments(width,height);
//	let rseed = this.segsToSeed(rsgs);
  this.ringRadius = 0.3 * 0.5 * width;
	let exc = geom.Circle.mk(Point.mk(0,0),this.ringRadius - 1);
	this.exclusionZones = [exc];
	let dnc = geom.Circle.mk(Point.mk(0,0),3* this.ringRadius);
	this.doNotExit= [dnc];
  let seeds =this.ringSeeds('white');

	//let grs = this.concatEachArray([rseed,seeds]);
	return seeds;
	//return grs;
}


  
rs.initialize = function () {
  debugger;
  core.root.backgroundColor = 'black';
 this.setupColorRandomizer({step:10,min:100,max:240});
	this.initializeDrop();
}

return rs;

});

