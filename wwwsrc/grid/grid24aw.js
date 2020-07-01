
//core.require('/line/line.js','/grid/grid24cons.js','/grid/dim2dWalker2.js',
core.require('/line/line.js','/grid/addGrid8.js',
function (linePP,addGridMethods) {
	return function () {
  debugger;
let rs = svg.Element.mk('<g/>');
let inner0 = svg.Element.mk('<g/>');
rs.set('inner0',inner0);
let inner1 = svg.Element.mk('<g/>');
rs.set('inner1',inner1);

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



inner0.lineLength = 0.5; // this is multiplied by deltaX to get the actual line length
const innerInitialize = 
 function () {
	debugger;
	core.root.backgroundColor = 'red';

  this.pattern = [];
	let {numRows,numCols,width,height} = this;
	let sds = this.set('shapeDescriptors',core.ArrayNode.mk());
  sds.length = numRows*numCols;
	
	this.initializeGrid();

}
inner0.initialize =innerInitialize;
inner1.initialize =innerInitialize;
outer.initialize = function () {
	debugger;
	core.root.backgroundColor = 'red';

  this.pattern = [];
	let {numRows,numCols,width,height} = this;
	//let deltaX = this.deltaX = this.width/this.numCols;
	//let deltaY = this.deltaY = this.height/this.numRows;
	this.initializeGrid();

}
rs.initialize = function () {
	inner0.initialize();
	inner1.initialize();
	inner0.moveto(-90,0);
	inner1.moveto(90,0);
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

const innerShapeGenerator = function (rvs,cell,cnt) {
	//debugger;
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
	let sd = {direction:dir,center:cnt.copy()};
	shapeDescriptors.set(idx,sd);
  this.setLineEnds(line0,lineLength,dir);
	return line0;
}

inner0.shapeGenerator = innerShapeGenerator;
inner1.shapeGenerator = innerShapeGenerator;


outer.shapeGenerator = function (rvs,cell,cnt) {
	 debugger;
  //console.log('this = grid',this === grid);
	let inner,which;
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
	  inner = this.__parent.inner0;
	} else {
		which = 1;
	  inner = this.__parent.inner1;
	}
	let {shapes} = this;
	let sds = inner.shapeDescriptors;
	let shape = svg.Element.mk('<g/>');
	let idx = cell.index;
  shapes.set(idx,shape);
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
		if (which) {
		// line0.stroke = 'rgb(0,0,0)';
		}
	}
	return shape;
}



	 
	


return rs;
}
});

