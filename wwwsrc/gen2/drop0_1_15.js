
//core.require('/gen0/drop0.js',function (addDropMethods) {
core.require('/gen1/drop0_1.js','/shape/circle.js',function (rs,circlePP) {

rs.setName('drop0_1_15');
let topParams = {width:400,height:400,numRows:20,numCols:30,numSeedRows:10,numSeedCols:10,maxDrops:10000,maxTries:10,lineLength:5,backgroundColor:'rgb(100,0,0)',/*'rgb(100,1,1)',*/backgroundPadding:40,separation:0.5,fromEnds:1,sepNext:1,onlyFromSeeds:1,extendWhich:'random',numSeeds:1000,splitChance:0.2,splitAmount:0.03 * Math.PI,endLoops:30000,fanAngles:[0]}

Object.assign(rs,topParams);


rs.finishProtos = function () {
	this.lineP.stroke = 'white';
	this.lineP.stroke = 'transparent';
	//this.lineP.stroke = 'yellow';
	//this.lineP.stroke = 'black';
	this.lineP['stroke-width'] = .1;
	this.lineP['stroke-width'] = .6;
	this.lineP['stroke-width'] = 1;
	core.assignPrototypes(this,'circleP',circlePP);
	this.circleP.fill = 'rgb(100,100,100)';
	this.circleP.fill = 'rgb(0,100,100)';
	this.circleP.fill = 'rgb(2,2,2)';
}


let ccnt = 0;

rs.genSegments = function (p) {
  debugger;
	console.log('GGeneration',p.generation);
	if (p.generation > 8	) {
		return undefined;
	}
  let {r,g,b} = this.randomizerColor(p);
	let clr = `rgb(${r},${g},${b})`;
	//let colors = ['red','green','blue','yellow','cyan','magenta'];
	//let clr = colors[ccnt]
//	let clr = this.randomArrayElement();
	let tries = 0;
	while (tries < 10) {
	  let dir = this.randomDirection(4);
		let pi = Math.PI;
		//let dir = this.randomArrayElement([0,0.5*pi,-0.5*pi]);
		let which;
		if (p.data) {
			 which = p.data;
		} else {
			which = (Math.random() < 0.5)?'UP':'DOWN';
		}
		//let dir = this.randomArrayElement([0,which==='DOWN'?0.5*pi:-0.5*pi]);
		p.data = which;
  	let rs = this.genOneSegment(p,dir,clr);
    let [segs,lines] = rs
		let seg = segs[0];
		if (!this.segmentIntersects(seg)) {
			ccnt++;
			debugger;
			return rs;
		}
		tries++;
	}
	console.log('FAIL');
	
}

rs.concatEachArray = function (a,b) {
	 let [a0,a1]= a;
	 let [b0,b1]= b;
	 let c0 = a0.concat(b0);
	 let c1 = a1.concat(b1);
	 return [c0,c1];
}
	 

rs.genSeeds = function () {
  debugger;
	//return this.randomSeeds('white');
	return this.gridSeeds('white');
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

