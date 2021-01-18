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


item.stepRandomizer = function (tp,nm) {
	let wrnds = this[tp];
	let rg = wrnds[nm];
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