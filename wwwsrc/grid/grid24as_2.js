
core.require('/grid/grid24as.js',
function (constructor) {
  debugger;	//this.initProtos();

  let rs = constructor();
	rs.initProtos();
	rs.numRows = 40;
	rs.numCols = 40;
	rs.pointJiggle = 0;//4;
	rs.circleP.fill = 'white';
	rs.circleP.dimension = .3 * rs.width/rs.numRows;

	rs.cellCondition = function (cell) {
		let {x,y} = cell;
	 // return (Math.random() < 1) &&(((x+y))%11 === 0) || ((x*y)%7 ===0));
	  return (Math.random() < 0.8) && (((x+y)%11 === 0) || ((x-y)%5 === 0));
	
	}
	rs.showBoundaryLines = 1;

  return rs;
});

