
core.require('/gen1/grid_1.js',
function (constructor) {
  debugger;	//this.initProtos();

  let rs = constructor();
	rs.initProtos();
	rs.path = '/gallery4/grid_1_1.json';
  rs.loadFromPath = 0;
	//rs.randomCellExclude = 2;
	rs.numRows = 20;
	rs.numCols = 20;
	rs.width = 300;
	rs.height = 300;
	rs.pointJiggle = 0;
	rs.ranRowCol = rs.randomCell(2);

	/*rs.randomRow = 10;
	rs.randomColumn = 15;
	rs.randomRow = 10;
	rs.randomRow = 10;
	rs.randomColumn = 7;// return dir or [dir] ; the latter meaning pattern membership
	rs.randomColumn = 14;// return dir or [dir] ; the latter meaning pattern membership
	*/
  rs.computeDir = function (x,y) {
	  let {numRows,ranRowCol} = this;
		let dir;
		let {x:randomColumn,y:randomRow} = ranRowCol;
		if ((x-y) === (randomColumn - randomRow)) {
			dir = 0.75* Math.PI;
			return [dir];
		}  
		if  ((x + y) === (randomRow + randomColumn)) {
			dir = 0.25*Math.PI;
			return [dir];
		} 
		return 2*Math.PI * Math.random();
		
}
	rs.patternOp = function (line) {
	//	line.stroke = 'blue';
  };
  return rs;
});

