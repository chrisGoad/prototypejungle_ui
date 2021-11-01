
//core.require('/gen0/animation.js','/shape/rectangle.js',function (addAnimationMethods,rectangleP) {
core.require('/gen0/animation.js','/shape/rectangle.js',function (addAnimationMethods,rectangleP,lineP) {

//core.require(function () {
 return function (item) {
	// debugger;
//let item = svg.Element.mk('<g/>');
addBasicMethods(item);
addAnimationMethods(item);

/*adjustable parameters  */
let topParams = {width:100,height:100,numDrops:10,lineLength:10,backgroundColor:undefined,minSeparation:0}
item.width = 200;
item.height = 200;

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


item.genRandomSegment = function (ln) {
  let cnt = this.genRandomPoint(); 
  let dir = (Math.PI)*(Math.random());
  let vec = Point.mk(Math.cos(dir),Math.sin(dir));
  let hln = ln/2
  let hvec = vec.times(hln);
  let e0 = cnt.difference(hvec);
  let e1 = cnt.plus(hvec);
  return LineSegment.mk(e0,e1);
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
  this.topSide = geom.LineSegment.mk(UL,UR);
	this.rightSide = geom.LineSegment.mk(UR,LR);
  this.bottomSide = geom.LineSegment.mk(LR,LL);
  this.leftSide = geom.LineSegment.mk(LL,UL);
  this.segments.push(this.topSide);
  this.segments.push(this.rightSide);
  this.segments.push(this.bottomSide);
  this.segments.push(this.leftSide);
}

item.setupRect = function () {
  let {width,height} = this;
  let hw = 0.5*width;
  let hh = 0.5*height;
  let corner = Point.mk(-hw,-hh);
  let extent = Point.mk(width,height);
  let rect = Rectangle.mk(corner,extent);
  this.addSides(rect);
  this.rect = rect;
}

item.segmentIntersects = function (seg) {
  let {segments} = this.
  let ln = segments.length;
  for (let i=0;i<ln;i++) {  
    let ip = seg.intersect(segments[i]);
    if (ip) {
      return true;
    }
  }
}

item.addRandomSegments = function () {
  let {maxDrops,maxTries,segments,lineLength:ln} = this;
  let numDropped = 0;
  let tries = 0;
  while (true) {
    let seg = this.genRandomSegment(ln);
    if (this.segmentIntersects(seg)) {
      tries++;
      if (tries === maxTries) {
        return numDropped;
      }
    } else {
      segments.push(seg);
      numDropped++;
      tries = 0;
      if (numDropped === maxDrops) {
        return numDropped;    
      }
    }
  }
}



item.addLine = function (lsg) {
  let {lines,segments,lineDelta,randomDelta} = this;
  let line = this.lineP.instantiate();
  lines.push(line);
  let {end0,end1} = lsg;
  line.setEnds(end0,end1);
  line.show();
  line.update();
  return line;
}
 

   

item.addLines = function () {
  let {segments} = this;
  segments.forEach((seg) => {
    addLine(seg); 
  });
}
  
  
item.initialize = function () {
  debugger;
  this.segments = [];
  this.set('shapes',core.ArrayNode.mk());
  this.setupRect();
  this.addRandomSegments();
 }
  
}});

      
