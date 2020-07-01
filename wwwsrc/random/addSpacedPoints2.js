
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





 
itm.hitsBox = function (point,radius,box) {
  let {minX,maxX,minY,maxY} = box;
  let px = point.x;
  let py = point.y;
  if ((px+radius)<minX) {return false;};
  if ((px-radius)>maxX) {return false;};
  if ((py+radius)<minY) {return false;};
  if ((py-radius)>minY) {return false;};
  return true;
}

itm.generatePartition = function (box) {
  let {minX,maxX,minY,maxY} = box;
  let midX = 0.5*(minX+maxX);
  let midY = 0.5*(minY+maxY);
  let box0 = {minX:minX,maxX:midX,minY:minY,maxY:midY};
  let box1 = {minX:midX,maxX:maxX,minY:minY,maxY:midY};
  let box2 = {minX:minX,maxX:midX,minY:midY,maxY:maxY};
  let box3 = {minX:midX,maxX:maxX,minY:midY,maxY:maxY};
  return [box0,box1,box2,box3];
}

itm.topBox = function () {
  let {width,height} = this;
  let hwd = width/2;
  let hht = height/2;
  return {minX:-hwd,maxX:hwd,minY:-hht,maxY:hht};
}

itm.generateBuckets = function () {
  let bx = this.topBox();
  let iprt = this.generatePartition(bx);
  let buckets = this.set('buckets',core.ArrayNode.mk());
  iprt.forEach(function (bx) {
    let bucket = core.ObjectNode.mk();
    let pnts = core.ArrayNode.mk();
    let radii = core.ArrayNode.mk();
    bucket.set('box',bx);
    bucket.set('points',pnts);
    bucket.set('radii',radii);
    buckets.push(bucket);
  });
}
  
  
  


    
      
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


itm.collidesInBucket = function (bucket,point,radius) {
 // initializer(this);
  let {points,radii} = bucket;
  let n = points.length;
  for (let i=0;i<n;i++) {
    if (this.collides0(point,radius,points[i],radii[i])) {
      return true;
    }
  }
  return false
}
  
itm.collides = function (point,radius) {
 // initializer(this);
  let buckets = this.buckets;
  let nb = buckets.length;
  for (i = 0;i<nb;i++) {
    let bucket = buckets[i];
    let {points,radii} = bucket;
    let box = bucket.box;
    if (this.hitsBox(box,point,radius)) {
      if (this.collidesInBucket(bucket,point,radius)) {
        return true;
      }
      points.push(point.copy());
      radii.push(radius);
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
  debugger;
  this.generateBuckets();
 /* if (this.hasHole) {
    points.push(Point.mk(0,0));
    radii.push(this.width * .3);
  }*/
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

itm.generateShapes = function (protos,setDimensions,probabilities) {
  let {points,radii} = this;
  let shapes = this.set("shapes",core.ArrayNode.mk());
  let ln = points.length;
  nump = protos.length;
  let start = this.hasHole?1:0;
  let which;
  for (let i=start;i<ln;i++) {
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
      debugger;
    }
    let shape = proto.instantiate();
    let setDimension = setDimensions[which];
    shapes.push(shape);
    shape.moveto(points[i]);
    setDimension(shape, 2 * radii[i]);	
    shape.update();
    shape.show();
  }
}
  
  
 
   
}
});

      

