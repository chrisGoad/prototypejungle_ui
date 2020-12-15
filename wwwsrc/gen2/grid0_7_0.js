
core.require('/gen1/grid0_7.js',
//core.require('/shape/rectangle.js','/line/line.js','/shape/circle.js','/gen0/grid0.js','/gen0/lines0.js',
function (rs)	{ 

	
	rs.setName('grid0_7_0');
	rs.numTimeSteps = 200;
	rs.numRows = 10;
	rs.numCols = 10;
	rs.pointJiggle=20;
	
rs.step = function ()   {
	//debugger;
	//this.stepShapeRandomizer('shade');
	this.updateGrid();
	this.draw();
}
rs.animate = function (resume)  {
	this.animateIt(this.numTimeSteps,20,resume);
	
}
	

return rs;


});

