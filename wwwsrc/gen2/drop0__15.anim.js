
core.require('/gen0/drop0.js','/gen0/animation.js',function (addDropMethods,addAnimationMethods) {

let rs = svg.Element.mk('<g/>');
addDropMethods(rs);
addAnimationMethods(rs);
rs.setName('drop0__15.anim');
let wd = 200;
let topParams = {width:wd,height:wd,maxDrops:100,maxTries:100,lineLength:2,backgroundColor:'rgb(2,2,2)',backgroundPadding:20,minSeparation:10,numTimeSteps:60}

Object.assign(rs,topParams);


rs.finishProtos = function () {
	this.lineP.stroke = 'white';
	this.lineP.stroke = 'yellow';
	this.lineP['stroke-width'] = .1;
	this.lineP['stroke-width'] = .3;
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
  //debugger;
	return [[eseg],[ln]];
}
 

rs.initialize = function () {
  core.root.backgroundColor = 'black';
  let r0 = geom.Rectangle.mk(Point.mk(-100,-100),Point.mk(100,100));
  let r1 = geom.Rectangle.mk(Point.mk(0,-100),Point.mk(100,100));
  let r2 = geom.Rectangle.mk(Point.mk(-100,0),Point.mk(100,100));
  let r3 = geom.Rectangle.mk(Point.mk(0,0),Point.mk(100,100));
 // this.rectangles = [r0,r1,r2,r3];
	this.initializeDrop();
}


rs.step = function () {
	let {timeStep:ts,numTimeSteps:nts,maxDrops} = this;
	if (ts >= 0.5*nts-2) {
		debugger;
   this.removeSegmentsAndLines(maxDrops);
	 //this.draw();
	} else {
	 this.addRandomSegments();
	}
}	

rs.animate = function (resume) {
	this.animateIt(this.numTimeSteps,100,resume);
			dom.svgDraw();

}

return rs;

});

