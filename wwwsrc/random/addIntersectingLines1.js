
core.require(function () {
 return function (item) {
//let item = svg.Element.mk('<g/>');


/*adjustable parameters  */

item.width = 200;
item.height = 200;

item.numCols= 25
item.numRows= 20;
item.numCols= 20;
item.xdim = 100;
item.ydim = 100;
item.numLines = 2;
item.minDist = 1;
item.lineLengthRatio = .9;


item.genSides = function () {
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

item.genRandomPoint = function () {
  let {width,height} = this;
  let rx = Math.floor((Math.random()-0.5) * width);
  let ry= Math.floor((Math.random()-0.5) * height);
  return Point.mk(rx,ry);
}

item.addRandomSegment = function () {
  let p = this.genRandomPoint();
  let dir = Math.random()*Math.PI;
  let vec = Point.mk(Math.cos(dir),Math.sin(dir)).times(this.width *4);
  
  let e0 = p.plus(vec.minus()) ;
  let e1 = p.plus(vec);
  let intersections = [];
  const pushIfNnul = function (x) {
    if (x) {
      intersections.push(x);
    }
  }
  let lsg = geom.LineSegment.mk(e0,e1);
  pushIfNnul(this.topSide.intersect(lsg));
  pushIfNnul(this.bottomSide.intersect(lsg));
  pushIfNnul(this.leftSide.intersect(lsg));
  pushIfNnul(this.rightSide.intersect(lsg));
  this.segments.push(geom.LineSegment.mk(intersections[0],intersections[1]));
}


item.addLine = function (lsg) {
  let line = this.lineP.instantiate();
  this.lines.push(line);
  const genRandomColor = function () {
    const rval  = function () {
      return Math.floor(Math.random()*254);
    }
    return  `rgb(`${rval()},${rval()},${rval()})`;
  }
  line.stroke  = genRandomColor();
  line.setEnds(lsg.end0,lsg.end1);   
  line.update();
  line.show();
  //debugger;
}

item.addLines = function () {
  let segs = this.segments;
  segs.forEach( (sg) => this.addLine(sg));
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


item.initializeLines = function () {
  debugger;
  this.set('segments',core.ArrayNode.mk());
  this.set('lines',core.ArrayNode.mk());
  this.set('points',core.ArrayNode.mk());  
  this.set('circles',core.ArrayNode.mk());

  this.genSides();
  let n=this.numLines;
  for (let i=0;i<n;i++) {
    this.addRandomSegment();
  }
  this.addLines();
  ///this.computeIntersections();
  //this.showPoints();
}
}});

      

