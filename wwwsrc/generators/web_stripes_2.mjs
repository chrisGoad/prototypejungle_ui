//active
//core.require('/line/line.js','/shape/rectangle.js','/shape/circle.js','/gen0/Basics.js','/mlib/pointGen.js','/mlib/web.js',

//function (linePP,rectPP,circlePP,Basics,addPointGenMethods,addWebMethods) {




import {rs as linePP} from '/line/line.mjs';
import {rs as circlePP} from '/shape/circle.mjs';
import {rs as rectPP} from '/shape/rectangle.mjs';
import {rs as basicsP} from '/generators/basics.mjs';
import {rs as addPointGenMethods} from '/mlib/pointGen.mjs';	
import {rs as addWebMethods} from '/mlib/web.mjs';	

let rs = basicsP.instantiate();
addPointGenMethods(rs);
let WebP = basicsP.instantiate();
addWebMethods(WebP);

let stripes = rs.set('stripes',svg.Element.mk('<g/>'));

rs.setName('web_stripes_2');

let wd= 2000;
let ht = 0.05*wd; // height  of stripes
let sep = 0.4*wd; // separation between stripes

let  webParams = {minConnectorLength:0.5*ht,maxConnectorLength:1.2*ht,maxRingConnectorLength:3.2*sep,webTries:100};
let  topParams = {width:wd,height:ht,backStripeColor:'rgb(2,2,2)',backStripeWidth:1.2*wd,backStripeHeight:2.1*(sep+ht)};
let  gridParams = {width:1*wd,height:ht,numRows:1,numCols:150};
let topPos = Point.mk(0,-sep);
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
	this.circleP['stroke-width'] = 0;
}  

rs.initialize = function () {
  core.root.backgroundColor = 'black';
	this.initProtos();
	this.addBackStripe();
	let {circleP,rectP} = this;
	const mkStripe = (nm,pos,clr) => {
		let stripe = stripes.set(nm,rectP.instantiate().show());
		stripe.width = wd;
		stripe.height = ht;
		stripe.fill = clr;
		stripe.moveto(pos);
		return stripe;
	}
	let stripe1 = mkStripe('stripe1',topPos,'rgb(50,50,100)');
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
	topWeb.addWeb(pnts,this.lineP2);
	middleWeb.addWeb(pnts,this.lineP);
	bottomWeb.addWeb(pnts,this.lineP2);
}
export {rs};


