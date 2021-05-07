core.require('/shape/circle.js','/shape/textOneLine.js',
function (circlePP,textPP) {
	let rs = svg.Element.mk('<g/>');
	
	
rs.initProtos = function () {
	core.assignPrototypes(this,'circleP',circlePP);
	this.circleP.stroke = 'black';
	this.circleP['stroke-width'] = 1;
	this.circleP.fill = 'red';
	this.circleP.dimension = 10;
  core.assignPrototypes(this,'textP',textPP);
	this.textP['font-size'] = 10;
}

rs.initialize = function () {
	debugger;
	core.root.backgroundColor = 'white';
	this.initProtos();
	this.set('crc',this.circleP.instantiate());
	this.crc.show();
	this.crc.moveto(Point.mk(0,-20));
	let txt = this.set('txt',this.textP.instantiate());
	txt.setScale(0.2);
	txt.show();
	txt.moveto(Point.mk(0,-10));
	txt.update();
}

return rs;
});

	
  