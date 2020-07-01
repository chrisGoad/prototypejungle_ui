
core.require('/grid/grid24au.js',
function (constructor) {
  debugger;	//this.initProtos();

  let rs = constructor();
	rs.initProtos();
	//let numRows = rs.numRows = 41;
	let numRows = rs.numRows = 10;
	//let numCols = rs.numCols = 81;
	let numCols = rs.numCols = 20;
	rs.width = 180;
	rs.height = 100;
  rs.pointJiggle =  2;
  rs.sx = Math.floor(Math.random() * numCols);
  rs.sy = Math.floor(Math.random() * numRows);
 rs.bx = Math.floor(Math.random() * numCols);
  rs.by = Math.floor(Math.random() * numRows);

  rs.lineLength = 0.3;
  rs.setupBoundaryRandomizer('red', {step:35,min:20,max:250,numRows,numCols});
  core.root.backgroundColor = 'black';

  return rs;
});

