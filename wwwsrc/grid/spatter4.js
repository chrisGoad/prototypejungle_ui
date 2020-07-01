
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
/*
item.rgbAtCell = function (i,j) {
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
  if (redR || blueR || greenR) {
    let rgb = this.rgb2color(red,green,blue);
	return rgb;
  }
}
*/
item.randomValuesAtCell = function (i,j) {
  let {randomGrids,randomizer} = this;  
  if (randomGrids) {
	let rs = {};
	for (let prop in randomGrids) {
	  let randomValues = randomGrids[prop];
	  rs[prop] = randomizer.valueAt(randomValues,i,j);
	}
	return rs;
  }
}
	   
	   
		
item.addAtRandomPoint = function (rect) {
  debugger;
  let {shapes,randomizer,sizes,shapeGenerator} = this;
  let rnd = this.genRandomPoint(rect);
  let cell = rnd[0];
  let pnt = rnd[1];
  let rvs = this.randomValuesAtCell(cell.x,cell.y);
  let shape = this.shapeGenerator(shapes,rvs,cell,pnt);
  shape.moveto(pnt);
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

      

