
core.require('/gen0/DropSeedsRandom.js','/line/line.js',function (rs,linePP) {

rs.setName('drop0_1_24');
let ht = 360;
let wd = 1* ht;
//wd = ht; //for instagram
let topParams = {width:wd,height:ht,numSeedRows:2,numSeedCols:3,maxDrops:1000,maxTries:10,lineLength:5,backStripeColor:'rgb(2,2,2)',backStripePadding:0.1*ht,backStripeVisible:1,minSeparation:0,rectangleDim:0.8,gridPadding:60,fromEnds:1,sepNext:0.01,onlyFromSeeds:1,extendWhich:'first',numSeeds:60,splitChance:0,splitAmount:0.2 * Math.PI,endLoops:30000,seedDirections:[0.5*Math.PI],directionChange:0.02*Math.PI,randomDirectionChange:0.08*Math.PI}
topParams = {width:wd,height:ht,numSeedRows:0,numSeedCols:0,numRows:2,numCols:10,maxDrops:10000,maxTries:10,lineLength:5,backStripeColor:'rgb(2,2,2)',backStripePadding:0.1*ht,backStripeVisible:0,minSeparation:0,rectangleDim:0.2,gridPadding:60,fromEnds:1,sepNext:0.01,onlyFromSeeds:1,extendWhich:'first',splitChance:.40,splitAmount:0.05 * Math.PI,endLoops:3000,seedDirections:[0*Math.PI],directionChange:0.0*Math.PI,randomDirectionChange:0.051*Math.PI,lineExt:0,numSeeds:15}

//topParams = {width:50,height:50,maxDrops:1000,maxTries:10,lineLength:2,backgroundColor:undefined,minSeparation:0}

Object.assign(rs,topParams);


rs.initProtos = function () {
	 core.assignPrototypes(this,'lineP',linePP);
	this.lineP.stroke = 'white';
	//this.lineP.stroke = 'black';
	//this.lineP.stroke = 'yellow';
	this.lineP['stroke-width'] = .1;
	this.lineP['stroke-width'] = .5;
 // core.assignPrototypes(this,'rectP0',rectPP);
//this.rectP0.fill = 'blue';

}  

rs.segParams = function () {
  let r = Math.random();
  let np = 4;
  let angle = Math.floor(r*np)* (Math.PI/np)
  let length = 2 + Math.floor(r*np)*4;
  
 // let rs = r>0.5?Math.PI/2:0;
  return {angle,length};ho
}

rs.genSeedss = function () {
	let {width,height} = this;
	let hw = 0.5 * width;
	let hh = 0.5 * height;
	let [segs,lines] = this.gridSeeds('white');
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


rs.genSeeds = function () {
  debugger;
  let {width} = this;
  this.ringRadius = 0.15 * 0.5 * width;
  return this.ringSeeds('transparent');
}



rs.inArect = function (p) {
	let gRects = this.gRects;
	let ln = gRects.length;
	for (let i=0;i<ln;i++) {
		let gRect = gRects[i];
		if (gRect.contains(p)) {
			return true;
		}
	}
	return false;
}


rs.genSegments = function (p) {
  //debugger;
 // let {r,g,b} = this.randomizerColor(p);
//	let clr = `rgb(${r},${r},${r})`;
  let {numRows,numCols} = this;
	let hr = 0.5*numRows;
	let hc = 0.5*numCols;
  let cell = this.cellOf(p);
  let {x,y} = cell;
  debugger;
	let xd = x - hc;
	let yd = y - hr;
	let d = Math.sqrt(xd*xd+yd*yd);
	let maxD = Math.sqrt(hc*hc+hr*hr);
	let f = 1-d/maxD;
  let seed = p.seed;
	let params;
	if (0&&seed) {
		params = seed.params;
	} else {
		params = this.ourParams;
		if (!params) {
			this.ourParams = {};
		  Object.assign(this.ourParams,topParams);
			params = this.ourParams;
		}
		let d = Math.abs(x-hc);
		//params.directionChange = 0.01*x*Math.PI;
		console.log('x d hc',x,d,hc);
		params.directionChange = 0.01*d*Math.PI;
		params.splitAmount = 0.05*f*Math.PI;
	
			
	}
  return this.genSegmentsFan(p,'white',params);
//  return this.genSegmentsFan(p,clr);
}


rs.initialSegmentss = function () {
  let {width,height} = this; 
  let segs = this.rectangleSegments(width,height);
  let lines = segs.map((sg) => this.genLine(sg)); 
  return [segs,lines];
}

rs.initialize = function () {
  core.root.backgroundColor = 'black';
	//this.setupColorRandomizer({step:10,min:150,max:240});
  this.initProtos();
	this.addBackStripe();
	//this.gRects = [];
  /*let r0 = geom.Rectangle.mk(Point.mk(-100,-100),Point.mk(100,100));
  let r1 = geom.Rectangle.mk(Point.mk(0,-100),Point.mk(100,100));
  let r2 = geom.Rectangle.mk(Point.mk(-100,0),Point.mk(100,100));
  let r3 = geom.Rectangle.mk(Point.mk(0,0),Point.mk(100,100));
  this.rectangles = [r0,r1,r2,r3];*/
	this.initializeDrop();
}

return rs;

});

