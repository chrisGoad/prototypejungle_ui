
core.require('/grid/grid24at.js',
function (constructor) {
  debugger;	//this.initProtos();

  let rs = constructor();
	rs.initProtos();
	rs.numRows = 20;
	rs.numCols = 20;
	rs.width = 300;
	rs.height = 300;
	rs.computeDir = function (line,cell) {
	let {x,y} = cell;
	let dir;
	if ((x%1 === 0) && (x === y)) {
		dir = 0.75* Math.PI;
		//line.stroke = 'rgba(100,100,255,1)';
	} else if  (x + y === (this.numRows-1)) {
		dir = 0.25*Math.PI;
		//line.stroke = 'rgba(100,100,255,1)';
	} else {
	  dir = 2*Math.PI * Math.random();
	}
	return dir;
}
/*	rs.step0 = 0.05;
	rs.min0 = 0;
	rs.max0 = 0.4;
	//rs.maxLeft = 0.8;
 rs.min1 = -0.4;//0.9;
	rs.max1 = 0;	
	rs.step1 = 0.05;
	rs.spatter = 0;
	rs.changePoint =  0.5;
	rs.lineLengthFactor = 4;
	rs.numDrops = 100;*/
  return rs;
});

