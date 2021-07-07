
core.require('/shape/rectangle.js','/shape/circle.js','/gen0/drop0.js',function (rectPP,circlePP,addDropMethods) {

let rs = svg.Element.mk('<g/>');
addDropMethods(rs);
rs.setName('drop0__27');
let ht= 2000;
ht = 8000;
let topParams = {width:ht,height:ht,maxDrops:10000,maxTries:100,lineLength:2,backgroundColor:'rgb(2,2,2)',backgroundPadding:20,minSeparation:20,maxConnectorLength:200}
topParams = {width:ht,height:ht,maxDrops:10000,maxTries:100,lineLength:2,backgroundColor:'rgb(2,2,2)',backgroundPadding:20,minSeparation:20,minConnectorLength:1000,maxConnectorLength:1500,shortenBy:20}
topParams = {width:ht,height:ht,maxDrops:20000,maxTries:1000,lineLength:2,backgroundColor:'rgb(2,2,2)',backgroundPadding:20,minSeparation:20,minConnectorLength:300,maxConnectorLength:600,shortenBy:0,sphereCenter:Point3d.mk(0,0,-0.3*ht),sphereDiameter:0.5*ht,focalPoint:Point3d.mk(0,0,ht),focalLength:10,cameraScaling:1000}

Object.assign(rs,topParams);


rs.finishProtos = function () {
	this.lineP.stroke = 'white';
	//this.lineP.stroke = 'yellow';
	this.lineP['stroke-width'] = .1;
	this.lineP['stroke-width'] = 5;
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

rs.toPoint3d = function (p) {
	let {sphereCenter,sphereDiameter} = this;
	let p3d = p.to3d();
	let d = p3d.distance(sphereCenter);
  if (d < sphereDiameter) {
		let v = p3d.difference(sphereCenter).normalize();
	  let sp = v.times(sphereDiameter).plus(sphereCenter);
		sp.category = 'onSphere';
		//console.log('hid a point');
		return sp;
	} else {		
		return undefined;
	}
}

rs.pointsTo3dAndBack = function (pnts) {
	let rs = [];
	pnts.forEach((p) => {
		let p3d = this.toPoint3d(p);
		if (!p3d) {
			debugger;
		}
		if (p3d) {
			let ppnt = this.camera.project(p3d);
			rs.push(ppnt);
		}
	});
	return rs;
}
 

rs.initialize = function () {
	let {focalPoint,focalLength,cameraScaling} = this;
  core.root.backgroundColor = 'black';
  let r0 = geom.Rectangle.mk(Point.mk(-100,-100),Point.mk(100,100));
  let r1 = geom.Rectangle.mk(Point.mk(0,-100),Point.mk(100,100));
  let r2 = geom.Rectangle.mk(Point.mk(-100,0),Point.mk(100,100));
  let r3 = geom.Rectangle.mk(Point.mk(0,0),Point.mk(100,100));
 // this.rectangles = [r0,r1,r2,r3];
  //this.zone = geom.Circle.mk(Point.mk(0,0),0.5*this.width);
	this.initializeDrop();
	let pnts = this.pointsFromCircleDrops();
	this.camera = geom.Camera.mk(focalPoint,focalLength,cameraScaling,'z');

  let pnts3d = this.pointsTo3dAndBack(pnts);
	debugger;
	this.addConnectors(pnts3d);
}

return rs;

});

