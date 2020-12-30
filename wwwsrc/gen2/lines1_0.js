core.require('/shape/circle.js','/gen0/lines1.js',function (circlePP,addDrawMethods) {
  let rs = svg.Element.mk('<g/>');
	addDrawMethods(rs);
	rs.numTimeSteps = 200;
	
	
rs.initProtos = function () {	
	core.assignPrototypes(this,'circleP',circlePP);
	this.circleP.dimension = 2;
	this.circleP.fill = 'rgba(255,0,0,0.3)';
	this.circleP.fill = 'white';
	this.circleP['stroke-width'] = 0.1;
}  
const shapeGen = function (lineNum,i) {
	 let circle = this.circleP.instantiate();
	 let dim = 5 + 5*Math.random();
	 circle.dimension = dim;
	 circle.startDim = dim;
	 circle.show();
	 return circle;
}

const lengthGen = function () {
//	return 1;	
	return 20 + 30 * Math.random();
	return 10;
}


const lastStep = 0;
const updateLine = function (line,fr) {
	let shapes =  line.shapes;
	let shape0 = shapes[0];
	let numShapes = shapes.length;
	let cstep = Math.floor(fr * numShapes);
	
	let intv = 1/numShapes;
	let sstep = intv * cstep;
	let frInStep = (fr - sstep)/intv;
	let cshape = shapes[cstep];
	let dim0 = cshape.startDim;
	let dim1;
	if (cstep === numShapes-1) {
		debugger;
		dim1 = 0; 
	} else {
	  let nshape = shapes[cstep+1];
	  dim1 = nshape.startDim;
	}
	let cdim = dim0 + frInStep * (dim1 - dim0);
	cshape.dimension = cdim;
	cshape.draw();
	
}
	
	
	
rs.initialize = function () {
	core.root.backgroundColor = 'black';
	this.initProtos();
	let end0 = Point.mk(0,0);
	let end1 = Point.mk(200,0);
	const addLine =  () => {
		let line = this.drawLine(shapeGen,lengthGen,end0,end1,20);
		return line;
	}
	for (let i = 0;i<20;i++) {
		let line = addLine();
		let numCycles;
		if (i%2 === 0) {
			numCycles = 3;
		} else {
			numCycles = 4;
		}
		line.numCycles = i+2;//numCycles;
		line.moveto(Point.mk(0,8*i));
	}

}

rs.updateAline = function (n) {
	let {timeStep,numTimeSteps,lines} = this;
	let line = lines[n];
	let numCycles = line.numCycles;
	let cycle = Math.floor((timeStep/numTimeSteps) * numCycles);
	let cycleLength = numTimeSteps/numCycles;
	let beginCycle = cycle*cycleLength;
	let frInCycle = (timeStep - beginCycle)/cycleLength;
	let c = Math.cos(frInCycle * 2*Math.PI);
	this.updateLine(n,0.5* (c+1));
}
rs.step = function ()   {
	let {lines} = this;
	
	let numLines = lines.length;
	//let line = this.lines[0];
	for (let i=0;i<numLines;i++) {
	  this.updateAline(i);
	}
}


rs.animate = function (resume)  {
	this.animateIt(this.numTimeSteps,50,resume);
	
}

return rs;
});
	

