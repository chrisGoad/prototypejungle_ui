core.require('/line/line.js','/gen0/grid0.js',
function (linePP,addGridMethods) {

let rs = svg.Element.mk('<g/>');
addGridMethods(rs);
let nr = 20;
let dim = 400;
let params = {numRows:nr,numCols:nr,width:dim,height:dim,lowJiggle:0,highJiggle:20,lowJiggleStep:0,highJiggleStep:5};

Object.assign(rs,params);

rs.initProtos = function () {
	core.assignPrototypes(this,'blineP',linePP);
	this.blineP.stroke = 'rgb(255,255,255)';
	this.blineP['stroke-width'] = 0.5;
}  

rs.boundaryLineGenerator = function (end0,end1,rvs,cell) {
	let {blineP,showMissing,lines,updating,lineIndex} = this;

	let line = blineP.instantiate();
//	let c = rvs.color
	lines.push(line);
  line.setEnds(end0,end1);
  //  line.stroke =  `rgb(${Math.floor(c)},${Math.floor(c)},${Math.floor(c)})`;
	//}
	line.show();
	return line;
}

rs.initialize = function () {
 this.initProtos();
 let {numRows,numCols,lowJiggle,highJiggle,lowJiggleStep,highJiggleStep} = this;
 const walkParams =  (i,j) => {
//	debugger;
		let jiggleMax = this.interpolate(i,0,numRows,lowJiggle,highJiggle);
		let jiggleStep = this.interpolate(i,0,numRows,lowJiggleStep,highJiggleStep);
    return {step:jiggleStep,min:0,max:jiggleMax};
	}
	this.pointJiggleParams = {walkParams:walkParams}
  this.initializeGrid();
}

return rs;
})

