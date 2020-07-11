
core.require('/gen1/zigzag.js',
function (constructor) {
  debugger;	//this.initProtos();
  let ors = svg.Element.mk('<g/>');
	//let defs = svg.Element.mk('<defs/>');
	//ors.set('defs',defs);
	let filter = svg.Element.mk('<filter/>');
	ors.set('filter',filter);
	let blur = svg.Element.mk('<feGaussianBlur/>');
	filter.set('blur',blur);
	filter.blur.stdDeviation = .75;
filter.blur.in = "SourceGraphic";

  filter.id = "theBlur";
	filter.width = 18;
	filter.height = 10;
  let rs = constructor();
	ors.set('inner',rs);
	rs.filter = 'url(#theBlur)';
  rs.saveImage = 0;
	rs.setName('zigzag_1');
	rs.initProtos();
  let numRows,numCols;
	numRows = rs.numRows = 40;
	numRows = rs.numRows = 30;
	numCols = rs.numCols = 80;
	numCols = rs.numCols = 60;
	rs.width = 180;
	rs.height = 100;
  rs.pointJiggle =  1;
  rs.lineLength = 0.4;
  core.root.backgroundColor = 'black';

ors.initialize = function () {
	let inner = this.inner;
  inner.lineLength = 0.4;
  inner.setupBoundaryRandomizer('red', {step:35,min:150,max:250,numRows,numCols});
  core.root.backgroundColor = 'black';
  inner.initializeGrid();

}	


  return ors;
});

