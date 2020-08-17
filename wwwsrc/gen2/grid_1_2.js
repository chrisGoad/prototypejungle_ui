
core.require('/gen1/grid_1.js',
function (constructor) {
  debugger;	//this.initProtos();
  //core.vars.whereToSave = 'images/grid_1_1.jpg';
  let rs = constructor();
	rs.saveImage = true;
	rs.setName('grid_1_2','grid_1_1');
	rs.initProtos();
	//rs.path = 'json/grid_1_1.json';
  rs.loadFromPath = 1;
	//rs.randomCellExclude = 2;
	rs.numRows = 20;
	rs.numCols = 20;
	rs.width = 300;
	rs.height = 300;
	rs.pointJiggle = 0;
	rs.saveJson = 0;
	//rs.ranRowCol = rs.randomCell(2);

	/*rs.randomRow = 10;
	rs.randomColumn = 15;
	rs.randomRow = 10;
	rs.randomRow = 10;
	rs.randomColumn = 7;// return dir or [dir] ; the latter meaning pattern membership
	rs.randomColumn = 14;// return dir or [dir] ; the latter meaning pattern membership
	*/
	rs.ranRowCol = {x:15,y:10};
	// return dir or [dir] ; the latter meaning pattern membership
  rs.computeDir = function (x,y) {
		debugger;
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
	//	debugger;
		line.stroke = 'black';
  };
  return rs;
});

