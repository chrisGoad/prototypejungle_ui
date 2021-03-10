
//core.require('/line/line.js','/gen0/grid0.js','/grid/dim2dWalker2.js',
core.require('/line/line.js','/shape/circle.js','/grid/addGrid8.js',
function (linePP,circlePP,addGridMethods) {
	return function () {
let rs = svg.Element.mk('<g/>');
let inner0 = svg.Element.mk('<g/>');
rs.inner0 = inner0;
//rs.set('inner0',inner0);
let inner1 = svg.Element.mk('<g/>');
//rs.set('inner1',inner1);
rs.inner1 = inner1;

let outer = svg.Element.mk('<g/>');
rs.set('outer',outer);

addGridMethods(inner0);
addGridMethods(inner1);
addGridMethods(outer);
 // let rs = constructor();
  
let initInnerProtos = function () {
	core.assignPrototypes(this,'lineP',linePP);
	this.lineP.stroke = 'rgb(255,255,255)';
	this.lineP['stroke-width'] = 1;
	this.lineP.dimension = 4;
	core.assignPrototypes(this,'circleP',circlePP);
	this.circleP.stroke = 'rgb(255,255,255)';
	this.circleP.stroke = 'rgb(255,255,255)';
	this.circleP.fill = 'black';
	this.circleP['stroke-width'] = 0.2;
	core.assignPrototypes(this,'boundaryLineP',linePP);
	this.boundaryLineP.stroke = 'rgb(255,255,0)';
	this.boundaryLineP['stroke-width'] = 1;
}  

inner0.initProtos = initInnerProtos;
inner1.initProtos = initInnerProtos;

outer.initProtos = function () {
	core.assignPrototypes(this,'lineP',linePP);
	this.lineP.stroke = 'rgb(255,255,255)';
	this.lineP['stroke-width'] = 0.5;
	this.lineP.dimension = 4;
	core.assignPrototypes(this,'boundaryLineP',linePP);
	this.boundaryLineP.stroke = 'rgb(255,255,0)';
	this.boundaryLineP['stroke-width'] = 1;
}  


/*
inner0.lineLength = 0.5; // this is multiplied by deltaX to get the actual line length
const innerInitialize = 
 function () {
	core.root.backgroundColor = 'black';

  this.pattern = [];
	let {numRows,numCols,width,height} = this;
	let sds = this.set('shapeDescriptors',core.ArrayNode.mk());
  sds.length = numRows*numCols;
	
	this.initializeGrid();

}
inner0.initialize =innerInitialize;
inner1.initialize =innerInitialize;

*/
outer.initialize = function () {
	core.root.backgroundColor = 'red';

  this.pattern = [];
	let {numRows,numCols,width,height} = this;
	//let deltaX = this.deltaX = this.width/this.numCols;
	//let deltaY = this.deltaY = this.height/this.numRows;
	this.initializeGrid();

}

const showElements = function (shape) {
	let shapes = shape.shapes;
	shapes.forEach((elt) => elt.show());
}

const paintElements = function (shape,color) {
	let shapes = shape.shapes;
	shapes.forEach((elt) => elt.fill = color);
}
rs.initialize = function () {
	debugger;
	this.inner0.initialize();
	this.inner1.initialize();
	let i0 = inner0.instantiate();
	let i1 = inner1.instantiate();
	this.set('i0',i0);
	this.set('i1',i1);
  showElements(i0);
  showElements(i1);
	i0.moveto(-100,0);
	i1.moveto(100,0);
	outer.initialize();
}
outer.computeRandomRowCol = function () {
	sz = 0;
	let {numRows,numCols} = this;
  if (this.randomColumn === undefined) {
    this.randomColumn = sz + Math.floor(Math.random() * (numCols-2*sz));
    this.randomRow = sz + Math.floor(Math.random() * (numRows-2*sz));
    alert ('ranrow '+this.randomRow+' rancol '+this.randomColumn);
  }
}

const innerShapeGeneratorrr = function (rvs,cell,cnt) {
  //console.log('this = grid',this === grid);
	let {lineLength,shapes,shapeDescriptors} = this;
	let idx = cell.index;
	let line0 = this.lineP.instantiate();
	shapes.set(idx,line0);
	let dir;
	if (this.__name === 'inner0') {
	  dir = 0.35*Math.PI * Math.random();

		//dir = 0; 
	} else {
	  dir = 0.25*Math.PI*(1 + Math.random());// * Math.random();
	}
	// dir = 2*Math.PI * Math.random();
	let llnf = this.lineLength;
	//let sd = {direction:dir,center:cnt.copy()};
	//shapeDescriptors.set(idx,sd);
  this.setLineEnds(line0,lineLength,dir);
	return line0;
}

const innerShapeGenerator = function (rvs,cell,cnt) {
  //console.log('this = grid',this === grid);
	let {lineLength,shapes,shapeDescriptors} = this;
	let idx = cell.index;
	let circle = this.circleP.instantiate();
	shapes.set(idx,circle);
	let dim;
	let basesz  = 1;
	let szrange = 3;
	dim = basesz + Math.random() * szrange;
	circle.dimension = dim;
	return circle;
	if (this.__name === 'inner0') {
	  dir = 0.35*Math.PI * Math.random();

		//dir = 0; 
	} else {
	  dir = 0.25*Math.PI*(1 + Math.random());// * Math.random();
	}
	// dir = 2*Math.PI * Math.random();
	
}


inner0.shapeGenerator = innerShapeGenerator;
inner1.shapeGenerator = innerShapeGenerator;

outer.shapeGenerator = function (rvs,cell,cnt) {
  //console.log('this = grid',this === grid);
	let inner,which,shape;
/*	this.computeRandomRowCol();
	if ((cell.x === this.randomRow) && (cell.y === this.randomColumn)) {
		which = 0;
	 inner = this.__parent.inner0;
	} else {
		which = 1;
	  inner = this.__parent.inner1;
	}*/
	//if (cell.x >=4 ){
	if (Math.random() < 0.5) {
		which = 0;
	  shape = this.__parent.inner0.instantiate();
	} else {
		which = 1;
	  shape = this.__parent.inner1.instantiate();
	}
	debugger;
	let {shapes} = this;
	//let sds = inner.shapeDescriptors;
	//let shape = svg.Element.mk('<g/>');
	let idx = cell.index;
  shapes.set(idx,shape);
	shape.show();
	showElements(shape);
	debugger;
	if (which) {
		// paintElements(shape,'rgb(0,0,0)');
	}
	return shape;
	let ln = sds.length;
	for (let i=0;i<ln;i++) {
	  let line0 = this.lineP.instantiate();
		shape.set('s'+i,line0);
		let sd = sds[i];
		let dir = sd.direction;
		let cnt = sd.center;
	  let llnf = this.lineLength;
    this.setLineEnds(line0,this.lineLength,dir);
		line0.moveto(cnt);
	
	}
	return shape;
}



	 
	


return rs;
}
});

