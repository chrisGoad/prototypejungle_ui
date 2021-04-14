
//core.require('/gen0/drop0.js',function (addDropMethods) {
core.require('/gen1/drop0_1.js',function (rs) {

rs.setName('drop0_1_10');
let topParams = {width:1300,height:1300,numRows:20,numCols:30,maxDrops:10000,maxTries:10,lineLength:10,backgroundColor:'black',/*'rgb(100,1,1)',*/backgroundPadding:40,separation:0,fromEnds:1,sepNext:1,onlyFromSeeds:1,extendWhich:'random',numSegStarts:16,splitChance:0.2,splitAmount:0.03 * Math.PI}

Object.assign(rs,topParams);


rs.finishProtos = function () {
	this.lineP.stroke = 'white';
	this.lineP.stroke = 'transparent';
	//this.lineP.stroke = 'yellow';
	//this.lineP.stroke = 'black';
	this.lineP['stroke-width'] = .1;
	this.lineP['stroke-width'] = .6;
	this.lineP['stroke-width'] = 2;
}  

rs.genSegments = function (p) {
  debugger;
  let {r,g,b} = this.randomizerColor(p);
	let clr = `rgb(${r},${r},${r})`;
  return this.genSegmentsFan(p,clr);
}


rs.initialSegments = function () {
  debugger;
  let {width} = this;
  this.ringRadius = 0.2 * 0.5 * width;
  return this.initialSegmentsRing('cyan');
}


  
rs.initialize = function () {
  debugger;
  core.root.backgroundColor = 'black';
 this.setupColorRandomizer({step:10,min:100,max:240});
	this.initializeDrop();
}

return rs;

});

