
core.require('/gen0/drop0.js',function (addDropMethods) {

let rs = svg.Element.mk('<g/>');
addDropMethods(rs);
rs.setName('drop0_3');
let topParams = {width:200,height:200,maxDrops:100000,maxTries:100,lineLength:2,backgroundColor:undefined,minSeparation:0}

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

rs.initialSegments = function () {
  let {width,height} = this; 
  let hw = 0.5*width;
  let hh = 0.5*width;
  let sg0 = LineSegment.mk(Point.mk(-hw,-hh),Point.mk(hw,-hh));
  let sg1 = LineSegment.mk(Point.mk(-hw,hh),Point.mk(hw,hh));
  let sg2 = LineSegment.mk(Point.mk(-hw,-hh),Point.mk(-hw,hh));
  let sg3 = LineSegment.mk(Point.mk(hw,-hh),Point.mk(hw,hh));
  let sg4 = LineSegment.mk(Point.mk(-hw,-hh),Point.mk(hw,hh));
  let sg5 = LineSegment.mk(Point.mk(hw,-hh),Point.mk(-hw,hh));
 // let segs = [sg0,sg1,sg2,sg3,sg4,sg5];
  let segs = [sg0,sg1,sg2,sg3];
  let lines = segs.map((sg) => this.genLine(sg)); 
   // lines.forEach( (line) => line.stroke = 'transparent');

  return [segs,lines];
}

const dSeg = function (e0,e1,p) { // displaced seg
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
}

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
      
rs.rectangleSegments = function (sizes,p,square) {
  debugger;
  let ln = sizes.length;
  let whichWd = Math.floor(Math.random()*ln);
  let whichHt = Math.floor(Math.random()*ln);
  let wd = sizes[whichWd];
  let ht = square?sizes[whichWd]:whichHt;
  let sg0 = dSeg(Point.mk(0,0),Point.mk(wd,0),p);
  let sg1 = dSeg(Point.mk(0,ht),Point.mk(wd,ht),p);
  let sg2 = dSeg(Point.mk(0,0),Point.mk(0,ht),p);
  let sg3 = dSeg(Point.mk(wd,0),Point.mk(wd,ht),p);
  return [sg0,sg1,sg2,sg3];
}

rs.triangleSegments = function (sizes,p,sameHt) {
  debugger;
  let ln = sizes.length;
  let whichWd = Math.floor(Math.random()*ln);
  let whichHt = Math.floor(Math.random()*ln);
  let wd = sizes[whichWd];
  let ht = sameHt?sizes[whichWd]:whichHt;
  let sg0 = dSeg(Point.mk(0,0),Point.mk(wd/2,-ht),p);
  let sg1 = dSeg(Point.mk(wd/2,-ht),Point.mk(wd,0),p);
  let sg2 = dSeg(Point.mk(wd,0),Point.mk(0,0),p);
 
  return [sg0,sg1,sg2];
}
 
rs.genSegments = function (p) {
  let segs = (p.y < 0)?this.rectangleSegments([2,5,10,40,40],p,1):this.wigglySegments(0,[10,20,50],0.05,15,p);
 // let segs = Math.random()>0.5?this.wigglySegments(1, [10,20,50],0.05,15,p):this.wigglySegments(0,[10,20,50],0.05,15,p);
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

