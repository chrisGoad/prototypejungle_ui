
//core.require('/gen0/drop0.js',function (addDropMethods) {
core.require('/gen1/drop0_1.js',function (rs) {

rs.setName('drop0_1_23');
let ht = 800;
let topParams = {width:ht,height:ht,numRows:20,numCols:30,maxDrops:10000,maxTries:10,endLoops:1000,lineLength:10,backgroundColor:'rgb(2,2,2)',backgroundPadding:0.1*ht,separation:0,randomDirectionChange:0.2*Math.PI,fromEnds:1,sepNext:.1,lineExt:.2,onlyFromSeeds:1,extendWhich:'random',numSeeds:3,splitChance:0.2,splitAmount:0.08 * Math.PI}

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
  let {width,height} = this;
	let rsgs = this.rectangleSegments(width,height);
	let rlines = rsgs.map((sg) => {
		let line = this.genLine(sg);
		line.show();
		return line;
	});

  this.ringRadius = 0.2 * 0.5 * width;
  let clr = 'cyan'
  let seeds =this.ringSeeds();
	let srs =[rsgs.concat(seeds[0]),rlines.concat(seeds[1])];
	return srs;
}


  
rs.initialize = function () {
  debugger;
  core.root.backgroundColor = 'black';
 this.setupColorRandomizer({step:10,min:100,max:240});
	this.initializeDrop();
}

return rs;

});

