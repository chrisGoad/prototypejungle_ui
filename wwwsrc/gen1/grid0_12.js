
// from grid_0.js

core.require('/line/line.js','/shape/circle.js','/shape/rectangle.js','/gen0/grid0.js',
function (linePP,circlePP,rectPP,addGridMethods) {
	return function () {

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
  core.assignPrototypes(this,'circleP',circlePP);
  this.circleP.stroke = 'transparent';
  this.circleP.fill = 'rgb(255,0,0)';//'red';
  this.circleP.dimension = 3;
	 core.assignPrototypes(this,'rectP',rectPP);
  this.rectP.stroke = 'transparent';
  this.rectP.fill = 'rgb(255,0,0)';//'red';
  this.rectP.width = 3;
  this.rectP.height= 3;
}  



rs.boundaryLineGenerator = function (end0,end1,rvs,cell) {
	let {blineP,showMissing,lines,updating,lineIndex} = this;

	let line = this.nextLine(blineP);
	let c = rvs.color
	lines.push(line);
  line.setEnds(end0,end1);
	if (this.boundaryColorFunction) {
		line.stroke = this.boundaryColorFunction(c);
	} else {
    line.stroke =  `rgb(${Math.floor(c)},${Math.floor(c)},${Math.floor(c)})`;
	}
	line.show();
	return line;
}

return rs;
}
}
);
      

