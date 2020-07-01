
core.require('/line/line.js','/grid/grid24cons.js',function (linePP,constructor) {
  let rs = constructor();
	rs.initializeP = function () {
		core.assignPrototypes(this,'shapeP',linePP);
		this.shapeP.stroke = 'rgb(255,255,255,1)';
		this.shapeP['stroke-width'] = 0.2;
		core.assignPrototypes(this,'boundaryLineP',linePP);
		this.boundaryLineP.stroke = 'rgb(255,255,255)';
		this.boundaryLineP['stroke-width'] = 0.3;
	}  
	rs.initializeP();
	core.root.backgroundColor = 'black'
  let numRows = rs.numRows= 41;
  let numCols = rs.numCols = 41;
  rs.width = 180;
  rs.height = 100;
  let deltaX = rs.deltaX = rs.numCols/rs.width;
  let deltaY = rs.deltaY = rs.numRows/rs.height;
  let fc = 5;
  let end0 = Point.mk(-fc*deltaX,0);
  let end1 = Point.mk(fc*deltaX,0);
  rs.shapeP.setEnds(end0,end1);
	rs.setupBoundaryRandomizer('yellow', {numRows,numCols,step:35,min:10,max:250});

	rs.boundaryLineGenerator = function (lines,e0,e1,rvs){
		let vis = Math.random() <0.5;
		if (!vis) {
			return;
		}
		let y = rvs.yellow;
		let line =  this.boundaryLineP.instantiate();
		lines.push(line);
		line.setEnds(e0,e1);
		line.stroke = `rgb(${Math.floor(y)},${Math.floor(y)},0)`;
		line.update();
		line.show();
		return line;
	}
  rs.pointJiggle = 3;
  
 
  rs.initializeConstructor();
  return rs;
});

