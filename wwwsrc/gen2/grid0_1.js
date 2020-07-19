
//core.require('/gen1/grid_0.js',
core.require('/line/line.js','/gen0/grid0.js',
function (linePP,addGridMethods) {
  debugger;	//this.initProtos();


  let rs = svg.Element.mk('<g/>');
  addGridMethods(rs);
	//rs.initProtos();
	rs.saveImage = true;
	rs.setName('grid0_1');
  rs.loadFromPath = 0;
	
	rs.numCols= 81;
  //let numRows = rs.numRows= 41;
  rs.numRows= 41;
  rs.width = 180;
  rs.height = 100;
 // rs.visChance= 1;
  //rs.visChance= 1;
  rs.pointJiggle =  2;
  
	
rs.initProtos = function () {
  core.assignPrototypes(this,'blineP',linePP);
  this.blineP.stroke = 'yellow';
  this.blineP.stroke = 'rgb(100,100,100)';
  this.blineP.stroke = 'rgb(200,0,0)';
  this.blineP['stroke-width'] = 0.2;  
  core.assignPrototypes(this,'shapeP',linePP);
  this.shapeP.stroke = 'rgb(250,100,100)';
  let vec = Point.mk((this.width/this.numRows)*0.05,0);
  this.shapeP.setEnds(vec.minus(),vec);
}


rs.boundaryLineGenerator = function (end0,end1,rvs,cell) {
	let c = rvs.color
  let lines = this.lines;
	let line = this.blineP.instantiate();
	lines.push(line);
  line.setEnds(end0,end1);
  line.stroke =  `rgb(${Math.floor(c)},${Math.floor(c)},${Math.floor(c)})`;
	line.show();
}

rs.initialize = function () {
		this.initProtos();
		core.root.backgroundColor = 'black';
			 debugger;
		this.setupBoundaryRandomizer('color',{step:35,min:20,max:250});
		this.initializeGrid();
  }	
  return rs;
});

