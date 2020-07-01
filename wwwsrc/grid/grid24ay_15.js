
core.require('/grid/grid24ay.js',
function (constructor) {
  debugger;	//this.initProtos();
  let randomRow;

  let rs = constructor();
	rs.path = '/gallery4/grid24ay_14.json';
	rs.rectElement =1;
	rs.addABatSides = 1;
  rs.loadFromPath = 0;
	rs.showBoundaries = 0;
	rs.allRandom = 0;
	rs.showRects = 0;
	rs.checkerBoard = 1;
	rs.sideBySide = 0;
	rs.horizontalStripes = 0;
	rs.randomAB = 1;
	rs.chanceA = 0.5;
	rs.recomputeRvalues = 0;
	rs.aRectFill = 'rgb(255,50,0)';
	rs.bRectFill = 'rgb(255,0,50)';
	rs.aFill =   'green';
	rs.aStroke =   'white';
	rs.bFill = 'white';
	rs.bStroke = 'white';
	rs.numRows = 10;
	rs.numCols = 10;
	rs.innerCols = 8;
	rs.innerRows = 8;
	rs.innerWidth = 20;
	rs.innerHeight = 20;
	rs.width = 200;
	rs.height = 160;
	rs.height = 200;
		rs.pointJiggle = 0;//5;
		rs.minDim = 0;
		rs.maxDim = 1;

	
	

rs.next = function () {
   this.pattern.forEach((line) =>   {line.stroke = 'black';line.show();});
}
 
  return rs;
});

