
core.require('/gen1/twoGrids.js',
function (constructor) {
  debugger;	//this.initProtos();
  //core.vars.whereToSave = 'images/grid_1_1.jpg';
  let rs = constructor();
	rs.saveImage = 1;
	rs.setName('twoGrids_2','twoGrids_1');
	rs.initProtos();
  rs.loadFromPath = 1;
	rs.numRows = 20;
	rs.numCols = 20;
	rs.width = 300;
	rs.height = 300;
	rs.lineLength = 0.7;
	rs.pointJiggle = 0;
	rs.showDiffs = 1;
  return rs;
});

