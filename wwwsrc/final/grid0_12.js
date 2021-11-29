
core.require('/shape/rectangle.js','/shape/circle.js','/gen0/Basics.js','/mlib/grid.js',
function (rectPP,circlePP,rs,addGridMethods)	{ 

  addGridMethods(rs);
	let innerProto = svg.Element.mk('<g/>');
	addGridMethods(rs);
		rs.setName('grid0_12');

	addGridMethods(innerProto);
	//rs.initProtos();
	rs.saveImage = 1;
  rs.loadFromPath = 0;
	
	
	rs.numRows= 10;
	rs.numCols = 10;
	rs.width = 1200;
	rs.height = 1200;
	rs.numDrops = 20;
	rs.pointJiggle = 0;
	//rs.spatter = 1;

	
	innerProto.numRows = 3;
	innerProto.numCols = 3;
	rs.innerRows = 3;
	rs.innerCols = 3;
	innerProto.width = 40;
	innerProto.height = 40;
  innerProto.spatter = 1;
	innerProto.numDrops = 10;
		
		
	
rs.initProtos = function () {
	core.assignPrototypes(this,'rectP',rectPP);
	//this.rectP.stroke = 'rgb(255,255,255,1)';
	this.rectP.fill = 'white';
	this.rectP['stroke-width'] = 0;
	this.rectP.width = 4;
	this.rectP.height = 4;
		core.assignPrototypes(this,'circleP',circlePP);
	//this.rectP.stroke = 'rgb(255,255,255,1)';
	this.circleP.fill = 'blue';
	this.circleP.dimension =20


}  

innerProto.initProtos = function () {
	core.assignPrototypes(this,'circleP',circlePP);
	//this.rectP.stroke = 'rgb(255,255,255,1)';
	this.circleP.fill = 'red';
		this.circleP['stroke-width'] = 0;

	this.circleP.dimension =4;
		core.assignPrototypes(this,'rectP',rectPP);
	//this.rectP.stroke = 'rgb(255,255,255,1)';
	this.rectP.fill = 'white';
	this.rectP['stroke-width'] = 0;
	this.rectP.width = 4;
	this.rectP.height = 4;
}

innerProto.shapeGenerator = function () {
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
		let rn = Math.floor(Math.random() * 3);
		let shape;
		if (rn === 0) {
			shape = circleP.instantiate();
	  } else {
		  shape = innerProto.instantiate();
  //shape.genCircle = (cell.x + cell.y)%2 === 0;
      shape.genCircle = rn === 1;
		  shape.initProtos();
			shape.initializeGrid();	
		}
		shapes.push(shape);
		shape.show();
		return shape;
	}
		
		

rs.backgroundColor = 'black';
rs.backgroundPadding = 40;

rs.initialize = function () {
	core.root.backgroundColor = 'black';
	this.initProtos();
	this.initializeGrid();

}
		

return rs;

});

