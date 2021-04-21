
core.require('/gen0/drop0.js','/shape/rectangle.js',function (addDropMethods,rectPP) {

let rs = svg.Element.mk('<g/>');
addDropMethods(rs);
rs.setName('drop0_1');
let topParams = {width:300,height:300,maxDrops:10000,maxTries:100,lineLength:2,backgroundColor:'rgb(2,2,2)',backgroundPadding:40,minSeparation:0,}
//topParams = {width:50,height:50,maxDrops:1000,maxTries:10,lineLength:2,backgroundColor:undefined,minSeparation:0}

Object.assign(rs,topParams);


rs.finishProtos = function () {
	this.lineP.stroke = 'white';
	//this.lineP.stroke = 'black';
	//this.lineP.stroke = 'yellow';
	this.lineP['stroke-width'] = .1;
	this.lineP['stroke-width'] = .5;
	core.assignPrototypes(this,'rectP0',rectPP);
	this.rectP0.fill = 'white';
}  

rs.segParams = function () {
  let r = Math.random();
  let np = 4;
  let angle = Math.floor(r*np)* (Math.PI/np)
  let length = 2 + Math.floor(r*np)*4;
  
 // let rs = r>0.5?Math.PI/2:0;
  return {angle,length};
}
/*
rs.initialSegments = function () {
  let {width,height} = this; 
  let hw = 0.5*width;
  let hh = 0.5*width;
  let sg0 = LineSegment.mk(Point.mk(-hw,-hh),Point.mk(hw,-hh));
  let sg1 = LineSegment.mk(Point.mk(-hw,hh),Point.mk(hw,hh));
  let sg2 = LineSegment.mk(Point.mk(-hw,-hh),Point.mk(-hw,hh));
  let sg3 = LineSegment.mk(Point.mk(hw,-hh),Point.mk(hw,hh));
  let segs = [sg0,sg1,sg2,sg3];
  let lines = segs.map((sg) => this.genLine(sg));  
  return [segs,lines];
}
*/



rs.genSegments = function (p) {
  let sizes = [2,5,10,20,40];
  let which = Math.floor(Math.random()*5);
  let sz = sizes[which];
  let wd = sz;
  let ht = sz;
//  debugger;
  let segs = this.rectangleSegments(wd,ht,p);
  let lines = segs.map((sg) => this.genLine(sg));

  const genRGBval = function () {
    return 50 + Math.floor(Math.random()*202);
  }
  let r = genRGBval();
  let g = genRGBval();
  let b = genRGBval();
  let clr = `rgb(${r},${r},${r})`;
  //lines.forEach( (line) => line.stroke = clr);
	if (which !== 8) {
    lines.forEach( (line) => line.stroke = 'transparent');
	}
	if (which < 2) {
		let rect = this.rectP0.instantiate();
		rect.width = wd;
		rect.height = ht;
	//	let gRect = Rectangle.mk(Point.mk(p.x-0.5*wd,p.y-0.5*ht),Point.mk(wd,ht));
	//	this.gRects.push(gRect);
		rect.show();
		rect.fill  = clr;
		lines.push(rect);
		rect.moveto(p);
	}

  return [segs,lines];
}


rs.initialSegments = function () {
  let {width,height} = this; 
  let segs = this.rectangleSegments(width,height);
  let lines = segs.map((sg) => this.genLine(sg)); 
  return [segs,lines];
}

rs.initialize = function () {
  core.root.backgroundColor = 'black';
  /*let r0 = geom.Rectangle.mk(Point.mk(-100,-100),Point.mk(100,100));
  let r1 = geom.Rectangle.mk(Point.mk(0,-100),Point.mk(100,100));
  let r2 = geom.Rectangle.mk(Point.mk(-100,0),Point.mk(100,100));
  let r3 = geom.Rectangle.mk(Point.mk(0,0),Point.mk(100,100));
  this.rectangles = [r0,r1,r2,r3];*/
	this.initializeDrop();
}

return rs;

});

