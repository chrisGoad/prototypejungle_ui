
core.require('/grid/grid24pair.js',
function (constructor) {
  debugger;
  let rs = constructor();
	rs.numRows = 40;
	rs.numCols = 80;
	rs.minLeft = 0.4;
	rs.maxLeft = 1;
	//rs.maxLeft = 0.8;
	rs.minRight = 0.4;
	//rs.minRight = 0.2;
	rs.maxRight=1;	
	rs.spatter = 1;
	rs.changePoint =  0.5;
	
rs.initialize = function () {
	this.initializePair();
}


return rs;

});

