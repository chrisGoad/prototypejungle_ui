
core.require('/gen1/zigzag3.js',
function (constructor) {
  let rs = constructor();
  rs.saveImage = true;
	rs.setName('zigzag3_1');
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

rs.initialize = function () {
	debugger;
  this.lineLength = 0.4;
  this.setupBoundaryRandomizer('red', {step:30,min:100,max:250});
	this.setupBoundaryRandomizer('pattern', {step:0.4,stept:0.0,min:0,max:2});
  
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
	this.animateIt(30,10);
	
}

  return rs;
});

