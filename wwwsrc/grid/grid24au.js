
core.require('/line/line.js','/shape/circle.js','/grid/addGrid8.js',function (linePP,circlePP,addGridMethods) {
	return function () {
  debugger;
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
}  


rs.shapeGenerator = function (rvs,cell,cnt) {
  let {shapes,shapeDescriptors,numCols,numRows,deltaX,symetrical,lineLength,sx,sy} = this;

  let dir = 0;
  
 /// if (Math.random() < 0.001) {
  //if ((cell.x === Math.floor(0.666* numCols)) && (cell.y === Math.floor(0.777*numRows))){
  if ((cell.x === sx) && (cell.y === sy )){
    dir = 0.5*Math.PI;
    console.log('x '+cell.x+' y '+cell.y);
  }
 	let idx = cell.index;

	let line0 = this.shapeP1.instantiate();
	shapes.set(idx,line0);
  this.setLineEnds(line0,lineLength,dir);
  if (0 && (dir !== 0)) {
    line0.stroke = 'white';
  }
	return line0;
}

rs.shortenLine = function (end0,end1,factor) {
  let vec = end1.difference(end0).times(0.5 * factor);
  let middle = end0.plus(end1).times(0.5);
  let nend0 = middle.plus(vec);
  let nend1 = middle.difference(vec);
  return [nend0,nend1];
}
  
rs.boundaryLineGenerator = function (end0,end1,rvs,cell) {
 let {bx,by} = this;
 let exc = 0;
 if ((cell.x === bx) && (cell.y === by )){
    alert('bx '+cell.x+' by '+cell.y);
    exc = 1;
  }
  //if (Math.random() < 0.001) {
  //  return;
  //}
	let r = rvs.red;

  let lines = this.lines;
  let line;
	line = this.blineP.instantiate();
	lines.push(line);
  let  ends = this.shortenLine(end0,end1,exc?1.5:0.8);
  //let  ends = this.shortenLine(end0,end1, Math.random() + 0.5);
  line.setEnds(ends[0],ends[1]);

  if (exc) {
    line.stroke =  `rgb(${Math.floor(r)},${Math.floor(r)},${Math.floor(r)})`;
    //line['stroke-width'] = 3 * line['stroke-width'];
  } else {
	  line.stroke = `rgb(${Math.floor(r)},${Math.floor(r)},${Math.floor(r)})`;
  }
	line.update();
	line.show();
}

rs.initialize = function () {
 
  this.initializeGrid();

}	


return rs;
}
});

      

