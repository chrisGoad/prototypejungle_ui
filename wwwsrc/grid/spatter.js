
//core.require('/grid/addColorGrid.js',function (colorGridMethods) {
core.require(function () {
  return function (item) {
/*adjustable parameters  */


item.genRandomPoint = function (rect) {
    let {corner,extent} = rect;
    let {numRows,numCols} = this;
    let {x:cx,y:cy} = corner;
    let {x:xx,y:xy} = extent;
    let rx = Math.random();
    let ry = Math.random();
    let x  = cx +   rx*xx;
    let y  = cy +   ry*xy;
    let cellX = Math.floor(rx*numCols);
    let cellY = Math.floor(ry*numRows);
    return [Point.mk(cellX,cellY),Point.mk(x,y)];
}

item.addAtRandomPoint = function (rect) {
	debugger;
  let {shapeP,shapes,randomizer,sizes,redR,greenR,blueR,directions0,directions1,shapeGenerator,setFill,setLenDir} = this;
 
  let rnd = this.genRandomPoint(rect);
  let cell = rnd[0];
  let pnt = rnd[1];
  
  let dim = randomizer.valueAt(sizes,cell.x,cell.y);
  let red,blue,green;
  if (redR) {
   red = randomizer.valueAt(redR,cell.x,cell.y);
  }
  if (greenR) {
   green = randomizer.valueAt(greenR,cell.x,cell.y);
  }
   if (blueR) {
     blue = randomizer.valueAt(greenR,cell.x,cell.y);
  }
  let rgb = this.rgb2color(red,green,blue);
  let dir0,dir1;
  if (directions0) {
    dir0 = randomizer.valueAt(directions0,cell.x,cell.y);
  }
  if (directions1) {
    dir1 = randomizer.valueAt(directions1,cell.x,cell.y);
  }
   //else {
   // shape.dimension = dim; 
  //}
 // if (shapeP) {
  //  shape = shapeP.instantiate();
  //} else {
  let shape = this.shapeGenerator(shapes,dim,dir0,dir1,rgb);
  //}
  //shapes.push(shape);
/*  if (setFill) {
	shape.fill = rgb;
  } else {
    shape.stroke = rgb;
  }*/
  if (setLenDir) {
    this.setLenDir(shape,dim,dir);
  }

  shape.moveto(pnt);
  //shape.fill = rgb;
  //shape.update();
  shape.show();
}

item.addShapesAtRandomPoint = function(rect,n) {
  for (let i=0;i<n;i++) {
    this.addAtRandomPoint(rect);
  }
}

item.spatter = function () {
  
  let {width,height,numDrops} = this;
  this.set('shapes',core.ArrayNode.mk());
  let corner = Point.mk(-0.5*width,-0.5*height);
  let extent = Point.mk(width,height);
  let rect = geom.Rectangle.mk(corner,extent);
  this.addShapesAtRandomPoint(rect,numDrops);
}


  
}
});

      

