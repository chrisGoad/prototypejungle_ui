
core.require('/grid/grid24ay.js',
function (constructor) {
  debugger;	//this.initProtos();
  let randomRow;

  let rs = constructor();
	rs.path = '/gallery4/grid24ay_16.json';
	rs.addABatSides = 1;
	rs.spatterNumPoints = 9;
  rs.loadFromPath = 1;
	rs.showBoundaries = 0;
	rs.allRandom = 0;
	rs.showRects = 0;
	rs.checkerBoard = 0;
	rs.sideBySide = 0;
	rs.randomAB = 1;
	rs.chanceA = 0.5;
	rs.recomputeRvalues = 0;
	rs.aRectFill = 'rgb(255,50,0)';
	rs.bRectFill = 'rgb(255,0,50)';
	rs.aStroke =   'white';
	rs.bFill = 'black';
	rs.bStroke = 'white';
	rs.numRows = 10;
	rs.numCols = 10;
	rs.innerCols = 3;
	rs.innerRows = 3;
	rs.innerWidth = 20;
	rs.innerHeight = 20;
	rs.width = 200;
	rs.height = 160;
	rs.height = 200;
		rs.pointJiggle = 0;//5;
		rs.minDim = 5;
		rs.maxDim = 10;

	
	

rs.next = function () {
   this.pattern.forEach((line) =>   {line.stroke = 'black';line.show();});
}
 
  return rs;
});

