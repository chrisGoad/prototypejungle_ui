
//core.require('/grid/addColorGrid.js',function (colorGridMethods) {
core.require(function () {
  return function (item) {
/*adjustable parameters  */

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
//item.randomColorBias = 100;
//item.replacementFunction = undefined;//function (grid,i,j) { return i<j};//undefined; //determines swap of shapeP1 for shapeP1
//item.leaveSpotVacantFunction = undefined;
item.shapeGenerationFunction = undefined;
item.includeLetters = 0;
item.letterWidth = 4;
item.letterHeight = 4;
item.fractionInked = 0.4;
/* three prototypes are expected to be available: blineP (for boundary lines), rlineP (for region lines), and shapeP (unless a shape generation function is specified */

let points = [];
/*
const defaultPositionFunction = function (grid,i,j,botx,boty,topy) {
  let {deltaX,numRows} = grid;
  let deltaY = (boty - topy)/numRows;
  return Point.mk(botx + j*deltaX, boty - i*deltaY);
}
*/

const defaultPositionFunction = function (grid,i,j) {
  let {deltaX,deltaY,numRows,numCols,width,height} = grid;
  //let xdim = numCols * deltaX;
  //let ydim = numRows * deltaY;
  let botx = -0.5 * width;
  let boty = -0.5 * height;
  return Point.mk(botx + deltaX*i,boty + deltaY*j);
  
}
/*
const genPointsFunction0 = function (grid) {
  let {numRows,numCols,width,height,positionFunction,points,rpoints,ywander,deltaX} = grid;
  let pf = positionFunction?positionFunction:defaultPositionFunction;
  let botx = -0.5 * width;
  let r = grid.bendCircleRadius;
  let cy = grid.bendCircleY;
  if (!cy) {
    cy = Math.sqrt(r*r - botx*botx) + 0.5 * height;
  }
  //let cy = grid.bendCircleY;
  let boty = 0.5 * height;// + yoffset;
  let topy = - boty;
  let yoffset = 0;
  for (let j = 0;j <= numCols; j++) {
    yoffset  = yoffset + (Math.random()-0.5) * ywander;
    let xp = botx + deltaX*j;
    if (r) {
      boty = cy-Math.sqrt(r*r - xp*xp);
    }
    for (let i = 0;i <= numRows; i++) {
      let p = pf(grid,i,j,botx,boty+yoffset,topy+yoffset);
      points.push(p);
      rpoints.push(Point.mk(0,0));
    }
  }
}
*/

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
	/* i = how far around, j how far out *
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
  //let {points,occupied} = this;
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

//points have coords (0 <= i <= numRows,0 <= j <= numCols),  index =  j*(numRows+1) + i;
//cells have coords (0 <= i < numRows,0 <= j < numCols),  index =  j*numRows + i;

item.pcoordToIndex  = function (p) {
  return (this.numRows+1)*p.x + p.y;
}

item.indexToPcoord = function (idx) {
  let nr = this.numRows + 1;
  let x = Math.floor(idx/nr);
  let y = idx % nr;
  return Point.mk(x,y);
}
// i = row j = column // labeling is row major but actual order is column major // point coords
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

  
  

    
 
item.randomValuesAtCell = function (randomGrids,i,j) {
	if (!randomGrids) {
		return;
	}
  let {randomizer} = this;  
	let rs = {};
	for (let prop in randomGrids) {
	  let randomValues = randomGrids[prop];
	  rs[prop] = randomizer.valueAt(randomValues,i,j);
	}
	return rs;
}

item.addCellBoundaries = function (frame,fraction) { 
  debugger;
  let hcontainer = this.hcontainer;
  let points = this.rpoints;
  let lines = this.set('lines',core.ArrayNode.mk()); 
  let {numRows,numCols,deltaX,deltaY,boundaryLineGenerator,randomGridsForBoundaries} = this;
  let xdim = numCols * deltaX;
  let ydim = numRows * deltaY;
  let ly = -0.5 * ydim;
  let lineIndex = 0;
 
  for (let i = 0;i <= numCols; i++) {
    if (this.fadeIn) {
      this.boundaryLineFraction = i/numCols;
    }
    for (let j = 0;j <=  numRows; j++) {
     // let cellIdx = i*numRows + j; // used for randomizing colors
		 	let rvs = this.randomValuesAtCell(randomGridsForBoundaries,i,j);

      let points = this.pointJiggle?this.rpoints:this.points;
      let cell = {x:i,y:j};
      let p11 = this.pointAt(points,i,j);
      let p12 =  this.pointAt(points,i,j+1);
      let p21 =  this.pointAt(points,i+1,j);
      let p22 =  this.pointAt(points,i+1,j+1);
      //let shw = Math.random() < this.visChance;
      let rs;
      if (p12) {
				rs = this.boundaryLineGenerator(lines,p11,p12,rvs,cell,'vertical');
        //rs = this.addShortenedLine(p11,p12,adjust?lineIndex++:undefined);
       // rs.cellIndex = cellIdx;
       // rs.cellX = j;
        //rs.cellY = i;
      }     
      if (p21) {
 				  rs = this.boundaryLineGenerator(lines,p11,p21,rvs,'horizontal');
         //rs = this.addShortenedLine(p11,p21,adjust?lineIndex++:undefined);
          //rs.cellIndex = cellIdx;
        //  rs.cellX  = j;
        //  rs.cellY = i;
      }
  
      //line.update();
    }
  }
}

/*
item.genShapes0 = function () {
    let {numRows,numCols} = this;
  let shapes = this.set('shapes',core.ArrayNode.mk()); 
  shapes.length = (numRows-1)*(numCols-1);
}
*/

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

		
item.addAtRandomPoint = function (rect) {
  let {shapes,randomizer,sizes,spatterGenerator,randomGridsForShapes} = this;
  let rnd = this.genRandomPoint(rect);
  let cell = rnd[0];
  let pnt = rnd[1];
  let rvs = this.randomValuesAtCell(randomGridsForShapes,cell.x,cell.y);
  let shape = this.spatterGenerator(shapes,rvs,cell,pnt);
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
		}
		shape.show();
		return shape;
	}
	

}

item.addShapes = function () { 
 // if (!this.includeShapes) {
  //  return;
  //}
  let {numRows,numCols,numDrops,width,height,shapeP,shapeGenerator,spatterGenerator,randomGridsForShapes} = this;
  let shapes = this.set('shapes',core.ArrayNode.mk());
	let sln = numRows * numCols;
  shapes.length = sln;
	let shapeDs = this.set('shapeDescriptors',core.ArrayNode.mk());
  shapeDs.length = sln;	
 // shapes.length = numRows*numCols;
  for (let i = 0;i < numCols; i++) {
    for (let j = 0;j <  numRows; j++) {
      let cnt = this.centerPnt(i,j);
      let idx = i*numRows + j;
			let rvs = this.randomValuesAtCell(randomGridsForShapes,i,j);
			let cell = {x:i,y:j};
			let  shp;
			if (this.shapeGenerator) {
				shp = this.shapeGenerator(shapes,rvs,cell,cnt,shapeDs);
			} else {
				shp = this.shapeP.instantiate();
				shapes.push(shp);
				shp.update();
			}
			if (shp) {
			 if (!this.generatorsDoMoves) {
				 shp.moveto(cnt);
			 }
			 /* if (this.shapeOp) {
					this.shapeOp(shp);
				}*/
				shp.show();
			}  
	  }
  }
}

item.addSpatter = function () { 
	//if (spatterGenerator) {
		let {numDrops,width,height,shapes} = this;
    if (!shapes) {
			this.set('shapes',core.ArrayNode.mk()); 
		}

		let corner = Point.mk(-0.5*width,-0.5*height);
    let extent = Point.mk(width,height);
    let rect = geom.Rectangle.mk(corner,extent);
		let count = 0;
		while (count<numDrops) {
			 if (this.addAtRandomPoint(rect)) {
				 count++;
			 }
		}
//	}


}



item.color2rgb = function (c) {
  return `rgb(${Math.floor(c[0])},${Math.floor(c[1])},${Math.floor(c[2])}`;
}
/*
const scalarRandomStep = function (current,step,withinRangeL,withinRangeH) {
  let r = current + step * Math.random();
  if (step > 0) {
     if (r > withinRangeH) {
       r = Math.max(withinRangeL,withinRangeH - (r  - withinRangeH));
       step = -step;
     } 
  } else {
    if (r < withinRangeL) {
       r = Math.min(withinRangeH,withinRangeL + (withinRangeL -r));
       step = -step;
     } 
  }
  return [r,step];
}

item.randomWalkStep = function () {
  let {randomColor,colorStep,colorRangeL,colorRangeH,colorCombo} = this;
  let [red,redStep] = scalarRandomStep(randomColor[0],colorStep[0],colorRangeL[0],colorRangeH[0]);
  let [green,greenStep] = scalarRandomStep(randomColor[1],colorStep[1],colorRangeL[1],colorRangeH[1]);
  let [blue,blueStep] = scalarRandomStep(randomColor[2],colorStep[2],colorRangeL[2],colorRangeH[2]);
  this.randomColor[0] = red;
  if (colorCombo === 'white') {
     this.randomColor[1] = red;
     this.randomColor[2] = red;
  } else {
    if (colorCombo === 'yellow') {
      this.randomColor[1] = red;
    } else {
      this.randomColor[1] = green;
    }
    if (colorCombo === 'magenta') {
      this.randomColor[2] = red;
    } else if (colorCombo === 'cyan') {
      this.randomColor[2] = green;
    } else {
      this.randomColor[2] = blue;
    }
  }
  this.colorStep[0] = redStep
  this.colorStep[1] = greenStep;
  this.colorStep[2] = blueStep;
}
*/
  

item.randomizePoints = function (frame,fraction) {
  let jiggleX0 = this['jiggleX'+frame];
  let jiggleY0 = this['jiggleY'+frame];
  let jiggleX1,jiggleY1;
  if (this.animateIt) {
    jiggleX1 = this['jiggleX'+(frame+1)];
    jiggleY1= this['jiggleY'+(frame+1)];  
  }    
  let {numRows,numCols,randomizer,pointJiggle} = this;
  if (!pointJiggle) {
    return;
  }
  for (let i = 0;i<(numCols+1);i++) {
     for (let j = 0;j < (numRows+1);j++) {
        let pnt = this.pointAt(this.points,i,j);
        let jogX0 = randomizer.valueAt(jiggleX0,i,j);
        let jogY0 = randomizer.valueAt(jiggleY0,i,j);
        let jogX,jogY;
        if (fraction) {
          let jogX1 = randomizer.valueAt(jiggleX1,i,j);
          let jogY1 = randomizer.valueAt(jiggleY1,i,j);  
          jogX = (1-fraction)*jogX0 + fraction*jogX1;          
          jogY = (1-fraction)*jogY0 + fraction*jogY1;                
        } else {
          jogX = jogX0;
          jogY = jogY0;
        }
        let rpnt = this.pointAt(this.rpoints,i,j); 
        rpnt.x = pnt.x + jogX;//Math.random()*pointJiggle -0.5*pointJiggle;
        rpnt.y = pnt.y + jogY;//Math.random()*pointJiggle -0.5*pointJiggle;
     }
  }
}
  
/*
item.addSymmetry= function () {
  let {numRows,numCols,points} = this;
  let middle = (numCols+1)/2;
  for (let i = 0;i<numRows;i++) {
     for (let j = 1;j < middle;j++) {
        let pntL = this.pointAt(i,middle-j);
        let pntR = this.pointAt(i,middle+j);
        pntR.x = pntL.x;
        pntR.y = pntL.y;
     }
  }       
}
*/

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
	debugger;
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
        /* let ce0 = this.indexToPcoord(e0);
         let ce1 = this.indexToPcoord(e1);
         let ci0 = this.indexToPcoord(i0);
         let ci1 = this.indexToPcoord(i1);*/
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
  /*let incsegs = [];
  for (let i=0;i< numSegs;i++) {
    if (included[i]) {
      let cseg = segs[i];
      let [i0,i1] = cseg;
      let ci0 = this.indexToPcoord(i0);
      let ci1 = this.indexToPcoord(i1); 
      incsegs.push([ci0,ci1]);
    }
  }*/

  return rs;
}


