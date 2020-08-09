
core.require('/gen1/zigzag.js',
function (constructor) {
  debugger;	//this.initProtos();

  let rs = constructor();
  rs.saveImage = true;
	rs.setName('zigzag_1');
	rs.initProtos();
  let numRows,numCols;
	numRows = rs.numRows = 40;
	numRows = rs.numRows = 30;
	numCols = rs.numCols = 80;
	numCols = rs.numCols = 60;
	rs.width = 180;
	rs.height = 100;
  rs.pointJiggle =  1;
  rs.lineLength = 0.4;
	rs.showStripes = 1;
  core.root.backgroundColor = 'black';

rs.initialize = function () {
  this.lineLength = 0.4;
  this.setupBoundaryRandomizer('red', {step:35,min:150,max:250,numRows,numCols});
  core.root.backgroundColor = 'black';
  this.initializeGrid();

}	


  return rs;
});

