
//core.require('/gen0/drop0.js',function (addDropMethods) {
core.require('/gen1/drop0_1.js','/shape/circle.js',function (rs,circlePP) {

rs.setName('drop0_1_16');
let topParams = {width:2000,height:1000,numRows:20,numCols:30,maxDrops:10000,maxTries:10,lineLength:10,backgroundColor:'black',/*'rgb(100,1,1)',*/backgroundPadding:40,separation:0,fromEnds:1,sepNext:1,onlyFromSeeds:1,extendWhich:'random',numSeeds:16,splitChance:0.2,splitAmount:0.03 * Math.PI,endLoops:30000}

Object.assign(rs,topParams);


rs.finishProtos = function () {
	this.lineP.stroke = 'white';
	this.lineP.stroke = 'transparent';
	//this.lineP.stroke = 'yellow';
	//this.lineP.stroke = 'black';
	this.lineP['stroke-width'] = .1;
	this.lineP['stroke-width'] = .6;
	this.lineP['stroke-width'] = 2;
	core.assignPrototypes(this,'circleP',circlePP);
	this.circleP.fill = 'rgb(100,100,100)';
	this.circleP.fill = 'rgb(0,100,100)';
	this.circleP.fill = 'rgb(2,2,2)';
}

 

rs.genSegments = function (p) {
  debugger;
	let data = p.data;
	if (data === 'ring0') {
		this.splitAmount= 0.03 * Math.PI;
	} else if  (data === 'ring1') {
		this.splitAmount= 0.06 * Math.PI;
	} else if  (data === 'ring2') {
		this.splitAmount= 0.12 * Math.PI;
	}
	//console.log('GGeneration',p.generation);
	if (p.generation > 50) {
		return undefined;
	}
  let {r,g,b} = this.randomizerColor(p);
	let clr = `rgb(${r},${r},${r})`;
	if (p.generation > 10) {
	//	clr = 'blue';
	}
	//r = 0;
	//clr = `rgb(${r},${r},${r})`;
  return this.genSegmentsFan(p,clr);
}

rs.concatEachArrayu = function (a,b) {
	 let [a0,a1]= a;
	 let [b0,b1]= b;
	 let c0 = a0.concat(b0);
	 let c1 = a1.concat(b1);
	 return [c0,c1];
}


rs.concatEachArray = function (ays) {
	let c0 = [];
	let c1 = [];
	ays.forEach( (a) => {
	 let [a0,a1]= a;
	 c0 = c0.concat(a0);
	 c1 = c1.concat(a1);
  });	 
	 return [c0,c1];
}

	 
	 

rs.genSeeds = function () {
  debugger;
  let {width} = this;
	let hw = 0.25*width;
  this.ringRadius = 0.15 * 0.25 * width;
	let c0 = Point.mk(-hw,0)
	let c1 = Point.mk(0,0)
	let c2 = Point.mk(hw,0)
  this.ringRadius = .5 * 0.25 * width;
//  let SL0 = this.ringSeeds('transparent',Math.PI);
  //let SL0 = this.ringSeeds('cyan',Point.mk(0,0),1.3*Math.PI);
  let SL0 = this.ringSeeds('cyan',c0,1*Math.PI,'ring0');
//	return SL0;	
  let SL1 = this.ringSeeds('transparent',c1,Math.PI,'ring1');
  let SL2 = this.ringSeeds('transparent',c2,Math.PI,'ring2');
	return this.concatEachArray([SL0,SL1,SL2]);
}


  
rs.initialize = function () {
  debugger;
  core.root.backgroundColor = 'black';
  this.setupColorRandomizer({step:10,min:150,max:240});
	this.initializeDrop();
	return;
	let {circleP,ringRadius} = this;
	let circle = circleP.instantiate();
	circle.dimension = 2*ringRadius;
	circle.show();
	this.set('circle',circle);
}

return rs;

});

