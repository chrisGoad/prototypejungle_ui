//active
core.require('/line/line.js','/shape/rectangle.js','/shape/circle.js','/shape/polygon.js','/gen0/Pgen.js','/gen0/Web.js',function (linePP,rectPP,circlePP,polygonPP,PgenP,WebP) {

let rs = PgenP;
let stripes = rs.set('stripes',svg.Element.mk('<g/>'));

rs.setName('min0_16');

let sep = 100;
let nr = 40;
let wd = nr * sep;

//let  webParams = {minConnectorLength:0.5*sep,maxConnectorLength:2.2*sep,maxLoops:100000};
let  webParams = [{minConnectorLength:1*sep,maxConnectorLength:2*sep,maxLoops:100000},
									{minConnectorLength:2*sep,maxConnectorLength:3*sep,maxLoops:100000},
									{minConnectorLength:1*sep,maxConnectorLength:2*sep,maxLoops:100000}]
									//{minConnectorLength:4*sep,maxConnectorLength:5*sep,maxLoops:100000}]
//let  webParams = {minConnectorLength:5*ht,maxConnectorLength:10.2*ht,maxLoops:100000};
let  topParams = {width:wd,height:wd,backgroundColor:'rgb(2,2,2)',backgroundWidth:3.2*wd,backgroundHeight:1.2*wd,backgroundVisible:0};
//let  gridParams = {width:1*wd,height:ht,numRows:1,numCols:150};
//	let {initialPos,initialDirection,width,step,delta,numSegs}  = params;

//let  gridParams = {initialPos:Point.mk(-0.5*wd,0),initialDirection:0,width:ht,step:0.01*wd,delta:0.05*Math.PI,numSteps:100};
let  gridParams = {numRows:nr,rowSep:sep};
let toRadians = Math.PI/180;


Object.assign(rs,topParams);
Object.assign(rs,gridParams);
	
let numWalks = 3;
let polygons = rs.set('polygons',core.ArrayNode.mk());

let webs = rs.set('webs',core.ArrayNode.mk());
for (let i=0;i<numWalks;i++) {
	let w = WebP.instantiate();
	Object.assign(w,webParams[i]);
	webs.push(w);
}
let grayblue = 'rgb(50,50,100)';
let triangleColors = ['yellow','red','yellow'];

rs.initProtos = function () {	
  let lineP = this.set('lineP',linePP.instantiate()).hide();
	this.lineP.stroke = 'blue';
	this.lineP['stroke-width'] = 0.1*sep;
	let lineP2 = this.set('lineP2',linePP.instantiate()).hide();
	this.lineP2.stroke = 'blue';
	this.lineP2['stroke-width'] = 3;
	let polygonP = this.set('polygonP',polygonPP.instantiate()).hide();
	polygonP['stroke-width'] =0;

	let rectP = this.set('rectP',rectPP.instantiate()).hide();
	this.rectP.stroke = 'transparent';
	this.rectP.fill = 'black';
	this.rectP['stroke-width'] = 0;
	let circleP = this.set('circleP',circlePP.instantiate()).hide();
	this.circleP.stroke = 'transparent';
	this.circleP.dimension = 0.2*sep;
	this.circleP.fill = grayblue;
	this.circleP.fill = 'red';
	this.circleP['stroke-width'] = 0;
}  

rs.initialize = function () {
  core.root.backgroundColor = 'black';
	this.initProtos();
	debugger;
	this.addBackground();
	let {circleP,rectP,polygonP} = this;
	let rws = [];
	for (let i=0;i<numWalks;i++) {
		//gridParams.initialDirection = 2*i*(Math.PI/numWalks);
		rws.push(this.genPascal(gridParams));
		//rws = rws.concat(this.genRandomWalk(gridParams));
	}
// this.placeShapesAtPoints(rws[0],circleP);
 //return;

	//let stripe1 = mkStripe('stripe1',topPos,'rgb(50,50,100)');
	
//	topWeb.moveto(topPos);
//	bottomWeb.moveto(botPos);
//	let pnts = this.genGrid(gridParams);
	//let topPnts = this.genRings(topRingParams);
	debugger;
/*	let stripe0  = this.rings2polygon(rws[0]);
	stripes.set('topStripe',stripe0);
  stripe0.fill = 'blue';
	let topStripe = this.rings2polygon(topPnts);
	stripes.set('topStripe',topStripe);
	topStripe.fill = grayblue;
	//topStripe.fill = 'blue';
	topStripe.moveto(topPos);*/
  //webs[0].addWeb(rws,this.lineP);
	//return;
	//topWeb.addWeb(topPnts,this.lineP2);
	let hwd = 0.5* wd;
	let hsep = 0.5*sep;
	let qsep = 0.25*sep;
	const mkTriangle = (clr,upsidedown) => {
		let pg = polygonP.instantiate().show();
		polygons.push(pg);
		let topc,botx,boty;
		if (upsidedown) {
			topc = hwd+qsep;
			botx = hwd - hsep;
			boty = sep - hwd;
		} else {
			topc = -hwd-qsep;
			botx = hsep - hwd
			boty = hwd - sep;
		}
		/*let p0 = Point.mk(-hwd,hwd-sep);
		let p1 = Point.mk(hwd,hwd-sep);
		let p2 = Point.mk(0,-hwd);*/
		let p0 = Point.mk(botx,boty);
		let p1 = Point.mk(-botx,boty);
		let p2 = Point.mk(0,topc);
		pg.corners = [p0,p2,p1,p0];
		pg.fill = clr;
		return pg;
	}
	for (let i=0;i<numWalks;i++) {
		let w = webs[i];
		let tr = mkTriangle(triangleColors[i]);
		w.addWeb(rws[i],this.lineP);
		let ps = Point.mk((i-1)*(wd+sep),0);
		
		w.moveto(ps);
		tr.moveto(ps);
		//continue;
		let lgap = mkTriangle('gray',1);
		lgap.moveto(Point.mk(-hwd-hsep,-sep));
		let rgap = mkTriangle('gray',1);
		rgap.moveto(Point.mk(hwd+hsep,-sep));
	}
	
}
return rs;
});

