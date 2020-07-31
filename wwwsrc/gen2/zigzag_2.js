
core.require('/gen1/zigzag.js',
function (constructor) {
  debugger;	//this.initProtos();

  let rs = constructor();
	rs.initProtos();
	rs.setName('zigzag_2');
  let numRows,numCols;
	numRows = rs.numRows = 40;
	numRows = rs.numRows = 32;
	numCols = rs.numCols = 80;
	numCols = rs.numCols = 64;
	rs.width = 180;
	rs.height = 100;
  rs.pointJiggle =  1;
  rs.lineLength = 0.4;
	rs.showMissing = 0;
  core.root.backgroundColor = 'black';

rs.initialize = function () {
	let verticalShape = this.verticalShape = this.randomCell(0);
	verticalShape . x = 54;
	verticalShape . y = 26;
	//alert('verticalShape'+JSON.stringify(this.verticalShape));
	console.log('verticalShape'+JSON.stringify(this.verticalShape));
  let missingZag = this.missingZag = this.randomCell(2);
	if ((this.missingZag.x + this.missingZag.y)%2 === 0) {
		this.missingZag.x = this.missingZag.x+1;
	}	
	missingZag.x = 15;
	missingZag.y = 18;
//	alert('missingZagg'+JSON.stringify(this.missingZag));
	console.log('missingZagg'+JSON.stringify(this.missingZag));
  this.lineLength = 0.4;
  this.setupBoundaryRandomizer('red', {step:35,min:150,max:250,numRows,numCols});
  core.root.backgroundColor = 'black';
  this.initializeGrid();

}	


  return rs;
});

