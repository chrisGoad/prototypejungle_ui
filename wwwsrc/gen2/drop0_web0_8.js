
core.require('/gen1/web0.js','/mlib/webTree.js',function (addWebMethods,addWebTreeMethods) {

let rs = svg.Element.mk('<g/>');
addWebMethods(rs);
addWebTreeMethods(rs);
rs.setName('drop0_web0_8');
let ht= 4000;
ht = 4000;
let nrc = 20;
let topParams = {onSphere:1,width:1.5*ht,height:ht,maxDrops:6000,maxTries:100,lineLength:2,backgroundColor:'rgb(2,2,2)',backgroundPadding:0.1*ht,minSeparation:20,minConnectorLength:10,maxConnectorLength:0.1*ht,shortenBy:0,sphereCenter:Point3d.mk(0,0,-0.3*ht),sphereDiameter:0.5*ht,focalPoint:Point3d.mk(0,0,ht),focalLength:10,cameraScaling:1000};
topParams = {maxFringeTries:10,numRows:nrc,numCols:nrc,width:1.5*ht,height:ht,maxDrops:10000,maxTries:100,lineLength:2,backgroundColor:'rgb(2,2,2)',backgroundPadding:0.1*ht,minSeparation:20,minConnectorLength:0,maxConnectorLength:200,shortenBy:10,numPairs:2,fringeColor:'red',treeColorss:['red','green','yellow']}

rs.maxDrops = 4000;
Object.assign(rs,topParams);


rs.finishProtos = function () {
	this.lineP.stroke = 'white';
	this.lineP['stroke-width'] = .1;
	this.lineP['stroke-width'] = 6;
}  

rs.choosePairs = rs.choosePairsMinDivergence;
/*
function (i) {
	let {cPoints,nearbyPoints} = this;
//	debugger;
	this.cprc++;
	if (this.cprc > 100) {
	}
	let nears = this.nearbyPoints[i];
	let rnears = this.realNears(nears)
	let nl = rnears.length;
	let pi = cPoints[i];
	let devs = [];
	let idir = pi.direction;
	let ni;
	let bias =0.0 * Math.PI;
	if ( idir) {
		for (let nic=0;nic < nl;nic++) {
			let j = rnears[nic];
			let pj = cPoints[j];
			let jdir = this.direction(pj.difference(pi));
			//console.log('i',i,'j',j,'idir',idir,'jdir',jdir);
			let dev = Math.abs(bias -  (jdir-idir));
			devs.push([dev,this.rnearsIndex2NearsIndexViaIndexOf(nears,rnears,nic)]);

		}
		//debugger;
		devs.sort((a,b) => a[0] - b[0]);
		let ln = Math.min(2,devs.length);
		let rs = [];
		for (let di =0 ;di < ln;di++) {
			rs.push([i,devs[di][1]]);
		}
		rs.sort((a,b) => a[1] - b[1]);
		return rs;
		return [[i,devs[0][1]],[i,devs[1][1]]];
	}
	ni = Math.floor (nl* Math.random());
	return [[i,ni]];
}


rs.genLine = function (sg,iext=0) {
	
	let {cPoints} = this;
	
  let {index0,index1,end0,end1} = sg;
	let p0 = cPoints[index0];
	let p1 = cPoints[index1];
	let line = this.lineP.instantiate();
	let  ext;
  if (p0.onFringe || p1.onFringe) {
	//	return;
		line.stroke = 'rgb(0,200,200)';
		ext = -30;
	} else {
		ext = 0;
	}
  if (ext) {
    let vec = end1.difference(end0);
    let nvec = vec.normalize();
    end1 = end1.plus(nvec.times(ext));
  }
  line.setEnds(end0,end1);

  return line;
}
*/
rs.initialize = function () {
		let {maxConnectorLength:mxCln,minConnectorLength:mnCln=0,width} = this;

  core.root.backgroundColor = 'black';
	this.setupShapeRandomizer('connectorLn',{step:80,stept:0.5,min:50,max:500});

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
	this.loopFringeAddition(3);
  //let pnts3d = this.pointsTo3dAndBack(pnts);
	//this.addWeb(pnts);
}

return rs;

});

