
core.require('/gen1/zigzag0.js',
function (constructor) {
  debugger;	//this.initProtos();

  let rs = constructor();
	rs.setName('zigzag0_1');
  rs.saveImage = true;
	rs.setName('zigzag_1');
  let numRows,numCols;
	numRows = rs.numRows = 40;
	numRows = rs.numRows = 30;
	numCols = rs.numCols = 80;
	numCols = rs.numCols = 60;
	rs.width = 180;
	rs.height = 100;
  rs.pointJiggle =  0;
  rs.lineLength = 0.4;
	rs.showStripes = 1;
  core.root.backgroundColor = 'black';
	
rs.finishProtos = function () {
	debugger;
	this.blineP.stroke = 'rgb(255,255,255)';
}

rs.initialize = function () {
	rs.initProtos();
  this.lineLength = 0.4;
  //this.setupBoundaryRandomizer('red', {step:35,min:150,max:250,numRows,numCols});
  core.root.backgroundColor = 'black';
  this.initializeGrid();

}	


  return rs;
});

