
core.require('/line/line.js','/gen0/pgen0.js','/gen0/web0.js',function (linePP,addPointGenMethods,addWebMethods) {

let rs = svg.Element.mk('<g/>');
addPointGenMethods(rs);
addWebMethods(rs);
rs.setName('a_web0_4');
let ht= 2000;
ht = 3000;
let nrc=15;
let  topParams = {width:2*ht,height:2*ht,numRings:nrc,radius:ht,maxDrops:1000,maxTries:100,lineLength:2,backgroundColor:'rgb(2,2,2)',backgroundPadding:0.1*ht,minSeparation:20,maxConnectorLength:2000}

Object.assign(rs,topParams);


rs.initProtos = function () {	
  let lineP = this.set('lineP',linePP.instantiate()).hide();
	this.lineP.stroke = 'white';
	this.lineP['stroke-width'] = .1;
	this.lineP['stroke-width'] = 5;
}  

rs.initialize = function () {
  core.root.backgroundColor = 'black';
	this.initBasis();
	debugger;
		this.initializeDrop();

  let pnts = this.pointsFromCircleDrops();

	let pnts = this.genRings(this);
	this.addWeb(pnts);
}


return rs;

});

