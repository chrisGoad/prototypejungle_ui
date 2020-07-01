
core.require('/line/line.js','/grid/grid24cons.js',function (linePP,constructor) {
  let rs = constructor();
	core.assignPrototypes(rs,'boundaryLineP',linePP);
	rs.boundaryLineP.stroke = 'rgb(255,255,0)';
	rs.boundaryLineP['stroke-width'] = 0.2;
	
  rs.backgroundColor = 'black';
  let numRows = rs.numRows= 64;
  let numCols = rs.numCols= 64;
  rs.outerRadius = 100;
  rs.innerRadius = 0.5 * rs.outerRadius;
  rs.angleMin = -180;
  rs.angleMax = 180;
  rs.center = Point.mk(0,0);
  
  rs.positionFunction = rs.radialPositionFunction;
	rs.setupBoundaryRandomizer('red', {step:35,min:20,max:200,numRows,numCols});
  rs.regionStroke = 'rgb(100,100,0)';
  rs.regionStrokeWidth = 0.6;   
  rs.pointJiggle = 0;
  rs.pathLength = 10;
  rs.generative = true; // generate regions
  rs.fadeIn = false;
  rs.fractionToOccupy = 0.9;
  
  
	rs.boundaryLineGenerator = function (lines,end0,end1,rvs,cell) {
		let line = this.boundaryLineP.instantiate();
		lines.push(line);
		line.setEnds(end0,end1);
		let r = rvs.red;
		line.stroke = `rgb(100,100,${Math.floor(r)})`;
		line.update();
		line.show();
	}
  rs.initializeConstructor();
  return rs;
})
