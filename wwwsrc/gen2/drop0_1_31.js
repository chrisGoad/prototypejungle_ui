 https://zoom.us/j/81090675083?pwd=bmh1QVkwUUxFTE9tTHZ1SUoxakpJUT09
core.require('/gen1/drop0_1.js','/line/line.js','/shape/zigzag.js',function (rs,linePP,zigzagPP) {

//let rs = svg.Element.mk('<g/>');
//addCgonMethods(rs);
rs.setName('drop0_1_31');
let ht = 5000;
//ht = 50;
let topParams = {width:1.5*ht,height:ht,maxDrops:2000,maxTries:100,lineLength:2,backgroundColor:'rgb(20,2,2)',backgroundPadding:0.1*ht,minSeparation:0}
//topParams = {width:50,height:50,maxDrops:1000,maxTries:10,lineLength:2,backgroundColor:undefined,minSeparation:0}

topParams = {width:ht,height:ht,numRows:20,numCols:30,maxDrops:10000,maxTries:10,endLoopss:10000,lineLength:50,backgroundColor:'rgb(2,2,2)',backgroundPadding:0.1*ht,separation:0,randomDirectionChange:0.03*Math.PI,fromEnds:1,sepNext:.1,lineExt:.2,onlyFromSeeds:1,extendWhich:'random',numSeeds:10,splitChance:0.5,splitAmount:0.08 * Math.PI,directionChange:0.025 * Math.PI}
Object.assign(rs,topParams);


rs.finishProtos = function () {
	core.assignPrototypes(this,'lineP',linePP);
	//return;
	this.lineP.stroke = 'white';
	this.lineP['stroke-width'] = 15;
	this.lineP['stroke-width'] = 15;
	core.assignPrototypes(this,'zigzagP',zigzagPP);
	this.zigzagP.stroke = 'cyan';
	this.zigzagP.height = 0.9*ht;
	this.zigzagP.width = ht/6;
	this.zigzagP.width = ht/10;
	this.zigzagP.zigwidth = ht/32;
	this.zigzagP.numzigs = 8;
	this.zigzagP.location =  Point.mk(0,0);// Point.mk(ht/2,0);
	this.zigzagP.fill = 'gray';
	this.zigzagP.fill = 'red';
		this.zigzagP['stroke-width'] = 1;

	

}  


rs.genSeeds = function () {
 debugger;
  let leftseeds =this.leftSideSeeds('cyan');
  let rightseeds =this.rightSideSeeds('cyan');

	let grs = this.concatEachArray([leftseeds,rightseeds]);
	///return seeds;
	return grs;
}


rs.initialSegments = function () {
	debugger;
  let {width,height,zig0,zig1} = this; 
	let zigzag0 = this.zigzagP.instantiate();
	zigzag0.show();
	this.set('zig0',zigzag0);
	//this.set('zig1',zigzag1);
	zigzag0.update();
	let segs = [];
	let lines = [];
	
	debugger;
	let zsegs0 = zigzag0.segments;
	segs.push(...zsegs0);
  return [segs,lines];
}
rs.genSegments = function (p) {
  return this.genSegmentsFan(p,'white');
}
	
	
	
rs.genSegmentss = function (p) {
	let sep = 100;
	let len = 200;
	let angle = Math.random() > 0.2?0.5 * Math.PI:0.75*Math.PI;
  //let p = this.genRandomPoint();
	let seg = this.genSegment(p,len,angle);
	let ln = this.genLine(seg);
	ln.stroke = 'yellow';
	ln.stroke = 'gray';
	let eseg = this.genSegment(p,len+sep,angle);
  debugger;
	return [[eseg],[ln]];
}

rs.initialize = function () {
	debugger;
  core.root.backgroundColor = 'rgb(200,0,0)';
  core.root.backgroundColor = 'rgb(0,0,0)';
	this.initProtos();
		this.initializeDrop();
		
}


	

  

return rs;

});

