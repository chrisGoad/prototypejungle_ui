//active
core.require('/line/line.js','/shape/rectangle.js','/shape/circle.js','/gen0/Pgen.js','/gen0/Web.js',function (linePP,rectPP,circlePP,PgenP,WebP) {

let rs = PgenP;
let stripes = rs.set('stripes',svg.Element.mk('<g/>'));

rs.setName('min0_14');

let wd= 2000;
let ht = 0.05*wd; // height  of stripes
let sep = 0.4*wd; // separation between stripes

let  webParams = {minConnectorLength:0.5*ht,maxConnectorLength:1.2*ht,maxRingConnectorLength:3.2*sep,maxLoops:100000};
let  topParams = {width:wd,height:ht,backgroundColor:'rgb(2,2,2)',backgroundWidth:1.2*wd,backgroundHeight:2.1*(sep+ht),backgroundVisible:0};
let  gridParams = {width:1*wd,height:ht,numRows:1,numCols:150};
let toRadians = Math.PI/180;
let  topRingParams = {radius:2*wd,ringSeparation:ht,numRings:2,numPointsPerRing:150,fromAngle:255*toRadians,toAngle:285*toRadians};
let topPos = Point.mk(0,4*sep);
let midPos = Point.mk(0,0);
let botPos = Point.mk(0,sep);

Object.assign(WebP,webParams);
Object.assign(rs,topParams);

let topWeb  = rs.set('top',WebP.instantiate());
let middleWeb = rs.set('middle',WebP.instantiate());
let bottomWeb = rs.set('bottom',WebP.instantiate());
let grayblue = 'rgb(50,50,100)';

rs.initProtos = function () {	
  let lineP = this.set('lineP',linePP.instantiate()).hide();
	this.lineP.stroke = 'white';
	this.lineP['stroke-width'] = 3;
	let lineP2 = this.set('lineP2',linePP.instantiate()).hide();
	this.lineP2.stroke = 'red';
	this.lineP2['stroke-width'] = 3;
	let rectP = this.set('rectP',rectPP.instantiate()).hide();
	this.rectP.stroke = 'transparent';
	this.rectP.fill = 'black';
	this.rectP['stroke-width'] = 0;
	let circleP = this.set('circleP',circlePP.instantiate()).hide();
	this.circleP.stroke = 'transparent';
	this.circleP.dimension = 2*ht;
	this.circleP.fill = grayblue;
	this.circleP.fill = 'blue';
	this.circleP['stroke-width'] = 0;
}  

rs.initialize = function () {
  core.root.backgroundColor = 'black';
	this.initProtos();
	debugger;
	this.addBackground();
	let {circleP,rectP} = this;
	const mkStripe = (nm,pos,clr) => {
		let stripe = stripes.set(nm,rectP.instantiate().show());
		stripe.width = wd;
		stripe.height = ht;
		stripe.fill = clr;
		stripe.moveto(pos);
		return stripe;
	}
	//let stripe1 = mkStripe('stripe1',topPos,'rgb(50,50,100)');
	let stripe2 = mkStripe('stripe2',midPos,'black');
	let stripe3 = mkStripe('stripe3',botPos,'blue');
	let circle0 = this.set('circle0', circleP.instantiate().show());
	circle0.moveto(Point.mk(0,-0.5*sep));
	let circle1 = this.set('circle1', circleP.instantiate().show());
	circle1.moveto(Point.mk(0,0.5*sep));
	circle1.fill = 'blue';
	topWeb.moveto(topPos);
	bottomWeb.moveto(botPos);
	let pnts = this.genGrid(gridParams);
	let topPnts = this.genRings(topRingParams);
	debugger;
	let topStripe = this.rings2polygon(topPnts);
	stripes.set('topStripe',topStripe);
	topStripe.fill = grayblue;
	//topStripe.fill = 'blue';
	topStripe.moveto(topPos);

	topWeb.addWeb(topPnts,this.lineP2);
	middleWeb.addWeb(pnts,this.lineP);
	bottomWeb.addWeb(pnts,this.lineP2);
}
return rs;
});

