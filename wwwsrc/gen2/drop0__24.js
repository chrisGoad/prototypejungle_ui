
core.require('/shape/rectangle.js','/shape/circle.js','/gen0/drop0.js',function (rectPP,circlePP,addDropMethods) {

let rs = svg.Element.mk('<g/>');
addDropMethods(rs);
rs.setName('drop0__24');
let ht= 2000;
ht = 3000;
let nrc=15;
let topParams = {numRows:nrc,numCols:nrc,width:ht,height:ht,maxDrops:50000,maxTries:100,lineLength:2,backgroundColor:'rgb(2,2,2)',backgroundPadding:20,minSeparation:20,maxConnectorLength:200}
topParams = {width:2*ht,height:2*ht,numRings:nrc,radius:ht,maxDrops:1000,maxTries:100,lineLength:2,backgroundColor:'rgb(2,2,2)',backgroundPadding:0.1*ht,minSeparation:20,maxConnectorLength:2000}

Object.assign(rs,topParams);


rs.finishProtos = function () {
	this.lineP.stroke = 'white';
	//this.lineP.stroke = 'yellow';
	this.lineP['stroke-width'] = .1;
	this.lineP['stroke-width'] = 6;
	let circleP = this.set('circleP',circlePP.instantiate()).hide();
  circleP.fill = 'transparent';
  circleP.stroke = 'red';
  this.circleP['stroke-width'] = 0;

	core.assignPrototypes(this,'rectP',rectPP);
	this.rectP.stroke= 'white';
	this.rectP.fill = 'rgb(50,0,0)';
	this.rectP['stroke-width'] = 2;
}  

rs.initialSegmentss = function () {
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
	let rc = () => Math.random() * 255;
	let rclr = `rgb(${rc()},${rc()},${rc()})`;
	let rd =(Math.random()>.9)?20:10 ;//+ Math.random()*35;
	rd = 30;
	let gcrc = geom.Circle.mk(p,rd);
	let scrc = this.circleP.instantiate();
	scrc.dimension = 2*rd;
	scrc.moveto(p);
	//scrc.fill = 'white';
	return [gcrc,scrc];
}
 

rs.initialize = function () {
  core.root.backgroundColor = 'black';
	debugger;
	let {numRings,radius} = this;
  let r0 = geom.Rectangle.mk(Point.mk(-100,-100),Point.mk(100,100));
  let r1 = geom.Rectangle.mk(Point.mk(0,-100),Point.mk(100,100));
  let r2 = geom.Rectangle.mk(Point.mk(-100,0),Point.mk(100,100));
  let r3 = geom.Rectangle.mk(Point.mk(0,0),Point.mk(100,100));
	let pnts = [];
	let dr = radius/numRings;
	let da = (2*Math.PI/numRings)
  let rnd = 100;
	let r = radius;
  for (let i = 0;i<numRings;i++) {
		let angle = 0;

		for (let j = 0;j<numRings;j++) {
			let rr = r + rnd*(Math.random()-0.5);
			let p = Point.mk( Math.cos(angle)*rr,Math.sin(angle)*rr);
			pnts.push(p);
			angle += da;
		}
		r -= dr;
	}

	debugger;
 // this.rectangles = [r0,r1,r2,r3];
	this.initializeDrop();
	this.addConnectors(pnts);
}

return rs;

});

