
core.require('/line/line.js','/shape/circle.js','/grid/addGrid8.js','/grid/dim2dWalker2.js',
//core.require('/line/line.js','/grid/addGrid8.js',


function (linePP,circlePP,addGridMethods) {
	debugger;
return function () {
  let rs = svg.Element.mk('<g/>');
  addGridMethods(rs);
  core.root.backgroundColor = 'black';

  rs.initProtos = function () {
	  core.assignPrototypes(this,'lineP',linePP);
    this.lineP.stroke = 'white';
    this.lineP['stroke-width'] = 1;
	  core.assignPrototypes(this,'boundaryLineP',linePP);
	  this.boundaryLineP.stroke = 'rgb(255,255,0)';
	  this.boundaryLineP['stroke-width'] = 0.3;
		  core.assignPrototypes(this,'circleP',circlePP);
	  this.circleP.fill = 'red';
	  this.circleP['stroke-width'] = 0;
	}
	
	
  rs.numRows= 40;
  rs.numCols = 40;
  rs.width = 200;
  rs.height = 200;

  rs.pointJiggle = 9;
  rs.includeShapes = true; 
  rs.boundaryStrokeWidth =0.3;
  rs.shapeStroke = 'white';
  rs.shapeStrokeWidth = 1;

  rs.cellCondition = function (cell) {
		let {x,y} = cell;
	  return (Math.random() < .5) &&(((x-y)%5 === 0) || ((x+y)%5 ===0));
	}

  let {numRows,numCols} = rs;

  rs.shapeGenerator = function (rvs,	cell) {
    let shapes = this.shapes;
		if (this.cellCondition(cell)) {
			let circle = this.circleP.instantiate();
			shapes.push(circle);
			shapes.push(circle);
			circle.show();
			return circle;
		}
  };

rs.showBoundaryLines = false;
rs.boundaryLineGenerator = function (end0,end1,rvs,cell,orientation) {
	if (!this.showBoundaryLines) {
		return;
	}
	//return
  let lines = this.lines;
	let {x,y} = cell;
	let {deltaX,deltaY} = this;
	if (orientation === 'vertical') {
		let container = svg.Element.mk('<g/>');
    lines.push(container);
		let line0 = this.boundaryLineP.instantiate();
		let line1 = this.boundaryLineP.instantiate();
		container.set('l0',line0);
		container.set('l1',line1);
		
		let hsep = 0.2 * deltaX;
		let end0L = Point.mk(end0.x - hsep,end0.y);
		let end0R = Point.mk(end0.x + hsep,end0.y);
		let end1L = Point.mk(end1.x - hsep,end1.y);
		let end1R = Point.mk(end1.x + hsep,end1.y);
		line0.setEnds(end0L,end1L);
		//line1.setEnds(end1L,end1R);
		line1.setEnds(end0R,end1R);
	//line.stroke = `rgb(0,${Math.floor(r)},${Math.floor(r)})`;
		line0.update();
		line1.update();
		line0.show();
		line1.show();
		return container;
	}
}


rs.initialize = function () {
	debugger;
	let {numRows,numCols} = this;
  rs.setupBoundaryRandomizer('visible', {step:0.3,min:0.3,max:1,numRows,numCols});
		this.initializeGrid();
}
  
  return rs;
}
});

