
// support for graph operations
// in the coordinates of the parent
const installPeripheryOps = function(where) {
  where.toGeomRectangle = function () {
    let width,height;
    let  dim = this.dimension;
    let hasDim = typeof dim === 'number';
    if (hasDim) {
      width = dim;
      height = dim;
    } else {
      width = this.width;
      height = this.height;
    }
    let totalHeight;
    if (this.heightWithCaption) {
      totalHeight = this.heightWithCaption();
    } else {
      totalHeight = height;
    }
    let corner = Point.mk(-0.5*width,-0.5*height);
    let extent = Point.mk(width,totalHeight);//this.__getExtent();
    return geom.Rectangle.mk(corner,extent);
  }
  // where does a ray emanating in the given direction intersect the rectangle?
  where.rectanglePeripheryAtDirection =  function(direction)  {
    let rectangle = this.toGeomRectangle();
    return rectangle.peripheryAtDirection(direction);
  }
  // edge will be one of the sides of the rectangle. Where is the point at the given fraction along the edge?
  where.alongRectanglePeriphery  = function (edge,fraction) {
    let rectangle = this.toGeomRectangle();
    return rectangle.alongPeriphery(edge,fraction);
  }
  where.circlePeripheryAtDirection = function (direction) {
    let intersection = direction.times(0.5 * this.dimension);
    let angle = Math.atan2(direction.y,direction.x);
    let fraction = angle/(Math.PI * 2);
    return {intersection,side:0,sideFraction:fraction}; //todo get the side fraction right
  }
  where.circleAlongPeriphery = function (edge,fraction) {
    let a = 2 * Math.PI * fraction;
    let d = Point.mk(Math.cos(a),Math.sin(a));
    return d.times(0.5 * this.dimension);
  }
  where.lozengeSides = function () {
    let hwidth = 0.5*this.width;
    let hheight = 0.5*this.height;
    let left = Point.mk(-hwidth,0);
    let top = Point.mk(0,-hheight);
    let right = Point.mk(hwidth,0);
    let bottom = Point.mk(0,hheight);
    let rs = [];
    rs.push(LineSegment.mk(right,top));
    rs.push(LineSegment.mk(top,left));
    rs.push(LineSegment.mk(left,bottom));
    rs.push(LineSegment.mk(bottom,right));
    return rs;
  }
  
  where.lozengePeripheryAtDirection = function(direction) {  
    let sides = this.lozengeSides();
    let dim = 2*Math.max(this.width,this.height);
    let center = Point.mk(0,0);
    let line = LineSegment.mk(center,center.plus(direction.times(dim)));
    for (let i=0;i<4;i++) {
      let side = sides[i];
      let intersection = line.intersect(sides[i]);
      if (intersection) {
        let fractionAlong =  ((intersection.difference(side.end0)).length())/(side.length());
        intersection = (fractionAlong > 0.5)?side.end1:side.end0;
        return {intersection:intersection,side:i,sideFraction:Math.round(fractionAlong)};
      }
    }
  }
  
  where.alongLozengePeriphery  = function (edge,fraction) {
    let sides = this.lozengeSides();
    let side = sides[edge];
    let rs = side.pointAlong(fraction);
    return rs;
  }
  
  
  where.peripheryAtDirection = function (direction) {
    switch (this.peripheryType) {
      case 'rectangle':
        return this.rectanglePeripheryAtDirection(direction);
      case 'circle':
        return this.circlePeripheryAtDirection(direction);
      case 'lozenge':
        return this.lozengePeripheryAtDirection(direction);
      
    }
  }
  
  where.alongPeriphery= function (edge,fraction) {
    switch (this.peripheryType) {
      case 'rectangle':
        return this.alongRectanglePeriphery(edge,fraction);
      case 'circle':
        return this.alongCirclePeriphery(edge,fraction);
      case 'lozenge':
        return this.alongLozengePeriphery(edge,fraction);
      
    }
  }
}

//=================
const installRectanglePeripheryOps = function(where) {
  where.toGeomRectangle = function () {
    let width,height;
    let  dim = this.dimension;
    let hasDim = typeof dim === 'number';
    if (hasDim) {
      width = dim;
      height = dim;
    } else {
      width = this.width;
      height = this.height;
    }
    let totalHeight;
    if (this.heightWithCaption) {
      totalHeight = this.heightWithCaption();
    } else {
      totalHeight = height;
    }
    let corner = Point.mk(-0.5*width,-0.5*height);
    let extent = Point.mk(width,totalHeight);//this.__getExtent();
    return geom.Rectangle.mk(corner,extent);
  }
  // where does a ray emanating in the given direction intersect the rectangle?
  where.peripheryAtDirection =  function(direction)  {
    let rectangle = this.toGeomRectangle();
    return rectangle.peripheryAtDirection(direction);
  }
  // edge will be one of the sides of the rectangle. Where is the point at the given fraction along the edge?
  where.alongPeriphery  = function (edge,fraction) {
    let rectangle = this.toGeomRectangle();
    return rectangle.alongPeriphery(edge,fraction);
  }
}


const installCirclePeripheryOps = function(where) {

  where.peripheryAtDirection = function (direction) {
    let intersection = direction.times(0.5 * this.dimension);
    let angle = Math.atan2(direction.y,direction.x);
    let fraction = angle/(Math.PI * 2);
    return {intersection,side:0,sideFraction:fraction}; //todo get the side fraction right
  }

  where.alongPeriphery = function (edge,fraction) {
    let a = 2 * Math.PI * fraction;
    let d = Point.mk(Math.cos(a),Math.sin(a));
    return d.times(0.5 * this.dimension);
  }
}



const installLozengePeripheryOps = function(where) {
  where.sides = function () {
    let hwidth = 0.5*this.width;
    let hheight = 0.5*this.height;
    let left = Point.mk(-hwidth,0);
    let top = Point.mk(0,-hheight);
    let right = Point.mk(hwidth,0);
    let bottom = Point.mk(0,hheight);
    let rs = [];
    rs.push(LineSegment.mk(right,top));
    rs.push(LineSegment.mk(top,left));
    rs.push(LineSegment.mk(left,bottom));
    rs.push(LineSegment.mk(bottom,right));
    return rs;
  }
  where.peripheryAtDirection = function(direction) { 
    let sides = this.sides();
    let dim = 2*Math.max(this.width,this.height);
    let center = Point.mk(0,0);
    let line = LineSegment.mk(center,center.plus(direction.times(dim)));
    for (let i=0;i<4;i++) {
      
      let side = sides[i];
      let intersection = line.intersect(sides[i]);
      if (intersection) {
        let fractionAlong =  ((intersection.difference(side.end0)).length())/(side.length());
        intersection = (fractionAlong > 0.5)?side.end1:side.end0;
        return {intersection:intersection,side:i,sideFraction:Math.round(fractionAlong)};
      }
    }
  }
  where.alongPeriphery  = function (edge,fraction) {
    let sides = this.sides();
    let side = sides[edge];
    let rs = side.pointAlong(fraction);
    return rs;
  }
}

export {installRectanglePeripheryOps,installCirclePeripheryOps,installLozengePeripheryOps,installPeripheryOps};
