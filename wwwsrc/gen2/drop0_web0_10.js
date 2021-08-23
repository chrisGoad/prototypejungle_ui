
core.require('/gen1/web0.js','/mlib/webTree.js',function (addWebMethods,addWebTreeMethods) {

let rs = svg.Element.mk('<g/>');
addWebMethods(rs);
//addWebTreeMethods(rs);
rs.setName('drop0_web0_10');
let ht= 2000;
ht = 6000;
let nrc = 20;
let topParams = {onSphere:1,width:1.5*ht,height:ht,maxDrops:6000,maxTries:100,lineLength:2,backgroundColor:'rgb(2,2,2)',backgroundPadding:0.1*ht,minSeparation:20,minConnectorLength:10,maxConnectorLength:100,shortenBy:0,sphereCenter:Point3d.mk(0,0,-0.3*ht),sphereDiameter:0.5*ht,focalPoint:Point3d.mk(0,0,ht),focalLength:10,cameraScaling:1000};
topParams = {maxFringeTries:10,numRows:nrc,numCols:nrc,width:1.5*ht,height:ht,maxDrops:10000,maxTries:100,lineLength:2,backgroundColor:'rgb(2,2,2)',backgroundPadding:0.1*ht,minSeparation:20,minConnectorLength:0,maxConnectorLength:200,shortenBy:10,sphereCenter:Point3d.mk(0,0,-0.3*ht),sphereDiameter:0.5*ht,focalPoint:Point3d.mk(0,0,ht),focalLength:10,cameraScaling:1000}

rs.maxDrops = 2000;
Object.assign(rs,topParams);


rs.finishProtos = function () {
	this.lineP.stroke = 'white';
	this.lineP['stroke-width'] = .1;
	this.lineP['stroke-width'] = 10;
}  

const nearDiagonal = function (pi,pj,howNear) {
	return true;
	let {x:pix,y:piy} = pi;
	let {x:pjx,y:pjy} = pj;
	let dx = Math.abs(pjx - pix);
	 dx = pjx - pix;
	let dy = Math.abs(pjy - piy);
  dy = piy - pjy;
	let a = (180 * Math.atan2(dx,dy))/Math.PI;
	return (a > (45-howNear)) && (a < (45+howNear));
}
	
rs.numCalls = 0;
rs.pairFilter = function (i,j) {
	//let {maxConnectorLength:mxCln,minConnectorLength:mnCln=0,cPoints,numDropped,width,randomGridsForShapes} = this;
	let {maxConnectorLength:mxCln,minConnectorLength:mnCln=0,cPoints,numDropped,width} = this;
	
  let pi = cPoints[i];
  let pj = cPoints[j];
  let cell = this.cellOf(pi);
	//debugger;
	//let rvs =  this.randomValuesAtCell(randomGridsForShapes,cell.x,cell.y);
	let rvs = this.rvsAtCell(cell);
   let cln = rvs.connectorLn;
  //console.log('celli',celli);
	let d = pi.distance(pj);
	if ((cln < d) && (d < (cln + 100))) {
	//if ((mnCln < d) && (d < mxCln)) {
		return true;// nearDiagonal(pi,pj,40);
	}
}
let fr = 0.6;
rs.yellowZones = [ Rectangle.mk(Point.mk(-0.5*fr*rs.width,-0.5*fr*rs.height),Point.mk(fr*rs.width,fr*rs.height))];

rs.genLine = function (sg) {
	 debugger;
	let {cPoints,yellowZones} = this;
	
  let {index0,index1,end0,end1} = sg;
	let p0 = cPoints[index0];
	let p1 = cPoints[index1];
	let line = this.lineP.instantiate();
	let cell = this.cellOf(p0);

	let rvs = this.rvsAtCell(cell);
	let cln = Math.floor((250/500)*rvs.connectorLn);
	let {r,g,b} = rvs;
	let ri = Math.floor(r);
	let gi = Math.floor(g);
	let bi = Math.floor(b);
	let clr;
	/*if (this.inAzone(yellowZones,p0)) {
	  clr = `rgb(${ri},${ri},0)`;
	  clr = `rgb(${ri},0,0)`;
		clr = 'rgb(150,50,50)';
	} else {
    clr = `rgb(${ri},${ri},${ri})`;
  }
	clr = `rgb(${cln},${cln},${cln})`;*/
    clr = `rgb(${ri},${ri},${ri})`;

	line.stroke = clr;
  line.setEnds(end0,end1);

  return line;
}


rs.initialize = function () {
		let {maxConnectorLength:mxCln,minConnectorLength:mnCln=0,width,height} = this;

  core.root.backgroundColor = 'black';
	this.setupShapeRandomizer('connectorLn',{step:80,stept:0.5,min:50,max:500});
	this.setupShapeRandomizer('r',{step:40,min:100,max:255});
	this.setupShapeRandomizer('g',{step:40,min:100,max:255});
	this.setupShapeRandomizer('b',{step:40,min:100,max:255});
	let fr = 0.6;
  let exz = Rectangle.mk(Point.mk(-0.5*fr*width,-0.5*fr*height),Point.mk(fr*width,fr*height));
	//this.exclusionZones = [exz];
 // this.zone = geom.Circle.mk(Point.mk(0,0),0.5*this.width);
	this.initializeDrop();
	debugger;
	let pnts = this.pointsFromCircleDrops();
	let p = pnts[0];
	p.onFringe = 1
	//this.camera = geom.Camera.mk(focalPoint,focalLength,cameraScaling,'z');
  this.initWeb(pnts);
	this.addWeb();
	this.addSegs();
	//this.loopFringeAddition(100);
  //let pnts3d = this.pointsTo3dAndBack(pnts);
	//this.addWeb(pnts);
}

return rs;

});

