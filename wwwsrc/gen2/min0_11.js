
core.require('/line/line.js','/shape/rectangle.js','/shape/circle.js','/gen0/min0.js','/mlib/pgen0.js','/mlib/web0.js',function (linePP,rectPP,circlePP,addBasis,addPointGenMethods,addWebMethods) {

let rs = svg.Element.mk('<g/>');
addBasis(rs);
addPointGenMethods(rs);
addWebMethods(rs);
rs.setName('min0_11');
let wd= 2000;
let ht = 0.05*wd;
let sht = 0.4*wd
let nr = 1;
//let  topParams = {width:wd,height:ht,numRows:2,numCols:100,backgroundColor:'rgb(2,2,2)',backgroundPadding:0.2*wd,minConnectorLength:ht,maxConnectorLength:2*ht,maxLoops:100000}
let  topParams = {width:wd,height:ht,numRows:2,numCols:100,backgroundColor:'rgb(2,2,2)',backgroundWidth:1.2*wd,backgroundHeight:0.4*wd,minConnectorLength:0.5*ht,maxConnectorLength:1.2*ht,maxLoops:100000}
let  grid0Params = {width:wd,height:ht,numRows:2,numCols:150,pos:Point.mk(0,-2*sht)}
let  grid1Params = {width:1*wd,height:ht,numRows:nr,numCols:150,pos:Point.mk(0,-1*sht)};
let  grid2Params = {width:wd,height:ht,numRows:nr,numCols:150,pos:Point.mk(0,0*sht)}
let  grid3Params = {width:wd,height:ht,numRows:nr,numCols:150,pos:Point.mk(0,1*sht)}
let  grid4Params = {width:wd,height:ht,numRows:2,numCols:150,pos:Point.mk(0,2*sht)}


Object.assign(rs,topParams);


rs.pairFilter = function (i,j) {
	let {maxConnectorLength:mxCln,minConnectorLength:mnCln=0,cPoints} = this;
	let pi = cPoints[i];
	let pj = cPoints[j];
	let d = pi.distance(pj);
	return (mnCln < d) && (d < mxCln);
}
rs.initProtos = function () {	
  let lineP = this.set('lineP',linePP.instantiate()).hide();
	this.lineP.stroke = 'white';
	this.lineP['stroke-width'] = .1;
	this.lineP['stroke-width'] = 3;
	let rectP = this.set('rectP',rectPP.instantiate()).hide();
	this.rectP.stroke = 'transparent';
	this.rectP.fill = 'black';
	this.rectP['stroke-width'] = 0;
	let circleP = this.set('circleP',circlePP.instantiate()).hide();
	this.circleP.stroke = 'transparent';
	this.circleP.dimension = 2*ht;
	this.circleP.fill = 'red';
	this.circleP['stroke-width'] = 0;
	let lineP2 = this.set('lineP2',linePP.instantiate()).hide();
	this.lineP2.stroke = 'rgb(100,150,250)';
	this.lineP2.stroke = 'blue';
	this.lineP2.stroke = 'red';
	//this.lineP2.stroke = 'red';
	this.lineP2['stroke-width'] = 3;
}  

rs.initialize = function () {
  core.root.backgroundColor = 'black';
  //core.root.backgroundColor = 'blue';
	this.initProtos();
		debugger;

	this.addBackground();

	let {circleP,rectP} = this;
	const mkStripe = (nm,pos,clr) => {
		let stripe = this.set(nm,rectP.instantiate().show());
		stripe.width = wd;
		stripe.height = ht;
		stripe.fill = clr;
		stripe.moveto(pos);
		return stripe;
	}
	//let stripe0 = mkStripe('stripe0',grid0Params.pos,'red');
//	let stripe1 = mkStripe('stripe1',grid1Params.pos,'rgb(100,100,200)');
	let stripe1 = mkStripe('stripe1',grid1Params.pos,'rgb(50,50,100)');
	let stripe2 = mkStripe('stripe2',grid2Params.pos,'black');
	let stripe3 = mkStripe('stripe3',grid3Params.pos,'blue');
	//let stripe4 = mkStripe('stripe4',grid4Params.pos,'yellow');
	let circle0 = this.set('circle0', circleP.instantiate().show());
	circle0.moveto(Point.mk(0,-0.5*sht));
	let circle1 = this.set('circle1', circleP.instantiate().show());
	circle1.moveto(Point.mk(0,0.5*sht));
  circle1.fill = 'blue'
	this.set('shapes',core.ArrayNode.mk());
	let pnts0 = this.genGrid(grid0Params);
	let pnts1 = this.genGrid(grid1Params);
	let pnts2 = this.genGrid(grid2Params);
	let pnts3 = this.genGrid(grid3Params);
	let pnts4 = this.genGrid(grid4Params);
	//this.addWeb(pnts0,this.lineP);
	this.addWeb(pnts1,this.lineP2);
	this.addWeb(pnts2,this.lineP);
	//this.addWeb(pnts3,this.lineP2);
	//this.addWeb(pnts4,this.lineP);
	this.addSegs();
}


return rs;

});

