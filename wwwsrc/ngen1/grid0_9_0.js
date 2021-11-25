
core.require('/gen1/grid0_9.js','/gen0/basics.js',
function (template,addSetName)	{ 
let rs = svg.Element.mk('<g/>');
addSetName(rs);
	rs.setName('grid0_9_0');

	let grid0= rs.set('grid0',template.instantiate());
	let grid1= rs.set('grid1',template.instantiate());
	grid0.numCols = grid0.numRows = 64;
	grid1.numCols = grid1.numRows = 65;
	grid0.spacing = 3
	grid0.chance = 0.0511
	grid0.chance = grid1.chance = 0.02
	//grid0.chance = 1;
	//grid1.chance = 0.04;
	//grid1.chance = 0.02;
	//grid1.chance = 1;
	grid1.spacing = 2;
	grid1.spacing = 5;
	//grid0.numCols = 90;
	
grid0.finishProtos =  grid1.finishProtos = function () {
	//core.assignPrototypes(this,'rectP',rectPP);
	debugger;
	this.rectP['stroke-width'] = 0;
}  
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

