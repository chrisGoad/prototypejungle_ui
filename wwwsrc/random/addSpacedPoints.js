
core.require('/line/line.js','/shape/circle.js','/shape/rectangle.js',function (linePP,circlePP,rectanglePP) {
 return function (itm) {
//let item = svg.Element.mk('<g/>');


/*adjustable parameters  */

itm.width = 100;
itm.height = 100;
itm.minRadius = 10;
itm.maxRadius = 20;
itm.numPoints = 3;
itm.minSeparation = 1;
itm.maxTries = 100;
itm.leaveSpotVacantFunction = undefined;




 


    
      
itm.collides0 = function (point1,radius1,point2,radius2) {
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
  
itm.collides = function (point,radius) {
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
  

itm.generatePointAndRadius = function () {
  let {width,height,minRadius,maxRadius,numPoints} = this;
  let x = (Math.random() -0.5) * width;
  let y = (Math.random() -0.5) * height;
  let r0 = (Math.random() -0.5);
  let rr = maxRadius - minRadius;
  let r =   r0*rr  + minRadius + 0.5*rr;
  let p = Point.mk(x,y);
  return [p,r];
}
      
itm.generatePoints = function () {
 // initializer(this);
  let {width,height,minRadius,maxRadius,numPoints,maxTries} = this;
  let points = this.set("points",core.ArrayNode.mk());
  let radii = this.set("radii",core.ArrayNode.mk());
  if (this.hasHole) {
    points.push(Point.mk(0,0));
    radii.push(this.width * .3);
  }
  debugger;
  for (let i = 0;i<maxTries;i++) {
    let pr = this.generatePointAndRadius();
    let p = pr[0];
    let r = pr[1];
    if (!this.collides(p,r)) {
      points.push(p);
      radii.push(r);
      if (points.length >= numPoints) {
        console.log('generated points at try number',i);
        return;
      }
    }
  }
  console.log('failed to generate all points');
}

itm.generateShapes = function (protos,setDimensions) {
  let {points,radii} = this;
  let shapes = this.set("shapes",core.ArrayNode.mk());
  let ln = points.length;
  nump = protos.length;
  let start = this.hasHole?1:0;
  for (let i=start;i<ln;i++) {
    let pnt = points[i];
    let lsv = this.leaveSpotVacantFunction;
    if (!(lsv && lsv(pnt))) {
      let which = Math.floor((Math.random()-0.0001) * nump);
      let proto = protos[which];
      let shape = proto.instantiate();
      let setDimension = setDimensions[which];
      setDimension(shape, 2 * radii[i]);
      shapes.push(shape);
      shape.moveto(pnt);
      shape.update();
      shape.show();
    }
  }
}
  
  
 
   
}
});

      

