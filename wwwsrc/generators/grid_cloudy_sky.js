
//core.require('/gen1/grid0_6.js',
core.require('/shape/circle.js','/generators/basics.js','/mlib/grid.js','/mlib/topRandomMethods.js',
function (circlePP,rs,addGridMethods,addRandomMethods)	{ 

	rs.setName('grid_cloudy_sky');
  addGridMethods(rs);
  addRandomMethods(rs);
let nr = 140;
let topParams = {width:1400,height:1400,numRows:nr,numCols:nr,pointJiggle:20,backgroundColor:'rgb(0,150,255)'};
Object.assign(rs,topParams);


rs.initProtos = function () {	
	let circleP = this.set('circleP',circlePP.instantiate()).hide();
	circleP['stroke-width'] = 0;
  circleP.dimension = 30;
}

rs.shapeGenerator = function (rvs,cell) {
  let {x,y} = cell;
  let level = Math.floor(rvs.level);
  let opacity = level/255;
  let {shapes,circleP} = this;
  let shape = circleP.instantiate().show();
  shapes.push(shape);
  shape.fill = `rgba(${level},${level},${level},${opacity})`;
  return shape;
}

rs.initialize = function () {
  this.initProtos();
  this.addBackground();
  this.setupShapeRandomizer('level', {step:30,min:0,max:255});
  this.initializeGrid(); 
}

return rs;


});

