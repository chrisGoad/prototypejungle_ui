
core.require('/gen1/grid0_6.js',
//core.require('/shape/rectangle.js','/line/line.js','/shape/circle.js','/gen0/grid0.js','/gen0/lines0.js',
function (rs)	{ 

	
	rs.setName('grid0_6_0');
	rs.numTimeSteps = 400;
	rs.numRows = 4;
	rs.numCols = 4;
	
rs.step = function ()   {
	//debugger;
	//this.stepShapeRandomizer('shade');
	this.updateGrid();
	this.draw();
}
rs.animate = function (resume)  {
	this.animateIt(this.numTimeSteps,10,resume);
	
}
	

return rs;


});

