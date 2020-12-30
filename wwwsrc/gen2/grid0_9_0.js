
core.require('/gen1/grid0_9.js',
function (template)	{ 
let rs = svg.Element.mk('<g/>');

	let grid0= rs.set('grid0',template.instantiate());
	let grid1= rs.set('grid1',template.instantiate());
	grid0.chance = 0.0511
	grid1.chance = 0.0511
	grid0.numCols = 90;
	grid0.genCircles = 1;
	rs.initialize = function () {
		grid0.initialize();
		grid1.initialize();
		let wd = grid0.width;
		let mv = 1.1 * 0.5 * wd;
		grid0.moveto(Point.mk(-mv,0));
		grid1.moveto(Point.mk(mv,0));
	}

return rs;

});

