
core.require('/line/line.js','/shape/textOneLine.js',function (linePP,textPP) {

let rs = svg.Element.mk('<g/>');

rs.initProtos = function () {	
  let lineP = this.set('lineP',linePP.instantiate()).hide();
	lineP['stroke-width'] = 5;
	lineP.stroke  = 'white';
  let textP = this.set('textP',textPP.instantiate()).hide();
	textP.stroke = 'white';
	//circleP.fill = 'transparent';
	
}  

	
rs.initialize = function () {
  core.root.backgroundColor = 'black';
	this.initProtos();
	debugger;
	let ln = rs.set('ln',this.lineP.instantiate());
	ln.setEnds(Point.mk(0,0),Point.mk(10,0));
	ln.show();
	let txt = rs.set('txt',this.textP.instantiate());
	txt.text='C.G.';
	txt.show();
	txt.moveto(Point.mk(0,15));
	txt['font-size'] = 8;
	txt['font-family'] = 'Trattatello';
	txt['font'] = 'fantasy';
}

return rs;

});

