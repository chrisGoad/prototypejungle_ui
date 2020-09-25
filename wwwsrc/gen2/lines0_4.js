
core.require('/line/line.js','/gen0/lines0.js',//'/random/addIntersectingLines4.js',
function (linePP,addMethods) {
debugger;
let rs = svg.Element.mk('<g/>');

addMethods(rs);
/*adjustable parameters  */
rs.saveImage = true;

rs.setName('lines0_4');
rs.width = 400;
rs.dimension = 100;
rs.height = 100;
rs.numLines=100;
//rs.numLines=5;
rs.angleMin = -90;
rs.angleMax = 90;
rs.startFr = 0.1;
rs.numTimeSteps = 600;
let c0 = geom.Circle.mk(Point.mk(0,0),100);
let c1 = geom.Circle.mk(Point.mk(0,0),100);
c0.onCircle = 1;
c1.onCircle = 1;

//rs.shapePairs = [[c0,c1]]
 


rs.initProtos = function () {
  core.assignPrototypes(this,'lineP',linePP);
  this.lineP.stroke = 'black';
  this.lineP.stroke = 'white';
  this.lineP['stroke-width'] = .075; 	
}  

rs.assignDeltas  = function (isc) {
	let {segments} = this;
	segments.forEach((seg) => {
		let {end0,end1} = seg;
		//let d = (Math.random() > 0.5)?isc:-isc;
		let d = isc* (Math.random() -0.5);
		end0.delta = 0.001+d;
		//d = sc* Math.random();
		end1.delta = -d-0.001;;
	});
}

rs.initialize = function () {
	core.root.backgroundColor = 'black';
  this.initProtos();
	let hwd = 0.5 * this.width;
  this.initializeLines();
	this.assignDeltas(0.0005);
	//this.theRect = rect;
	//this.addBox(this.lineP,10,0.5,'green');
	//this.numLines = (1-fr) * numLines;
  //this.initializeLines(rect1);
}	

rs.updateLines = function () {
	this.set('lines',core.ArrayNode.mk());
	this.resetSegments();
	this.addLines();
}


rs.updateLines = function () {

	this.set('lines',core.ArrayNode.mk());
	this.moveSegments();
	this.resetSegments();
	this.addLines();
}

	
rs.step = function ()   {
	//debugger;
	//this.stepShapeRandomizer('shade');
	
  this.updateLines();
  //this.updateCircles();
	//draw.saveFrame(rs.timeStep);
}
rs.animate = function (resume)  {
	this.animateIt(this.numTimeSteps,10,resume);
	
}
return rs;
return rs;
});
      

