
core.require('/gen0/animation.js',function (addAnimationMethods) {
 return function (item) {
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


item.genRandomUnitVector = function (directions) {
	let dir,choice;
	if (directions) {
		let ln = directions.length;
		choice = Math.min(Math.floor(Math.random()*ln),ln-1);
		dir = directions[choice];
	} else {
    let amin = Math.PI*(this.angleMin/180);
    let amax = Math.PI*(this.angleMax/180);
     dir = amin + (amax - amin)*Math.random();
	}
  let vec = Point.mk(Math.cos(dir),Math.sin(dir));
	if (directions) {
		vec.which = choice;
	}
  return vec;
}





item.genSides = function () {
  if (this.topSide) {
    return;
  }
  let hw = this.width/2;
  let hh = this.height/2;
  let UL = Point.mk(-hw,hh)
  let UR = Point.mk(hw,hh)
  let LL = Point.mk(-hw,-hh)
  let LR  = Point.mk(hw,-hh)
  this.topSide = geom.LineSegment.mk(UL,UR);
  this.bottomSide = geom.LineSegment.mk(LL,LR);
  this.leftSide = geom.LineSegment.mk(UL,LL);
  this.rightSide = geom.LineSegment.mk(UR,LR);
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
  
    
      
      





item.intersectSegmentWithRectangle = function (lsg) {
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
    
    
item.genRandomPointOnSegment = function (seg) {
  let {end0,end1} = seg;
  let vec = end1.difference(end0);
  let rn = Math.random();
  let rs = end0.plus(vec.times(rn));
	rs.fraction = rn;
	return rs;
}
    
    
    
const extendSegment = function (sg,ln) {
  let p = sg.end0;
  let vec = sg.end1.difference(p);
  let longVec =  vec.times(ln);
  let le0 = p.plus(longVec.minus()) ;
  let le1 = p.plus(longVec);
  return geom.LineSegment.mk(le0,le1);
}  


item.randomPointOnCircle  = function (circle) {
	let {dimension,radius} = circle;
	let a = Math.random()*2 * Math.PI;
//	let a = Math.random() * 1 * Math.PI;
	let rs = Point.mk(radius*Math.cos(a),radius*Math.sin(a));
	rs.angle = a;
	return rs;
}
item.randomSegmentAcrossCircle  = function (circle) {
	//debugger;
	let e0 = this.randomPointOnCircle(circle);
	let e1 = this.randomPointOnCircle(circle);
	//let r0 = this.rotationFactor*(2*Math.random() - 1) * Math.PI;
	//let r1 = this.rotationFactor*(2*Math.random() - 1) * Math.PI;
	let r0 = this.rotationFactor*(0.25 + Math.random() * 0.25) * Math.PI;
	let r1 = -this.rotationFactor*(0.25 + Math.random() * 0.25) * Math.PI;
	//let r1 = -this.rotationFactor*Math.random() * 0.5 * Math.PI;
	//let r1 = this.rotationFactor*Math.random() *2 * Math.PI;
	let rs = geom.LineSegment.mk(e0,e1,1); // 1 = do not copy
	rs.rotation0 = r1;
	rs.rotation1 = r0;
	return rs;
}

	
item.intersectUnitSegment = function(usg) {
  let rsg;
  let {end0,end1} = usg;
  if (this.dimension) {
    let circle = this.circle;
    let vec = end1.difference(end0);
    let sols = circle.intersectLine(end0,vec);mot
    if (sols) {
      rsg = geom.LineSegment.mk(sols[0],sols[1]);
    } else {
      return;
    }
  } else {
    let longSeg = extendSegment(usg,this.width * 4);
    rsg = this.intersectSegmentWithRectangle(longSeg);
  }
  return rsg;
}
    
item.addRandomSegment = function (segments,src,dst) {
  let srcP;
  if (src) {
    let srcIsCircle = geom.Circle.isPrototypeOf(src);
    srcP = (srcIsCircle)?this.genRandomPointInCircle(src):this.genRandomPointOnSegment(src);
  } else {
    srcP = this.genRandomPoint();
  }
  let dstP; 
  let amin = Math.PI*(this.angleMin/180);
  let amax = Math.PI*(this.angleMax/180); 
  if (dst) {
    let dstIsCircle = geom.Circle.isPrototypeOf(dst);
    dstP = (dstIsCircle)?this.genRandomPointInCircle(dst):this.genRandomPointOnSegment(dst); 
    //dstP = this.genRandomPoint();
    let vec = dstP.difference(srcP);
    let dir = Math.atan2(vec.y,vec.x);
    debugger;
    if ((dir < amin) || (dir > amax)) {
      return;
    }
    //dst = this.genRandomPointInCircle(dstP);
    let rsg = geom.LineSegment.mk(srcP,dstP);
		rsg.srcFraction = srcP.fraction;
		rsg.dstFraction = dstP.fraction;
    segments.push(rsg);
  } else {
    /*
    let dir = amin + (amax - amin)*Math.random();
    let adir = 180 * (dir/Math.PI);
    let vec = Point.mk(Math.cos(dir),Math.sin(dir));
   */
	 let vec = this.genRandomUnitVector(this.lineDirections);
   // let e0 = p.plus(vec.minus()) ;
    let e0 = srcP;
    let e1 = srcP.plus(vec);
    let lsg = geom.LineSegment.mk(e0,e1);
   // lsg.angle = dir;
    let rsg = this.intersectUnitSegment(lsg);
    if (!rsg) {
      return;
    }
		rsg.which = vec.which;
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

const interpolateSegments = function (segA,segB,fr ) {
	let {end0:end0A,end1:end1A} = segA;
	let {end0:end0B,end1:end1B} = segB;
	let iend0 = interpolatePoints(end0A,end0B,fr);
	let iend1 = interpolatePoints(end1A,end1B,fr);
	return geom.LineSegment.mk(iend0,iend1);
}
    
  

item.addLine = function (i,lsg) {
 // let line = this.lineP.instantiate();
//  this.lines.push(line);
  let {acrossCircle} = this;
  if (!lsg) {
    debugger;
  }
//debugger;
  const genRandomColor = function () {
    const rval  = function () {
      return Math.floor(Math.random()*250);
    }
    return  `rgb(${rval()},${rval()},${rval()})`;
  }
 // line.stroke  = genRandomColor();
  let seg2line = this.segmentToLineFunction;
  let line,end0,end1;
  if (seg2line) {
    line = seg2line(this,lsg);
  } else {
    line = this.lineP.instantiate();
		end0 = lsg.end0;
		end1	 = lsg.end1;
    line.setEnds(end0,end1);
		if (acrossCircle) {
			debugger;
			line.angle0 = lsg.end0.angle;
			line.angle1 = lsg.end1.angle;
			line.rotation0 = lsg.rotation0;
			line.rotation1 = lsg.rotation1;
		} else {
		  line.srcFraction = lsg.srcFraction;
		  line.dstFraction = lsg.dstFraction;
		}
  }
	//line.stroke = genRandomColor();
	let mvec;
	let center = end0.plus(end1).times(0.5);

	if (this.moveTowardsCenter) {
		let cvec = center.minus();
		mvec = cvec.times(2/this.numTimeSteps);
	} else {
	  let v = this.velocityFactor * (2*Math.random() -1);
		debugger;
		let muvec = this.genRandomUnitVector(this.motionDirections);
	  mvec = muvec.times(v);
		if (muvec.which) {
	     mvec.which = muvec.which;
		}

	}
	let ivec = end1.difference(end0).normalize();
	let ir = Math.atan2(ivec.y,ivec.x);
	
	//let v = 1;
  
	let v = this.velocityFactor * (2*Math.random() -1);
	if (this.uniformRotation) {
		r = this.rotationFactor*(2*Math.random() - 1) * Math.PI;
	} else if (this.crossMode) {
		if (Math.random() < 0.5) {
			r = -ir*(1/this.numTimeSteps);ge
			/*if (this.lineColor1) {
				line.stroke = this.lineColor1;
			}*/
		} else {
			r = (Math.PI/2 -ir)*(1/this.numTimeSteps);
			/*if (this.lineColor2) {
			  line.stroke = this.lineColor2;
			}*/
		}
	} else {
	  r =this.rotationFactor*(2*Math.random() - 1) * Math.PI;
		
	}
	if (this.lineColor1) {
		//line.stroke = (lsg.which === 0)?this.lineColor1:this.lineColor2;
		line.stroke = (Math.random() < 0.5)?this.lineColor1:this.lineColor2;
	}
	let motion = {linear:mvec,rotation:r};
	line.motion = motion;
	
	line.initial = {center:center,rotation:ir};
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


item.updateLine = function (line) {
  let {numTimeSteps,timeStep} = this;
				
	if (line.gone) {
		return;
	}
	let {initial,motion} = line;
	let {center,rotation:irotation} = initial;
	let {linear,rotation} = motion;
	let ucenter = center.plus(linear.times(timeStep));
	let urotation = irotation + rotation*timeStep;
	if (line === lines[0]) {
		debugger;
		console.log('numTimeSteps ',numTimeSteps,' timeStep',timeStep,' rotation ',rotation,' urotation ',urotation);
	}
	let uvec = Point.mk(Math.cos(urotation),Math.sin(urotation));
  let e1 = ucenter.plus(uvec);
  let lsg = geom.LineSegment.mk(ucenter,e1);
  let rsg = this.intersectUnitSegment(lsg);	
	if (!rsg) {
		line.gone = true;
		line.hide();
	} else {
	  line.setEnds(rsg.end0,rsg.end1);
	}
	line.update();
	line.draw();
}
	


   

item.updateLines = function () {
	let {timeStep,lines,numTimeSteps,startShapePairs,endShapePairs,numLines,includeReverse,acrossCircle} = this;
	if (acrossCircle) {
		let {center,radius} = acrossCircle;
		let {x:cx,y:cy} = center;
		for (let i=0;i<numLines;i++) {
			let line = lines[i];
			debugger;
			let {angle0,angle1,rotation0,rotation1} = line;
			let nAngle0 = angle0+rotation0;
			let nAngle1 = angle1+rotation1;
			let end0 = Point.mk(cx+Math.cos(nAngle0)*radius,cy+Math.sin(nAngle0)*radius);
			let end1 = Point.mk(cx+Math.cos(nAngle1)*radius,cy+Math.sin(nAngle1)*radius);
			line.angle0 = nAngle0;
			line.angle1 = nAngle1;
			line.setEnds(end0,end1);
			if (end0.distance(end1) < 50) {
				//line.hide();
				line.stroke = 'rgba(255,0,0,0.7)';
			}
			line.update();
	 		line.draw();
		}
	  return;
	}
	if (startShapePairs) { // interpolate between shape pairs
	debugger;
		let iShapePairs = [];
		let ln = startShapePairs.length;
		let fr;
		if (includeReverse) {
	  	let hts = numTimeSteps/2;
	    if (timeStep < hts) {
			  fr = timeStep/hts;
		  } else {
		    fr = 1 - (timeStep - hts)/hts;
		  }
		} else {
		  fr = timeStep/numTimeSteps;
		}
		for (let i=0;i<ln;i++) {
			let sShapePair = startShapePairs[i];
			let eShapePair = endShapePairs[i];
			let iShapePair = [];
			let iShape0 = interpolateSegments(sShapePair[0],eShapePair[0],fr);
			let iShape1 = interpolateSegments(sShapePair[1],eShapePair[1],fr);
			iShapePair.push(iShape0);
			iShapePair.push(iShape1);
			iShapePairs.push(iShapePair);
		}
    let nlnp = Math.floor(numLines/ln);
		let cnt= 0;
		for (let i = 0;i < ln;i++) {
      let cPair = iShapePairs[i];
      for (let j=0;j<nlnp;j++) {
				let line = lines[cnt++];
				let sFr = line.srcFraction;
				let dFr = line.dstFraction;
				let sSeg = cPair[0];
				let dSeg = cPair[1]
				let sPnt = interpolatePoints(sSeg.end0,sSeg.end1,sFr);
				let dPnt = interpolatePoints(dSeg.end0,dSeg.end1,dFr);
				line.setEnds(sPnt,dPnt);
				line.update();
				line.draw();
			}
		}
		return;
	}
	// let lines fly according to their assigned motions

  let num = lines.length;
  for (let i=0;i<num;i++) {
    this.updateLine(lines[i]);
  }
}
	
   

item.addLines = function () {
  let segs = this.segments;
  let num = segs.length;
  for (let i=0;i<num;i++) {
    this.addLine(i,segs[i]);
  }
}


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
      
  
item.initializeLines = function () {21
  debugger;
  let {width,height,rectP,includeRect,boardRows,acrossCircle,numLines} = this;
 /* let whiteSquares,blackSquares;
  if (this.boardRows) {
    [whiteSquares,blackSquares] = this.genCheckerBoard();
  }*/
  let {whites,blacks} = this;
  this.set('segments',core.ArrayNode.mk());
  this.set('lines',core.ArrayNode.mk());
  this.set('points',core.ArrayNode.mk());  
  this.set('circles',core.ArrayNode.mk());
//  let originatingShapes = [geom.Circle.mk(Point.mk(-100,-150),5),geom.Circle.mk(Point.mk(0,-150),5),geom.Circle.mk(Point.mk(100,-150),5)];
 // let originatingShapes = [geom.Circle.mk(Point.mk(-100,-200),45),geom.Circle.mk(Point.mk(100,-200),45)];
  //let originatingShapes = this.[geom.Circle.mk(Point.mk(-100,-200),45),geom.Circle.mk(Point.mk(100,-200),45)];
	if (acrossCircle) {
		for (let i=0;i<numLines; i++) {
			debugger;
			let seg = this.randomSegmentAcrossCircle(acrossCircle);
		  this.segments.push(seg);
		}
		this.addLines();
		return;
	}
  let shapePairs = this.startShapePairs;
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
  let ocs = this.originatingShapes;
  let noc = ocs?ocs.length:0;  
  if (this.dimension) {
    this.set('circle',geom.Circle.mk(Point.mk(0,0),0.5 * this.dimension));
  } else {
    this.genSides();
  }
  let n=this.numLines;
  let i=0;
  let odd = true;
  let blackSegs,whiteSegs;
  if (boardRows) {
    blackSegs = this.set('blackSegs',core.ArrayNode.mk());
    whiteSegs = this.set('whiteSegs',core.ArrayNode.mk());
  }
  let segments = this.segments;
  debugger;
  while (true) {
    if (boardRows) {
      segments = odd?whiteSegs:blackSegs;
    }
    odd = !odd;
    let which = Math.min(Math.floor(Math.random() * noc),noc-1)+1;
    let rsg = this.addRandomSegment(segments,noc?ocs[which-1]:null)
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
  
 
  ///this.computeIntersections();
  //this.showPoints();
}

item.step = function ()   {
  this.updateLines();
}
	


item.animate = function ()  {
	this.animateIt(this.numTimeSteps,100);
	
}

/*
 
item.setName = function (name) {
	this.name = name;
	if (this.saveImage) {
	  core.vars.whereToSave = `images/${name}.jpg`;
	}
	this.path = `json/${name}.json`;
}
*/     
  
}});

      
