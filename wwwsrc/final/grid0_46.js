
//core.require('/gen1/grid0_6.js',
core.require('/shape/circle.js','/gen0/Basics.js','/mlib/grid.js','/mlib/topRandomMethods.js',
function (circlePP,rs,addGridMethods,addRandomMethods)	{ 

	rs.setName('grid0_6_0');
  addGridMethods(rs);
  addRandomMethods(rs);
let nr = 100;
let topParams = {width:1000,height:1000,numRows:nr,numCols:nr,pointJiggle:20};
Object.assign(rs,topParams);


rs.initProtos = function () {	
	let circleP = this.set('circleP',circlePP.instantiate()).hide();
	circleP.fill = 'red';
	circleP['stroke-width'] = 0;
  circleP.dimension = 8;
}

rs.shapeGenerator = function (rvs,cell) {
  debugger;
  let level = Math.floor(rvs.level);
 // let level = 50 + 205*Math.random();
  console.log(level);
  let {shapes,circleP} = this;
  let shape = circleP.instantiate().show();
  shapes.push(shape);
  shape.fill = `rgb(${level},${level},${level})`;
  //shape.fill = `rgb(${level},0,0)`;
  return shape;
}

rs.initialize = function () {
  debugger;
  this.initProtos();
  this.setupShapeRandomizer('level', {step:50,min:100,max:255});
  this.initializeGrid();
}

return rs;


});

