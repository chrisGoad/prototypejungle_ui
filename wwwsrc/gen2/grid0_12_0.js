
core.require('/gen1/grid_0.js',
function (constructor) {
  debugger;	//this.initProtos();

  let rs = constructor();
	//rs.initProtos();
	rs.saveImage = true;
	rs.setName('grid0_12_0');
  rs.loadFromPath = 0;
	
	rs.numCols= 81;
  //let numRows = rs.numRows= 41;
  rs.numRows= 41;
  rs.width = 180;
  rs.height = 100;
 // rs.visChance= 1;
  //rs.visChance= 1;
  rs.pointJiggle =  2;
  
	rs.initialize = function () {
		this.initProtos();
		core.root.backgroundColor = 'black';
			 debugger;
		this.setupBoundaryRandomizer('color',{step:35,min:20,max:250});
		this.initializeGrid();
  }	
  return rs;
});

