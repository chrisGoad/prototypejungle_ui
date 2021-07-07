ore.require('/gen0/basics.js','/gen0/topRandomMethods.js','/gen0/animation.js',function (rectPP,addBasicMethods,addTopRandomMethods,addAnimationMethods) {

  return function (item) {
 
addAnimationMethods(item);
addBasicMethods(item);
addTopRandomMethods(item);

let rs = svg.Element.mk('<g/>');
addDropMethods(rs);
rs.setName('drop0__23');
let ht= 2000;
ht = 2000;
let nrc=10;
let topParams = {numRows:nrc,numCols:nrc,width:ht,height:ht,maxDrops:50000,maxTries:100,lineLength:2,backgroundColor:'rgb(200,2,2)',backgroundPadding:20,minSeparation:20,maxConnectorLength:200}
topParams = {numRows:nrc,numCols:nrc,width:ht,height:ht,maxDrops:1000,maxTries:100,lineLength:2,backgroundColor:'rgb(200,2,2)',backgroundPadding:20,minSeparation:20,maxConnectorLength:1000}

Object.assign(rs,topParams);


rs.finishProtos = function () {
	this.lineP.stroke = 'white';
	//this.lineP.stroke = 'yellow';
	this.lineP['stroke-width'] = .1;
	this.lineP['stroke-width'] = 2;
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
	let {width,height,numRows,numCols} = this;
  let r0 = geom.Rectangle.mk(Point.mk(-100,-100),Point.mk(100,100));
  let r1 = geom.Rectangle.mk(Point.mk(0,-100),Point.mk(100,100));
  let r2 = geom.Rectangle.mk(Point.mk(-100,0),Point.mk(100,100));
  let r3 = geom.Rectangle.mk(Point.mk(0,0),Point.mk(100,100));
	let pnts = [];
	let dx = width/numRows;
	let dy = height/numCols;
	let x = (dx-width)/2;
	let y;
	let b = 3;
	let hwp = (numRows/2)-1;
	for (let i = 0;i<numRows;i++) {
		y = (dy-height)/2;
		let iob = ((i>(hwp-b)) && (i<(hwp + b)));
		for (let j=0;j<numCols;j++) {
			let job = ((j>(hwp-b)) && (j<(hwp + b)));
			let p = Point.mk(x,y);
			//if (!(iob && job)) {
			if (!iob) {
			  pnts.push(p);
			}
			y += dy;
		}
		x += dx;
	}
	debugger;
 // this.rectangles = [r0,r1,r2,r3];
	this.initializeDrop();
	this.addConnectors(pnts);
}

return rs;

});

