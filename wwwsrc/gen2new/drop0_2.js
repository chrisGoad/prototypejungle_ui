
core.require('/gen0/drop0.js',function (addDropMethods) {

let rs = svg.Element.mk('<g/>');
addDropMethods(rs);
rs.setName('drop0_2');
let ht = 200;
let wd =1.5*ht;
let bkp =20;
let topParams = {width:wd,height:ht,maxDrops:100000,maxTries:100,lineLength:2,backgroundWidth:wd+bkp,backgroundHeight:ht+bkp,backgroundColor:'rgb(100,0,0)',minSeparation:0}
topParams = {width:wd,height:ht,maxDrops:10000,maxTries:10,lineLength:2,backgroundWidth:wd+bkp,backgroundHeight:ht+bkp,backgroundColor:'rgb(70,0,0)',minSeparation:0}

Object.assign(rs,topParams);


rs.finishProtos = function () {
	this.lineP.stroke = 'white';
	this.lineP.stroke = 'yellow';
	this.lineP['stroke-width'] = .1;
	this.lineP['stroke-width'] = .3;
}  

rs.segParams = function () {
  let r = Math.random();
  let np = 4;
  let angle = Math.floor(r*np)* (Math.PI/np)
  let length = 2 + Math.floor(r*np)*4;
  
 // let rs = r>0.5?Math.PI/2:0;
  return {angle,length};
}

rs.initialSegmentss = function () {
  let {width,height} = this; 
	debugger;
	let segs = this.rectangleSegments(width,height);
/*
  let hw = 0.5*width;
  let hh = 0.5*;
  let sg0 = LineSegment.mk(Point.mk(-hw,-hh),Point.mk(hw,-hh));
  let sg1 = LineSegment.mk(Point.mk(-hw,hh),Point.mk(hw,hh));
  let sg2 = LineSegment.mk(Point.mk(-hw,-hh),Point.mk(-hw,hh));
  let sg3 = LineSegment.mk(Point.mk(hw,-hh),Point.mk(hw,hh));
  let sg4 = LineSegment.mk(Point.mk(-hw,-hh),Point.mk(hw,hh));
  let sg5 = LineSegment.mk(Point.mk(hw,-hh),Point.mk(-hw,hh));
 // let segs = [sg0,sg1,sg2,sg3,sg4,sg5];
  let segs = [sg0,sg1,sg2,sg3];*/
  let lines = segs.map((sg) => this.genLine(sg.end0,sg.end1)); 
   // lines.forEach( (line) => line.stroke = 'transparent');

  return [segs,lines];
}

/*const dSeg = function (e0,e1,p) { // displaced seg
  return LineSegment.mk(e0.plus(p),e1.plus(p));
}
const segsFromPoints = function (pnts,p) {
  debugger;
  let ln = pnts.length;
  let segs = [];
  let p0,p1;
  for (let i=0;i<ln-1;i++) {
    if (i === 0) {
     p0 = pnts[i].plus(p);
    } else {
      p0 = p1;
    }
    p1 = pnts[i+1].plus(p);
    let sg = LineSegment.mk(p0,p1);
    segs.push(sg);
  }
  return segs;
}*/
/*
rs.wigglySegments = function (vertical,widths,heightRatio,numSegs,p) {
  let ln = widths.length;
  let which = Math.floor(Math.random()*ln);
  let wd = widths[which];
  let ht = heightRatio*wd;
  let hht = 0.5*ht;
  let pnts = [];
  let sgwd = wd/numSegs;
  let xp = 0;
  for (let i = 0;i<numSegs+1;i++) {
     let y = (Math.random()-0.5)*ht;
     let pnt = vertical?Point.mk(y,xp):Point.mk(xp,y);
     pnts.push(pnt);
     xp+= sgwd;
  }
  let segs = segsFromPoints(pnts,p);
  return segs;
}
*/

rs.genSegments = function (p) {
	let vertical = Math.random()>0.5;
  let segs = this.wigglySegments({vertical,widths:[10,20,50],heightRatio:0.05,numSegs:15,pos:p});
	//this.wigglySegments(0,[10,20,50],0.05,15,p);
  //let segs = Math.random()>0.5?this.wigglySegments({1, [10,20,50],0.05,15,p):this.wigglySegments(0,[10,20,50],0.05,15,p);
 // let segs = Math.random()>0.9?this.rectangleSegments([2,5,10,40,40],p,1):this.wigglySegments([20,50],0.13,15,p);
 // let segs =Math.random()>0.5?this.rectangleSegments([2,5,10,40,40],p,1): this.triangleSegments([2,5,10,40,40],p,1);
  let lines = segs.map((sg) => this.genLine(sg));
  const genRGBval = function () {
    return 155 + Math.floor(Math.random()*100);
  }
  let r = genRGBval();
  let g = genRGBval();
  let b = genRGBval();
  let clr = `rgb(${r},${r},${b})`;
  lines.forEach( (line) => line.stroke = clr);
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

