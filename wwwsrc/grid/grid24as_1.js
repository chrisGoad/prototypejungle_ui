
core.require('/grid/grid24as.js',
function (constructor) {
  debugger;	//this.initProtos();

  let rs = constructor();
	rs.initProtos();
	rs.numRows = 100;
	rs.numCols = 100;
	rs.pointJiggle = 0;//4;
	rs.circleP.fill = 'white';
	rs.cellCondition = function (cell) {
		let {x,y} = cell;
	 // return (Math.random() < 1) &&(((x+y))%11 === 0) || ((x*y)%7 ===0));
	  return (Math.random() < 0.8) && (((x+y)%11 === 0) || ((x-y)%5 === 0));
	
	}
	rs.showBoundaryLines = 0;
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
  return rs;
});

