
core.require('/gen1/zigzag2.js',
function (constructor) {
  debugger;	//this.initProtos();

  let rs = constructor();
  rs.saveImage = true;
	rs.setName('zigzag_1');
	rs.initProtos();
  let numRows,numCols;
	numRows = rs.numRows = 32;
	numCols = rs.numCols = 64;
	rs.width = 180;
	rs.height = 100;
  rs.pointJiggle =  1;
  rs.lineLength = 0.4;
  core.root.backgroundColor = 'black';

rs.initialize = function () {
  this.lineLength = 0.4;
  this.setupBoundaryRandomizer('red', {step:0.1,min:150,max:250});
	this.setupBoundaryRandomizer('pattern', {step:0.1,min:0,max:1});

  core.root.backgroundColor = 'black';
  this.initializeGrid();

}	


  return rs;
});

