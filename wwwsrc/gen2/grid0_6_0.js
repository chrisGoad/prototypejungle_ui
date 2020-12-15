
core.require('/gen1/grid0_6.js',
//core.require('/shape/rectangle.js','/line/line.js','/shape/circle.js','/gen0/grid0.js','/gen0/lines0.js',
function (rs)	{ 

	
	rs.setName('grid0_6_0');
	rs.numTimeSteps = 100;
	rs.numRows = 10;
	rs.numCols = 10;
	
rs.step = function ()   {
	//debugger;
	//this.stepShapeRandomizer('shade');
	this.updateGrid();
	this.draw();
}
rs.animate = function (resume)  {
	this.animateIt(this.numTimeSteps,50,resume);
	
}
	

return rs;


});

