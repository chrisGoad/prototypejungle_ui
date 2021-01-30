core.require('/line/line.js','/gen0/grid0.js',
function (linePP,addGridMethods) {

let rs = svg.Element.mk('<g/>');
addGridMethods(rs);
rs.setName('grid0_00');
let nr = 40;
let dim = 400;
let params = {numRows:nr,numCols:nr,width:dim,height:dim,pointJiggle:0};

Object.assign(rs,params);

rs.initProtos = function () {
	core.assignPrototypes(this,'blineP',linePP);
	this.blineP.stroke = 'rgb(255,255,255)';
	this.blineP['stroke-width'] = 0.5;
	
}  

rs.boundaryLineGenerator = function (end0,end1,rvs,cell) {
	let {blineP,lines} = this;
	let line = blineP.instantiate();
	lines.push(line);
  line.setEnds(end0,end1);
	line.show();
	return line;
}

rs.genPoint3d = function (i,j) {
	let p = {x:i,y:j);
  if (p.length() < 0.3*numRows) {
		let v = p.difference(sphereCenter).normalize();
		let sp = v.times(sphereDiameter).plus(sphereCenter);
		return sp;
	} else {
		return 
		
	
rs.initialize = function () {
 this.initProtos();
  this.initializeGrid();
}

return rs;
})

