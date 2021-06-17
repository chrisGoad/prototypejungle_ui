
core.require('/shape/rectangle.js','/gen0/drop0.js',function (rectPP,addDropMethods) {

let rs = svg.Element.mk('<g/>');
addDropMethods(rs);
rs.setName('drop0_19');
let ht= 2000;
let topParams = {width:ht,height:ht,maxDrops:50000,maxTries:100,lineLength:2,backgroundColor:'rgb(2,2,2)',backgroundPadding:20,minSeparation:20}

Object.assign(rs,topParams);


rs.finishProtos = function () {
	this.lineP.stroke = 'white';
	this.lineP.stroke = 'yellow';
	this.lineP['stroke-width'] = .1;
	this.lineP['stroke-width'] = .3;
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
	let wd =20 + Math.random()*35;
	let ht =10 + Math.random()*15;
	if (p.x > 0) {
		let tmp = ht;
		ht = wd;
		wd = tmp;
	}
	//let ht =10;
//	let sep = 10;
	let extent = Point.mk(wd+sep,ht+sep);
	let grect = geom.Rectangle.mkCentered(p,extent);
	let srect = this.rectP.instantiate();
	srect.width = wd;
	srect.height = ht;
	srect.moveto(p);
	if (Math.random() < 0) {
		srect.fill = rclr;
	}
	return [grect,srect];
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

return rs;

});

