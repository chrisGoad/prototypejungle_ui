
core.require('/gen1/zigzag3.js',
function (constructor) {
  let rs = constructor();
  rs.saveImage = true;
	rs.setName('zigzag3_3');
	rs.initProtos();
  let numRows,numCols;
	numRows = rs.numRows = 64;
	numRows = rs.numRows = 32;
	numCols = rs.numCols = 128;
	numCols = rs.numCols = 64;
	rs.width = 180;
	rs.height = 100;
  rs.pointJiggle =  1;
  rs.lineLength = 0.4;
  core.root.backgroundColor = 'black';
	let numTimeSteps = 100;
	let wp = {correlated:true,step:0.4,stept:0.2,correlated:1};
	let ends = 0.1;
	let middle = 0.4;
  let ct = 0;
	const walkParams = function (i,j,t) {
		debugger;
		let fr = t/numTimeSteps;
		let hmid = 0.5*middle;
		let min,max;
		if (fr < ends) {
			wp.min = 0.
			wp.max = 0.99;
		  return wp;
		}
		if (fr > (1-ends)) {
			wp.min = 1.01;
			wp.max = 2;
		  return wp;
		}
		if ((fr > (0.5-hmid)) && (fr < (0.5+hmid))) {
			min = 0.5;
			max = 1.5;
		} else {
			let fr1 = (t-ends*numTimeSteps)/(numTimeSteps - 2*ends*numTimeSteps);
		  min = fr1;
		  max = 1+fr1;
		}
		wp.min = min;
		wp.max = max;
		if (t != ct) {
			console.log('t ',t,' min ',min,' max ', max);
			ct = t;
		}
		return wp
	}

rs.initialize = function () {
	debugger;
  this.lineLength = 0.4;
  this.setupBoundaryRandomizer('red', {step:30,min:100,max:250});
	//this.setupBoundaryRandomizer('pattern', {step:0.4,stept:0.01,min:0,max:2});
	this.setupBoundaryRandomizer('pattern', {walkParams});
  
  core.root.backgroundColor = 'black';
  this.initializeGrid();
	//this.stepBoundaryRandomizer('pattern');

	//this.updateGrid();

}	

rs.step = function ()   {
	debugger;
	this.stepBoundaryRandomizer('pattern');
  this.updateGrid();
}
rs.animate = function ()  {
	this.animateIt(numTimeSteps,10);
	
}

  return rs;
});

