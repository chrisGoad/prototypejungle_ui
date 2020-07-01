
core.require('/line/line.js','/gen0/grid0.js',
function (linePP,addGridMethods) {
	return function () {
  debugger;
let rs = svg.Element.mk('<g/>');
addGridMethods(rs);
/*adjustable parameters  */

 rs.numRows= 40;
  rs.numRows= 40;
  rs.width = 100;
  rs.height = 100;
  //rs.visChance= 1;
  rs.pointJiggle =  2;
/* end adjustable parameters */  

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
  this.shapeP['stroke-width'] = .2; 	
 /* core.assignPrototypes(this,'circleP',circlePP);
  this.circleP.stroke = 'transparent';
  this.circleP.fill = 'rgb(1,1,1)';//'red';
//  this.circleP.fill = 'red';
  this.circleP.dimension = 5;*/
}  


rs.boundaryLineGenerator = function (end0,end1,rvs,cell) {
	let c = rvs.color
  let lines = this.lines;
	let line = this.blineP.instantiate();
	lines.push(line);
  line.setEnds(end0,end1);
  line.stroke =  `rgb(${Math.floor(c)},${Math.floor(c)},${Math.floor(c)})`;
	line.update();
	line.show();
}

return rs;
}
}
);
      

