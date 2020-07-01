
//core.require('/line/line.js','/grid/grid24cons.js','/grid/dim2dWalker2.js',
core.require('/line/line.js','/shape/circle.js','/shape/rectangle.js','/grid/addGrid8.js',
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
	core.assignPrototypes(this,'circleP',circlePP);
	this.circleP.stroke = 'rgb(255,255,255)';
	this.circleP.stroke = 'black';
	this.circleP.fill = 'black';
	this.circleP['stroke-width'] = 0.2;
	core.assignPrototypes(this,'boundaryLineP',linePP);
	this.boundaryLineP.stroke = 'rgb(255,255,0)';
	this.boundaryLineP['stroke-width'] = .2;
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



rs.addLineElement =  function (shape,n,orientation,end0) {
	debugger;
	let {innerWidth,innerHeight,innerRows,innerCols} = this;
	let elements = shape.elements;
  let element = this.lineP.instantiate();
	elements.set(n,element);
	if (orientation === 'horizontal') {
	  ln = innerWidth/innerCols;
	  end1 = end0.plus(Point.mk(ln,0));
	} else { 
	  ln = innerHeight/innerRows;
	  end1 = end0.plus(Point.mk(0,ln));
	}
	element.setEnds(end0,end1);
	element.show();
	return element;
}

rs.addElement = function (shape,col,row,orientation) {
	debugger;
	let {kind} = shape;
	let {aValues,bValues,innerRows,innerCols,innerWidth,innerHeight} = this;
	let idx,vlowidx,vidx;
	if (orientation === 'horizontal') {
	  idx = (innerRows+1)*col + row;
	} else {
		vlowidx = (innerRows+1)*innerCols;
		vidx = innerRows*col + row;
		idx = vidx + vlowidx;
	}
	let startx = -0.5*innerWidth;
	let starty = -0.5*innerHeight;
	let innerDeltaX = innerWidth/innerCols;
	let innerDeltaY = innerHeight/innerRows;
	let end0 = Point.mk(startx + col*innerDeltaX,starty + row*innerDeltaY);
	let av = aValues[idx];
	let bv = bValues[idx];
	let vis;
	if (this.allRandom) {
		vis = Math.random() < this.chanceVisible;
	} else {
		if (kind === 'a') {
	    vis = av;
	  } else {
      vis = bv;
	  }
	}
	//vis = 1;
	//this.addAnElement(shape,x*innerRows+y,this.circleP,{dimension:dim, stroke:stroke, fill:fill},pos);
	if (vis) {
		this.addLineElement(shape,idx,orientation,end0);
	}
}

rs.addElements = function (shape,rvs,cell) {
	let {innerWidth,innerHeight,innerRows,innerCols,numRows,numCols,aRectFill,bRectFill,addLines} = this;
	let elements = shape.elements;
	let ln = (innerRows+1)*innerCols + innerRows*(innerCols+1);

	elements.length = ln;
  let notInGrid = typeof cell === 'string';
	if (notInGrid) {
		shape.kind = cell;
  } else if (this.sideBySide) {
			let {x,y} = cell;
		  let hw = numCols/2;
		  shape.kind = x < hw?'a':'b';
	} else {
	  shape.kind = Math.random() < 0.5?'a':'b';
	}
	for (let i = 0;i<innerCols;i++) {
	  for (let j = 0;j<innerRows+1;j++) {
		  this.addElement(shape,i,j,'horizontal');
		}
	}
	for (let i = 0;i<innerCols+1;i++) {
	  for (let j = 0;j<innerRows;j++) {
		  this.addElement(shape,i,j,'vertical');
		}
	}
	if (shape.rect) {
		shape.rect.fill = (shape.kind === 'a')?aRectFill:bRectFill;
		//shape.rect.fill = (shape.kind === 'a')?'white':bRectFill;
	}
}
	
	
	
rs.shapeGenerator =  function (rvs,cell,cnt) {g
	let {innerWidth,innerHeight,includeRect} = this;
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
	if (includeRect)	{
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
	
	 
	


return rs;
}
});

