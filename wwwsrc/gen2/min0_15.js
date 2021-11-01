//active
core.require('/line/line.js','/shape/rectangle.js','/shape/circle.js','/gen0/Pgen.js','/gen0/Web.js',function (linePP,rectPP,circlePP,PgenP,WebP) {

let rs = PgenP;
let stripes = rs.set('stripes',svg.Element.mk('<g/>'));

rs.setName('min0_15');

let wd= 2000;
let ht = 0.04*wd; // height  of stripes
let sep = 0.4*wd; // separation between stripes

let  webParams = {minConnectorLength:0.5*ht,maxConnectorLength:2.2*ht,maxRingConnectorLength:3.2*sep,maxLoops:100000};
//let  webParams = {minConnectorLength:5*ht,maxConnectorLength:10.2*ht,maxLoops:100000};
let  topParams = {width:wd,height:ht,backStripeColor:'rgb(2,2,2)',backStripeWidth:1.5*wd,backStripeHeight:1.5*wd,backStripeVisible:0};
//let  gridParams = {width:1*wd,height:ht,numRows:1,numCols:150};
//	let {initialPos,initialDirection,width,step,delta,numSegs}  = params;

//let  gridParams = {initialPos:Point.mk(-0.5*wd,0),initialDirection:0,width:ht,step:0.01*wd,delta:0.05*Math.PI,numSteps:100};
let  gridParams = {initialPos:Point.mk(-0.0*wd,0),initialDirection:0,width:ht,step:0.01*wd,delta:0.02*Math.PI,numSteps:70};
let toRadians = Math.PI/180;


Object.assign(WebP,webParams);
Object.assign(rs,topParams);
Object.assign(rs,gridParams);
	
let numWalks = 18;
let webs = rs.set('webs',core.ArrayNode.mk());
for (let i=0;i<numWalks;i++) {
	webs.push(WebP.instantiate());
	
}
let grayblue = 'rgb(50,50,100)';

rs.initProtos = function () {	
  let lineP = this.set('lineP',linePP.instantiate()).hide();
	this.lineP.stroke = 'white';
	this.lineP['stroke-width'] = 3;
	let lineP2 = this.set('lineP2',linePP.instantiate()).hide();
	this.lineP2.stroke = 'blue';
	this.lineP2['stroke-width'] = 3;
	let rectP = this.set('rectP',rectPP.instantiate()).hide();
	this.rectP.stroke = 'transparent';
	this.rectP.fill = 'black';
	this.rectP['stroke-width'] = 0;
	let circleP = this.set('circleP',circlePP.instantiate()).hide();
	this.circleP.stroke = 'transparent';
	this.circleP.dimension = 0.5*ht;
	this.circleP.fill = grayblue;
	this.circleP.fill = 'red';
	this.circleP['stroke-width'] = 0;
}  

rs.initialize = function () {
  core.root.backgroundColor = 'black';
	this.initProtos();
	debugger;
	this.addBackStripe();
	let {circleP,rectP} = this;
	let rws = [];
	for (let i=0;i<numWalks;i++) {
		gridParams.initialDirection = 2*i*(Math.PI/numWalks);
		rws.push(this.genRandomWalk(gridParams));
		//rws = rws.concat(this.genRandomWalk(gridParams));
	}
 // this.placeShapesAtPoints(topPnts,circleP);

	//let stripe1 = mkStripe('stripe1',topPos,'rgb(50,50,100)');
	
//	topWeb.moveto(topPos);
//	bottomWeb.moveto(botPos);
//	let pnts = this.genGrid(gridParams);
	//let topPnts = this.genRings(topRingParams);
	debugger;
	/*let stripe0  = this.rings2polygon(rws[0]);
	stripes.set('topStripe',stripe0);
  stripe0.fill = 'blue';*/
/*	let topStripe = this.rings2polygon(topPnts);
	stripes.set('topStripe',topStripe);
	topStripe.fill = grayblue;
	//topStripe.fill = 'blue';
	topStripe.moveto(topPos);*/
  //webs[0].addWeb(rws,this.lineP);
	//return;
	//topWeb.addWeb(topPnts,this.lineP2);
	
	for (let i=0;i<numWalks;i++) {
		let w = webs[i];
		w.addWeb(rws[i],this.lineP);
	}
	
}
return rs;
});

