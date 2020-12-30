
core.require('/shape/rectangle.js','/line/line.js','/shape/circle.js','/gen0/grid0.js','/gen0/lines0.js',
function (rectPP,linePP,circlePP,addGridMethods,addLineMethods)	{ 
let rs = svg.Element.mk('<g/>');

	let grid0= rs.set('grid0',template.instantiate());
	let grid1= rs.set('grid1',template.instantiate());
	
let nmr = 64;
	
let topParams = {numRows:nmr,numCols:nmr,width:200,height:200};


Object.assign(grid0,topParams);
Object.assign(grid1,topParams);
addGridMethods(grid0);
addGridMethods(grid1);

	
const initProtos = function () {
	core.assignPrototypes(this,'rectP',rectPP);
		core.assignPrototypes(this,'circleP',circlePP);
}  

grid0.initProtos = initProtos;
grid1.initProtos = initProtos;


	
const shapeGenerator = function (rvs,cell) {
	  debugger;
		let {shapes,rectP,circleP,numRows,numCols,genCircles} = this;
	  //let shape = rectP.instantiate();
	  let shape = (this.genCircles)?circleP.instantiate():rectP.instantiate();
		let fc = this.sizeFactor(rvs,cell);
		let dim = Math.pow(fc+1,1.2) *40;
		if (this.genCircles) {
			shape.width = dim;
			shape.height = 2*dim;
		} else {
			shape.width = 50;
			shape.dimension = 35;
		}
		shapes.push(shape);
    if (Math.random() < 0.1) {
			shape.fill = 'rgba(255,255,255,0.4)';
		} else {
      shape.fill = 'rgba(0,0,255,0.4)';
		}
		shape.show();
		return shape;
	}

grid0.shapeGenerator = shapeGenerator;
grid1.shapeGenerator = shapeGenerator;


  
     
     
 
		

const initialize = function () {
  debugger;
	core.root.backgroundColor = 'black';
//	core.root.backgroundColor = 'rgb(100,100,0)';
	this.initProtos();

	this.initializeGrid();
debugger;
 /* let line = this.lineP.instantiate();
  let hht = 0.5*this.height;
  line.setEnds(Point.mk(0,-hht),Point.mk(0,hht));
  this.set('line0',line);
  line.show();*/

}

grid0.initialize = grid0;
grid0.initialize = grid1;
		

return rs;

});

