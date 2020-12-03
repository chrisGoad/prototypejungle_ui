
//core.require('/grid/addColorGrid.js',function (colorGridMethods) {
	//debugger;
core.require('/gen0/dim2dWalker.js','/gen0/animation.js',function (addRandomMethods,addAnimationMethods) {
//core.require('/gen0/test.js',function (addRandomMethods) {
	//debugger;
  return function (item) {
  //return function () {
/*adjustable parameters  */
//let item = svg.Element.mk('<g/>');
addAnimationMethods(item);
item.numRows= 31;
item.numRows = 11;
item.numCols = 11;
item.width = 100;
item.height = 100;
item.deltaX = 5;
item.deltaY = 2;
item.bowRadius = 0;
item.bowYcenter = 50;
item.includeWindow= false;
item.theWindow = core.ObjectNode.mk();
item.theWindow.minx = 3;
item.theWindow.maxx = 6;
item.theWindow.miny = 3;
item.theWindow.maxy = 6;

item.visChance = 1; // for the boundary
item.includeWindow =false;
item.includeShapes = false;
item.includeCellBoundaries = true;
item.boundaryLineFraction = 1;
item.fadeIn = false;
item.ywander = 0;
item.pathLength = 10;
item.requireFullPathLength = true;
item.occupiedCount = 0;
item.pointJiggle = 0;
item.chanceAshapeIsVisible = 1;
//item.chanceShape2IsVisible = 0.5;
item.randomizeWhichColors = 'both';
item.lineShapeLength = 0;
item.bendCircleRadius = 0;
item.bendCircleY = 150;

item.shapeGenerationFunction = undefined;
item.includeLetters = 0;
item.letterWidth = 4;
item.letterHeight = 4;
item.fractionInked = 0.4;
/* three prototypes are expected to be available: blineP (for boundary lines), rlineP (for region lines), and shapeP (unless a shape generation function is specified */

let points = [];

const defaultPositionFunction = function (grid,i,j) {
  let {deltaX,deltaY,numRows,numCols,width,height} = grid;
  let botx = -0.5 * width;
  let boty = -0.5 * height;
  return Point.mk(botx + deltaX*i,boty + deltaY*j);
  
}


// in this case there are sides sideA, and sideB, and an  each given by a function from the [0,1] to the plane. 
// then there is an interolation function I(e0,e1,x) where x is in [0,1]. It for 0 it returns e0, and 1 it returns e1.

// to generated the grid take points A0... An, B0,.... Bn on the sides and join them with the interpolation function
// n = numCols - 1
item.linearInterpolator = function (a,b,fr) {
	let vec = b.difference(a).times(fr);
	let rs = a.plus(vec);
	return rs;
}
	
item.sidesPositionFunction = function (grid,i,j) {
	let {numRows,numCols,sideA,sideB,Interpolator} = grid;
	let I = Interpolator?Interpolator:grid.linearInterpolator;
	let a = sideA(i/(numCols - 1));
	let b = sideB(i/(numCols - 1));
	let rs = I(a,b,j/(numRows - 1));
	return rs;
}


	
	

 item.radialPositionFunction = function (grid,i,j) {
    let {numRows,numCols,angleMin,angleMax,
	       innerRadius,outerRadius,center} = grid;
	let aMinR = (angleMin * Math.PI)/180;
	let aMaxR = (angleMax * Math.PI)/180;
	/* i = how far around, j how far out */
	let aDiff = aMaxR - aMinR;
	let aR = aMinR +  aDiff * (i/(numRows-0));
	let rDiff = outerRadius - innerRadius;
	let midR = innerRadius + rDiff * (j/(numCols -1));
	let bias  = 1*(1 + (j - 0.5*numCols)/numCols);
	let biasSq = bias*bias*bias;
	let maxBiasSq = 1.5*1.5*1.5;
	let r = innerRadius + (biasSq/maxBiasSq)*rDiff * (j/(numCols -1));
	let vec = Point.mk(Math.cos(aR), Math.sin(aR));
	let rs = center.plus(vec.times(r));
	return rs;
  }
  

const genPointsFunction0 = function (grid) {
  let {numRows,numCols,positionFunction,points,rpoints} = grid;
  let pf = positionFunction?positionFunction:defaultPositionFunction;
  for (let i = 0;i <= numCols; i++) {
    for (let j = 0;j <= numRows; j++) {
      let p = pf(grid,i,j);
      points.push(p);
      rpoints.push(Point.mk(0,0));
    }
  }
}
      
      
    


item.genPoints = function () {
  let ywander = this.ywander;
  if (this.points) {
    return;
  }  
  this.set('points',core.ArrayNode.mk()); 
  this.set('rpoints',core.ArrayNode.mk()); 
  this.set('occupied',core.ArrayNode.mk()); 
  this.set('regions',core.ArrayNode.mk()); // assigns to each point its region

  let {numRows,numCols,deltaX,deltaY,genPointsFunction} = this;
  let gp = genPointsFunction?genPointsFunction:genPointsFunction0;
  gp(this);

}

//points have coords (0 <= x <= numCols,0 <= y <= numRows),  index =  x*(numRows+1) + y;
//cells have coords (0 <= x < numCols,0 <= y < numCols),  index =  x*numRows + y;

item.pcoordToIndex  = function (p) {
  return (this.numRows+1)*p.x + p.y;
}

item.indexToPcoord = function (idx) {
  let nr = this.numRows + 1;
  let x = Math.floor(idx/nr);
  let y = idx % nr;
  return Point.mk(x,y);
}
// i = column j = row //column major // point coords
item.pointAt = function (points,i,j) {
  let {numRows,numCols} = this;
  if ((j<=numRows) && (i<=numCols)) {
    let idx = i*(numRows+1) + j;
    return points[idx];
  }
}

item.coordToPoint = function (p) {
  let idx = pcoordIndex(p);
  return this.points[idx];
}


// i, j are cell coords
item.centerPnt = function (i,j) {
  let points = this.pointJiggle?this.rpoints:this.points;
  let pnt00 =  this.pointAt(points,i,j);
  let pnt11 = this.pointAt(points,i+1,j+1);
  if (pnt00 && pnt11) {
    let x = (pnt00.x + pnt11.x)/2;
    let y = (pnt00.y + pnt11.y)/2;
    return Point.mk(x,y);
  } else {
    debugger;//keep
  }
}


item.addLine = function (lines,p1,p2) {
  if (!p2) {
    debugger; //keep
  }
  let proto = (lines === this.blines)?this.blineP:this.rlineP;
  let line = proto.instantiate();
  lines.push(line);
  line.setEnds(p1,p2);    
  line.update();
  line.show();
  return line;
  //debugger;
}

  
  

 
item.randomValueAtCell = function (randomGrids,prop,i,j) {
	if (!randomGrids) {
		return;
	}
	let randomValues  = randomGrids[prop];
	if (!randomValues) {
		return;
	}
  let {randomizer} = this;  
	let rs = randomizer.valueAt(randomValues,i,j);
	return rs;
}
    
 
item.randomValuesAtCell = function (randomGrids,i,j) {
	if (!randomGrids) {
		return;
	}
	let randomizer = this.initRandomizer();
  //let {randomizer} = this;  
	let rs = {};
	for (let prop in randomGrids) {
	  let randomValues = randomGrids[prop];
	  rs[prop] = randomizer.valueAt(randomValues,i,j);
	}
	return rs;
}

item.nextLine = function (proto) {
	let {updating,lines,lineIndex} = this;
	let line;
	if (updating) {
	 line = lines[lineIndex];
	} else {
	  line = proto.instantiate();
	  lines.push(line);
	}
	return line;
}

item.nextShape = function (proto) {
	let {updating,shapes,shapeIndex} = this;
	let shape;
	if (updating) {
	 shape = shapes[shapeIndex];
	 //debugger;
	} else {
		if (proto) {
			shape= proto.instantiate();
		} else {
			shape = svg.Element.mk('<g/>');
		}
		shape.show();
	  shapes.push(shape);
		shape.draw();
	}
	return shape;
}

item.addCellBoundaries = function (frame,fraction) { 
  let hcontainer = this.hcontainer;
  let points = this.rpoints;
	let lines = this.lines;
	this.updating = !!lines;
	//this.prevLines = this.lines;
	if (!lines) {
    lines = this.set('lines',core.ArrayNode.mk()); 
	}
 // let lines = this.lines = [];
  let {numRows,numCols,deltaX,deltaY,boundaryLineGenerator,randomGridsForBoundaries} = this;
  let xdim = numCols * deltaX;
  let ydim = numRows * deltaY;
  let ly = -0.5 * ydim;
  this.lineIndex = 0
  
  for (let i = 0;i <= numCols; i++) {
    if (this.fadeIn) {
      this.boundaryLineFraction = i/numCols;
    }
    for (let j = 0;j <=  numRows; j++) {
		 	let rvs = this.randomValuesAtCell(randomGridsForBoundaries,i,j);
      let points = this.pointJiggle?this.rpoints:this.points;
      let cell = {x:i,y:j};
      let p11 = this.pointAt(points,i,j);
      let p12 =  this.pointAt(points,i,j+1);
      let p21 =  this.pointAt(points,i+1,j);
      let p22 =  this.pointAt(points,i+1,j+1);
      let rs;
      if (p12) {
				rs = this.boundaryLineGenerator(p11,p12,rvs,cell,'vertical');
				if (rs) {
					lines.push(rs);
					if (this.boundaryLineUpdater) {
					  this.boundaryLineUpdater(rs,p11,p12,rvs,cell,'vertical');
					}
				  this.lineIndex++;
			  } else {
				//	debugger;
				}
      }     
      if (p21) {
 				rs = this.boundaryLineGenerator(p11,p21,rvs,cell,'horizontal');
		   if (rs) {
				 lines.push(rs);
				 if (this.boundaryLineUpdater) {
            this.boundaryLineUpdater(rs,p11,p21,rvs,cell,'horizontal');
				 }
				  this.lineIndex++;
			  } else {
					//debugger;
				}
      }
		
    }
  }
}



item.updateCellBoundaries = function (frame,fraction) { 
  let points = this.rpoints;
 // let lines = this.lines = [];
  let {numRows,numCols,deltaX,deltaY,lines,boundaryLineGenerator,randomGridsForBoundaries} = this;
  let xdim = numCols * deltaX;
  let ydim = numRows * deltaY;
  let ly = -0.5 * ydim;
  //this.lineIndex = 0
  let idx = 0;
  for (let i = 0;i <= numCols; i++) {
    if (this.fadeIn) {
      this.boundaryLineFraction = i/numCols;
    }
    for (let j = 0;j <=  numRows; j++) {
			let boundaryLine; 
		 	let rvs = this.randomValuesAtCell(randomGridsForBoundaries,i,j);
      let points = this.pointJiggle?this.rpoints:this.points;
      let cell = {x:i,y:j};
      let p11 = this.pointAt(points,i,j);
      let p12 =  this.pointAt(points,i,j+1);
      let p21 =  this.pointAt(points,i+1,j);
      let p22 =  this.pointAt(points,i+1,j+1);
      let rs;
      if (p12) {
				boundaryLine = lines[idx++];
				this.boundaryLineUpdater(boundaryLine,p11,p12,rvs,cell,'vertical');
      }     
      if (p21) {
				boundaryLine = lines[idx++];
 				this.boundaryLineUpdater(boundaryLine,p11,p21,rvs,cell,'horizontal');
      }
		
    }
  }
}


item.pcoordToIndex  = function (p) {
  return (this.numRows+1)*p.x + p.y;
}

item.cellToIndex  = function (c) {
  return (this.numRows)*c.x + c.y;
}

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

item.addAtPoint = function (cell,pnt,idx) {
  let {shapes,randomizer,sizes,spatterGenerator,randomGridsForShapes} = this;
  let rvs = this.randomValuesAtCell(randomGridsForShapes,cell.x,cell.y);
  //let shape = this.spatterGenerator(rvs,cell,pnt);
  let shape = this.shapeGenerator(rvs,cell,pnt,idx);
	let srect;
	if (shape) {
		if (this.spatterRect) {
		  //srect = this.spatterRect(cell,pnt);
			let {end0,end1} = shape;
			let nend0 = end0.plus(pnt);
			let nend1 = end1.plus(pnt);
			shape.setEnds(nend0,nend1);
	  } else if (!this.generatorsDoMoves) {
		  shape.moveto(pnt);
			shape.cell = cell
		}
		shape.show();
		return shape;
	}
}

item.genRect = function () {
	let {width,height} = this;
	let corner = Point.mk(-0.5*width,-0.5*height);
  let extent = Point.mk(width,height);
  let rect = geom.Rectangle.mk(corner,extent);
	return rect;
}
	
item.genSpatterPoints = function () {
	let {numDrops} = this;
  let rect = this.genRect();
	if (this.spatterPoints) {
		return;
	}
	let pnts = this.spatterPoints = [];
	for (let i=0;i<numDrops;i++) {
		pnts.push(this.genRandomPoint(rect));
	}
}
	
item.addAtRandomPoint = function (rect) {
  let {shapes,randomizer,sizes,spatterGenerator,randomGridsForShapes} = this;
  let rnd = this.genRandomPoint(rect);
  let cell = rnd[0];
  let pnt = rnd[1];
	let shape = this.addAtPoint(cell,pnt);
	return shape;
}
/*	
  let rvs = this.randomValuesAtCell(randomGridsForShapes,cell.x,cell.y);
  //let shape = this.spatterGenerator(rvs,cell,pnt);
  //let shape = this.shapeGenerator(rvs,cell,pnt);
	let srect;
	if (shape) {
		if (this.spatterRect) {
		  srect = this.spatterRect(cell,pnt);
			let {end0,end1} = shape;
			let nend0 = end0.plus(pnt);
			let nend1 = end1.plus(pnt);
			shape.setEnds(nend0,nend1);
	  } else if (!this.generatorsDoMoves) {
		  shape.moveto(pnt);
			shape.cell = cell
		}
		shape.show();
		return shape;
	}
}*/


item.inRandomOrder = function (n) {
  let rs = []; 
  let inRs = [];
  for (let i=0;i<n;i++) {
    inRs[i] = 0;
  }
   const kthFree = function (k) {
    let found = 0;
    let cIndex = 0;
    while (found <= k) {
      if (inRs[cIndex]) {
         cIndex++;
      } else {
        found++;
        cIndex++;
      }
    }
    return cIndex-1;
  }
  let numFree = n;
  let cnt = 0;
  while (numFree > 0) {
    let rn =Math.floor(Math.random() * numFree);
    if (rn === numFree) {
       rn--;
    }
    let next = kthFree(rn);
    rs.push(next);
    inRs[next] = 1;
    numFree--;
  }
  return rs;
}

item.computeCellsByOrdinal = function () {
	let {numRows,numCols} = this;
  let cellsByOrdinal = {};
	let maxOrdinal = -1;
  for (let i = 0;i < numCols; i++) {
    for (let j = 0;j <  numRows; j++) {
			let cell = {x:i,y:j};
			let ord = this.ordinalGenerator(cell);
			if (ord > maxOrdinal) {
				maxOrdinal = ord;
			}
			let cells = cellsByOrdinal[ord]
			if (cells) {
				cells.push(cell);
			} else {
				cellsByOrdinal[ord] = [cell];
			}
		}
	}		
	this.cellsByOrdinal = cellsByOrdinal;
  this.maxOrdinal = maxOrdinal;
}

item.invertMap = function (a) {
	let ln = a.length;
	let rs = [];
	rs.length = ln;
	for (let i=0;i<ln;i++) {
		let vl = a[i];
		rs[vl] = i;
	}
	return rs;
}

item.inSequence = function (n) {
  let rs = [];
  for (let i=0;i<n;i++) {
    rs.push(i);
  }
  return rs;
}

item.rotateArray = function (ar) {
  let ln = ar.length;
  let first = ar[0];
  for (let i = 0;i<ln-1;i++) {
    ar[i] = ar[i+1];
  }
  ar[ln-1] = first;
}
   

item.addShapes = function () { 
  let {numRows,numCols,numDrops,width,height,shapeP,shapeGenerator,
       randomizeOrder,orderByOrdinal,spatterGenerator,randomGridsForShapes,shapes:ishapes} = this;
  debugger;
	if (this.timeStep === undefined) {
		 this.timeStep = 0;
	}
	this.updating = !!ishapes
	let shapes;
  if (ishapes) {
		shapes = ishapes;
	} else {
    shapes = this.set('shapes',core.ArrayNode.mk());
	}
	this.shapeIndex = 0;
	let sln = numRows * numCols;
  //shapes.length = sln;
	let shapeDs = this.set('shapeDescriptors',core.ArrayNode.mk());
  shapeDs.length = sln;	
  const addAshape =  (idx) => {
       //console.log('idx ',idx);
		if (idx === 54) {
			debugger;
		}

    let nr = this.numRows;
    let x = Math.floor(idx/nr);
    let y = idx % nr;
    let cnt = this.centerPnt(x,y);
    let cell = {x,y,index:idx};
		let rvs = this.randomValuesAtCell(randomGridsForShapes,x,y);
    let  shp;
		if (this.shapeGenerator) {
			shp = this.shapeGenerator(rvs,cell,cnt,idx);
			if (this.shapeUpdater) {
				this.shapeUpdater(shp, rvs,cell,cnt);
			}
		} else {
			shp = this.shapeP.instantiate();
			shapes.push(shp);
			shp.update();
			shp.show();
		}
		if (shp) {
			if (!this.generatorsDoMoves) {
				shp.moveto(cnt);
			}
			this.shapeIndex++;
		 // shp.show();
		}  
	}
  if (randomizeOrder) {
    let numShapes = numRows * numCols;
    let order;
    if (this.theShapeOrder) {
      order = this.theShapeOrder;
    // this.rotateArray(order);
    } else {
      this.theShapeOrder = order = this.inRandomOrder(numShapes);
			this.inverseShapeOrder = this.invertMap(order); 
      //this.shapeOrder = order = this.inSequence(numShapes);
    }
    for (let idx = 0; idx < numShapes;idx++) {
      //addAshape(idx);
      addAshape(order[idx]);
     // addAshape(order[idx]);
    }
    return;
  }
	if (orderByOrdinal) {
		this.computeCellsByOrdinal();
		let {maxOrdinal,cellsByOrdinal} = this;
		for (let o = 0;o<=maxOrdinal;o++) {
			let cells = cellsByOrdinal[o];
			if (cells) {
				cells.forEach( (cell) => {
				  let {x,y} = cell;
					let idx = x*numRows + y;
					addAshape(idx);
				});
			}
		}
		return;
	}		
  for (let i = 0;i < numCols; i++) {
    for (let j = 0;j <  numRows; j++) {
      //let cnt = this.centerPnt(i,j);
      let idx = i*numRows + j;
      addAshape(idx);
      /*continue;
			let rvs = this.randomValuesAtCell(randomGridsForShapes,i,j);
			let cell = {x:i,y:j,index:idx};
			let  shp;
			if (this.shapeGenerator) {
				shp = this.shapeGenerator(rvs,cell,cnt,idx);
				if (this.shapeUpdater) {
				  this.shapeUpdater(shp, rvs,cell,cnt);
				}
			} else {
				shp = this.shapeP.instantiate();
				shapes.push(shp);
				shp.update();
				shp.show();
			}
			if (shp) {
			  if (!this.generatorsDoMoves) {
				  shp.moveto(cnt);
			  }
				this.shapeIndex++;
	 		 // shp.show();
			}*/  
	  }
  }
}



item.updateShapes = function () { 
  let {numRows,numCols,numDrops,width,height,shapeP,shapeGenerator,spatterGenerator,randomGridsForShapes,shapes,inverseShapeOrder,randomizeOrder} = this;
	//this.updating = !!ishapes
  const updateAshape =  (shape,idx) => {
	  let nr = this.numRows;
    let x = Math.floor(idx/nr);
    let y = idx % nr;
    let cnt = this.centerPnt(x,y);
    let cell = {x,y,index:idx};
		let rvs = this.randomValuesAtCell(randomGridsForShapes,x,y);
		this.shapeUpdater(shape, rvs,cell,cnt,idx);
  }
		
	//this.shapeIndex = 0;
	let sln = numRows * numCols;
  //shapes.length = sln;
	//let shapeDs = this.set('shapeDescriptors',core.ArrayNode.mk());
  //shapeDs.length = sln;	
	
  for (let i = 0;i < numCols; i++) {
    for (let j = 0;j <  numRows; j++) {
      let cnt = this.centerPnt(i,j);
      let idx = i*numRows + j;
			let shape = randomizeOrder?shapes[inverseShapeOrder[idx]]:shapes[idx];
			let rvs = this.randomValuesAtCell(randomGridsForShapes,i,j);
			let cell = {x:i,y:j,index:idx};
			let  shp;
			if (this.shapeUpdater) {
				this.shapeUpdater(shape, rvs,cell,cnt,idx);
			}
			if (shp) {
			  if (!this.updatersDoMoves) {
				  shp.moveto(cnt);
			  }
				//this.shapeIndex++;
	 		 // shp.show();
			}  
	  }
  }
}


item.updateAtRandomPoint = function (shape) {
  let cell = shape.cell;
  let {x,y} = cell;
  let rvs = this.randomValuesAtCell(this.randomGridsForShapes,x,y);
	this.shapeUpdater(shape,rvs,cell);
}

item.addSpatter = function () { 
		let {numDrops,width,height,shapes} = this;
    if (!shapes) {
			this.set('shapes',core.ArrayNode.mk()); 
		}

		if (this.saveSpatterPoints) {
		  this.genSpatterPoints();
			for (let i=0;i<numDrops;i++) {
				let rpnt = this.spatterPoints[i];
				let [cell,pnt] = rpnt;
				this.addAtPoint(cell,pnt,i);
			}
		} else {
			let rect = this.genRect();
			let count = 0;
			while (count<numDrops) {
				 let shp = this.addAtRandomPoint(rect);
				 if (shp) {
					 if (this.shapeUpdater) {
						 this.updateAtRandomPoint(shp);
					 }
					 count++;
				 }
			}
		}
}

item.updateSpatter = function () { 
  let {shapes} = this;
	if (this.shapeUpdater) {
	  shapes.forEach((shape) => {this.updateAtRandomPoint(shape)});
	}
}


item.color2rgb = function (c) {
  return `rgb(${Math.floor(c[0])},${Math.floor(c[1])},${Math.floor(c[2])}`;
}
  

item.randomizePoints = function () {
  let {numRows,numCols,randomizer,pointJiggle,randomGridsForBoundaries} = this;
  if (!pointJiggle) {
    return;
  }
  let {jiggleX,jiggleY} = randomGridsForBoundaries;
  for (let i = 0;i<(numCols+1);i++) {
     for (let j = 0;j < (numRows+1);j++) {
        let pnt = this.pointAt(this.points,i,j);
        let jogX = randomizer.valueAt(jiggleX,i,j);
        let jogY = randomizer.valueAt(jiggleY,i,j);
        let rpnt = this.pointAt(this.rpoints,i,j); 
        rpnt.x = pnt.x + jogX;
        rpnt.y = pnt.y + jogY;
     }
  }
}
  


// generated regions
//an rline (region line) is given by the coordinates of its end points
// a region is an ArrayNode of points + an ArrayNode of growth points
//gindx = index in the array of growth points
item.addToRegion = function (region,gidx,np) {
  let occupied = this.occupied;
  let {gpoints} = region;
  let npidx = this.pcoordToIndex(np);
  if (npidx < 0) {
    debugger; //keep
  }
  occupied[npidx] = 1;
  this.occupiedCount++;
  let opnt = this.points[gpoints[gidx]];
  gpoints[gidx] = npidx;
  let npnt = this.points[npidx];
  let rs = this.addLine(this.rlines,opnt,npnt);
  rs.cellIndex = npidx;
  rs.cellX = np.x;
  rs.cellY = np.y;
}

item.pcoordOccupied = function (p) {
  let idx = this.pcoordToIndex(p);
  return this.occupied[idx];
}

item.enlargeRegion = function (region) {
  let {numRows,numCols,occupied} = this;
  let gpoints = region.gpoints;
  let gpidx = gpoints[0];
  let gp = this.indexToPcoord(gpidx);
  let candidates = [];
  let gpx = gp.x;
  let gpy = gp.y
  if (gpx>0) {candidates.push(Point.mk(gpx-1,gpy))};
  if (gpx<numCols-1) {candidates.push(Point.mk(gpx+1,gpy))};
  if (gpy>0) {candidates.push(Point.mk(gpx,gpy-1))};
  if (gpy<numRows-1) {candidates.push(Point.mk(gpx,gpy+1))};
  let unoccupied = candidates.filter((p) => !this.pcoordOccupied(p));
  let ln = unoccupied.length;
  if (ln === 0) {
    return false;
  }
  let choice;
  occupied[gpidx] = 1;
  if (ln === 1) {
    choice = unoccupied[0];
  } else {
    let which = Math.floor((Math.random()-.00001)*ln);
    choice = unoccupied[which];
  }
  this.addToRegion(region,0,choice);
  return true;
}
    
  
  
  
  
  
item.addRegions = function () {
  let {occupiedCount,occupied,numRows,numCols,rlines} = this;
  let npnts = (numRows+1) * (numCols+1);
  if ((occupiedCount/ npnts)>this.fractionToOccupy){
    console.log('last count = ',occupiedCount, 'out of ',npnts);
    return false;
  }
  let seed = Math.max(0,Math.floor((Math.random()-0.001)*npnts));
  while(this.occupied[seed]) {
    seed = Math.max(0,Math.floor((Math.random()-0.001)*npnts));
  }
  let region = {};
  region.gpoints = [seed];
  for (let ii=0;ii<this.pathLength;ii++) {
    if (!this.enlargeRegion(region)) {
      if (this.requireFullLength) {
        return ii===(this.pathLength - 1);
      } else {
        return ii>0
      }
      break;
    }
  }
  return true;
}


// a different sort of region, sort of like an alphabet letter, randomly generated, Called an aregion
// given by a window (where minx etc are interppreted as pcoords, segs, an array of pairs of adjacent points. The initial growth rule is randomly select a point and direction
// stop when the region is connected,and has at least numSegs segments
//


item.genAregion = function (window,numToInclude) {
  let rs = {};
  rs.window = window;
  // generate all the segments in the window
  let segs = [];
  rs.segments = segs;
  let {minx,miny,maxx,maxy} = window;
  for (let i=miny;i<=maxy;i++) {
    for (let j=minx;j<maxx;j++) {
      let pc = {x:j,y:i};
      let pca = {x:j+1,y:i};
      let idx = this.pcoordToIndex(pc);
      let idxa = this.pcoordToIndex(pca);
      segs.push([idx,idxa]);
    }
  }
  for (let j=minx;j<=maxx;j++) {
    for (let i=miny;i<maxy;i++) {
      let pc = {x:j,y:i};
      let pca = {x:j,y:i+1}
      let idx = this.pcoordToIndex(pc);
      let idxa = this.pcoordToIndex(pca);
      segs.push([idx,idxa]);
    }
  }
  //return rs;
  let included = [];
  let numSegs = segs.length;
  included.length = numSegs;
  let numIncluded = 1;
  rs.included = included;
  const adjacentTo = (seg) =>	 {
    let [e0,e1] = seg;
    let incsegs = [];
    for (let i=0;i< numSegs;i++) {
      if (included[i]) {
        let cseg = segs[i];
        let [i0,i1] = cseg;
        if ((i0 === e0) && (i1 === e1))  {
          continue;
        }
        if ((e0===i0)||(e0===i1)||(e1===i0)||(e1===i1)) {
         return true;
        }
      }
    }
    return false;
  }
  
  const addRandomSeg = () => {
    let r = Math.min(Math.floor(Math.random() * numSegs),numSegs - 1);
    if ((!included[r])  && adjacentTo(segs[r])) {
      included[r] = true;
      numIncluded++;
    }
  }
  let rn = Math.min(Math.floor(Math.random() * numSegs),numSegs - 1);
  included[rn] = true; //seed
  while (numIncluded < numToInclude) {
    addRandomSeg();
  }

  return rs;
}


item.drawAregion = function (aregion) {
  let {segments,included} = aregion;
  let ln = segments.length;
  for (let i=0;i<ln;i++) {
    if (included[i]) {
      let seg = segments[i];
      let [i0,i1] = seg;
      let p0 = this.points[i0];
      let p1 = this.points[i1];
      this.addLine(this.rlines,p0,p1);
    }
  }
}
      
item.genAwindows = function (szx,szy) {
  let {numRows,numCols} = this;
  let cx = 0;
  let cy = 0;
  let rs  = [];
  while ((cy + szy) < numRows) {
    cx = 0;
    while ((cx + szx) < numCols) {
      let w = {};
      w.minx = cx;
      w.maxx = cx + szx;
      cx = w.maxx+2;
      w.miny = cy;
      w.maxy = cy + szy;
      rs.push(w);
    };
    cy = cy + szy + 2;
  }
    
  return rs;
}
          
                 

item.initRandomizer = function () {
	let rm = this.randomizer;
	if (!rm) {
		rm = this.randomizer = {};
	  addRandomMethods(rm);
	  if (!this.randomGridsForShapes) {
			this.randomGridsForShapes = {};
		}
	  if (!this.randomGridsForBoundaries) {
	    this.randomGridsForBoundaries = {};
		}
	}
	return rm;
}
item.setupRandomizer = function (tp,nm,params) {
	if (nm === 'pattern') {
		debugger;
	}
	let kind = params.kind =  (tp === 'randomGridsForBoundaries')?'boundaries':'cells';
	if (!params.numRows) {
		params.numRows = kind==='boundaries'?this.numRows+1:this.numRows;
		params.numCols = kind==='boundaries'?this.numCols+1:this.numCols;
	}
	let rm = this.initRandomizer();
	/*let rm = this.randomizer;
	if (!rm) {
		rm = this.randomizer = {};
	  addRandomMethods(rm);
	}*/
	let rnds = this[tp];
//	if (!rnds) {
//	  rnds = this[tp] = {};
//	}
	//let  cParams = {step:35,min:150,max:250,biasFun,numRows:numRows+1,numCols:numCols+1};
  let rs  = rm.genRandomGrid({timeStep:0,params});
	rnds[nm]  = rs;
	
	//debugger;
	return rs;
}


item.stepRandomizer = function (tp,nm) {
	//debugger;
	let wrnds = this[tp];
	let rg = wrnds[nm];
	//let prevValues = rnds.values;
	//let params = rnds.params;
	//params.prevValues = prevValues;
	let rm = this.randomizer;
	//let rs  = rm.genRandomGrid({timeStep:0,params});
	let rs  = rm.genRandomGrid(rg);
	wrnds[nm]  = rs;
	return rs;
}
	
item.stepShapeRandomizer = function (nm) {
  return this.stepRandomizer('randomGridsForShapes',nm);
}
	

item.stepBoundaryRandomizer = function (nm) {
  return this.stepRandomizer('randomGridsForBoundaries',nm);
}
		

item.setupShapeRandomizer = function (nm,params) {
  return this.setupRandomizer('randomGridsForShapes',nm,params);
}


item.setupBoundaryRandomizer = function (nm,params) {
  return this.setupRandomizer('randomGridsForBoundaries',nm,params);
}        
        
item.setupPointJiggle = function () {     
  let {numRows,numCols,pointJiggle,pointJiggleParams} = this;
  if (pointJiggle) {
		let hj = 0.5*this.pointJiggle;
		let jiggleStep = 0.3 * hj;
		let jParams = pointJiggleParams?pointJiggleParam:
     		{step:jiggleStep,min:-hj,max:hj};
    this.setupBoundaryRandomizer('jiggleX',jParams);
    this.setupBoundaryRandomizer('jiggleY',jParams);
	}
}
//item.initializeGrid = function (randomizer) {
item.initializeGrid = function () {
  let {numRows,numCols,pointJiggle,spatter} = this;
 // this.initializeProtos();
 if (this.spatter) {
		this.addSpatter();
	  draw.fitTheContents();
	  return;
  }
	this.setupPointJiggle();
  this.deltaX = this.width/numCols;
  this.deltaY = this.height/numRows;
  core.tlog('initialize');
  this.genPoints();
    core.tlog('genPoints');
	if (pointJiggle) {
    this.randomizePoints(0,0);
    core.tlog('randomizePoints');
	}
  if (this.boundaryLineGenerator) {
    this.addCellBoundaries();
  }
  if (this.generative) {
    this.set('rlines',core.ArrayNode.mk());
    while (this.addRegions()) {
    }
  }
  if (this.includeLetters) {
    this.set('rlines',core.ArrayNode.mk());
    let windows = this.genAwindows(this.letterWidth-1,this.letterHeight-1);
    let numletters = 0;
    let nw = windows.length;
    for (let i=0;i<nw;i++) {
      let numStrokes = this.fractionInked * this.letterWidth * this.letterHeight;
      if ((Math.random() < 0.4) && (numletters>this.lettersPerWord)){
        numletters= 0;
      } else {
        if (i < nw) {
          let w = windows[i];
          let r = this.genAregion(w,numStrokes);
          this.drawAregion(r);
          numletters++;
        }
      }
    };
  }
  core.tlog('genHorizontalLines');
  if (this.shapeGenerator || this.shapeP  ) {
    this.addShapes();
  }
	draw.fitTheContents();
  if (this.lastGridStep) {
    this.lastGridStep(); // eg for filling in symmetries
  }
    core.tlog('randomizeLines');
  this.show();
    core.tlog('show');

}

item.regenerateShapes = function () {
  this.shapes.remove();
  this.addShapes();
}



item.updateGrid = function () {
  let {numRows,numCols,pointJiggle} = this;
 // this.initializeProtos();
  if (this.boundaryLineUpdater) {
    this.updateCellBoundaries();
  }
	if (this.shapeUpdater) {
    this.updateShapes();
  }
	this.show();
}	 

item.updateContent = function () {
	if (this.spatter) {
		this.updateSpatter();
	} else {
		this.updateGrid();
	}
}
item.setLineEnds = function (line,ilength,dir) {
  if (!line) {
    debugger;//keep
  }
  let deltaX = this.deltaX;
  let length = ilength * deltaX;
  let end1 = Point.mk(Math.cos(dir),Math.sin(dir)).times(length/2);
	let end0 = end1.minus();
	line.setEnds(end0,end1);
	line.update();
  line.show();
}

item.constructSides = function (rect) {
	let {corner,extent} = rect;
	let {x:cx,y:cy} = corner;
	let {x:xx,y:xy} = extent;
  let UL = Point.mk(cx,cy);
  let UR = Point.mk(cx+xx,cy);
  let LL = Point.mk(cx,cy+xy);
  let LR  = Point.mk(cx+xx,cy+xy);
	let rs = {};
  rs.top = geom.LineSegment.mk(UL,UR);
  rs.bottom = geom.LineSegment.mk(LL,LR);
  rs.left = geom.LineSegment.mk(UL,LL);
  rs.right = geom.LineSegment.mk(UR,LR);
	return rs;
}


item.intersectWithSides = function (lseg,rect,sides) {
  let {end0,end1} = lseg;
	let contains0 = rect.contains(end0);
	let contains1 = rect.contains(end1);
  let intersections = [];
  const pushIfNnul = function (x) {
    if (x) {
      intersections.push(x);
    }
  }
  pushIfNnul(sides.top.intersect(lseg));
  pushIfNnul(sides.bottom.intersect(lseg));
  pushIfNnul(sides.left.intersect(lseg));
  pushIfNnul(sides.right.intersect(lseg));
  if (intersections.length === 0) {
		if (contains0 && contains1) {
			return lseg;
		}  else {
      debugger; //keep
      return;
		}
  } else if (intersections.length === 1) {
		if (contains0) {
			return geom.LineSegment.mk(end0,intersections[0]);
		} else if (contains1) {
				return geom.LineSegment.mk(end1,intersections[0]);
		} else {
		//	debugger;
			return;
		}
	} else if (intersections.length === 2) {
		return geom.LineSegment.mk(intersections[0],intersections[1])
	} else {
		debugger; //keep should not happednpo
		return;
	}
}


item.randomCell = function (excl) {
	let {numRows,numCols} = this;
  if (this.randomColumn === undefined) {
  let col = excl + Math.floor(Math.random() * (numCols-2*excl));
  let row= excl + Math.floor(Math.random() * (numRows-2*excl));
  return {x:col,y:row};
  }
}

item.assignValueToPath = function (path,value) {
	let ln = path.length;
	let cvl = this;
	for (let i=0;i<ln-1;i++) {
		let pel = path[i];
		let nvl = cvl[pel];
		if (!nvl) {
			nvl = {};
			cvl[pel] = nvl;
		}
		cvl = nvl;
	}
	let lst = path[ln-1];
	if (cvl[lst] === undefined) {
	  cvl[lst] = value;
	}
}
	
item.assignValues = function (vls) {
	vls.forEach( (vl) => {
		let [path,value] = vl;
		this.assignValueToPath(path,value);
	});
}
		
item.outerInitialize = function (cb) {
	debugger;
	//core.root.backgroundColor = 'red';
	//this.initializeP();
 // this.dirValues = this.computeDirValues();
	let {path} = this;
	
	//this.dirValues = [];
	if (this.loadFromPath) {
		debugger;
	  core.httpGet(path, (error,json) => {
			let vls = JSON.parse(json);
			this.assignValues(vls);
			this.initializeGrid();
			if (cb) {
				cb();
			}
			debugger;
		});
	} else {
		//this.ranRowCol = this.randomCell(this.randomCellExclude);
    let vls = this.computeValuesToSave();
		this.initializeGrid();
		if (this.saveJson) {
		/*  let vls = {};
			propsToSave.forEach( (prop) => {
			   let vl = this[prop];
				 vls[prop] = this[prop];
		  });*/
      let jsn = JSON.stringify(vls);
			if (this.saveJson) {
	      core.saveJson(path,jsn,function (err,rs) {
					if (cb) {
						cb();
					}
		      debugger;
		    });
			}
		} else {
			if (cb) {
				cb();
			}
		}
  }
}

return;

 /*
item.shapeTimeStep  = function() {
	let {numRows,numCols,shapes} = this;
	for (let i = 0;i < numCols; i++) {
    for (let j = 0;j <  numRows; j++) {
			let cnt = this.centerPnt(i,j);
      let idx = i*numRows + j;
			let rvs = this.randomValuesAtCell(randomGridsForShapes,i,j);
			let cell = {x:i,y:j,index:idx};
			let shp = this.shapeGenerator(rvs,cell,cnt);
	*/
/*item.animateIt = function (numFrames,interval) {
 // let numFrames = 10;
    //svgMain.draw();
	let animationUnderway = this.animationUnderway?this.animationUnderway:0;
	this.animationUnderway = 1;
	let nfr,frameCount,frameNumber;
	if (!animationUnderway) {
		nfr = 0;
		this.timeStep = 0;
		frameNumber = this.frameNumber = 0;
		
	} else {
		frameNumber = this.frameNumber;
		nfr = this.timeStep;
	}
	this.paused = false;
	//let interval = 500;
  dom.svgDraw();
  const doStep = () => {
		if (this.paused) {
			return;
		}
		console.log('timeStep ',nfr,' frameNumber ',frameNumber); 
		if (nfr === numFrames) {
			console.log('Done');
			return;
		}
		this.timeStep = nfr;
		frameNumber++;
		this.frameNumber = frameNumber;
		this.step();
		dom.svgDraw();
		if (this.saveVideo) {
			draw.saveFrame(this.frameNumber);
		}
		nfr++;

		setTimeout(doStep,interval);
  }
  if (this.saveVideo) {
		draw.saveFrame(frameNumber);
	}
  setTimeout(doStep,interval);
}


item.oneStep = function (save) {
 // let numFrames = 10;
    //svgMain.draw();
    let nfr = this.timeStep;
		nfr++;
		if (nfr >= this.frameCount) {
			console.log('Done at frame ',nfr);
			return;
		}
		console.log('timeStep ',nfr,' frameNumber ',this.frameNumber); 
		this.timeStep = nfr;

		this.step();
		dom.svgDraw();
		if (save && this.saveVideo) {
			this.frameNumber++;
		  draw.saveFrame(this.frameNumber);
	  }
}

item.repeatFrame = function (n) {
 // let numFrames = 10;
    //svgMain.draw();
		frameNumber = this.frameNumber;
		if (!this.saveVideo) {
			alert('not saving video');
			return;
		}
		let  {numFramesToRepeat} = this;
		if (!numFramesToRepeat) {
			numFramesToRepeat = 1;
		}
	  dom.svgDraw();
    alert('repeating this frame '+numFramesToRepeat+' times ');
		for (let i=0;i<numFramesToRepeat;i++) {
		  draw.saveFrame(frameNumber++);
	  }
		this.frameNumber = frameNumber;
}


item.pauseAnimation = function () {
	this.paused = true;
}
// faint box - otherwise ffmpeg gets confused


 item.timeStep = 0;
 */

}
});

      

