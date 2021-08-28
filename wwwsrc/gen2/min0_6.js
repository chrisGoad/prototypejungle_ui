
core.require('/gen0/min0.js','/shape/circle.js','/line/line.js','/mlib/pgen0.js','/mlib/webTree.js','/mlib/web0.js',function (addBasis,circlePP,linePP,addPointGenMethods,addWebTreeMethods,addWebMethods) {

let rs = svg.Element.mk('<g/>');
addBasis(rs);
addPointGenMethods(rs);
addWebMethods(rs);
//addWebTreeMethods(rs);
//addWebMethods(rs);
rs.setName('min0_6');
let ht= 2000;
ht = 3000;
let nrc=64;
//nrc = 8;
let mcl = 1.6*(ht/nrc);
mcl = 50
mcl =100;
let minc = 20;
minc = 40;
//mcl = 50;
//mcl = 3.6*(ht/nrc);
//nrc = 2;
let  topParams = {backgroundColor:'yellow',width:2*ht,height:ht,maxFringeTries:100,numRings:nrc,numRows:nrc,numCols:nrc,minConnectorLength:mcl,maxConnectorLength:mcl+minc,numPairs:2,fringeColor:'blue',k:1};

let ldim = 1000;
let rdim = 3000;
topParams.left = geom.LineSegment.mk(Point.mk(-ht,-ldim),Point.mk(-ht,ldim));
topParams.right= geom.LineSegment.mk(Point.mk(ht,-rdim),Point.mk(ht,rdim));

Object.assign(rs,topParams);

rs.cprc =0;
rs.choosePairs = rs.choosePairsAtRandom;


rs.initProtos = function () {	
  let lineP = this.set('lineP',linePP.instantiate()).hide();
	lineP['stroke-width'] = 5;
	lineP['stroke-width'] = 7;
	lineP.stroke  = 'white';
	//lineP.stroke  = 'blue';
  let circleP = this.set('circleP',circlePP.instantiate()).hide();
	circleP.dimension = 20;
	circleP.fill = 'transparent';
	circleP.stroke = 'transparent';
	 let circleP2 = this.set('circleP2',circlePP.instantiate()).hide();
	circleP2.dimension = 500;
	circleP2.fill = 'black';
	circleP2.fill = 'rgb(0,0,50)';
	circleP2.fill = 'rgb(0,100,250)';
	circleP2.fill = 'black';
	
	
}  


rs.initialize = function () {
  core.root.backgroundColor = 'black';
 // core.root.backgroundColor = 'rgb(50,50,50)';
 // core.root.backgroundColor = 'white';
	this.initProtos();
	debugger;
	let pnts = this.genGrid(this);
	let p = pnts[0];
//	p.onFringe = 1
	this.placeShapesAtPoints(pnts,this.circleP);
		this.initWeb(pnts);
	this.addWeb();
	this.addSegs();
}


return rs;

});

