
core.require('/line/line.js','/shape/circle.js','/gen0/lines0.js',//'/random/addIntersectingLines4.js',
function (linePP,circlePP,addMethods) {
debugger;
let rs = svg.Element.mk('<g/>');

addMethods(rs);
/*adjustable parameters  */
rs.saveImage = true;
rs.setName('lines0_5');
rs.dimension = 100;
rs.width = 100;
rs.height = 100;
rs.numLines=100;
rs.numCols = 36;
rs.numRows = 36;
//rs.numLines=5;
rs.angleMin = -90;
rs.angleMax = 90;
rs.startFr = 0.1;
rs.numTimeSteps = 1200;
let c0 = geom.Circle.mk(Point.mk(0,0),100);
let c1 = geom.Circle.mk(Point.mk(0,0),100);
c0.onCircle = 1;
c1.onCircle = 1;
rs.delta = 0.002;
//rs.delta = 0.005;
rs.numTimeSteps = 1/rs.delta;
rs.numTimeSteps = 0.5/rs.delta;
//rs.shapePairs = [[c0,c1]]
 


rs.initProtos = function () {
  core.assignPrototypes(this,'lineP',linePP);
  this.lineP.stroke = 'black';
//  this.lineP.stroke = 'white';
  this.lineP['stroke-width'] = 2.5;//.075; 	
  this.lineP['stroke-width'] = 2;//.075; 	
 //this.lineP['stroke-width'] = 2.1;//.175; 	
  core.assignPrototypes(this,'circleP',circlePP);
  this.circleP.fill = 'yellow';
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

rs.paintLines = function () {
	let {lines} = this;
	let ln = lines.length;
	for (let i=0;i<ln;i++) {
		let line = lines[i];
		line.stroke = (i%2 === 0)?'red':'blue';
	}
}
rs.initialize = function () {
	core.root.backgroundColor = 'black';
  this.initProtos();
	let hwd = 0.5 * this.width;
	let circle = this.circleP.instantiate();
	circle.dimension = 100;
	this.set('circle',circle);
	circle.show();
  this.initializeGrid();
	
  //this.paintLines();
	//this.assignDeltas(0.0005,0.03);
	//this.assignDeltas(0.001,0.005);
	//this.assignDeltas(0.003,0);
	//this.assignDeltas(0.003,0.002);
	//this.assignDeltas(0.0002,0.002);
	//this.assignDeltas(0.000002,0.002);
//	this.assignDeltas(0,0.002);
	this.assignDeltas(0,this.delta);
//	this.addBox(this.lineP,4,0.1,'white');

	//this.theRect = rect;
	//this.addBox(this.lineP,10,0.5,'green');
	//this.numLines = (1-fr) * numLines;
  //this.initializeLines(rect1);
}	

rs.updateLines = function () {

	this.set('lines',core.ArrayNode.mk());
	this.moveSegments();
	this.resetSegments();
	this.addLines();
	//this.paintLines();
}

	
rs.step = function ()   {
	//debugger;
	//this.stepShapeRandomizer('shade');
	
  this.updateLines();
  //this.updateCircles();
	//draw.saveFrame(rs.timeStep);
}
rs.animate = function (resume)  {
	this.animateIt(this.numTimeSteps,20,resume);
	
}
return rs;
});
      

