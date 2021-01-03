
core.require('/shape/rectangle.js','/line/line.js','/shape/circle.js','/gen0/grid0.js','/gen0/lines0.js',
function (rectPP,linePP,circlePP,addGridMethods,addLineMethods)	{ 
let rs = svg.Element.mk('<g/>');
addGridMethods(rs);
rs.numRows = 64;
rs.numCols = 64;
rs.width = 200;
rs.height = 200;
rs.chance = 0.02;
rs.spacing = 5;
rs.phase  = 0;

rs.initProtos = function () {
	core.assignPrototypes(this,'rectP',rectPP);
		core.assignPrototypes(this,'circleP',circlePP);
}  


rs.shapeGenerator = function (rvs,cell) {
	  debugger;
		let {shapes,rectP,circleP,numRows,numCols,genCircles,deltaX,deltaY,chance:ichance,spacing,phase} = this;
		let {x,y} = cell;
		let include = (x >=spacing) && (y >= spacing) && (x <= (numCols-spacing)) && (y <=(numRows-spacing)) && (x%spacing === phase) && (y%spacing === phase);
    let chance = ichance * spacing * spacing;
	  //let shape = rectP.instantiate();
	  let shape = (this.genCircles)?circleP.instantiate():rectP.instantiate();
		if (this.genCircles) {
			shape.dimension = 3*deltaX;
		}	 else {
			let fc = 1;
			shape.width = fc*deltaX;
			shape.height = fc*deltaY;
		}
		shapes.push(shape);
    if (include && Math.random() < chance) {
			shape.fill = 'rgba(255,255,255,0.4)';
		} else {
      shape.fill = 'rgba(0,0,255,0.4)';
		}
		shape.show();
		return shape;
	}


  
     
     
 
		

rs.initialize = function () {
  debugger;
	core.root.backgroundColor = 'black';
//	core.root.backgroundColor = 'rgb(100,100,0)';
	this.initProtos();
	if (this.finishProtos()) {
		this.finishProtos();
	}
	this.initializeGrid();
debugger;
 /* let line = this.lineP.instantiate();
  let hht = 0.5*this.height;
  line.setEnds(Point.mk(0,-hht),Point.mk(0,hht));
  this.set('line0',line);
  line.show();*/

}
		
return rs;

});

