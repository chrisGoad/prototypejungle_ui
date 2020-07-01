
//core.require('/line/line.js','/grid/grid24cons.js','/grid/dim2dWalker2.js',
core.require('/line/line.js','/shape/circle.js','/shape/rectangle.js','/gen0/grid0.js',
function (linePP,circlePP,rectPP,addGridMethods) {
	return function () {
let rs = svg.Element.mk('<g/>');


addGridMethods(rs);
 // let rs = constructor();
  
rs.initProtos = function () {
	core.assignPrototypes(this,'lineP',linePP);
	this.lineP.stroke = 'rgb(255,255,255)';
	this.lineP['stroke-width'] = 1;
	this.lineP.dimension = 4;	
	core.assignPrototypes(this,'rectP',rectPP);
	this.rectP.fill = 'rgb(255,255,255)';
	this.rectP['stroke-width'] = 0;
	core.assignPrototypes(this,'rectElementP',rectPP);
	this.rectElementP.fill = 'rgb(255,255,255)';
	this.rectElementP['stroke-width'] = 0;
	core.assignPrototypes(this,'circleP',circlePP);
	this.circleP.stroke = 'rgb(255,255,255)';
	this.circleP.stroke = 'black';
	this.circleP.fill = 'black';
	this.circleP.fill = 'cyan';
	this.circleP['stroke-width'] = 0.2;
	core.assignPrototypes(this,'boundaryLineP',linePP);
	this.boundaryLineP.stroke = 'rgb(255,255,0)';
	this.boundaryLineP['stroke-width'] = 1;
}  


rs.computeDim = function () {
	let {minDim,maxDim} = this;
	let delta = maxDim - minDim;
	return minDim + delta* Math.random();
}

rs.computeDimValues = function () {
	let {innerCols,innerRows,minDim,maxDim} = this;
	let rvl = [];
	let ln = innerRows * innerCols;
	for (let i =0;i<ln;i++) {
		rvl.push(this.computeDim());
	}
	return rvl;
}


rs.computeRvalues = function () {
	let {numCols,numRows,chanceA} = this;
	let rvl = [];
	let ln = numRows * numCols;
	for (let i =0;i<ln;i++) {
		let vl =  Math.random() < chanceA;
		rvl.push(vl);
	}
	return rvl;
}


rs.genRandomPoint = function (rect) {
    let {corner,extent} = rect;
    let {x:cx,y:cy} = corner;
    let {x:xx,y:xy} = extent;
    let rx = Math.random();
    let ry = Math.random();
    let x  = cx +   rx*xx;
    let y  = cy +   ry*xy;
    return [x,y];
}
rs.computePointValues = function () {
	let {innerWidth,innerHeight,spatterNumPoints} = this;
	let mhw = -0.5 * innerWidth;
	let mhh = -0.5 * innerHeight;
	let cellRectangle = geom.Rectangle.mk(Point.mk(mhw,mhh),Point.mk(innerWidth,innerHeight));
 	let rvl = [];
  for (let i = 0;i<spatterNumPoints;i++) {
		let pnt = this.genRandomPoint(cellRectangle);
		rvl.push(pnt);
	}
	return rvl;
}
			
			
rs.showElements = function (shape) {
	let shapes = shape.shapes;
	shapes.forEach((elt) => elt.show());
}

rs.paintElements = function (shape,color) {
	let shapes = shape.shapes;
	shapes.forEach((elt) => elt.fill = color);
}


rs.addAnElement =  function (shape,n,proto,params,pos) {
	let elements = shape.elements;
  let element = proto.instantiate();
	Object.assign(element,params);
	elements.set(n,element);
	element.moveto(pos);
	element.show();
	return element;
}


rs.addElement = function (shape,cell,iidx,rvs,ipos) {
	let {outerCell,outerRvs,kind} = shape;
	let {kindaValues,kindbValues,innerRows,innerCols,aValues,bValues,aPointValues,bPointValues,
	     deltaX,deltaY,aFill,bFill,aStroke,bStroke,rectElement,randomGridsForShapes} = this;
	let idx,pos,apnt,bpnt,innerColor,exchangeColor;
	let spatter = typeof iidx === 'number'
	let sideCell = typeof outerCell === 'string';
	if (spatter) { //spatter
		idx = iidx;
		apnt = aPointValues[idx];
		bpnt = bPointValues[idx];
	} else  {
	  let {x,y} = cell;
	  idx = x*innerRows+y;
		pos = ipos;
		if (!sideCell) {
		  let {x:ox,y:oy} = outerCell;
			debugger;
	    innerColor  = this.randomValueAtCell(randomGridsForShapes,'innerColor',ox * innerCols + x,oy * innerRows +y);
			if (rvs) {
				exchangeColor = rvs.exchangeColor;
			}
		}
	}
	let av = aValues[idx];
	let bv = bValues[idx];
	let fill,dim;
	if (this.allRandom) {
		dim = this.computeDim();//4*Math.random();
		fill = aFill;
	  stroke = aStroke;
	} else {
		if (kind === 'a') {
	    dim = av;
			fill = aFill;
			stroke = aStroke;
			if (spatter) {
				pos = Point.mk(apnt[0],apnt[1]);
			}
	  } else {
      dim = bv;
			fill = bFill;
			stroke = bStroke;
			if (spatter) {
				pos = Point.mk(bpnt[0],bpnt[1]);
			}
	  }
	}
	let proto,params;
	if (rectElement) {
    if (dim < 0.5) {
			fill = aFill;
		  stroke = aStroke;
		} else {
			fill = bFill;
			stroke = bStroke;
		}
		let width = deltaX/innerCols;
		let height = deltaY/innerRows;
		proto = this.rectElementP;
		params = {width:width,height:height,stroke:stroke,fill:fill};
	} else {
		proto = this.circleP;
		params = {dimension:dim,stroke:stroke,fill:fill};
	}
	this.addAnElement(shape,idx,proto,params,pos);
}



rs.addElements = function (shape,rvs,cell) {
	let {innerWidth,innerHeight,innerRows,innerCols,numRows,numCols,aRectFill,bRectFill,
	     spatterNumPoints} = this;
	let elements = shape.elements;
	let ln = innerRows * innerCols;
	elements.length = ln;
	let deltaX = innerWidth/(innerCols+0);
	let deltaY = innerHeight/(innerRows+0);
	let startx = -0.5*(innerWidth-deltaX);
	let starty = -0.5*(innerHeight-deltaY);
	shape.kind = this.determineKind(cell);
	if (spatterNumPoints) {
		let mhw = -0.5 * innerWidth;
		let mhh = -0.5 * innerHeight;
		let cellRectangle = geom.Rectangle.mk(Point.mk(mhw,mhh),Point.mk(innerWidth,innerHeight));
		for (let i = 0;i<spatterNumPoints;i++) {
			//let pnt = this.genRandomPoint(cellRectangle);
		  this.addElement(shape,undefined,i,rvs);
		}
	} else {
		for (let i = 0;i<innerCols;i++) {
			for (let j = 0;j<innerRows;j++) {
				let icell = {x:i,y:j};
				this.addElement(shape,icell,undefined,rvs,Point.mk(startx+i*deltaX,starty+j*deltaY));
			}
		}
	}
	if (shape.rect) {
		shape.rect.fill = (shape.kind === 'a')?aRectFill:bRectFill;
		//shape.rect.fill = (shape.kind === 'a')?'white':bRectFill;
	}
}
	

	
rs.shapeGenerator =  function (rvs,cell,cnt) {
	debugger;
	let {innerWidth,innerHeight,showRects} = this;
	let notInGrid = typeof cell === 'string';
	
	let shapes = this.shapes;
	let shape = svg.Element.mk('<g/>');
	shape.outerCell = cell;
	shape.outerRvs = rvs;
	if (notInGrid) {
		this.set(cell,shape);
		shape.moveto(cnt);
	} else {
	  let idx = cell.index;
	  shapes.set(idx,shape);
	}
	if (showRects) {
	 	let rect = this.rectP.instantiate();
    shape.set('rect',rect);
	  rect.width = innerWidth;
	  rect.height = innerHeight;
	  rect.show();
	}
	let elements = shape.set('elements',	core.ArrayNode.mk());	
	this.addElements(shape,rvs,cell);
	return shape;
}


	
rs.computeRandomRowCol = function () {
	sz = 0;
	let {numRows,numCols} = this;
  if (this.randomColumn === undefined) {
    this.randomColumn = sz + Math.floor(Math.random() * (numCols-2*sz));
    this.randomRow = sz + Math.floor(Math.random() * (numRows-2*sz));
    alert ('ranrow '+this.randomRow+' rancol '+this.randomColumn);
  }
}




rs.boundaryLineGenerator = function (end0,end1,rvs,cell,orientation) {
	if (!this.showBoundaries) {
		return;
	}
	let line = this.boundaryLineP.instantiate();
	let lines = this.lines;
	lines.push(line);
	line.setEnds(end0,end1);
	//let r = rvs.red;
	//line.stroke = `rgb(${Math.floor(r)},${Math.floor(r)},0)`;
	//line.stroke = 'white';
	line.update();
	line.show();
}
	
	 
	
rs.determineKind = function (cell) {
	let {numRows,numCols,sideBySide,checkerBoard,randomAB,chanceA,rValues} = this;
	let {x,y} = cell;
	let kind;
	let notInGrid = typeof cell === 'string';
	if (notInGrid) {
		kind = cell;
  } else if (this.sideBySide) {
		  let hw = numCols/2;
		  kind = x < hw?'a':'b';	
	} else if (this.horizontalStripes) {
		 kind = y%2?'a':'b';
  } else if (this.checkerBoard) {
		 kind = (x+y)%2?'a':'b';			
	} else if (randomAB) {
		let idx = x*numRows + y;
	  kind = rValues[idx] ?'a':'b';
	  //kind = Math.random() < chanceA?'a':'b';
	} else {
		kind = 'a';
	}
	return kind;
}

rs.addAtSides = function () {
	let {addABatSides,width} = this;
	if (addABatSides) {
		this.shapeGenerator(undefined,'a',Point.mk(-0.6 * width,0));
	  this.shapeGenerator(undefined,'b',Point.mk(0.6 * width,0));
	}
}
rs.initialize = function () {
	core.root.backgroundColor = 'red';
	let {numRows,numCols,innerColorParams,exchangeColorParams,innerRows,innerCols,path,width,height,randomAB,recomputeRvalues,spatterNumPoints} = this;
	this.initProtos();
	// this.setupShapeRandomizer('interpolate', {step:0.3,min:0,max:1,numRows,numCols});
  this.rValues = [];
	this.aPointValues = [];
	this.bPointValues = [];
	this.deltaX = width/numCols;
	this.deltaY = height/numRows;
	if (this.loadFromPath) {
	  core.httpGet('(sys)'+path, (error,json) => {
			let vls = JSON.parse(json);
			Object.assign(this,vls);
			this.addAtSides();
			if (recomputeRvalues) {
				this.rValues = this.computeRvalues();
      }
			this.initializeGrid();
		});
	} else {
    this.aValues = this.computeDimValues();
    this.bValues = this.computeDimValues();
    this.rValues = this.computeRvalues();
		if (spatterNumPoints) {
			this.aPointValues = this.computePointValues();
			this.bPointValues = this.computePointValues();
		}
		this.addAtSides();
		this.initializeGrid();
    let jsn = JSON.stringify(
		{aValues:this.aValues,bValues:this.bValues,rValues:this.rValues,
		 aPointValues:this.aPointValues,bPointValues:this.bPointValues});
	  ui.saveJson(path,jsn,function (err,rs) {
		  debugger;
		});
  }		
}



return rs;
}
});

