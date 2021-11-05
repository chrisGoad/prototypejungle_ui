//active
//core.require('/mlib/animation.js','/mlib/basics.js','/mlib/topRandomMethods.js','/shape/rectangle.js','/line/line.js',
core.require(
//function (addAnimationMethods,addBasicMethods,addRandomMethods,rectanglePP,linePP) {
function () {

//core.require(function () {
 return function (rs) {
//addBasicMethods(rs);
//addRandomMethods(rs);

/*adjustable parameters  */
let topParams = {width:100,height:100,maxDrops:10,maxTries:5,maxLoops:100000,lineLength:10,backgroundColor:undefined,minSeparation:5,endLoops:20000}

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

// When in fromEnds mode, the segment has an "end" which is sepNext beyond end1, this end is where the next segment can be droppe
// normally sepNext is an invisible distance which prevents the detection of an intersection with the segment which is being continued.

rs.genSegment = function (p,ln,angle,sepNext=0) {
//rs.genSegment = function (p,ln,angle,sep=0,sepNext=0,centered=1) {
  let vec = Point.mk(Math.cos(angle),Math.sin(angle));
  let e0,e1,end,rs;
	e0 = p;
	p.isEnd = 1;
	end  = p.plus(vec.times(ln+sepNext));
	e1  =  p.plus(vec.times(ln));
	rs = LineSegment.mk(e0,e1);
	let g = p.generation;
	if (g === undefined) {
		g = 0;
		p.generation = 0;
	}
	rs.end = end;
	if (p.seed) {
		end.seed = p.seed;
	}
	end.generation = g+1;
	end.direction = angle;		
	rs.fromEnd = p;
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
  let {segments,width,height,exclusionZones,doNotCross,doNotExit} = this;
  let {end0,end1} = seg;
  if ((!this.insideCanvas(end0)) || (!this.insideCanvas(end1))) {
    return true;
  }
	if (exclusionZones) {
		debugger;
		let eln = exclusionZones.length;
		for (let i=0;i<eln;i++) {
			let zone = exclusionZones[i];
			if (zone.contains(end0) || zone.contains(end1)) {
				return true;
			}
		}
	}
	if (doNotCross) {
		debugger;
		let eln = doNotCross.length;
		for (let i=0;i<eln;i++) {
			let zone = doNotCross[i];
			if (zone.contains(end0) !== zone.contains(end1)) {
				return true;
			}
		}
	}
	if (doNotExit) {
		debugger;
		let eln = doNotExit.length;
		for (let i=0;i<eln;i++) {
			let zone = doNotExit[i];
			if ((!zone.contains(end0)) ||  (!zone.contains(end1))) {
				return true;
			}
		}
	}
  let ln = segments.length;
  for (let i=0;i<ln;i++) {  
    let ip = seg.intersects(segments[i]);
    if (ip) {
      return true;
    }
  }
}

rs.intersectsSomething = function (g) {
  let {segments,width,height} = this;
  let ln = segments.length;
  for (let i=0;i<ln;i++) {  
	  let seg = segments[i];
		if (g.intersects(seg)) {
			return true;
		}
  }
}

rs.activeEnds = function () {
  let ends = this.ends;
  let rs = [];
	let cnt = 0;
  ends.forEach((end) => {
		cnt++
    if (!(end.inactive)) {
      rs.push(end);
    }
  });
  return rs;
}

rs.addSegmentAtThisEnd = function (end) {
  let {maxDrops,maxTries,segments,lineLength,ends,shapes,fromEnds,numRows,randomGridsForShapes} = this;
  if (!this.genSegments) {
    return;
  }
  let maxTriesPerEnd = 20;
  let tries = 0;
 // let numDropped = 0;
	let cell,rvs;
	if (numRows && randomGridsForShapes) {
	  cell = this.cellOf(end);
    rvs = this.randomValuesAtCell(randomGridsForShapes,cell.x,cell.y);
	}
  while (true) {
		let segsAndLines = this.genSegments(end,rvs);
		let ifnd = 0;
		let sln = 0
		if (segsAndLines) {
			let [segs,lines] = segsAndLines;
			sln = segs.length;
			for (let i=0;i<sln;i++) {
				let seg = segs[i];
				if (this.segmentIntersects(seg)) {				
					ifnd = true;
					break;
				}
			}
		} else {
			ifnd = 1;
		}
		if (ifnd) {
			tries++;
			if (tries === maxTriesPerEnd) {
        console.log('inactivated - could not find continuation');
       //debugger;
        end.inactive = 1;
				return 0;
			}
		} else {
			this.installSegmentsAndLines(segsAndLines);
			return 1;  
    } 
  }
}

rs.randomArrayElement = function (a) {
	ln = a.length;
	let rni = Math.floor(ln*Math.random());
	return a[rni]
}

rs.lastArrayElement = function (a) {
	ln = a.length;
	return a[ln-1]
}

rs.randomDirection = function (n) {
	if (n) {
	  return 2*Math.PI*(Math.floor(n*Math.random())/n);
	} else {
		return 2*Math.PI*Math.random();
	}
}


rs.addSegmentAtSomeEnd = function () {
  let {extendWhich} = this;
  while (true) {
    let ae = this.activeEnds();
    let end;
		let ln = ae.length;
		if (ln > 0) {
      if (extendWhich === 'last') {
			  end = this.lastArrayElement(ae);
      } else if (extendWhich === 'random') {
		  	end =  this.randomArrayElement(ae);
      } else {
        end = ae[0];
      }
			let ars = this.addSegmentAtThisEnd(end);
      if (ars) {
        return ars;
      }
		} else {
      return "noEndsLeft";
    }
	}
}

rs.addSegmentsAtEnds = function () {
  let maxEndTries = 100;
  let tries = 0; 
  let loop = 0;
	let maxDrops = this.maxDrops;
  while (this.numDropped  < maxDrops) {
    loop++;
    let ars = this.addSegmentAtSomeEnd();
    if (ars === 'noEndsLeft') {
      return ars;
    }
    if (!ars) {
      tries++;
      if (tries >= maxEndTries) {
        return 'triesExhausted';
      }
    }
  }
  //debugger;
  return ['loopsExceeded',this.numDropped];
}
       
    
rs.addRandomSegments = function () {
  let {maxDrops,maxTries,maxLoops,segments,lineLength,ends,shapes,fromEnds,onlyFromSeeds} = this;
  if (!this.genSegments) {
    return;
  }
  this.numDropped = 0;
  let tries = 0;
  let endsVsNew = 1;
  let loops = 0;
  while (loops < maxLoops) {
    loops++;
    if (fromEnds) {
      if (Math.random() < endsVsNew) {
        let ae = this.addSegmentsAtEnds();
        if (ae[0] === 'loopsExceeded') {
           return;
        }
      }
    }
    if (onlyFromSeeds) {   
      return;
    }
		p = this.genRandomPoint(); 
		let segsAndLines = this.genSegments(p);
		let ifnd = 0;
		let sln=0;
		if (segsAndLines) {
			let [segs,lines] = segsAndLines;
			let rect;
			if    (!Array.isArray(segs)) {
				rect = segs; //might be a circle
				rectShape = lines;
				if (this.intersectsSomething(rect)) {
					 ifnd  = 1;
				}
			} else {	 
				sln = segs.length;
				for (let i=0;i<sln;i++) {
					let seg = segs[i];
					if (this.intersectsSomething(seg)) {
						ifnd = true;
						break;
					}
				}
			}
		} else {
			ifnd = 1;
		}
		if (ifnd) {
			tries++;
			if (tries === maxTries) {
				return this.numDropped;
			}
		} else {
			tries = 0;
			this.installSegmentsAndLines(segsAndLines);
			if (this.numDropped >= maxDrops) {
				return this.numDropped;
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
  if (ext) {
    let vec = end1.difference(end0);
    let nvec = vec.normalize();
    end1 = end1.plus(nvec.times(ext));
  }
  let line = this.lineP.instantiate();
	if (this.genPoint3d) {
		let e03d = this.via3d(end0);
		let e13d = this.via3d(end1);
    line.setEnds(e03d,e13d);
	} else {
    line.setEnds(end0,end1);
	}
  return line;
}
 
 
rs.via3d = function (p) {
	if (this.genPoint3d) {
		let p3d = this.genPoint3d(p);
		let rs = this.camera.project(p3d);
		return rs;
	}
  return p;
  
}
 
rs.installLine = function (line) {
	if (line.period) {
	  debugger;
	}
  this.shapes.push(line);
  line.show();
  line.update();
	this.numDropped++;
  return line;
}

rs.updateShapes = function () {
	if (!this.shapeUpdater) {
		return;
	}
	let {shapes} = this;
	let ln = shapes.length;
	for (let i=0;i<ln;i++) {
		let shp = shapes[i]
		this.shapeUpdater(shp);
	}
}
	
	
rs.installSegmentsAndLines = function (seglines) {
  let {segments,ends} = this;
  let ln = segments.length;
  let [segs,lines] = seglines;
//	if (seglines.isRectangle) {
	if (!Array.isArray(segs)) {
		let rect = segs;
		let rectShape = lines;
		segments.push(rect);
		this.installLine(rectShape);
		return;
	}

  segs.forEach( (seg) => {
		seg.number = ln;
		let {end0,end1,end} = seg;
		if (!end0) {
			debugger;
		}
		end0.end0of = ln;
		end1.end1of = ln;
		if (end) {
		  end.isEndOf = ln;
		}
    segments.push(seg);
    if (end) {
      ends.push(end);
      end.isEnd = 1;
    }
		let fre = seg.fromEnd;
    if (fre) {
      fre.inactive = 1;
    }
		ln++;
  });
  lines.forEach( (line) => this.installLine(line));
}

rs.removeSegmentsAndLines = function (n) {
	let {segments,shapes} = this;
	let ln = segments.length;
	let sln  = shapes.length;
	console.log('ln sln',ln,sln);
	let nln = Math.max(0,ln-n);
	segments.length = nln;
	for (let i = nln;i<ln;i++) {
		let shp = shapes[i];
		if (shp) {
		  shp.remove();
		}
	}
	shapes.length = nln;
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
      
rs.rectangleSegments = function (wd,ht,center,bottomGap) {
  let hwd = 0.5 * wd;
  let hht = 0.5 * ht;
  let UL = Point.mk(-hwd,-hht);
  let UR = Point.mk(hwd,-hht);
  let LR = Point.mk(hwd,hht);
  let LL = Point.mk(-hwd,hht);
	let points;
	if (bottomGap) {
		let HL = Point.mk(-0.5*bottomGap,hht);
		let HR = Point.mk(0.5*bottomGap,hht);
    points0 = [HL,LL,UL];//,UR,LR,HR];
    points1 = [UR,LR,HR];
		return this.segsFromPoints(points0,center).concat(this.segsFromPoints(points1,center));
	} else {
    points = [UL,UR,LR,LL,UL];
	}
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

rs.diagSegments = function (wd,ht,center) {
  let hwd = 0.5 * wd;
  let hht = 0.5 * ht;
  let ULC = Point.mk(-hwd,-hht);
  let LLC = Point.mk(-hwd,hht);
	let URC = Point.mk(hwd,-hht);
	let LRC = Point.mk(hwd,hht);
  let seg0 = LineSegment.mk(ULC,LRC);
  let seg1 = LineSegment.mk(URC,LLC);
  return [seg0,seg1];
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

rs.mkCenteredSeg = function (pos,length,angle) {
	let hln =0.5*length;
	let c = Math.cos(angle);
	let s = Math.sin(angle);
	let v = Point.mk(c*hln,s*hln);
	let p0 = pos.difference(v);
	let p1 = pos.plus(v);
	return LineSegment.mk(p0,p1);
}



rs.mkASeg = function (pos,ln,angle) {
	let c = Math.cos(angle);
	let s = Math.sin(angle);
	let v = Point.mk(c*ln,s*ln);
	let p1 = pos.plus(v);
	return LineSegment.mk(pos,p1);
}

rs.crossedSegments = function (params) {
	debugger;
	 let {direction:dir0=0,randomness=0,length0,length1,pos,centered=1} = params;
	 let dir1 = dir0 + 0.5* Math.PI;
	 let s0 = centered?this.mkCenteredSeg(pos,length0,dir0):this.mkASeg(pos,length0,dir0);
	 let s1 = centered?this.mkCenteredSeg(pos,length1,dir1):this.mkASeg(pos,length1,dir1);
	 return [s0,s1];
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

rs.segsToSeed = function (segs) {
  let lines = segs.map((sg) => {
	  let line = this.genLine(sg);
		//line.show();
		return line;
	});	
	return [segs,lines];
}

rs.concatEachArray = function (ays) {
	let c0 = [];
	let c1 = [];
	ays.forEach( (a) => {
	 let [a0,a1]= a;
	 c0.push(...a0);
	 c1.push(...a1);
	 //c0 = c0.concat(a0);
	 //c1 = c1.concat(a1);
  });	 
	 return [c0,c1];
}
/*
rs.initProtos = function () {
	core.assignPrototypes(this,'lineP',linePP);
	this.lineP.stroke = 'white';
	this.lineP['stroke-width'] = 1;
	if (this.finishProtos) {
		this.finishProtos();
	}
}  
*/

rs.initializeDrop = function (doDrop=1) {
  let {rectangles,initialSegments,genSeeds} = this;
 /* this.initProtos();
  this.addBackStripe();
  this.addBackground();*/
  this.segments = [];
	this.numDropped = 0;
  this.ends = [];
  this.set('shapes',core.ArrayNode.mk());
  if (initialSegments) {
    let isegs = this.initialSegments();
    this.installSegmentsAndLines(isegs);
  }
	if (genSeeds) {
    let isegs = this.genSeeds();
    this.installSegmentsAndLines(isegs);
  }
  if (doDrop) {
		this.addRandomSegments();
	}
}
rs.inAzone = function (zones,p) {
	if (!zones) {
		return 0;
	}
	let fnd = false;
	let eln = zones.length;
	for (let i=0;i<eln;i++) {
		let zone = zones[i];
		if (zone.contains(p)) {
			return 1;
		}
	}
	return 0;
}


rs.pointsFromCircleDrops = function () {
	let {zone,exclusionZones} = this;
	let pnts = [];
	this.segments.forEach( (seg) => {
	  if (geom.Circle.isPrototypeOf(seg)) {
			let p = seg.center;
			if (zone) {
				if (!zone.contains(p)) {
					return;
				}
			}
			
			let inex = this.inAzone(exclusionZones,p);
			if (!inex) {
				pnts.push(p);
			}
	  }
	});
	return pnts;
}
}});

      
