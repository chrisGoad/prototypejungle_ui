
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


rs.genSegment = function (p,ln,angle,sep=0,sepNext=0,centered=1) {
  let vec = Point.mk(Math.cos(angle),Math.sin(angle));
  let e0,e1,end,rs;
  if (centered) {
    let hln = (ln+sep)/2;
    let hvec = vec.times(hln);
    e0 = p.difference(hvec);
    e1 = p.plus(hvec);
		rs = LineSegment.mk(e0,e1);

  } else {
    e0 = p;
		p.isEnd = 1;
    end  = p.plus(vec.times(ln+sepNext));
    e1  =  p.plus(vec.times(ln+sep));
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
	//	rs.theEnd = end;
  }
	rs.fromEnd = p;

	/*let g;
  if (p.isEnd) {
		g = p.generation;
		if (g === undefined) {
			g = 0;
			p.generation = 0;
		}
  //  rs.fromEnd = p;
  }
  if (end) {
		//console.log('new end data',p.data);
    rs.end = end;
		if (p.data) {
			end.data = p.data;
		} 
		if (p.seed) {
			end.seed = p.seed;
		}
		end.generation = g+1;
    end.direction = angle;
  }*/
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
  let rs = [];
	let cnt = 0;
  ends.forEach((end) => {
		cnt++
    if (!(end.inactive)) {
      rs.push(end);
    }
  });
	let fr = (rs.length)/cnt;
	//console.log('active ends ',rs);
	if (fr < 0.5) {
		//this.ends = rs;
	}
  return rs;
}

rs.addSegmentAtThisEnd = function (end) {
  let {maxDrops,maxTries,segments,lineLength,ends,minSeparation:sep,extendedSegments,shapes,fromEnds,numRows,randomGridsForShapes} = this;
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
				if (this.segmentIntersects(seg,sep)) {				
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
		//console.log('ae len',ln);
		if (ln > 0) {
 //     debugger;
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
			debugger;
      return "noEndsLeft";
    }
	}
}

rs.addSegmentsAtEnds = function () {
 // debugger;
  let maxEndTries = 100;
  let tries = 0; 
//  let numDrops = 0;
  let loop = 0;
 // let maxLoops = 100;
  let maxLoops = 10000;
  maxLoops = 20000;
	//let endLoops = this.endLoops
	let maxDrops = this.maxDrops;
 // while (loop < endLoops) {
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
  let {maxDrops,maxTries,maxLoops,segments,lineLength,ends,minSeparation:sep,extendedSegments,shapes,fromEnds,onlyFromSeeds} = this;
  if (!this.genSegments) {
    return;
  }
  //debugger;
  this.numDropped = 0;
  let tries = 0;
  let endsVsNew = 1;
  
  //let maxLoops = 50000;
  let loops = 0;
  while (loops < maxLoops) {
    loops++;
  //  debugger;
  // if ((loops > 1) && fromEnds) {
    if (fromEnds) {
      if (Math.random() < endsVsNew) {
        let ae = this.addSegmentsAtEnds();
        if (ae[0] === 'loopsExceeded') {
           return;
        }
      }
     // break;
    }
    if (onlyFromSeeds) {   
      return;
    }
		p = this.genRandomPoint(); 
    //console.log('p',p.x,p.y);
  //  p = Point.mk(0,0);
		let segsAndLines = this.genSegments(p);
		let ifnd = 0;
		let sln=0;
		if (segsAndLines) {
			let [segs,lines] = segsAndLines;
			sln = segs.length;
			for (let i=0;i<sln;i++) {
				let seg = segs[i];
				if (this.segmentIntersects(seg,sep)) {
							//		debugger;

					ifnd = true;
					break;
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
			//numDropped += sln;
			tries = 0;
			this.installSegmentsAndLines(segsAndLines);
			if (this.numDropped >= maxDrops) {
				return this.numDropped;
			}    
    } 
  }
}

/*
rs.genLine = function (lsgOrP0,p1,ext) {
  let end0,end1;
  if (p1) {
    end0 = lsgOrP0;
    end1 = p1;
  } else {
    end0= lsgOrP0.end0;
    end1= lsgOrP0.end1;
  }
*/

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
  let [segs,lines] = seglines;
	let ln = segments.length;
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
		//	console.log('generation',seg.end.generation);
    }
		let fre = seg.fromEnd;
    if (fre) {
			//console.log('seg ',ln, ' from end ',fre.isEndOf);
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

rs.initProtos = function () {
	core.assignPrototypes(this,'lineP',linePP);
	this.lineP.stroke = 'white';
	this.lineP['stroke-width'] = 1;
	if (this.finishProtos) {
		this.finishProtos();
	}
}  

rs.initializeDrop = function () {
  let {rectangles,initialSegments,genSeeds} = this;
  this.initProtos();
  this.addBackground();
  this.segments = [];
	this.numDropped = 0;
  this.extendedSegments = [];
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
  this.addRandomSegments();
 }
  
}});

      
