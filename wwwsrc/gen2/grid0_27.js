
//core.require('/line/line.js','/grid/grid24cons.js','/grid/dim2dWalker2.js',
//core.require('/line/line.js','/shape/circle.js','/grid/addGrid8.js',
core.require('/line/line.js','/shape/circle.js','/gen0/grid0.js',
function (linePP,circlePP,addGridMethods) {
let rs = svg.Element.mk('<g/>');

let inner0 = svg.Element.mk('<g/>');
inner0.which = 0;
//rs.inner0 = inner0;
//rs.set('inner0',inner0);
let inner1 = svg.Element.mk('<g/>');
inner1.which = 1;
//rs.set('inner1',inner1);
//rs.inner1 = inner1;

//let outer = svg.Element.mk('<g/>');
//rs.set('outer',outer);

addGridMethods(inner0);
addGridMethods(inner1);
addGridMethods(rs);
rs.setName('grid0_27');
let owd =1000;
let onr = 16;
let params = {numRows:onr,numCols:onr,width:owd,height:owd};
Object.assign(rs,params);
let inr = 4;
let wdfc = 1;
let iparams = {numRows:inr,numCols:inr,width:wdfc* owd/onr,height:wdfc*owd/onr};
Object.assign(inner0,iparams);
Object.assign(inner1,iparams);


debugger;
 // let rs = constructor();
  
let initInnerProtos = function () {
	core.assignPrototypes(this,'lineP',linePP);
	this.lineP.stroke = 'rgb(255,255,255)';
	this.lineP['stroke-width'] = 1;
	this.lineP.dimension = 4;
	core.assignPrototypes(this,'circleP',circlePP);
	this.circleP.stroke = 'rgb(255,255,255)';
	this.circleP.stroke = 'rgb(255,255,255)';
	this.circleP.fill = 'white';
	this.circleP['stroke-width'] = 0.2;
	core.assignPrototypes(this,'boundaryLineP',linePP);
	this.boundaryLineP.stroke = 'rgb(255,255,0)';
	this.boundaryLineP['stroke-width'] = 1;
}  

inner0.initProtos = initInnerProtos;
inner1.initProtos = initInnerProtos;

rs.initProtos = function () {
	core.assignPrototypes(this,'lineP',linePP);
	this.lineP.stroke = 'rgb(255,255,255)';
	this.lineP['stroke-width'] = 0.5;
	this.lineP.dimension = 4;
	core.assignPrototypes(this,'boundaryLineP',linePP);
	this.boundaryLineP.stroke = 'rgb(255,255,0)';
	this.boundaryLineP['stroke-width'] = 1;
}  


const showElements = function (shape) {
	let shapes = shape.shapes;
	shapes.forEach((elt) => elt.show());
}

rs.initialize = function () {
	debugger;
		core.root.backgroundColor = 'blue';

	inner0.initProtos();
	inner1.initProtos();
	inner0.initializeGrid();
	inner1.initializeGrid();
	let i0 = inner0.instantiate();
	/*let i1 = inner1.instantiate();
	this.set('i0',i0);
	this.set('i1',i1);
  showElements(i0);
  showElements(i1);
	i0.moveto(-100,0);
	i1.moveto(100,0);*/
	this.initializeGrid();
}



const innerShapeGenerator = function (rvs,cell,cnt) {
	let {lineLength,shapes,shapeDescriptors,which} = this;
	let circle = this.circleP.instantiate();
	//shapes.set(idx,circle);
	shapes.push(circle);
	let dim;
	let basesz  = 5;
	let szrange = 15;
	dim = basesz + Math.random() * szrange;
	circle.dimension = dim;
	if (which === 0) {
    circle.fill = 'black'
	} else {
		circle.fill = 'white'
	}
	return circle;
}


inner0.shapeGenerator = innerShapeGenerator;
inner1.shapeGenerator = innerShapeGenerator;

rs.shapeGenerator = function (rvs,cell,cnt) {
	debugger;
	let inner,which,shape;
	if (Math.random() < 0.5) {
		which = 0;
	  shape = inner0.instantiate();
		shape.which = 0;
	} else {
	  shape = inner1.instantiate();
	}
	let {shapes} = this;
  shapes.push(shape);
	shape.show();
	showElements(shape);
	return shape;

}



	 
	


return rs;

});

