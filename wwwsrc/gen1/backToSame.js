

core.require(function () {
  return function (item) { 
	
	
item.setupShape = function (shape,rvs) {
  let {numTimeSteps,numRotations} = this;

	let aDelta = rvs.aDelta;
	let baseAngleInc = (numRotations*2*Math.PI)/numTimeSteps;
	shape.aDelta = aDelta;
	this.baseAngleInc = baseAngleInc;
	
}

item.shapeGenerator =  function (rvs,cell,pnt) {
	let {shapes,numTimeSteps,numRotations,shapeP} = this;
	//if (this.timeStep > 0) {
		debugger;
	//}
	let aDelta = rvs.aDelta;
	let baseAngleInc = (numRotations*2*Math.PI)/numTimeSteps;
	let shape;
	if (shapeP) {
	  shape = shapeP.instantiate();
	} else {
		shape = this.generateShape();
	}
	shape.aDelta = aDelta;
	this.baseAngleInc = baseAngleInc;
	shapes.push(shape);
	shape.show();
  return shape;
}

item.shapeUpdater =  function (shape,rvs,cell,pnt,func) {
	//debugger;
	if (!shape) {
		debugger;
	}
	let {shapes,timeStep:ts,numTimeSteps,baseAngleInc,rotConst,numRotations} = this;
	let rotConstA = rotConst * numRotations; 
	let hts = numTimeSteps/2;
	let aDelta = shape.aDelta;
	let angleInc = baseAngleInc + rotConstA * aDelta;
  let  angle = ts * angleInc;
	//let cell11 = (cell.x === 1) && (cell.y === 1);
  //if ((ts >= hts) && cell11) {
		//debugger;
	//}
	if (ts === hts) {
		shape.hangle = angle;
	}
	if (1 && (ts > hts)) {
		angleInc = baseAngleInc - rotConstA * aDelta;
		angle = shape.hangle + (ts-hts) * angleInc;
	}
//	if (cell11) {
//	  console.log('angle ',angle/(2*Math.PI));
//	}
	//this.updateTheShape(shape,angle,rvs,cell,pnt);
	func(this,shape,angle,rvs,cell,pnt);
	shape.update();
}

item.timeStep = 0;
}
});
 