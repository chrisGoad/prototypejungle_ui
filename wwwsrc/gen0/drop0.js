
//core.require('/gen0/animation.js','/shape/rectangle.js',function (addAnimationMethods,rectangleP) {
core.require('/gen0/animation.js','/shape/rectangle.js','/line/line.js',function (addAnimationMethods,rectanglePP,linePP) {

//core.require(function () {
 return function (rs) {
	// debugger;
//let item = svg.Element.mk('<g/>');
addAnimationMethods(rs);

/*adjustable parameters  */
let topParams = {width:100,height:100,maxDrops:10,maxTries:5,lineLength:10,backgroundColor:undefined,minSeparation:5}

Object.assign(rs,topParams);

/* end */

/*for shapes */


      
rs.collides0 = function (point1,radius1,point2,radius2) {
  let p1x = point1.x;
  let p1y = point1.y;
  let p2x = point2.x;
  let p2y = point2.y;
  let minDist =  radius1 + radius2 + this.minSeparation;
  if (Math.abs(p2x - p1x) >=  minDist) {return false;}
  if (Math.abs(p2y - p1y) >= minDist) {return false;}
  let d = point1.distance(point2);
  return minDist >= d;
}



rs.collides = function (point,radius) {
 // initializer(this);
  let {points,radii} = this;
  let n = points.length;
  for (let i=0;i<n;i++) {
    if (this.collides0(point,radius,points[i],radii[i])) {
      return true;
    }
  }
  return false
}

rs.collidesWithSegments = function (point,radius) {
  let segments = this.segments;
  if (!segments) {
    return false;
  }
  let circle = geom.Circle.mk(point,radius*1.5);
  let ln = segments.length;
  for (let i=0;i<ln;i++) {
    let seg = segments[i];
    if (!seg) {
      continue;
    }
    let {end0,end1} = seg;
    let vec = end1.difference(end0);
    if (circle.intersectLine(end0,vec)) {
      return true;
    }
  }
}


rs.extendSegment = function (seg,ln) {

  let {end0,end1} = seg;
  debugger;
  let cnt= end0.plus(end1).times(0.5);
  let vec = end1.difference(end0);
  let len = vec.length();
  let nlen = ln+len;
  let hnvec = vec.times(nlen/(2*len));
  let e0 = cnt.difference(hnvec);
  let e1 = cnt.plus(hnvec);
  return LineSegment.mk(e0,e1);
}
  


rs.genRandomPoint = function (rect) {
  if (rect) {
    let {corner,extent} = rect;
    let lx = corner.x;
    let ly = corner.y;
    let x = Math.random() * extent.x + lx;
    let y = Math.random() * extent.y + ly;
    return Point.mk(x,y);
  }
  let {width,height} = this;
  let rx = (Math.random()-0.5) * width;
   let ry= (Math.random()-0.5) * height;
  return Point.mk(rx,ry);
}


rs.genSegment = function (cnt,ln,angle) {
  let vec = Point.mk(Math.cos(angle),Math.sin(angle));
  let hln = ln/2
  let hvec = vec.times(hln);
  let e0 = cnt.difference(hvec);
  let e1 = cnt.plus(hvec);
  return LineSegment.mk(e0,e1);
}

  

rs.segmentIntersects = function (seg) {
  let {segments} = this;
  let ln = segments.length;
  for (let i=0;i<ln;i++) {  
    let ip = seg.intersect(segments[i]);
    if (ip) {
      return true;
    }
  }
}

rs.addRandomSegments = function () {
  let {maxDrops,maxTries,segments,lineLength,minSeparation:sep,extendedSegments,shapes} = this;
  if (!this.genSegments) {
    return;
  }
  let numDropped = 0;
  let tries = 0;
  debugger;
  while (true) {
		let p = this.genRandomPoint(); 
		debugger;
		let segsAndLines = this.genSegments(p);
		let [segs,lines] = segsAndLines;
		let ifnd = 0;
		let sln = segs.length;
		for (let i=0;i<sln;i++) {
			let seg = segs[i];
			if (this.segmentIntersects(seg,sep)) {
				ifnd = true;
				break;
			}
		}
		if (ifnd) {
			tries++;
			if (tries === maxTries) {
				return numDropped;
			}
		} else {
			numDropped += sln;
			tries = 0;
			this.installSegmentsAndLines(segsAndLines);
			if (numDropped >= maxDrops) {
				return numDropped;
			}    
    } 
  }
}


rs.genLine = function (lsg) {
  let line = this.lineP.instantiate();
  let {end0,end1} = lsg;
  line.setEnds(end0,end1);
  return line;
}
 
rs.installLine = function (line) {
  this.shapes.push(line);
  line.show();
  line.update();
  return line;
}

rs.installSegmentsAndLines = function (seglines) {
  let {segments} = this;
  let [segs,lines] = seglines;
  segs.forEach( (seg) => segments.push(seg));
  lines.forEach( (line) => this.installLine(line));
}



const dSeg = function (e0,e1,p) { // displaced seg
  return LineSegment.mk(e0.plus(p),e1.plus(p));
}
rs.segsFromPoints = function (pnts,p) {
  debugger;
  let ln = pnts.length;
  let segs = [];
  let p0,p1;
  for (let i=0;i<ln-1;i++) {
    if (i === 0) {
     p0 = p?pnts[i].plus(p):pnts[i];
    } else {
      p0 = p1;
    }
    p1 = p?pnts[i+1].plus(p):pnts[i+1];
    let sg = LineSegment.mk(p0,p1);
    segs.push(sg);
  }
  return segs;
}

rs.rectangleSegments = function (wd,ht,center) {
  let hwd = 0.5 * wd;
  let hht = 0.5 * ht;
  let UL = Point.mk(-hwd,-hht);
  let UR = Point.mk(hwd,-hht);
  let LR = Point.mk(hwd,hht);
  let LL = Point.mk(-hwd,hht);
  let points = [UL,UR,LR,LL,UL];
  return this.segsFromPoints(points,center);
}
      
rs.sizedRectangleSegments = function (sizes,p,square) {
  debugger;
  let ln = sizes.length;
  let whichWd = Math.floor(Math.random()*ln);
  let whichHt = Math.floor(Math.random()*ln);
  let wd = sizes[whichWd];
  let ht = square?sizes[whichWd]:whichHt;
  let segs = this.rectangleSegments(wd,ht,p);
  return segs;
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
  let segs =this.segsFromPoints(pnts,p);
  return segs;
}

rs.initProtos = function () {
	core.assignPrototypes(this,'lineP',linePP);
	this.lineP.stroke = 'white';
	this.lineP['stroke-width'] = 1;
	if (this.finishProtos) {
		this.finishProtos();
	}
}  

rs.initializeDrop = function () {
  debugger;
  let {rectangles} = this;
  this.initProtos();
  this.segments = [];
  this.extendedSegments = [];
  this.set('shapes',core.ArrayNode.mk());
  if (this.initialSegments) {
    let isegs = this.initialSegments();
    this.installSegmentsAndLines(isegs);
  }
  this.addRandomSegments();
 }
  
}});

      
