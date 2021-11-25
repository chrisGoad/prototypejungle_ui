
//core.require('/line/line.js','/grid/grid24cons.js',function (linePP,constructor) {
core.require('/line/line.js','/gen0/grid0.js',
function (linePP,addGridMethods)	{ 

  let rs = svg.Element.mk('<g/>');
  addGridMethods(rs);
	//rs.initProtos();
	rs.saveImage = 1;
	rs.setName('grid0_2');
  rs.loadFromPath = 0;
	
	rs.numRows= 64;
  rs.numCols= 64;
	
	const initProtos = function () {
	  core.assignPrototypes(rs,'bLineP',linePP);
	  rs.bLineP.stroke = 'rgb(255,255,0)';
	  rs.bLineP['stroke-width'] = 0.2;
		 core.assignPrototypes(rs,'rlineP',linePP);
	  rs.rlineP.stroke = 'rgb(100,100,0)';
	  rs.rlineP['stroke-width'] = 0.6;
	}
	
  rs.outerRadius = 100;
  rs.innerRadius = 0.5 * rs.outerRadius;
  rs.angleMin = -180;
  rs.angleMax = 180;
  rs.center = Point.mk(0,0);
  
  rs.positionFunction = rs.radialPositionFunction;
  
  rs.pointJiggle = 0;
  rs.pathLength = 10;
  rs.generative = true; // generate regions
  rs.fadeIn = false;
  rs.fractionToOccupy = 0.9;
  
  
	rs.boundaryLineGenerator = function (end0,end1,rvs,cell) {
		core.root.backgroundColor = 'black';
		let lines = this.lines;
		let line = this.bLineP.instantiate();
		lines.push(line);
		line.setEnds(end0,end1);
		let r = rvs.red;
		line.stroke = `rgb(100,100,${Math.floor(r)})`;
		line.update();
		line.show();
		return line;
	}
	rs.initialize = function () {
		initProtos();
		this.setupBoundaryRandomizer('red', {step:35,min:20,max:200});

		this.initializeGrid();
	}
  return rs;
});
