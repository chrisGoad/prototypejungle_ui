
core.require('/gen0/min0.js','/shape/circle.js','/line/line.js','/mlib/pgen0.js','/mlib/web0.js',function (addBasis,circlePP,linePP,addPointGenMethods,addWebMethods) {

let rs = svg.Element.mk('<g/>');
addBasis(rs);
addPointGenMethods(rs);
addWebMethods(rs);
//addWebMethods(rs);
rs.setName('min0_1');
let ht= 2000;
ht = 3000;
let nrc=8;
let  topParams = {width:ht,height:ht,numRings:nrc,numRows:nrc,numCols:nrc,maxConnectorLength:800};

Object.assign(rs,topParams);


rs.initProtos = function () {	
  let lineP = this.set('lineP',linePP.instantiate()).hide();
	lineP['stroke-width'] = 5;
	lineP.stroke  = 'white';
  let circleP = this.set('circleP',circlePP.instantiate()).hide();
	circleP.dimension = 10;
	circleP.fill = 'white';
	
}  

rs.initialize = function () {
  core.root.backgroundColor = 'black';
	this.initProtos();
	debugger;
	let pnts = this.genGrid(this);
	this.placeShapesAtPoints(pnts,this.circleP);
	this.addWeb(pnts);
}


return rs;

});

