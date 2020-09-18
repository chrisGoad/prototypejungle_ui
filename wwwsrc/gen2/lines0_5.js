
core.require('/line/line.js','/gen0/lines0.js',//'/random/addIntersectingLines4.js',
function (linePP,addMethods) {
debugger;
let rs = svg.Element.mk('<g/>');

addMethods(rs);
/*adjustable parameters  */
rs.saveImage = true;
rs.setName('lines0_5');
rs.dimension = 100;
rs.width = 400;
rs.height = 100;
rs.numLines=100;
rs.numCols = 80;
rs.numRows = 80;
//rs.numLines=5;
rs.angleMin = -90;
rs.angleMax = 90;
rs.startFr = 0.1;
rs.numTimeSteps = 1200;
let c0 = geom.Circle.mk(Point.mk(0,0),100);
let c1 = geom.Circle.mk(Point.mk(0,0),100);
c0.onCircle = 1;
c1.onCircle = 1;

//rs.shapePairs = [[c0,c1]]
 


rs.initProtos = function () {
  core.assignPrototypes(this,'lineP',linePP);
  this.lineP.stroke = 'black';
  this.lineP.stroke = 'white';
  this.lineP['stroke-width'] = 1;//.075; 	
}  

rs.assignDeltas  = function (scale,constant) {
	debugger;
	let {segments} = this;
	let c = constant?constant:0;
	let ln = segments.length;
	let hln = ln/2;
	for (let i=0;i<ln;i++) {
//	segments.forEach((seg) => {
		let seg = segments[i]
		let {end0,end1} = seg;
		//let d = (Math.random() > 0.5)?isc:-isc;
		//let c = 0.001;
		let d = scale* (Math.random() -0.5);
		if (i <hln) {
		  end0.delta = c + d;
		  end1.delta = c + d;
		} else {
			end0.delta = -(c + d);
		  end1.delta = -(c + d);
		}
	};
}

rs.initialize = function () {
	core.root.backgroundColor = 'black';
  this.initProtos();
	let hwd = 0.5 * this.width;
  this.initializeGrid();
	//this.assignDeltas(0.0005,0.03);
	//this.assignDeltas(0.001,0.005);
	//this.assignDeltas(0.003,0);
	//this.assignDeltas(0.003,0.002);
	this.assignDeltas(0.0002,0.002);
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
      

