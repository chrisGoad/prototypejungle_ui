
core.require('/gen0/drop0.js','/gen0/basics.js',function (addDropMethods,addBasicMethods) {

let rs = svg.Element.mk('<g/>');
addBasicMethods(rs);
//let left = rs.set('left',svg.Element.mk('<g/>'));
//let right = rs.set('right',svg.Element.mk('<g/>'));
let proto = svg.Element.mk('<g/>');

addDropMethods(proto);
//addDropMethods(left);
//addDropMethods(right);
rs.setName('drop0_0_11');
let wd = 200;
let topParams = {width:wd,height:wd,maxDrops:20000,maxTries:100,lineLength:2,backgroundColor:'rgb(2,2,2)',backgroundPadding:20,minSeparation:10}

Object.assign(proto,topParams);
//Object.assign(right,topParams);
//Object.assign(left,topParams);


proto.finishProtos = function () {
	this.lineP.stroke = 'white';
	this.lineP.stroke = 'yellow';
	this.lineP['stroke-width'] = .1;
	this.lineP['stroke-width'] = .3;
}  

//right.finishProtos = finishProtos;
//left.finishProtos = finishProtos;

proto.initialSegments = function () {
  let {width,height} = this; 
  let segs = this.rectangleSegments(width,height);
  let lines = segs.map((sg) => this.genLine(sg));  
  return [segs,lines];
}

proto.segParams = function () {
  let r = Math.random();
  let np = 4;
  let angle = Math.floor(r*np)* (Math.PI/np)
  let length = 2 + Math.floor(r*np)*4;
  return {angle,length};
}
let segsGenerated = [];
let esegsGenerated = [];
let numGenerated = 0;
let numRecalled = 0;
let numToGenerate  = 5000;

proto.genSegments = function (p) {
  let {minSeparation:sep,isLeft} = this;
	if ((!isLeft) && (numRecalled<numToGenerate)&&(p.x <0)) {
		numRecalled++;
		//let sgl = seglinesGenerated;
		let nmr = numRecalled;
		debugger;
		console.log('numRecalled',numRecalled);
		let seg = segsGenerated[numRecalled-1];
		let eseg = esegsGenerated[numRecalled-1];
		let cnd = Math.random()<1.8;
		let nln = this.genLine(cnd?seg:eseg);
		if (cnd) {
	//		nln.stroke = 'cyan';
		}
		return [[eseg],[nln]];
	}
	if (!isLeft) {
	//	return null;
	}
	let len,angle;
	if (this.segParams) {
		let segP = this.segParams();
		if (segP.length) {
			len = segP.length;
		}
		if (segP.angle !== undefined) { 
			angle = segP.angle;
		}
	}
  //let p = this.genRandomPoint();
	let seg = this.genSegment(p,len,angle);
	let ln = this.genLine(seg);
	let eseg = this.genSegment(p,len+sep,angle);
 // debugger;
	let rrs = [[eseg],[ln]];
	if (isLeft && (numGenerated < numToGenerate)) {
		segsGenerated.push(seg);
		esegsGenerated.push(eseg);
		numGenerated++;
	}
	return rrs;
}
 

proto.initialize = function () {
  core.root.backgroundColor = 'black';
	this.initializeDrop();
}

 let left = rs.set('left',proto.instantiate());
 left.isLeft = 1;
 rs.set('right',proto.instantiate());

rs.initialize = function () {
	this.left.initialize();
	//let sl = seglinesGenerated;
	debugger;
	this.right.initialize();
	let mv = 0.6*wd;
	this.right.moveto(Point.mk(mv,0));
	this.left.moveto(Point.mk(-mv,0));
}

return rs;

});

