
core.require('/grid/grid24ay.js',
function (constructor) {
  debugger;	//this.initProtos();
  let randomRow;

  let rs = constructor();
	
	rs.numRows = 8;
	rs.numRows = 10;
//	rs.numRows = 2;
	rs.numCols = 8;
	rs.numCols = 10;
	rs.innerCols = 4;
	rs.innerRows = 4;
	rs.innerWidth = 20;
	rs.innerHeight = 20;
	//rs.numCols = 2;
	rs.width = 160;
	rs.width = 200;
	//rs.width = 20;
	rs.height = 160;
	rs.height = 200;
	//rs.height = 20;
		rs.pointJiggle = 5;

const computeRvalues = function (b) {
	let rvl = [];
	for (let i =0;i<16;i++) {
		let vl = b*Math.random();
		rvl.push(vl);
	}
	return rvl;
}
rs.initialize = function () {
	core.root.backgroundColor = 'red';
	let {numRows,numCols} = this;
	this.initProtos();
	this.setupShapeRandomizer('interpolate', {step:0.3,min:0,max:1,numRows,numCols});
	this.setupShapeRandomizer('color', {step:30,min:100,max:250,numRows,numCols});
  this.aValues = computeRvalues(4);
  this.bValues = computeRvalues(4);
	debugger;
	this.initializeGrid();
 // let jsn = JSON.stringify({a:23});
  let jsn = JSON.stringify({aValues:this.aValues,bValues:this.bValues});
	let path = '/gallery4/grid24ay_1.json';
	ui.saveJson(path,jsn,function (err,rs) {
		 debugger;
		 core.httpGet('(sys)'+path,function (error,json) {
			 debugger;
		 });

	});


}
/*
rs.addElement =  function (shape,n,proto,params,pos) {
	let elements = shape.elements;
  let element = proto.instantiate();
	Object.assign(element,params);
	elements.set(n,element);
	element.show();
	return element;
}
*/
/*
let aO = 4; 
let aI = 1;
let bO = 1;
let bI = 4;

rs.kindaValues = [aO,aO,aO,aO, aO,aI,aI,aO, aO,aI,aI,aO, aO,aO,aO,aO];
rs.kindaValues = [aO,0,0,0, aO,aI,0,0, aO,aI,aI,0, aO,aO,aO,aO];
rs.kindaValues = computeRvalues(4);
//rs.kindaValues = [0,0,0,0, aO,aI,aI,aO, aO,aI,aI,aO, 0,0,0,0];
rs.kindbValues = [bO,bO,bO,bO, bO,bI,bI,bO, bO,bI,bI,bO, bO,bO,bO,bO];
rs.kindbValues = [bO,bO,bO,bO, 0,bI,bI,bO, 0,0,bI,bO, 0,0,0,bO];
//rs.kindbValues = [bO,bO,bO,bO, 0,0,0,0, 0,0,0,0, bO,bO,bO,bO];
//rs.kindbValues = [bO,bO,bO,bO, 0,0,0,0, 0,0,0,0, bO,bO,bO,bO];
rs.kindbValues = computeRvalues(4);
*/
rs.addElement = function (shape,cell,rvs,pos) {
	let {outerCell,outerRvs,kind} = shape;
	let {kindaValues,kindbValues,innerRows,aValues,bValues} = this;
	let {x,y} = cell;
	let idx = x*innerRows+y;
	let av = aValues[idx];
	let bv = bValues[idx];
	let interp = rvs.interpolate;
	let dim = av*interp + bv*(1 - interp);
	if (kind === 'a') {
	  dim = av;
	} else {
    dim = bv;
	}
	/*
		if (kind === 'a') {
	  dim = ((i===1) || (i===2)) && ((j===1) || (j===2)) ? 1:3; 
	} else {
    dim = ((i===1) || (i===2)) && ((j===1) || (j===2)) ? 3:1; 
	}*/
	this.addAnElement(shape,x*innerRows+y,this.circleP,{dimension:dim},pos);
}

rs.addElements = function (shape,rvs,cell) {
	let {innerWidth,innerHeight,innerRows,innerCols} = this;
	let elements = shape.elements;
	let ln = innerRows * innerCols;
	elements.length = ln;
	let deltaX = innerWidth/innerCols;
	let deltaY = innerHeight/innerRows;
	let startx = -0.5*innerWidth;
	let starty = -0.5*innerHeight;
	shape.kind = Math.random() < 0.5?'a':'b';
	for (let i = 0;i<innerCols;i++) {
	  for (let j = 0;j<innerRows;j++) {
			let icell = {x:i,y:j};
		  this.addElement(shape,icell,rvs,Point.mk(startx+i*deltaX,starty+j*deltaY));
		}
	}
}
	
/*	
rs.shapeGenerator =  function (rvs,cell,cnt) {
	let shapes = this.shapes;
	let shape = svg.Element.mk('<g/>');
	let idx = cell.index;
	shapes.set(idx,shape);
	let elements = shape.set('elements',	core.ArrayNode.mk());	
	this.addElements(shape);
	return shape;
	let circleP = this.circleP;
	let ln = 1;
	elements.length = ln;
	const addCircle = function (n,dim,cnt) {
		let circle = circleP.instantiate();
		circle.dimension = dim;
		elements.set(n,circle);
		circle.show();
	}
	shape.show();
	addCircle(0,4,Point.mk(0,0));
	return shape;
}
*/
	
	
	

rs.next = function () {
   this.pattern.forEach((line) =>   {line.stroke = 'black';line.show();});
}
 
  return rs;
});

