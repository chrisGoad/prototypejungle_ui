core.require('/gen0/dim2dWalker.js',function (addRandomMethods) {
  return function (item) {	



item.initRandomizer = function () {
	let rm = this.randomizer;
	if (!rm) {
		rm = this.randomizer = {};
	  addRandomMethods(rm);
	  if (!this.randomGridsForShapes) {
			this.randomGridsForShapes = {};
		}
	  if (!this.randomGridsForBoundaries) {
	    this.randomGridsForBoundaries = {};
		}
	}
	return rm;
}
item.setupRandomizer = function (tp,nm,params) {
	if (nm === 'pattern') {
		debugger;
	}
	let kind = params.kind =  (tp === 'randomGridsForBoundaries')?'boundaries':'cells';
	if (!params.numRows) {
		params.numRows = kind==='boundaries'?this.numRows+1:this.numRows;
		params.numCols = kind==='boundaries'?this.numCols+1:this.numCols;
	}
	let rm = this.initRandomizer();
	let rnds = this[tp];
  let rs  = rm.genRandomGrid({timeStep:0,params});
	rnds[nm]  = rs;
	return rs;
}
//interp should be 'From' or 'To'
item.saveRandomState = function (tp,interp) {
  debugger;
	let rnds = this[tp];

  let rs = {};
  //this.initialRandomGridsForShapes = rs;
  let rgfs = rnds;
  for (let p in rgfs) {
    rs[p] = rgfs[p]; 
  }
  rnds['interpolate'+interp] = rs;
}

item.interpolateRandomValues = function(s0,s1,fr) {
	let vls0 = s0.values;  
	let vls1 = s1.values;
	let ln = Math.min(vls0.length,vls1.length);
	let vrs = [];
	for (let i=0;i<ln;i++) {
	  let v0 = vls0[i];
		let v1 = vls1[i];
		let v = v0 + fr*(v1-v0);
		vrs.push(v);
  } 
  return vrs;
}







item.stepRandomizer = function (tp,nm) {
  let {timeStep,numTimeSteps} = this;
	let wrnds = this[tp];
	let rg = wrnds[nm];
  if (wrnds.nowInterpolating) {
    debugger;
    let its = this.interpolateFromStep;
    let fr = (timeStep - its)/(numTimeSteps-its);
    let i0 = wrnds.interpolateFrom[nm];
    let i1 = wrnds.interpolateTo[nm];
    let vls = this.interpolateRandomValues(i0,i1,fr);
    rg.values = vls;
    return;
  }
	let rm = this.randomizer;
	let rs  = rm.genRandomGrid(rg);
	wrnds[nm]  = rs;
	return rs;
}
	
item.stepShapeRandomizer = function (nm) {
  return this.stepRandomizer('randomGridsForShapes',nm);
}
	

item.stepBoundaryRandomizer = function (nm) {
  return this.stepRandomizer('randomGridsForBoundaries',nm);
}



item.setupShapeRandomizer = function (nm,params) {
  return this.setupRandomizer('randomGridsForShapes',nm,params);
}


item.setupBoundaryRandomizer = function (nm,params) {
  return this.setupRandomizer('randomGridsForBoundaries',nm,params);
}        		


}   
});