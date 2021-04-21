
core.require('/gen1/drop0_1.js','/shape/rectangle.js',function (rs,rectPP) {

rs.setName('drop0_1_18');
let ht = 300;
let wd = 1.5 * ht;
//wd = ht; //for instagram
let topParams = {width:wd,height:ht,numSeedRows:2,numSeedCols:3,maxDrops:1000,maxTries:10,lineLength:5,backgroundColor:'rgb(2,2,2)',backgroundPadding:10,minSeparation:0,rectangleDim:0.9,gridPadding:60,fromEnds:1,sepNext:0.01,onlyFromSeeds:1,extendWhich:'first',numSeeds:60,splitChance:0.8,splitAmount:0.2 * Math.PI,endLoops:3000,seedDirections:[0.5*Math.PI]}

//topParams = {width:50,height:50,maxDrops:1000,maxTries:10,lineLength:2,backgroundColor:undefined,minSeparation:0}

Object.assign(rs,topParams);


rs.finishProtos = function () {
	this.lineP.stroke = 'white';
	//this.lineP.stroke = 'black';
	//this.lineP.stroke = 'yellow';
	this.lineP['stroke-width'] = .1;
	this.lineP['stroke-width'] = .5;
  core.assignPrototypes(this,'rectP0',rectPP);
	this.rectP0.fill = 'blue';

}  

rs.segParams = function () {
  let r = Math.random();
  let np = 4;
  let angle = Math.floor(r*np)* (Math.PI/np)
  let length = 2 + Math.floor(r*np)*4;
  
 // let rs = r>0.5?Math.PI/2:0;
  return {angle,length};ho
}
rs.genSeeds = function () {
	return this.gridSeeds('white');
}


rs.genGridSegments = function (cell,p) {
  let {deltaX,deltaY,rectangleDim} = this; 
	let {x,y} = cell;
	if ((x%1 === 0) && (y%1 === 0)) {
		//debugger;
	  let dim = rectangleDim*Math.min(deltaX,deltaY);
	 let segs = this.rectangleSegments(dim,dim,p);
	 let lines = segs.map((sg) => this.genLine(sg)); 
	 let  SL = this.genOneSegment(p.plus(Point.mk(0,-0.5*dim)),0.5*Math.PI,'cyan');
	 segs.push(SL[0][0]);
	 lines.push(SL[1][0]);
	//	let segs = [];
		let rect = this.rectP0.instantiate();
		rect.width = dim;
		rect.height = dim;
		let hdim = 0.5*dim;
		let gRect = Rectangle.mk(Point.mk(p.x-hdim,p.y-hdim),Point.mk(dim,dim));
		this.gRects.push(gRect);
		rect.show();
		lines.push(rect);
		rect.moveto(p);
  //  return [[],lines];
    return [segs,lines];
  }
}	

rs.inArect = function (p) {
	let gRects = this.gRects;
	let ln = gRects.length;
	for (let i=0;i<ln;i++) {
		let gRect = gRects[i];
		if (gRect.contains(p)) {
			return true;
		}
	}
	return false;
}


rs.genSegments = function (p) {
  //debugger;
 // let {r,g,b} = this.randomizerColor(p);
//	let clr = `rgb(${r},${r},${r})`;
  return this.genSegmentsFan(p,'white');
//  return this.genSegmentsFan(p,clr);
}

rs.genSegmentss = function (p) {
	let inr = this.inArect(p);
  let sizes = [2,5,10,20,40];
  let which = Math.floor(Math.random()*5);
  let sz = sizes[which];
  let wd = sz;
  let ht = sz;
	debugger;
//  debugger;
  let dir = Math.random() < 0.5?0:0.5*Math.PI;
  let SL = this.genOneSegment(p,dir,inr?'white':'blue');
	return SL;
  //let segs = this.rectangleSegments(wd,ht,p);
  let lines = segs.map((sg) => this.genLine(sg));

  const genRGBval = function () {
    return 50 + Math.floor(Math.random()*202);
  }
  let r = genRGBval();
  let g = genRGBval();
  let b = genRGBval();
  let clr = `rgb(${r},${r},${r})`;
  lines.forEach( (line) => line.stroke = clr);

  return [segs,lines];
}


rs.initialSegments = function () {
  let {width,height} = this; 
  let segs = this.rectangleSegments(width,height);
  let lines = segs.map((sg) => this.genLine(sg)); 
  return [segs,lines];
}

rs.initialize = function () {
  core.root.backgroundColor = 'black';
	//this.setupColorRandomizer({step:10,min:150,max:240});

	this.gRects = [];
  /*let r0 = geom.Rectangle.mk(Point.mk(-100,-100),Point.mk(100,100));
  let r1 = geom.Rectangle.mk(Point.mk(0,-100),Point.mk(100,100));
  let r2 = geom.Rectangle.mk(Point.mk(-100,0),Point.mk(100,100));
  let r3 = geom.Rectangle.mk(Point.mk(0,0),Point.mk(100,100));
  this.rectangles = [r0,r1,r2,r3];*/
	this.initializeDrop();
}

return rs;

});