item.drawAregion = function (aregion) {
  let {segments,included} = aregion;
  let ln = segments.length;
  for (let i=0;i<ln;i++) {
    if (included[i]) {
      let seg = segments[i];
      let [i0,i1] = seg;
    //  let pi0 = this.indexToPcoord(i0);
    //  let pi1 = this.indexToPcoord(i1);
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
          
                 
        
        
      
item.initializeGrid = function (randomizer) {
  let {numRows,numCols,pointJiggle} = this;
 // this.initializeProtos();
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
       // i = i+1;
      } else {
  //  let w = {minx:0,maxx:4,miny:0,maxy:4};
        if (i < nw) {
          let w = windows[i];
          let r = this.genAregion(w,numStrokes);
         //let r = this.genAregion(w,7);
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
	if (this.spatterGenerator) {
		this.addSpatter();
	}

  
 // debugger;
  //this.genShapes2();
  //this.randomizeLineColors(this.randomizeWhichColors);
    core.tlog('randomizeLines');
  this.show();
    core.tlog('show');

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
	if (contains0 || contains1) {
		debugger;
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
			debugger;
			return;
		}
	} else if (intersections.length === 2) {
		return geom.LineSegment.mk(intersections[0],intersections[1])
	} else {
		debugger; //keep should not happedn
		return;
	}
}

}
});

      

