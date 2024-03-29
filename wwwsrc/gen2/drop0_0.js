//active
core.require('/line/line.js','/gen0/Basics.js','/mlib/drop0.js',function (linePP,rs,addDropMethods) {

addDropMethods(rs);
rs.setName('drop0_0');
let wd = 200;
let topParams = {width:wd,height:wd,maxDrops:10000,maxTries:100,lineLength:2,backStripeColor:'rgb(2,2,2)',backStripePadding:20,backStripeVisible:0,minSeparation:10}
topParams = {width:wd,height:wd,maxLoops:10000000,maxDrops:1000000000,maxTries:100,lineLength:2,backStripeColor:'rgb(2,2,2)',backStripePadding:20,backStripeVisible:0,minSeparation:10}

Object.assign(rs,topParams);


rs.initProtos = function () {
	let lineP = this.set('lineP',linePP.instantiate()).hide();
	lineP.stroke = 'yellow';
	lineP['stroke-width'] = .3;
}  

rs.initialSegments = function () {
  let {width,height} = this; 
  let segs = this.rectangleSegments(width,height);
 /* let hw = 0.5*width;
  let hh = 0.5*width;
  let sg0 = LineSegment.mk(Point.mk(-hw,-hh),Point.mk(hw,-hh));
  let sg1 = LineSegment.mk(Point.mk(-hw,hh),Point.mk(hw,hh));
  let sg2 = LineSegment.mk(Point.mk(-hw,-hh),Point.mk(-hw,hh));
  let sg3 = LineSegment.mk(Point.mk(hw,-hh),Point.mk(hw,hh));
  let segs = [sg0,sg1,sg2,sg3];*/
  let lines = segs.map((sg) => this.genLine(sg));  
  return [segs,lines];
}

rs.segParams = function () {
  let r = Math.random();
  let np = 4;
  let angle = Math.floor(r*np)* (Math.PI/np)
  let length = 2 + Math.floor(r*np)*4;
  
 // let rs = r>0.5?Math.PI/2:0;
  return {angle,length};
}
rs.genSegments = function (p) {
  let {minSeparation:sep} = this;
	let len,angle;
	if (this.segParams) {
		let segP = this.segParams();
		if (segP.length) {
			len = segP.length;
		}
		if (segP.angle !== undefined) { 
			angle = segP.angle;
		}
	}
  //let p = this.genRandomPoint();
	let seg = this.genSegment(p,len,angle);
	let ln = this.genLine(seg);
	let eseg = this.genSegment(p,len+sep,angle);
  debugger;
	return [[eseg],[ln]];
}
 

rs.initialize = function () {
  core.root.backgroundColor = 'black';
	this.initProtos();
	this.addBackStripe();
  let r0 = geom.Rectangle.mk(Point.mk(-100,-100),Point.mk(100,100));
  let r1 = geom.Rectangle.mk(Point.mk(0,-100),Point.mk(100,100));
  let r2 = geom.Rectangle.mk(Point.mk(-100,0),Point.mk(100,100));
  let r3 = geom.Rectangle.mk(Point.mk(0,0),Point.mk(100,100));
 // this.rectangles = [r0,r1,r2,r3];
	this.initializeDrop();
}

return rs;

});

