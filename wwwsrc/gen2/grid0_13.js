
core.require('/shape/rectangle.js','/line/line.js','/shape/circle.js','/gen0/grid0.js','/gen0/lines0.js',
function (rectPP,linePP,circlePP,addGridMethods,addLineMethods)	{ 

  let rs = svg.Element.mk('<g/>');
  addGridMethods(rs);
	let innerGproto = svg.Element.mk('<g/>');
	let innerLproto = svg.Element.mk('<g/>');
	addGridMethods(rs);
	addGridMethods(innerGproto);
	addLineMethods(innerLproto);
	//rs.initProtos();
	rs.saveImage = 1;
	rs.setName('grid0_13');
  rs.loadFromPath = 0;
	
	
	let innerDim = 40;
	innerGproto.numRows = 3;
	innerGproto.numCols = 3;
	innerGproto.width = innerDim;
	innerGproto.height = innerDim;
  innerGproto.spatter = 1;
	innerGproto.numDrops = 10;
	
	innerLproto.width = innerDim;
	innerLproto.height = innerDim;
	innerLproto.numLines = 20;;
	innerLproto.angleMin = -30;
	innerLproto.angleMax = 30;
	
	let outerRC = 6;
	rs.numRows= outerRC;
	rs.numCols = outerRC;
	let fc = 3;
	let outerDim = fc * innerDim * outerRC;
	rs.width = outerDim;
	rs.height = outerDim;
	rs.numDrops = 20;
	rs.pointJiggle = 0;
	//rs.spatter = 1;

	
		
		
	
rs.initProtos = function () {
	core.assignPrototypes(this,'rectP',rectPP);
	//this.rectP.stroke = 'rgb(255,255,255,1)';
	this.rectP.fill = 'white';
	this.rectP['stroke-width'] = 0;
	this.rectP.width = 1;
	this.rectP.height = 4;
		core.assignPrototypes(this,'circleP',circlePP);
	//this.rectP.stroke = 'rgb(255,255,255,1)';
	this.circleP.fill = 'blue';
	this.circleP.dimension =20


}  

innerGproto.initProtos = function () {
	core.assignPrototypes(this,'circleP',circlePP);
	//this.rectP.stroke = 'rgb(255,255,255,1)';
	this.circleP.fill = 'red';
		this.circleP['stroke-width'] = 0;

	this.circleP.dimension =4;
	core.assignPrototypes(this,'rectP',rectPP);
	this.rectP.fill = 'white';
	this.rectP['stroke-width'] = 0;
	this.rectP.width = 1;
	this.rectP.height = 4;
	
	
}

innerLproto.initProtos = function () {
	core.assignPrototypes(this,'lineP',linePP);
	this.lineP.stroke = 'white';
	this.lineP['stroke-width'] = 0.3;
}


innerGproto.shapeGenerator = function () {
//rs.shapeGenerator = function () {
	let {circleP,shapes,rectP} = this;
	let ishape;
	if (this.genCircle) {
		ishape = circleP.instantiate();
	} else {
		ishape = rectP.instantiate();
	}
	shapes.push(ishape);
	  //circle.show();
	return ishape;
}




rs.shapeGenerator = function (rvs,cell) {
		let {shapes,circleP} = this;
		debugger;
		let rn = Math.floor(Math.random() * 4);
		let shape;
		if (rn === 0) {
			shape = circleP.instantiate();
	  } else if (rn< 3) {
		  shape = innerGproto.instantiate();
  //shape.genCircle = (cell.x + cell.y)%2 === 0;
      shape.genCircle = rn === 1;
		  shape.initProtos();
			shape.initializeGrid();	
		} else {
			shape = innerLproto.instantiate();
		  shape.initProtos();
			shape.initializeLines();
		}
		shapes.push(shape);
		shape.show();
		return shape;
	}


		
		
		


rs.initialize = function () {
	core.root.backgroundColor = 'black';
	this.initProtos();
	this.initializeGrid();

}
		

return rs;

});

