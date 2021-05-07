
//core.require('/gen0/drop0.js',function (addDropMethods) {
core.require('/gen1/drop0_1.js','/shape/circle.js',function (rs,circlePP) {

rs.setName('drop0_1_13');
let topParams = {width:1200,height:1200,numRows:20,numCols:30,maxDrops:10000,maxTries:10,lineLength:10,backgroundColor:'black',/*'rgb(100,1,1)',*/backgroundPadding:40,separation:0,fromEnds:1,sepNext:1,onlyFromSeeds:1,extendWhich:'random',numSeeds:16,splitChance:0.2,splitAmount:0.03 * Math.PI,endLoops:10000};
//topParams = {width:1200,height:1200,numRows:20,numCols:30,maxDrops:1000,maxTries:10,lineLength:10,backgroundColor:'black',/*'rgb(100,1,1)',*/backgroundPadding:40,separation:0,fromEnds:1,sepNext:1,onlyFromSeeds:1,extendWhich:'random',numSeeds:16,splitChance:0.2,splitAmount:0.03 * Math.PI,endLoops:3000}

Object.assign(rs,topParams);


rs.finishProtos = function () {
	this.lineP.stroke = 'white';
	this.lineP.stroke = 'transparent';
	//this.lineP.stroke = 'yellow';
	//this.lineP.stroke = 'black';
	this.lineP['stroke-width'] = .1;
	this.lineP['stroke-width'] = .6;
	this.lineP['stroke-width'] = 3;
	core.assignPrototypes(this,'circleP',circlePP);
	this.circleP.fill = 'rgb(100,100,100)';
	this.circleP.fill = 'rgb(0,100,100)';
	this.circleP.fill = 'rgb(2,2,2)';
}

 

rs.genSegments = function (p) {
  debugger;
  let {r,g,b} = this.randomizerColor(p);
	let clr = `rgb(${r},${r},${r})`;
	//r = 0;
	//clr = `rgb(${r},${r},${r})`;
  return this.genSegmentsFan(p,clr);
}


rs.genSeeds = function () {
  debugger;
  let {width} = this;
  this.ringRadius = 0.15 * 0.5 * width;
  return this.ringSeeds('transparent');
}


  
rs.initialize = function () {
  debugger;
  core.root.backgroundColor = 'black';
  this.setupColorRandomizer({step:10,min:150,max:240});
	this.initializeDrop();
	let {circleP,ringRadius} = this;
	let circle = circleP.instantiate();
	circle.dimension = 2*ringRadius;
	circle.show();
	this.set('circle',circle);
}

return rs;

});

