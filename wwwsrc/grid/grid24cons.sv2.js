
core.require('/line/line.js','/shape/circle.js','/grid/addGrid5.js','/grid/dim2dWalker2.js',function (linePP,circlePP,addMethods,addRandomMethods) {
  return function () {

let item = svg.Element.mk('<g/>');

addMethods(item);
//addShadeMethods(item);

/*adjustable parameters  */

/*
item.ppositionFunction = function (grid,i,j,botx,boty,topy) {
  let {deltaX,numRows,numCols} = grid;
 
  let ax = (j/numCols) * deltaX
  let deltaY = (i/numRows) * (boty - topy)/numRows;
  return Point.mk(botx + j*ax, boty - i*deltaY);
}
*/

item.initializeConsProtooo = function () {
  core.assignPrototypes(this,'blineP',linePP);
  this.blineP.stroke = 'yellow';
  //this.blineP.stroke = 'rgb(100,100,100)';
  this.blineP.stroke = this.boundaryStroke;
  this.blineP['stroke-width'] = this.boundaryStrokeWidth;
  core.assignPrototypes(this,'rlineP',linePP);
  //this.blineP.stroke = 'rgb(100,100,100)';
  this.rlineP.stroke = this.regionStroke;
  this.rlineP['stroke-width'] = this.regionStrokeWidth;    
  /*core.assignPrototypes(this,'shapeP',linePP);
  this.shapeP.stroke = this.shapeStroke;
  let vec = Point.mk(0.5*(this.width/this.numRows)*this.shapeLengthRatio,0);
  this.shapeP.setEnds(vec.minus(),vec);
  this.shapeP['stroke-width'] = this.shapeStrokeWidth;
  /*core.assignPrototypes(this,'circleP',circlePP);
  this.circleP.stroke = 'transparent';
  this.circleP.fill = 'rgb(1,1,1)';//'red';
//  this.circleP.fill = 'red';
  this.circleP.dimension = 5;*/
}  
/*
item.setupRandomizer = function (tp,nm,params) {
	if (tp === 'randomGridsForBoundaries') {
		if (params.numRows) {
			params.numRows = params.numRows+1;
		  params.numCols = params.numCols+1;
		}
	}
	let rm = this.randomizer;
	if (!rm) {
		rm = this.randomizer = {};
	  addRandomMethods(rm);
	}
	let rnds = this[tp];
	if (!rnds) {
	  rnds = this[tp] = {};
	}
	//let  cParams = {step:35,min:150,max:250,biasFun,numRows:numRows+1,numCols:numCols+1};
	let rs  = rm.genRandomGrid(params);
	rnds[nm]  = rs;
	return rs;
}

item.setupShapeRandomizer = function (nm,params) {
  this.setupRandomizer('randomGridsForShapes',nm,params);
}


item.setupBoundaryRandomizer = function (nm,params) {
  this.setupRandomizer('randomGridsForBoundaries',nm,params);
}*/
item.initializeConstructor = function () {
  let {numRows,numCols,pointJiggle,pointJiggleParams} = this;
debugger;
  if (pointJiggle) {
		let hj = 0.5*this.pointJiggle;
		let jiggleStep = 0.3 * hj;
		let jParams = pointJiggleParams?pointJiggleParam:
     		{step:jiggleStep,min:-hj,max:hj,numRows,numCols};
    this.setupBoundaryRandomizer('jiggleX',jParams);
    this.setupBoundaryRandomizer('jiggleY',jParams);
		debugger;
	}
  this.initializeGrid();  
  
  
}	
return item;
}
});
      

