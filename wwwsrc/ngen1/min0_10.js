//active
//active
core.require('/line/line.js','/gen0/Basics.js','/mlib/pointGen.js','/mlib/web.js',
function (linePP,Basics,addPointGenMethods,addWebMethods) {


let rs = Basics.instantiate();
addPointGenMethods(rs);
let WebP = Basics.instantiate();
addWebMethods(WebP);
rs.setName('min0_10');

rs.initProtos = function () {	
  let lineP = this.set('lineP',linePP.instantiate()).hide();
	this.lineP.stroke = 'white';
	this.lineP['stroke-width'] = 3;
	let lineP2 = this.set('lineP2',linePP.instantiate()).hide();
	this.lineP2.stroke = 'blue';
	this.lineP2['stroke-width'] = 3;
}  
let wd= 2000;
let ht = 0.2*wd;
let nr  = 2;

let  webParams = {width:wd,height:ht,numRows:2,numCols:1000,minConnectorLength:0.5*ht,maxConnectorLength:1.2*ht,webTries:1000,maxLoopps:10000};

Object.assign(WebP,webParams);

let stripes = rs.set('stripes',core.ArrayNode.mk());
let numStripes = 5;
for (let i=0;i<numStripes;i++) {
	 let stripe = WebP.instantiate();
	 stripes.push(stripe);
	 stripe.moveto(Point.mk(0,(i-2)*ht));
}

let  topParams = {width:wd,height:ht,numRows:2,numCols:100,backStripeColor:'rgb(100,22,22)',backStripeWidth:1.2*wd,backStripeHeight:1.2*wd,backStripeVisible:0,minConnectorLength:0.5*ht,maxConnectorLength:1.2*ht}
let  gridParams = {width:wd,height:ht,numRows:nr,numCols:200}


Object.assign(rs,topParams);

rs.initialize = function () {
  core.root.backgroundColor = 'rgb(100,20,20)';
	this.initBasis();
	let pnts = this.genGrid(gridParams);
	stripes[0].addWeb(pnts,this.lineP);
	stripes[1].addWeb(pnts,this.lineP2);
	stripes[2].addWeb(pnts,this.lineP);
	stripes[3].addWeb(pnts,this.lineP2);
	stripes[4].addWeb(pnts,this.lineP);
	this.addBackStripe();
	}


return rs;

});

