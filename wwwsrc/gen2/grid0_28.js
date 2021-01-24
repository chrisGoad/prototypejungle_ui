core.require('/line/line.js','/shape/polygon.js','/gen0/grid0.js',
function (linePP,polygonPP,addGridMethods) {

let rs = svg.Element.mk('<g/>');
addGridMethods(rs);
rs.setName('grid0_28');
let nr = 20;
let dim = 400;
let params = {numRows:nr,numCols:nr,width:dim,height:dim,lowJiggle:0,highJiggle:20,lowJiggleStep:0,highJiggleStep:5,generatorsDoMovess:1};

Object.assign(rs,params);

rs.initProtos = function () {
	core.assignPrototypes(this,'blineP',linePP);
	this.blineP.stroke = 'rgb(255,255,255)';
	this.blineP['stroke-width'] = 0.5;
	core.assignPrototypes(this,'polygonP',polygonPP);
	this.polygonP.stroke = 'rgb(255,255,255)';
	this.polygonP['stroke-width'] = 0.5;
	this.polygonP.fill = 'red';
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

rs.shapeGenerator = function (rvs,cell,cnt) {
	debugger;
	let {shapes,polygonP} = this;
	let corners = this.cellCorners(cell);
	let mcnt = cnt.minus();
	let rCorners = this.displaceArray(corners,mcnt);
	let sCorners = this.scaleArray(rCorners,0.5,0.25);
	let pgon = polygonP.instantiate();
	pgon.corners = sCorners;
	shapes.push(pgon);
	pgon.show();
	pgon.update();
	return pgon;
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

