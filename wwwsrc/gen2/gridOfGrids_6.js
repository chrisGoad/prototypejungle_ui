
core.require('/gen1/gridOfGrids1.js',
function (constructor) {
  debugger;	//this.initProtos();
  let randomRow;

  let rs = constructor();
	rs.numTimeSteps = 100;
	rs.saveImage = 0;
	rs.setName('gridOfGrids_1');
	//rs.path = '/genData/gridOfGrids_1.json';
	rs.rectElement =1;
  rs.spatterNumPoints = 0;

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
	rs.numRows = 10;
	rs.numCols = 10;
	rs.innerCols = 5;
	rs.innerRows = 5;
	rs.innerWidth = 20;
	rs.innerHeight = 20;
	rs.width = 200;
	rs.height = 160;
	rs.height = 200;
		rs.pointJiggle = 0;//5;
		rs.minDim = 0;
		rs.maxDim = 1;
		//rs.innerColorParams = {step:30,min:100,max:250};
	//	rs.exchangeColorParams = {step:.2,min:0,max:1,numRows:rs.numRows,numCols:rs.numCols};

	
rs.initialize = rs.innerInitialize;

rs.timeStep = 0;
rs.step = function ()   {

  //this.updateInner();
  this.updateOuter();
	rs.timeStep++;
}
rs.animate = function ()  {
	this.animateIt(this.numTimeSteps,300);
	
}
/*
rs.next = function () {
   this.pattern.forEach((line) =>   {line.stroke = 'black';line.show();});
}
 */
  return rs;
});

