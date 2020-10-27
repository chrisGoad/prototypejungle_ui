
core.require('/gen0/animation.js','/shape/rectangle.js',function (addAnimationMethods,rectangleP) {

//core.require(function () {
 return function (item) {
	 debugger;
//let item = svg.Element.mk('<g/>');
addAnimationMethods(item);

/*adjustable parameters  */

item.width = 200;
item.height = 200;
item.interpolate = false;
item.shapeExpansionFactor = 1;
/* for lines */
item.numLines = 2;
item.angleMax = 90;
item.angleMin =  -90;
//item.minDist = 1;
//item.lineLengthRatio = .9;
item.excludeLineFuncton = undefined;
item.segmentToLineFunction = undefined;

item.backgroundColor = undefined; //undefined if no background wanted
/* for shapes*/
item.minRadius = 10;
item.maxRadius = 20;
item.numPoints = 3;
item.minSeparation = 1;
item.maxTries = 100;
item.margin = 10;
item.shortenBy = 10;
/* end */

/*for shapes */


      
item.collides0 = function (point1,radius1,point2,radius2) {
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



item.collides = function (point,radius) {
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

item.collidesWithSegments = function (point,radius) {
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



item.genRandomPoint = function (rect) {
  if (rect) {
    let {corner,extent} = rect;
    let lx = corner.x;
    let ly = corner.y;
    let x = Math.random() * extent.x + lx;
    let y = Math.random() * extent.y + ly;
    return Point.mk(x,y);
  }
  let {width,height} = this;
  let rx = Math.floor((Math.random()-0.5) * width);
  let ry= Math.floor((Math.random()-0.5) * height);
  return Point.mk(rx,ry);
}


item.genRandomUnitVector = function () {
  let amin = Math.PI*(this.angleMin/180);
  let amax = Math.PI*(this.angleMax/180);
  let dir = amin + (amax - amin)*Math.random();
  let vec = Point.mk(Math.cos(dir),Math.sin(dir));
  return vec;
}

item.generatePointAndRadius = function () {
  let {width,height,minRadius,maxRadius,numPoints,margin} = this;
  let rr = maxRadius - minRadius;
  let r = minRadius + rr*Math.random();
  let x = (Math.random() -0.5) * width;
  x = (x>0)?x-r- margin:x+r+margin;
  let y = (Math.random() -0.5)*height;
  y = (y>0)?y-r- margin:y+r+margin;
  let p = Point.mk(x,y);
  return [p,r];
}
      
item.generatePoints = function () {
 // initializer(this);
  let {width,height,minRadius,maxRadius,numPoints,maxTries} = this;
  let points = this.set("points",core.ArrayNode.mk());
  let radii = this.set("radii",core.ArrayNode.mk());
  for (let i = 0;i<maxTries;i++) {
    let pr = this.generatePointAndRadius();
    let p = pr[0];
    let r = pr[1];
    if (!this.collidesWithSegments(p,r)) {
      if (!this.collides(p,r)) {
        points.push(p);
        radii.push(r);
        if (points.length >= numPoints) {
          console.log('generated points at try number',i);
          return;
        }
      }
    }
  }
  console.log('failed to generate all points');
}



item.addSides = function (rect) {
	let hw,hh;
	let {corner,extent} = rect;
	hw = (extent.x)/2;
	hh = (extent.y)/2;
	let {x:cx,y:cy} = corner;
	let {x:ex,y:ey} = extent;
  let UL = Point.mk(cx,cy)
  let UR = Point.mk(cx+ex,cy)
  let LL = Point.mk(cx,cy+ey)
  let LR  = Point.mk(cx+ex,cy+ey)
	/* let UL = Point.mk(-hw,hh)
  let UR = Point.mk(hw,hh)
  let LL = Point.mk(-hw,-hh)
  let LR  = Point.mk(hw,-hh)*/
  rect.topSide = geom.LineSegment.mk(UL,UR);
	rect.rightSide = geom.LineSegment.mk(UR,LR);
  rect.bottomSide = geom.LineSegment.mk(LR,LL);
  rect.leftSide = geom.LineSegment.mk(LL,UL);
}


item.inRange= function (pnt) {
  let {x,y} = pnt;
  let hwd = 0.5*this.width;
  let hht = 0.5*this.height;
  return (-hwd <= x) && (x<=hwd) && (-hht<=y) && (y<=hht);
}



item.intersectWithRectangle = function (p,ivec) {
  let vec = ivec.times(this.width * 4);
  let e0 = p.plus(vec.minus()) ;
  let e1 = p.plus(vec);
  let lsg = geom.LineSegment.mk(e0,e1);
  let intersections = [];
  const pushIfNnul = function (x) {
    if (x) {
      intersections.push(x);
    }
  }
  pushIfNnul(this.topSide.intersect(lsg));
  pushIfNnul(this.bottomSide.intersect(lsg));
  pushIfNnul(this.leftSide.intersect(lsg));
  pushIfNnul(this.rightSide.intersect(lsg));
  if (intersections.length < 2) {
    debugger; //keep
    return;
  }
  let [int0,int1] = intersections;
  return (int0.x < int1.x)?[int0,int1]:[int1,int0];
} 

//  snips inLseg by side effect. directions "fromAbove","fromBelow","fromLeft","fromRight"
  
  
// end0.x < end1.x, it is assumed. Returns 

const intersectSegmentAtX = function (sg,x) {
  let {end0,end1} = sg;
  let e0x = end0.x;    
  let e1x = end1.x;
  let e0y = end0.y;
  let e1y = end1.y;
  if ((e1x < x) || (e0x > x)) {
    return;
  }
  let fr = (x - e0x)/(e1x - e0x);
  let y = e0y + fr*(e1y - e0y);
  return Point.mk(x,y);
}

const onWrongSideX = function (sg,x,direction) {
  let {end0,end1} = sg;
  let e0x = end0.x;
  let e1x = end1.x;
  return (direction === 'fromRight')? e1x <= x:e0x >= x;
}



const insideXs = function (sg,x0,x1) {
  let {end0,end1} = sg;
  let e0x = end0.x;
  let e1x = end1.x;
  return (x0 <= e0x) && (e1x <= x1);
}
 
  
// works by side effect; returns "remove" if the segment is entirely on the wrong side

const snipAtX = function (sg,x,direction) {
  let {end0,end1} = sg;
  let e0x =end0.x;
  let e1x = end1.x;

  if (direction == "fromRight") {
    if (e0x >= x) {
      return false;
    }
 
    if (e1x <= x) {
        return false;
    }
  }
  let intr = intersectSegmentAtX(sg,x);
  if (intr) {
    let ix = intr.x;
    let e0x = end0.x;
    let e1x = end1.x;
    if (direction === "fromRight") {
      if (ix < e0x) {
        end1.copyto(intr);
      } else {
        end0.copyto(intr);
      }
    } else {
       if (ix > e0x) {
        end1.copyto(intr);
      } else {
        end0.copyto(intr);
      }
    }
    return true;
  }
}


const snipAtXs = function (sg,x0,x1) {
  let {end0,end1} = sg;
  let e0x =end0.x;
  let e1x = end1.x;
  if (e0x >= x1) {
    return false;
  }
  if (e1x <= x0) {
    return false;
  }
  let notInt;
  let intrLow,intrHigh;
  if (e0x >= x0) {
    notInt = 'x0';
  }
  if (e1x <= x1) {
    notInt = 'x1';
  }
  if (notInt !== 'x0') {
    intrLow = intersectSegmentAtX(sg,x0);
  }
  if (notInt !== 'x1') {
    intrHigh = intersectSegmentAtX(sg,x1);
  }
  if (intrLow && intrHigh) {
    let rs = geom.LineSegment.mk(intrHigh,end1.copy());
    end1.copyto(intrLow);
    return rs;
  }
  if (intrLow) {
    end1.copyto(intrLow);
    return 'ok';
  }
  if (intrHigh) {
    end0.copyto(intrHigh);
    return 'ok'
  }
}


item.intersectionsWithLine = function (p,vec,inside) {	
  let boxPoints = this.intersectWithRectangle(p,vec);
  let {points,radii} = this;
  let rsOut = [boxPoints[0]];
  let rsIn = [];
  let ln = points.length;
  for (let i=0;i<ln;i++) {
    let center = points[i];
    let radius = radii[i]*this.shapeExpansionFactor;
    let circle = geom.Circle.mk(center,radius);
    let ints = circle.intersectLine(p,vec);
    if (!ints) {
      continue;
    }
    let [int0,int1] = ints;
    rsOut.push(int0);
    rsOut.push(int1);
    if (inside) {
      rsIn.push(int0);
      rsIn.push(int1);
    }
  }
 // this.genSides();
  rsOut.push(boxPoints[1]);
  rsOut.sort((p0,p1) => {return (p0.x < p1.x)?-1:1});
  if (inside) {
   rsIn.sort((p0,p1) => {return (p0.x < p1.x)?-1:1});
   return [rsOut,rsIn]
  }
  return rsOut;
}

item.addShortenedLine = function (p0,p1,inside) {
 // let blf = 0.2 + Math.random() * 0.8;
  let {shortenBy,lines} = this;
  let sp0,sp1;
  if (!p1) {
    debugger; //keep
    return;
  }
  let vec = p1.difference(p0);
  let ln = vec.length();
  if (shortenBy*2 > ln) {
    return;
  }
  let sby = (ln - shortenBy)/ln;
  
  let svec = vec.times(0.5*sby);
  let midpoint = p0.plus(p1).times(0.5);
  sp0 = midpoint.plus(svec.times(-1));
  sp1 = midpoint.plus(svec);
  let line = inside?this.lineP2.instantiate():this.lineP.instantiate()
  line.setEnds(sp0,sp1);    
  this.shapes.push(line);
  line.update();
  line.show();
  return  line;
}

item.displaySegments = function (ints,inside) {
  let ln = ints.length;
  for (let i = 0 ;i<ln/2;i++){
    let e0=ints[i*2];
    let e1 = ints[i*2+1];
    if ((i == 0) && !this.inRange(e0)) {
      e0 = ints[2];
      e1 = ints[3]
      i =+ 1;
    } else if (this.inRange(e1)) {
      this.addShortenedLine(e0,e1,inside);
    }
  }
}
  
    
      
      
  

item.generateShapes = function (protos,setDimensions,probabilities) {
  let {points,radii} = this;
  let shapes = this.set("shapes",core.ArrayNode.mk());
  let ln = points.length;
  nump = protos.length;
  let start = this.hasHole?1:0;
  let which;
  for (let i=start;i<ln;i++) {
    let pnt = points[i]
    let lsv = this.leaveSpotVacantFunction;
    if (lsv && lsv(pnt)) {
      continue;
    }
    if (probabilities) {
      if ((nump === 1) || (Math.random() < probabilities[0])) {
        which = 0;
      } else if ((nump === 2) || (Math.random() < probabilities[1])) {
          which = 1;
      } else {
        which = 2;
      }
    } else {
      which = Math.floor((Math.random()-0.0001) * nump);
    }
    let proto = protos[which];
    if (!proto) {
      debugger; //keep
    }
    let shape = proto.instantiate();
    let setDimension = setDimensions[which];
    shapes.push(shape);
    shape.moveto(pnt);
    setDimension(this,shape, 2 * radii[i]);	
    shape.update();
    shape.show();
  }
}
  
/* never tested*/
item.intersectSegmentWithCircle = function (lsg,circle) {
	debugger;
	let {end0:p,end1} = lsg;
	let vec = end1.difference(p);
  let intersections = circle.instersectLine(p,vec);
	if (!intersections) {
		return;
	}
	let i0 = intersections[0];
	let i1 = intersections[1];
	let c = circle.center;
	const fractionAlong = function (pnt) {
		let v = pnt.difference(c);
		let a = Math.atan2(v.y,v.x);
		return a/(2*Math.PI);
	}
	let fr0 = fractionAlong(i0);
	let fr1 = fractionAlong(i1);
	let descriptions = [fr0,fr1];
  let rs =  geom.LineSegment.mk(i0,i1);
	rs.descriptions = descriptions;
	return rs;
}



item.intersectSegmentWithRectangle = function (lsg,rect) {
	//debugger;
  let intersections = [];
	let descriptions = [];
	const fractionAlong = function (seg,p) {
	  let {end0,end1} = seg;
		let dp = p.distance(end0);
		let ln = end1.distance(end0);
		return dp/ln;
  }
  const pushIfNnul = function (sideName,x) {
    if (x) {
			let side = rect[sideName];
      intersections.push(x);
			descriptions.push([sideName,fractionAlong(side,x)]);;
    }
  }
  pushIfNnul('topSide',rect.topSide.intersect(lsg));
  pushIfNnul('bottomSide',rect.bottomSide.intersect(lsg));
  pushIfNnul('leftSide',rect.leftSide.intersect(lsg));
  pushIfNnul('rightSide',rect.rightSide.intersect(lsg));
  if (intersections.length < 2) {
    debugger;//keep
    return undefined;
  }
  let [int0,int1] = intersections;
  if (int0.x > int1.x) {
    let tmp = int0;
    int0 = int1;
    int1 = tmp;
  }
  let rs =  geom.LineSegment.mk(int0,int1);
	rs.descriptions = descriptions;
  rs.whichCircle = lsg.whichCircle;
  return rs;
}
 
item.genRandomPointInCircle = function (circle) {
  let r = circle.radius;
  let center = circle.center; 
  const genPoint = () => {
    let {x,y} = center;
    let corner = Point.mk(x-r,y-r);
    let extent = Point.mk(r*2,r*2);
    let rect = geom.Rectangle.mk(corner,extent);
    let p = this.genRandomPoint(rect);
    return p;
  }
  while (true) {
    let rs = genPoint();
    if (rs.distance(center) < r) {
      return rs;
    }
  }
}


item.genRandomPointOnCircle = function (circle) {
  let r = circle.radius;
  let center = circle.center;
	let fr = Math.random(); 
	let dir = 2 * Math.PI*fr;
	let vec = Point.mk(Math.cos(dir),Math.sin(dir));
	let rs =  center.plus(vec.times(r));
	rs.fractionAlong = fr;
	rs.onShape = circle;
	return rs;
}
	
    
    
item.genRandomPointOnSegment = function (seg) {
  let {end0,end1} = seg;
  let vec = end1.difference(end0);
  let rn = Math.random();
  return end0.plus(vec.times(rn));
}
    
    
    
const extendSegment = function (sg,ln) {
  let p = sg.end0;
  let vec = sg.end1.difference(p);
  let longVec =  vec.times(ln);
  let le0 = p.plus(longVec.minus()) ;
  let le1 = p.plus(longVec);
  return geom.LineSegment.mk(le0,le1);
}  


item.intersectUnitSegment = function(usg,rect) {
  let rsg;
  let {end0,end1} = usg;
  if (this.dimension) {
    let circle = this.circle;
    let vec = end1.difference(end0);
    let sols = circle.intersectLine(end0,vec);
    if (sols) {
      rsg = geom.LineSegment.mk(sols[0],sols[1]);
    } else {
      return;
    }
  } else {
    let longSeg = extendSegment(usg,this.width * 4);
    rsg = this.intersectSegmentWithRectangle(longSeg,rect);
  }
  return rsg;
}
    
item.addRandomSegment = function (segments,src,dst,shape) {
	debugger;
  let srcP;
  let onCircle = false;
  if (src) {
    let srcIsCircle = geom.Circle.isPrototypeOf(src);
		if (srcIsCircle) {
			onCircle = src.onCircle;
		}
    srcP = (srcIsCircle)?(onCircle?this.genRandomPointOnCircle(src):this.genRandomPointInCircle(src)):this.genRandomPointOnSegment(src);
  } else {
    srcP = this.genRandomPoint(shape);
  }
  let dstP; 
 
  if (dst) {
    let dstIsCircle = geom.Circle.isPrototypeOf(dst);
		if (dstIsCircle) {
			onCircle = src.onCircle;
		}
    dstP = (dstIsCircle)?(onCircle?this.genRandomPointOnCircle(src):this.genRandomPointInCircle(src)):this.genRandomPointOnSegment(dst); 
    //dstP = this.genRandomPoint();
    let vec = dstP.difference(srcP);
    let dir = Math.atan2(vec.y,vec.x);
    //debugger;
  
    //dst = this.genRandomPointInCircle(dstP);
		if (srcP.fractionAlong < dstP.fractionAlong) {
			let tmp = srcP;
			srcP = dstP;
			dstP = tmp;
		}
			
    let rsg = geom.LineSegment.mk(srcP,dstP,true);// true = don't copy
    segments.push(rsg);
  } else {
   	let amin = Math.PI*(this.angleMin/180);
    let amax = Math.PI*(this.angleMax/180); 
	  let dir = amin + (amax - amin)*Math.random();
	  if ((dir < amin) || (dir > amax)) {
      return;
    }
    let adir = 180 * (dir/Math.PI);
   // let vec = Point.mk(Math.cos(dir),Math.sin(dir)).times(this.width *4);
    let vec = Point.mk(Math.cos(dir),Math.sin(dir));
   
   // let e0 = p.plus(vec.minus()) ;
    let e0 = srcP;
    let e1 = srcP.plus(vec);
    let lsg = geom.LineSegment.mk(e0,e1);
    lsg.angle = dir;
    let rsg = this.intersectUnitSegment(lsg,shape);
    if (!rsg) {
      return;
    }
    let elf = this.excludeLineFunction;
    if (elf) {
      if (elf(rsg)) {
        return;
      }
    }
    if (this.interpolate) {
       this.unitSegments.push(lsg);
    } else {
      segments.push(rsg);
    }
    return rsg;
  }
}

const putIn0_1 = function (x) {
	while (x < 0) {
		x++;
	}
	while (x>1) {
		x--;
	}
	return x;
}

item.addSegment = function (segments,pnt,vec,circle) {
	let ints = circle.intersectLine(pnt,vec);
	if (!ints) {
		return;
	}
	let [i0,i1] = ints;
	let {center,radius} = circle;
	let v0 = i0.difference(center);
	let v1 = i1.difference(center);
	let fr0 = Math.atan2(v0.y,v0.x)/(2*Math.PI);
	let fr1 = Math.atan2(v1.y,v1.x)/(2*Math.PI);
	i0.fractionAlong = putIn0_1(fr0);
	i1.fractionAlong = putIn0_1(fr1);
	i0.onShape = circle;
	i1.onShape = circle;
	let rsg = geom.LineSegment.mk(i0,i1,true);// true = don't copy
  segments.push(rsg);
}
	//let intersections = circle.intersectLine(pnt,vec);
	//let i0 = intersections[0];
	//let i0 = intersections[0];
	
	

item.interpolateSegments = function (fr) {
  let {numLines,unitSegments,segments} = this;
  let hnum = numLines/2;
  for (let i = 0; i<hnum;i++) {
    let sgA = unitSegments[i];
    let sgB = unitSegments[hnum+i];
    let isg = interpolateUnitSegments(sgA,sgB,fr);
    let longSeg = this.intersectUnitSegment(isg);
    //let longSeg = extendSegment(isg,this.width * 4);
    segments[i] = longSeg;
  }
}
  

const interpolateValues = function (v0,v1,fr) {
  let vi = v1-v0;
  return v0 + (v1-v0) * fr;
}

const interpolatePoints = function (p0,p1,fr) {
  let {x:p0x,y:p0y} = p0;
  let {x:p1x,y:p1y} = p1;
  let ix = interpolateValues(p0x,p1x,fr);
  let iy= interpolateValues(p0y,p1y,fr);
  return Point.mk(ix,iy);
}

const interpolateUnitSegments = function (sgA,sgB,fr) {
  let {end0:A0,angle:angleA} = sgA;
  let {end0:B0,angle:angleB} = sgB;
  let e0 = interpolatePoints(A0,B0,fr);
  let angle = interpolateValues(angleA,angleB,fr);
  let vec = Point.mk(Math.cos(angle),Math.sin(angle));
  let e1 = e0.plus(vec);
  let lsg = geom.LineSegment.mk(e0,e1);
  lsg.angle = angle;
  return lsg;
}
  
item.snipSegmentsAtX = function (x,direction,fraction) {
  let segments = this.segments;
  let cnt = 0;
  segments.forEach((sg) => {
    if (sg && (onWrongSideX(sg,x,direction) || intersectSegmentAtX(sg,x))) {
      cnt++;
    }
  });
  let numToSnip = Math.floor(fraction * cnt);
  cnt = 0;
  let idx = -1;
  while (cnt < numToSnip) {
    idx++;
    let sg = segments[idx];
    if (!sg) {
      continue;
    }
    if (onWrongSideX(sg,x,direction)) {
      segments[idx] = null;
      cnt++;
      continue;
    }
    if (snipAtX(sg,x,direction)) {
      cnt++;
    }
  }
}
  
item.snipSegmentsAtXs = function (x0,x1,fraction) {
  let segments = this.segments;
  let cnt = 0;
  segments.forEach((sg) => {
    if (sg && (insideXs(sg,x0,x1) || intersectSegmentAtX(sg,x0) || intersectSegmentAtX(sg,x1))) {
      cnt++;
    }
  });
  let numToSnip = Math.floor(fraction * cnt);
  cnt = 0;
  let idx = -1;
  while (cnt < numToSnip) {
    idx++;
    let sg = segments[idx];
    if (!sg) {
      continue;
    }
    if (insideXs(sg,x0,x1)) {
      segments[idx] = null;
      cnt++;
      continue;
    }
    let rsg = snipAtXs(sg,x0,x1);
    cnt++;
    if (rsg && (rsg!=='ok')) {
      segments.push(rsg);
    }
  }
}
    
      
    
  

item.addLine = function (i,lsg) {
 // let line = this.lineP.instantiate();
//  this.lines.push(line);
  if (!lsg) {
    debugger;
  }
//debugger;
  const genRandomColor = function () {
    const rval  = function () {
      return Math.floor(Math.random()*150);
    }
    return  `rgb(${rval()},${rval()},${rval()})`;
  }
 // line.stroke  = genRandomColor();
  let seg2line = this.segmentToLineFunction;
  let line;
  if (seg2line) {
    line = seg2line(this,lsg);
  } else {
    line = this.lineP.instantiate();
    let {end0,end1} = lsg;
    line.setEnds(end0,end1);
  }
  //this.lines.set(i,line);
  this.lines.push(line);
  if (0 && lsg.oneInHundred) {
    line.stroke = 'red';
    line['stroke-width'] = 1;
  }
 // this.lines.push(line);
 
  //sw = 1;
 // line['stroke-width'] = strokeWidthFactor * sw;
  line.update();
  line.show();
}

   

item.addLines = function () {
	debugger;
  let segs = this.segments;
  let num = segs.length;
  for (let i=0;i<num;i++) {
		let seg = segs[i];
		if (!seg.hideMe) {
      this.addLine(i,segs[i]);
		}
  }
}

item.computeIntersections = function () {
  let n = this.numLines;
  for (let i = 0;i<n;i++) {
    let isg = this.segments[i];
    for (let j = i+1;j<n;j++) {
      let jsg = this.segments[j];
      let intr = isg.intersect(jsg);
      if (intr) {
        this.points.push(intr);
      }
    }
  }
}
  
item.showPoints = function () {
  let points = this.points
  points.forEach( (p) => {
    let dp = this.circleP.instantiate();
    this.circles.push(dp);
    dp.moveto(p);
    dp.show();
    dp.update();
  });
}
/*
let path = '/animate/test1_';
let count = 0;
let save_as_jpeg_enabled = 1;;
const save_as_jpeg = function (done) {
  debugger;
  if (!save_as_jpeg_enabled) {
    done();
    return;
  }
  editor.convertToJpeg(path+count+'.jpg',(err,sz) => {
    debugger;
    count++;
    done();
   // uiAlert('done '+count);
  });
}*/
/*
const animate = function (itm,fr,igoingDown) {
  debugger;
  itm.interpolateSegments(fr);//.5);
  itm.addLines();
  if (!fr) {
    svg.fitContents();
  }
    //svgMain.draw();
  ui.refresh();
  const done = () => {
    let goingDown = igoingDown;
    let interval = 0.01;
    let nfr;
    if (goingDown) {
      if (fr <=0 ) {
        goingDown = false;
        nfr = interval;
      } else {
        nfr = fr - interval;
      } 
    } else {
      if (fr >= 1) {
        goingDown = true;
        nfr = 1 - interval;
      } else {
        nfr = fr + interval;
      }
    } 
    setTimeout(animate,5,itm,nfr,goingDown);
  }
  save_as_jpeg(done);
 
}
*/

item.addOpaqueLayer = function () {
  let opl = this.set('opaqueLayer',core.ArrayNode.mk());
  let {numRows,numCols,width,height,rectP,opacities,randomizer} = this;
  let xdim = width/numCols;
  let ydim = height/numRows;
  let xl = -width/2;
  let yl = -height/2;
  for (let i=0;i<numCols;i++) {
    for (let j=0;j<numRows;j++) {
      let rect = rectP.instantiate();
      rect.width = xdim;
      rect.height = ydim;
      opl.push(rect);
      let pos = Point.mk(xl + i*xdim,yl + j*ydim);
      rect.moveto(pos);
      let opv = randomizer.valueAt(opacities,i,j);
    //  let rgb = `rgba(0,0,0,${opv})`;
   //   let rgb = `rgba(255,255,255,${opv})`;
      let rgb = `rgba(0,0,100,${opv})`;
	  debugger;
	  console.log(rgb);
      rect.fill = rgb;
      rect.update();
      rect.show();
    }
  }
}

item.alongCircle = function (circle,fr) {
	let a = 2*Math.PI*fr;
	let {center,radius} = circle;
	let vec = Point.mk(Math.cos(a),Math.sin(a));
	return center.plus(vec.times(radius));
}

item.resetSegment = function (seg) {
	let {end0,end1} = seg;
	debugger;
	let s0 = end0.onShape;
	let s1 = end1.onShape;
	let fr0 = end0.fractionAlong;
	let fr1 = end1.fractionAlong;
	console.log('fr0 ',fr0,' fr1 ',fr1);
		
	if (Math.abs(fr0-fr1)<0.1) {
		seg.hideMe = 1;
		console.log('hideMe');
	}/*
	if (fr1 < 0) {
		fr1 = 0;
	}*/
	let p0 = this.alongCircle(s0,fr0);
	let p1 = this.alongCircle(s1,fr1);
	end0.copyto(p0);
	end1.copyto(p1);
}

item.resetSegments = function () {
	debugger;
	let {segments} = this;
	segments.forEach( (seg) => {
	  this.resetSegment(seg);
	});
}
/*	
item.resetSegment = function (rect,seg) {
	debugger;
	let ds = seg.descriptions;
	for (let i=0;i<2;i++) {
		let d = ds[i];
		let sideName = d[0];
		let fraction = d[1];
		let side = rect[sideName];
		let {end0,end1} = side;
		let vec = end1.difference(end0);
		let np = end0.plus(vec.times(fraction));
		if (i === 0) {
			seg.set('end0',np);
		} else {
			seg.set('end1',np);
	  }
	}
}

item.resetSegments = function (rect) {
	let {segments} = this;
	this.addSides(rect);
	segments.forEach( (seg) => {
	  this.resetSegment(rect,seg);
	});
}
*/

item.moveSegment = function (seg) {
	debugger;
	let {end0,end1,hideMe} = seg;
	if (hideMe) {
		return;
	}
	let fr0 = end0.delta+end0.fractionAlong;
	let fr1 = end1.delta+end1.fractionAlong;
	fr0 = putIn0_1(fr0);
//	fr0<0?fr0+1:(fr0>1?fr0-1:fr0);
	fr1 = putIn0_1(fr1);	
	end0.fractionAlong = fr0;
	end1.fractionAlong = fr1;
}



item.moveSegments = function () {
	debugger;
	let {segments} = this;
	//this.addSides(rect);
	segments.forEach( (seg) => {
	  this.moveSegment(seg);
	});
}	

/*
let nextSides = {topSide:"rightSide",rightSide:"bottomSide",bottomSide:"leftSide",leftSide:"topSide"};
item.moveSegmentBy = function (rect,seg,delta) {
		let ds = seg.descriptions;
	for (let i=0;i<2;i++) {
		let d = ds[i];
		let sideName = d[0];
		let fraction = d[1];
		//let side = rect[sideName];
		let nfr = fraction + delta;
		if (nfr > 1) {
			nfr = nfr - 1;
			d[0] = nextSides[sideName];
		}
		d[1] = Math.min(1,nfr);
	}
}



item.moveSegmentsBy = function (rect,delta) {
	debugger;
	let {segments} = this;
	//this.addSides(rect);
	segments.forEach( (seg) => {
	  this.moveSegmentBy(rect,seg,delta);
	});
}	
*/

item.moveCircleSegmentBy = function (rect,seg,delta) {
		let ds = seg.descriptions;
	for (let i=0;i<2;i++) {
		let d = ds[i];
		let sideName = d[0];
		let fraction = d[1];
		//let side = rect[sideName];
		let nfr = fraction + delta;
		if (nfr > 1) {
			nfr = nfr - 1;
			d[0] = nextSides[sideName];
		}
		d[1] = Math.min(1,nfr);
	}
}
	
item.initializeLines = function (irect) {
  debugger;
  let {width,height,rectP,dimension,includeRect,boardRows,numLines,backgroundColor} = this;
	let rect,circle;
	this.set('segments',core.ArrayNode.mk());
	
	if (dimension) {
		circle = geom.Circle.mk(Point.mk(0,0),0.5*dimension);
		circle.onCircle = true;
		for (let j=0;j<numLines;j++) {
			this.addRandomSegment(this.segments,circle,circle);
		}
		this.addLines();
		return;
	}
	if (irect) {
		rect = irect;
	} else {
		let hw = 0.5 * this.width;
		let hh = 0.5 * this.height;
		let corner = Point.mk(-hw,-hh);
		let extent = Point.mk(this.width,this.height);
	  rect = geom.Rectangle.mk(corner,extent);
	}
	if (backgroundColor) {
		let rr = rectangleP.instantiate();
		rr.width = this.width;
		rr.height = this.height;
		rr.fill = backgroundColor;
		this.set('rr',rr);
	}
	if (!this.lines) {
    this.set('lines',core.ArrayNode.mk());
    this.set('points',core.ArrayNode.mk());  
    this.set('circles',core.ArrayNode.mk());
	} 
 // let {whites,blacks} = this;
  let shapePairs = this.shapePairs;
  if (shapePairs) {
    debugger;
    let ln = shapePairs.length;
    let nlnp = Math.floor((this.numLines)/ln);
    for (let i = 0;i < ln;i++) {
      let cp = shapePairs[i];
      for (let j=0;j<nlnp;j++) {
        this.addRandomSegment(this.segments,cp[0],cp[1]);
      }
    }
    this.addLines();
    return;
  }
 // let ocs = this.originatingShapes;
 // let noc = ocs?ocs.length:0;  
	debugger;
  this.addSides(rect);

  let n=this.numLines;
  let i=0;
  let segments = this.segments;
  debugger;
  for (let i=0;i<numLines;i++) {
  //  let which = Math.min(Math.floor(Math.random() * noc),noc-1)+1;
    this.addRandomSegment(segments,null,null,rect)
  }
  this.addLines();
}


item.initializeGrid = function (irect) {
  debugger;
	let {width,height,numRows,numCols,rectP,dimension,numLines} = this;
	const addGridToCircle = (circle) => {
		circle.onCircle = true;
		let r = circle.radius;
		let deltaX = 2*r/numCols;
		let deltaY = 2*r/numRows;
		let vvec = Point.mk(0,1);
		let hvec = Point.mk(1,0);
		for (let ii = 0;ii <numCols+1;ii++) {
			let xp = -r + ii*deltaX;
			let p = Point.mk(xp,0);
			this.addSegment(this.segments,p,vvec,circle);
		}
		for (let ii = 0;ii <numRows+1;ii++) {
			let yp = -r + ii*deltaY;
			let p = Point.mk(0,yp);
			this.addSegment(this.segments,p,hvec,circle);
		}
	}
		
	let rect,circle;
	this.set('segments',core.ArrayNode.mk());
	if (!this.lines) {
    this.set('lines',core.ArrayNode.mk());
    this.set('points',core.ArrayNode.mk());  
    this.set('circles',core.ArrayNode.mk());
	} 
	if (dimension) {
		circle = geom.Circle.mk(Point.mk(0,0),0.5*dimension);
		addGridToCircle(circle);
    this.addLines();
		return;
	}
	if (irect) {
		rect = irect;
	} else {
		let hw = 0.5 * this.width;
		let hh = 0.5 * this.height;
		let corner = Point.mk(-hw,-hh);
		let extent = Point.mk(this.width,this.height);
	  rect = geom.Rectangle.mk(corner,extent);
	}
	this.set('segments',core.ArrayNode.mk());
	if (!this.lines) {
    this.set('lines',core.ArrayNode.mk());
    this.set('points',core.ArrayNode.mk());  
    this.set('circles',core.ArrayNode.mk());
	} 
  let shapePairs = this.shapePairs;
  if (shapePairs) {
    debugger;
    let ln = shapePairs.length;
    let nlnp = Math.floor((this.numLines)/ln);
    for (let i = 0;i < ln;i++) {
      let cp = shapePairs[i];
			let circle = cp[0];
			let r = circle.radius;
			let deltaX = 2*r/numCols;
			let vvec = Point.mk(0,1);
			for (let ii = 0;ii <numCols+1;ii++) {
				let xp = -r + ii*deltaX;
				let p = Point.mk(xp,0);
				this.addSegment(this.segments,p,vvec,circle);
			}
    }
    this.addLines();
    return;
  }
  let ocs = this.originatingShapes;
  let noc = ocs?ocs.length:0;  
  if (this.dimension) {
    this.set('circle',geom.Circle.mk(Point.mk(0,0),0.5 * this.dimension));
  } else {
		debugger;
    this.addSides(rect);
  }
  let n=this.numLines;
  let i=0;
  let segments = this.segments;
  debugger;
  while (true) {
    if (boardRows) {
      segments = odd?whiteSegs:blackSegs;
    }
    let which = Math.min(Math.floor(Math.random() * noc),noc-1)+1;
    let rsg = this.addRandomSegment(segments,noc?ocs[which-1]:null,null,rect)
    if (rsg) {
      if (ocs) {
        rsg.whichCircle = which;
      }
      i++;
      if (i>=n) {
        break;
      }
    }
  }
  if (includeRect) {
    let rect = rectP.instantiate();
    this.set('rect',rect);
    rect.width = width;
    rect.height = height;
    rect.fill = 'rgb(0,0,0)'
    rect.update();
    rect.show();
  }
  this.addLines();
}

}});

      
