
core.require('/gen1/zigzag.js',
function (constructor) {
  debugger;	//this.initProtos();

  let rs = constructor();
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
  core.root.backgroundColor = 'black';

rs.initialize = function () {
	this.verticalShape = this.randomCell(0);
	alert('verticalShape'+JSON.stringify(this.verticalShape));
  this.missingZag = this.randomCell(2);
	if ((this.missingZag.x + this.missingZag.y)%2 === 0) {
		this.missingZag.x = this.missingZag.x+1;
	}	
	alert('missingZag'+JSON.stringify(this.missingZag));
  this.lineLength = 0.4;
  this.setupBoundaryRandomizer('red', {step:35,min:150,max:250,numRows,numCols});
  core.root.backgroundColor = 'black';
  this.initializeGrid();

}	


  return rs;
});

