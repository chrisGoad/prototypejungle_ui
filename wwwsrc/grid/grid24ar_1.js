
core.require('/grid/grid24ar.js',
function (constructor) {
  debugger;
  let rs = constructor();
	rs.numRows = 40;
	rs.numCols = 40;
	rs.pointJiggle = 4;
/*	rs.step0 = 0.05;
	rs.min0 = 0;
	rs.max0 = 0.4;
	//rs.maxLeft = 0.8;
 rs.min1 = -0.4;//0.9;
	rs.max1 = 0;	
	rs.step1 = 0.05;
	rs.spatter = 0;
	rs.changePoint =  0.5;
	rs.lineLengthFactor = 4;
	rs.numDrops = 100;*/
	rs.initializeee = function () {
		 debugger;
		 
		 this.initializeIt();
	}
  return rs;
});

