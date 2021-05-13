
//core.require('/gen0/drop0.js',function (addDropMethods) {
core.require('/gen1/drop0_1.js','/gen0/animation.js',function (rs,addAnimationMethods) {
rs.setName('drop0_1_23.anim');
addAnimationMethods(rs);
let topParams = {width:1800,height:1200,numRows:20,numCols:30,maxDrops:10,maxTries:10,endLoops:20,lineLength:10,backgroundColor:'black',/*'rgb(100,1,1)',*/backgroundPadding:40,separation:0,randomDirectionChange:0.2*Math.PI,fromEnds:1,sepNext:.1,onlyFromSeeds:1,extendWhich:'random',numSeeds:3,splitChance:0.2,splitAmount:0.08 * Math.PI,numTimeSteps:500}

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
 // debugger;
  let {r,g,b} = this.randomizerColor(p);
	let clr = `rgb(${r},${r},${r})`;
  return this.genSegmentsFan(p,clr);
}


rs.genSeeds = function () {
  debugger;
  let {width} = this;
  this.ringRadius = 0.2 * 0.5 * width;
  let clr = 'cyan'
  return this.ringSeeds(clr);
}


  
rs.initialize = function () {
  debugger;
  core.root.backgroundColor = 'black';
 this.setupColorRandomizer({step:10,min:100,max:240});
	this.initializeDrop();
}


rs.step = function () {
	 this.addRandomSegments();
}	

rs.animate = function (resume) {
	this.animateIt(this.numTimeSteps,100,resume);
	dom.svgDraw();

}
return rs;

});

