
//core.require('/gen1/grid0_6.js',
core.require('/shape/circle.js','/gen0/Basics.js','/mlib/grid.js','/mlib/topRandomMethods.js',
function (circlePP,rs,addGridMethods,addRandomMethods)	{ 

	rs.setName('grid0_46');
  addGridMethods(rs);
  addRandomMethods(rs);
let nr = 140;
let topParams = {width:1400,height:1400,numRows:nr,numCols:nr,pointJiggle:20,backgroundColor:'rgb(0,150,255)'};
Object.assign(rs,topParams);


rs.initProtos = function () {	
	let circleP = this.set('circleP',circlePP.instantiate()).hide();
	circleP.fill = 'red';
	circleP['stroke-width'] = 0;
  circleP.dimension = 8;
  circleP.dimension = 30;
 // circleP.dimension = 16;
}

rs.shapeGenerator = function (rvs,cell) {
  let {x,y} = cell;
  let width = this.width;
  let level = Math.floor(rvs.level);
  let opacity = level/255; //- 10.2 - (255- level/255
 // let level = 50 + 205*Math.random();
  console.log(level);
  let {shapes,circleP} = this;
  let shape = circleP.instantiate().show();
  shapes.push(shape);
  shape.fill = `rgb(${level},${level},${level})`;
  shape.fill = `rgba(${level},${level},${level},0.1)`;
  shape.fill = `rgba(${level},${level},${level},0.2)`;
  shape.fill = `rgba(${level},${level},${level},${opacity})`;
  //shape.dimension = 80*(x/width);
  //shape.fill = `rgb(${level},0,0)`;
  return shape;
}

rs.initialize = function () {
  debugger;
  this.initProtos();
  this.addBackground();
  this.setupShapeRandomizer('level', {step:30,min:0,max:255});
  this.initializeGrid();
  this.backgroundRectP.show();
  debugger;
//  this.shapes.forEach((shp) =>  shp.hide());

  
}

return rs;


});

