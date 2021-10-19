
core.require('/gen1/oneGrid.js',
function (constructor) {
  debugger;	//this.initProtos();
  //core.vars.whereToSave = 'images/grid_1_1.jpg';
  let rs = constructor();
	rs.saveImage = 1;
	rs.setName('oneGrid');
	rs.initProtos();
  rs.loadFromPath = 0;
	rs.numRows = 20;
	rs.numCols = 20;
	rs.width = 300;
	rs.height = 300;
	rs.lineLength = 0.7;
	rs.pointJiggle = 0;
  return rs;
});

