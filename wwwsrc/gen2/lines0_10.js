
core.require('/line/line.js','/shape/circle.js','/gen0/lines0.js','/gen0/basics.js',//'/random/addIntersectingLines4.js',
function (linePP,circlePP,addMethods,addSetName) {
debugger;
let rs = svg.Element.mk('<g/>');
//addSetName(rs);
addMethods(rs);
rs.setName('lines0_8');

/*adjustable parameters  */
let rdim = 100;
//let sideParams = {width:rdim,height:rdim,numLines:300,angleMin:-90,angleMax:90,segmentsOnly:1}
//let topParams = {width:rdim,height:rdim,numLines:100,angleMin:-90,angleMax:90,saveImage:1,focalPoint:Point3d.mk(0,0,500),focalLength:10,cameraScaling:10};
let topParams = {width:rdim,height:rdim,numLines:60,angleMin:-90,angleMax:90,saveImage:1,numTimeSteps:1000,backgroundColorr:'red',showLines:0};
Object.assign(rs,topParams);
/*rs.saveImage = true;
rs.width = 400;
rs.height = 200;
rs.numLines=3000;
//rs.numLines=5;
rs.angleMin = -90;
rs.angleMax = 90;*/
//let side0 =  rs.set('side0',svg.Element.mk('<g/>'));
//let side1=  rs.set('side1',svg.Element.mk('<g/>'));


rs.initProtos = function () {
  core.assignPrototypes(this,'lineP',linePP);
  this.lineP.stroke = 'white';
  this.lineP['stroke-width'] = .1; 	
	core.assignPrototypes(this,'circleP',circlePP);
  this.circleP.dimension = 10;
  this.circleP.fill = 'rgba(255,0,0,0.2)';
  this.circleP.stroke = 'white';
  this.circleP['stroke-width'] = 0; 	
}  

//side0.initProtos = initProtos;


rs.bndsFilter = function (ints) {
	let {width,height} = this;
	let hw = width/2;
	let hh = height/2;
	let rs = ints.filter((p) => {
		let {x,y} = p;
		return (x>-hw) && (x<hw) && (y>-hh) && (y < hh);
	});
	return rs;
}
rs.initialize = function () {
	debugger;
  this.initProtos();
 // core.root.backgroundColor = 'black';
 
	let segs = this.initializeLines(null,1);
	let ints = this.bndsFilter(this.allIntersections(segs));
	this.segments = segs;
	if (this.showLines) {
		this.addLines();
	}
	let marks = this.set('marks',core.ArrayNode.mk());
	ints.forEach( (p) => {
		let crc = this.circleP.instantiate();
		marks.push(crc);
		crc.moveto(p);
		crc.show();
		crc.update();
	});

	

}	


rs.moveLines = function (delta) {
	let {segments:segs,marks} = this;
	debugger;
	this.moveSegments(delta);
	//this.resetSegments(delta);
	//let segs = this.segments;
	let ints =  this.bndsFilter(this.allIntersections(segs));
	let lnints = ints.length;
	let mrkln = marks.length;
	if (lnints > mrkln) {
		for (let i=mrkln;i<lnints;i++) {
			let crc = this.circleP.instantiate();
			marks.push(crc);
			crc.show();
		}
	} else if (lnints < mrkln) {
		for (let i=lnints;i<mrkln;i++) {
			let crc = marks[i];
			crc.hide();
		}
	}
	for (let i=0;i<lnints;i++) {
		let crc = marks[i];
		crc.show();
		crc.moveto(ints[i]);
		crc.update();
	}
	if (this.showLines) {
    this.addLines(1);
	}

}


rs.step = function ()   {
	this.moveLines(0.005);
}
	

rs.animate = function (resume)  {
	this.animateIt(this.numTimeSteps,10,resume);
}
	


//side0.initialize = initialize;
/*
const initSide = function (side) {
	addMethods(side);
  Object.assign(side,sideParams);
	side.initProtos = initProtos;
	side.initialize= initialize;
}

initSide(side0);
initSide(side1);

rs.initialize = function () {
	debugger;
	side0.initialize(Affine3d.mkRotation('y',0.25*Math.PI));
side1.initialize(Affine3d.mkTranslation(Point3d.mk(100,0,0)).times(Affine3d.mkRotation	('y',0.25*Math.PI)));
}
*/
return rs;
});
      

