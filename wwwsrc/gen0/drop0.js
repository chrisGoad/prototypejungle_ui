
//core.require('/gen0/animation.js','/shape/rectangle.js',function (addAnimationMethods,rectangleP) {
core.require('/gen0/animation.js','/gen0/basics.js','/gen0/topRandomMethods.js','/shape/rectangle.js','/line/line.js',
function (addAnimationMethods,addBasicMethods,addRandomMethods,rectanglePP,linePP) {

//core.require(function () {
 return function (rs) {
	// debugger;
//let item = svg.Element.mk('<g/>');
//addAnimationMethods(rs);
addBasicMethods(rs);
addRandomMethods(rs);

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


rs.genSegment = function (p,ln,angle,sep=0,sepNext=0,centered=1) {
  let vec = Point.mk(Math.cos(angle),Math.sin(angle));
  let e0,e1,end;
  if (centered) {
    let hln = (ln+sep)/2;
    let hvec = vec.times(hln);
    e0 = p.difference(hvec);
    e1 = p.plus(hvec);
  } else {
    e0 = p;
    end  = p.plus(vec.times(ln+sepNext));
    e1  =  p.plus(vec.times(ln+sep));
  }
  let rs = LineSegment.mk(e0,e1);
  if (p.isEnd) {
    rs.fromEnd = p;
  }
  if (end) {
    rs.end = end;
    end.direction = angle;
  }
  return rs;
}

rs.insideCanvas = function (p) {
  let {width,height} = this;
  let hw = 0.5*width;  
  let hh = 0.5*height;  
  let {x,y} = p;
  return (-hw < x) && (x < hw) && (-hh < y) && (y < hh);
}

rs.segmentIntersects = function (seg) {
  let {segments,width,height} = this;
  let {end0,end1} = seg;
  if ((!this.insideCanvas(end0)) || (!this.insideCanvas(end1))) {
    return true;
  }
  let ln = segments.length;
  for (let i=0;i<ln;i++) {  
    let ip = seg.intersect(segments[i]);
    if (ip) {
      return true;
    }
  }
}

rs.activeEnds = function () {
  let ends = this.ends;
  rs = [];
  ends.forEach((end) => {
    if (!(end.inactive)) {
      rs.push(end);
    }
  });
  return rs;
}

rs.addSegmentAtThisEnd = function (end) {
  let {maxDrops,maxTries,segments,lineLength,ends,minSeparation:sep,extendedSegments,shapes,fromEnds} = this;
  if (!this.genSegments) {
    return;
  }
  let maxTriesPerEnd = 2;
  let tries = 0;
  let numDropped = 0;
  while (true) {
		let segsAndLines = this.genSegments(end);
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
			if (tries === maxTriesPerEnd) {
        console.log('inactive');
        debugger;
        end.inactive = 1;
				return 0;
			}
		} else {
			numDropped += sln;
			this.installSegmentsAndLines(segsAndLines);
			return numDropped;  
    } 
  }
}

rs.addSegmentAtSomeEnd = function () {
  let {extendWhich} = this;
  while (true) {
    let ae = this.activeEnds();
    let end;
		let ln = ae.length;
		//console.log('ae len',ln);
		if (ln > 0) {
 //     debugger;
      let rni;
      if (extendWhich === 'last') {
			  rni = ln-1;// Math.floor(Math.random()*ln);
      } else if (extendWhich === 'random') {
		  	rni =  Math.floor(Math.random()*ln);
      } else {
        rni = 0; 
      }
			end = ae[rni];
			let num = this.addSegmentAtThisEnd(end);
      if (num) {
        return num;
      }
		} else {
      return "noEndsLeft";
    }
	}
}

rs.addSegmentsAtEnds = function () {
  debugger;
  let maxEndTries = 100;
  let tries = 0; 
  let numDrops = 0;
  let loop = 0;
 // let maxLoops = 100;
  let maxLoops = 10000;
  maxLoops = 20000;
  while (loop < maxLoops) {
    loop++;
    let num = this.addSegmentAtSomeEnd();
    if (num === 'noEndsLeft') {
      if (this.ends.length > 0) {
        debugger;
      }
      return [num,numDrops];
    }
    if (num) {
      numDrops+=num;
    } else {
      tries++;
      if (tries >= maxEndTries) {
        return ['triesExhausted',numDrops];
      }
    }
  }
  debugger;
  return ['loopsExceeded',numDrops];
}
       
    
rs.addRandomSegments = function () {
  let {maxDrops,maxTries,segments,lineLength,ends,minSeparation:sep,extendedSegments,shapes,fromEnds,onlyFromSeeds} = this;
  if (!this.genSegments) {
    return;
  }
  //debugger;
  let numDropped = 0;
  let tries = 0;
  let endsVsNew = 1;
  
  let maxLoops = 50000;
  let loops = 0;
  while (loops < maxLoops) {
    loops++;
    debugger;
  // if ((loops > 1) && fromEnds) {
    if (fromEnds) {
      if (Math.random() < endsVsNew) {
        let ae = this.addSegmentsAtEnds();
        if (ae[0] === 'loopsEExceeded') {
           return;
        }
      }
     // break;
    }
    if (onlyFromSeeds) {   
      return;
    }
		p = this.genRandomPoint(); 
    console.log('p',p.x,p.y);
  //  p = Point.mk(0,0);
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


rs.genLine = function (lsgOrP0,p1,ext) {
  let end0,end1;
  if (p1) {
    end0 = lsgOrP0;
    end1 = p1;
  } else {
    end0= lsgOrP0.end0;
    end1= lsgOrP0.end1;
  }


rs.genLine = function (lsgOrP0,p1,ext) {
  let end0,end1;
  if (p1) {
    end0 = lsgOrP0;
    end1 = p1;
  } else {
    end0= lsgOrP0.end0;
    end1= lsgOrP0.end1;
  }
  if (ext) {
    let vec = end1.difference(end0);
    let nvec = vec.normalize();
    end1 = end1.plus(nvec.times(ext));
  }
  let line = this.lineP.instantiate();
  line.setEnds(end0,end1);
  return line;
}
  let line = this.lineP.instantiate();
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
  let {segments,ends} = this;
  let [segs,lines] = seglines;
  segs.forEach( (seg) => {
    segments.push(seg);
    if (seg.end) {
      ends.push(seg.end);
      seg.end.isEnd = 1;
    }
    if (seg.fromEnd) {
      seg.fromEnd.inactive = 1;
    }
  });
  lines.forEach( (line) => this.installLine(line));
}



const dSeg = function (e0,e1,p) { // displaced seg
  return LineSegment.mk(e0.plus(p),e1.plus(p));
}
rs.segsFromPoints = function (pnts,p) {
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

rs.USegments = function (wd,ht,center) {
  let hwd = 0.5 * wd;
  let hht = 0.5 * ht;
  let UL = Point.mk(-hwd,-hht);
  let LL = Point.mk(-hwd,hht);
  let LR = Point.mk(hwd,hht);
  let UR = Point.mk(hwd,-hht);
  let points = [UL,LL,LR,UR];
  return this.segsFromPoints(points,center);
}

rs.UUSegments = function (wd,ht,center) {
  let hwd = 0.5 * wd;
  let hht = 0.5 * ht;
  let UL = Point.mk(-hwd,-hht);
  let LL = Point.mk(-hwd,hht);
  let LR = Point.mk(hwd,hht);
  let UR = Point.mk(hwd,-hht);
  let points = [LL,UL,UR,LR];
  return this.segsFromPoints(points,center);
}
rs.triangleSegments = function (wd,ht,center) {
  let hwd = 0.5 * wd;
  let hht = 0.5 * ht;
  let LL = Point.mk(-hwd,hht);
  let TOP = Point.mk(0,-hht);
  let LR = Point.mk(hwd,hht);
  let points = [LL,TOP,LR,LL];
  return this.segsFromPoints(points,center);
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

rs.crossSegments = function (wd,ht,center) {
  let hwd = 0.5 * wd;
  let hht = 0.5 * ht;
  let UC = Point.mk(0,-hht);
  let LC = Point.mk(0,hht);
  let vseg = LineSegment.mk(UC,LC);
  let LFTC = Point.mk(-hwd,0);
  let RC = Point.mk(hwd,0);
  let hseg = LineSegment.mk(LFTC,RC);
  return [vseg,hseg];
}
      
      
rs.sizedRectangleSegments = function (sizes,p,heightRatio=1) {
  let ln = sizes.length;
  let whichWd = Math.floor(Math.random()*ln);
  let whichHt = Math.floor(Math.random()*ln);
  let wd = sizes[whichWd];
  let ht = heightRatio?heightRatio*wd:whichHt;
  let segs = this.rectangleSegments(wd,ht,p);
  return segs;
}

rs.sizedTriangleSegments = function (sizes,p,heightRatio=1) {
  let ln = sizes.length;
  let whichWd = Math.floor(Math.random()*ln);
  let whichHt = Math.floor(Math.random()*ln);
  let wd = sizes[whichWd];
  let ht = heightRatio?heightRatio*wd:whichHt;
 /* let sg0 = dSeg(Point.mk(0,0),Point.mk(wd/2,-ht),p);
  let sg1 = dSeg(Point.mk(wd/2,-ht),Point.mk(wd,0),p);
  let sg2 = dSeg(Point.mk(wd,0),Point.mk(0,0),p);*/
  let segs = this.triangleSegments(wd,ht,p);
  return segs;
}


rs.sizedUSegments = function (sizes,p,heightRatio=1) {
  let ln = sizes.length;
  let whichWd = Math.floor(Math.random()*ln);
  let whichHt = Math.floor(Math.random()*ln);
  let wd = sizes[whichWd];
  let ht = heightRatio?heightRatio*wd:whichHt;
  let segs = this.USegments(wd,ht,p);
  return segs;
}

rs.sizedUUSegments = function (sizes,p,heightRatio=1) {
  let ln = sizes.length;
  let whichWd = Math.floor(Math.random()*ln);
  let whichHt = Math.floor(Math.random()*ln);
  let wd = sizes[whichWd];
  let ht = heightRatio?heightRatio*wd:whichHt;
  let segs = this.UUSegments(wd,ht,p);
  return segs;
}


rs.wigglySegments = function (params) {
  let {zigzag=0,direction=0,randomness=0,vertical=0,widths,heightRatio,numSegs,pos} = params;
 // debugger;
  let {width,height} = this;
  let uvec,nvec,stp;
  if (direction) {
    let cs = Math.cos(direction);
    let sn = Math.sin(direction);
    uvec = Point.mk(cs,sn);
    nvec = uvec.normal();
  }
  
  let ln = widths.length;
  let which = Math.floor(Math.random()*ln);
  let wd = widths[which];
  let hwd = 0.5*wd;
  if (direction) {
    //stp = pos.plus(uvec.times(-hwd));
    stp = uvec.times(-hwd);
  }
  let ht = heightRatio*wd;
  let hht = 0.5*ht;
  let pnts = [];
  let sgwd = wd/numSegs;
  let xp = -wd/2;
  for (let i = 0;i<numSegs+1;i++) {
		let y;
		let odd = i%2 === 1;
		let up = i%4===1;
		if (zigzag) {
		 let absy = odd?ht+randomness*(Math.random()-0.5)*ht:0;
		 y = up?absy:-absy;
		} else {
		 y = (Math.random()-0.5)*ht;
		}
    let pnt;
    if  (direction) {
      pnt = stp.plus(uvec.times(i*sgwd)).plus(nvec.times(y));
    } else {
		  pnt = vertical?Point.mk(y,xp):Point.mk(xp,y);
    }
    let mx = 1.05*(width/2);
    //console.log('pnt.x',pnt.x,'mx',mx);
    if ((pnt.x) > mx) {
      debugger;
    }
		pnts.push(pnt);
		xp+= sgwd;
  }
  let segs =this.segsFromPoints(pnts,pos);
  return segs;
}

rs.cellOf  = function (p) {
  let {x,y} = p;
  let {width,height,numRows,numCols} = this;
  let hw = width/2;
  let hh = height/2;
  let ix = Math.floor(((x+hw)/width) * numCols);
  let iy = Math.floor(((y+hh)/height) * numRows);
  return {x:ix,y:iy};
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
  let {rectangles} = this;
  this.initProtos();
  this.addBackground();
  this.segments = [];
  this.extendedSegments = [];
  this.ends = [];
  this.set('shapes',core.ArrayNode.mk());
  if (this.initialSegments) {
    let isegs = this.initialSegments();
    this.installSegmentsAndLines(isegs);
  }
  this.addRandomSegments();
 }
  
}});

      
