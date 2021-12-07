//active
core.require('/line/line.js','/shape/polygon.js','/gen0/Basics.js','/mlib/grid.js','/mlib/topRandomMethods.js',
function (linePP,polygonPP,rs,addGridMethods,addRandomMethods) {

//let rs = svg.Element.mk('<g/>');
addGridMethods(rs);
addRandomMethods(rs);
rs.setName('grid_distortion_field');
let nr = 40;
let dim = 400;
let params = {numRows:nr,numCols:nr,width:dim,height:dim,lowJiggle:0,highJiggle:20,lowJiggleStep:0,highJiggleStep:5,backStripeColor:'rgb(2,2,2)',backStripePadding:100,backStripeVisible:0,
 backStripePos:Point.mk(-17,-20)};

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
	lines.push(line);
  line.setEnds(end0,end1);
	line.show();
	return line;
}

rs.shapeGenerator = function (rvs,cell,cnt) {
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
	core.root.backgroundColor = 'black';
 this.initProtos();
 let {numRows,numCols,lowJiggle,highJiggle,lowJiggleStep,highJiggleStep} = this;
 this.addBackStripe();
 let hnr = numRows/2;
 const walkParams =  (i,j) => {
		let di = i - hnr;
		let dj = j - hnr;
    let fromMiddle = Math.sqrt(di*di + dj*dj);
		let jiggleMax = this.interpolate(fromMiddle,numRows/2,0,lowJiggle,highJiggle);
		let jiggleStep = this.interpolate(fromMiddle,numRows/2,0,lowJiggleStep,highJiggleStep);
    return {step:jiggleStep,min:0,max:jiggleMax};
	}
	this.pointJiggleParams = {walkParams:walkParams}
  this.initializeGrid();
}

return rs;
})

