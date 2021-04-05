
core.require('/line/line.js','/shape/circle.js','/gen0/grid0.js',function (linePP,circlePP,addGridMethods) {
	return function () {
let rs = svg.Element.mk('<g/>');
addGridMethods(rs);


/*adjustable parameters  */


rs.initProtos = function () {
  core.assignPrototypes(this,'blineP',linePP);
  this.blineP.stroke = 'yellow';
  this.blineP.stroke = 'rgb(100,100,100)';
  this.blineP.stroke = 'rgb(200,0,0)';
  this.blineP['stroke-width'] = 0.2;  
  core.assignPrototypes(this,'shapeP1',linePP);
  this.shapeP1.stroke = 'rgb(250,100,100)';
  let vec = Point.mk((this.width/this.numRows)*0.05,0);
  this.shapeP1.setEnds(vec.minus(),vec);
  this.shapeP1['stroke-width'] = .2; 	
  core.assignPrototypes(this,'circleP',circlePP);
  this.circleP.stroke = 'transparent';
  this.circleP.fill = 'rgb(1,1,1)';//'red';
//  this.circleP.fill = 'red';
  this.circleP.dimension = 1;
	if (this.finishProtos) {
		this.finishProtos();
	}
}  


rs.shapeGenerator = function (rvs,cell,cnt) {
  let {shapes,shapeDescriptors,numCols,numRows,deltaX,symetrical,lineLength} = this;
	let line0 = this.shapeP1.instantiate();
	shapes.push(line0);
  this.setLineEnds(line0,lineLength,0);
	return line0;
}

rs.shortenLine = function (end0,end1,factor) {
  let vec = end1.difference(end0).times(0.5 * factor);
  let middle = end0.plus(end1).times(0.5);
  let nend0 = middle.plus(vec);
  let nend1 = middle.difference(vec);
  return [nend0,nend1];
}

rs.boundaryLineGenerator = function (end0,end1,rvs,cell,orientation) {
 let {numRows,numCols,showMissing,showStripes,missingZag} = this;
 debugger;
 let {x,y} = cell; 
 let hy = this.numRows/2;
 let hx = this.numCols/2;
  if ((y==hy) || (x==hx) || ((x==hx+1) && (orientation==='vertical')) || ((y==hy+1) && (orientation==='horizontal')) ||((x+y)%2 === 0))  { // on diagonal
		let lines = this.lines;
		let line = this.blineP.instantiate();
		lines.push(line);
	//	let  ends = this.shortenLine(end0,end1,1);
		line.setEnds(end0,end1);
    line.show();
		line.update();
  }
}
/*
Definition:
Point =  pair of reals. Let p.x denote the first element of such a pair p, and p.y the second.
Line Segment === a pair of points. Let s.end0 denote the first element of such a pair s, and s.end1 
Image1 is a set of Line Segments, containing those segments S  such that:
S.end0.x is an integer between -30 and 30
S.end0.x is an integer between -30 and 30
and either
  1) (S.end1.s=x = S.end0.x + 1) and (S.end1.y = S.end1.y)  -- horizontal
or
  2) (S.end1.s=x = S.end0.x) and (S.end1.y = S.end1.y + 1)  -- vertical

  
There are two kinds of segments in out set: call them "white" and "red".
For white segments
L[0].y is an integer between -30 and 30
L[2].1 is an integer between -30 and 30
L[2].1 is an integer between -30 and 30
L

Sorry to take so long to reply. I agree that I phrased the matter badly, and in a way that is indeed contradictory. I should have said "into our representation of presence" in the next to last line of what you quoted. I decided to replace that whole paragraph with another that presents matters more clearly (I hope). It reads:


return rs;
}
});

      

