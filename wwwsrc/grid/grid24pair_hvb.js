
core.require('/grid/grid24pair.js',
function (constructor) {
  debugger;
  let rs = constructor();
	rs.numRows = 40;
	rs.numCols = 80;
	rs.minLeft = 0;
	rs.maxLeft = 0.7;
	//rs.minRight = 0.3;
	rs.minRight = 0.3;
	rs.maxRight=1;	
	rs.spatter = 1;
	rs.changePoint = 0.5;
			rs.verticalOrHorizontal = 1;

rs.initialize = function () {
	this.initializePair();
}


return rs;

});

