
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
	rs.checkerBoard = 0;
	rs.sideBySide = 0;
	rs.horizontalStripes = 0;
	rs.randomAB = 1;
	rs.chanceA = 0.5;
	rs.recomputeRvalues = 0;
	rs.aRectFill = 'rgb(255,50,0)';
	rs.bRectFill = 'rgb(255,0,50)';
	rs.aFill =   'black';
	rs.aStroke =   'white';
	rs.bFill = 'white';
	rs.bStroke = 'white';
	rs.numRows = 20;
	rs.numCols = 20;
	rs.innerCols = 4;
	rs.innerRows = 4;
	rs.innerWidth = 10;
	rs.innerHeight = 10;
	rs.width = 200;
	rs.height = 160;
	rs.height = 200;
		rs.pointJiggle = 15;
		rs.minDim = 0;
		rs.maxDim = 1;
		//rs.exchangeColorParams = {step:.2,min:0,max:1,numRows:rs.numRows,numCols:rs.numCols};

	
	

rs.next = function () {
   this.pattern.forEach((line) =>   {line.stroke = 'black';line.show();});
}
 
  return rs;
});

