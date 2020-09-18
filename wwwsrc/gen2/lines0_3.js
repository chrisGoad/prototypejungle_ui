
core.require('/line/line.js','/gen0/lines0.js',//'/random/addIntersectingLines4.js',
function (linePP,addMethods) {
debugger;
let rs = svg.Element.mk('<g/>');

addMethods(rs);
/*adjustable parameters  */
rs.saveImage = true;
rs.setName('lines0_3');
rs.width = 400;
rs.height = 100;
rs.numLines=1000;
//rs.numLines=5;
rs.angleMin = -90;
rs.angleMax = 90;
rs.startFr = 0.1;
rs.numTimeSteps = 200;



rs.initProtos = function () {
  core.assignPrototypes(this,'lineP',linePP);
  this.lineP.stroke = 'black';
  this.lineP['stroke-width'] = .075; 	
}  


rs.initialize = function () {
  this.initProtos();
	let hwd = 0.5 * this.width;
	let hht = 0.5 * this.height;
	let fr = this.startFr;
	fr = 1;
  let corner = Point.mk(-hwd,-hht);
	let extent  = Point.mk(fr*this.width,this.height);
  let rect = geom.Rectangle.mk(corner,extent.copy());
  this.initializeLines(rect);
	this.theRect = rect;
	this.addBox(this.lineP,10,0.5,'green');
	//this.numLines = (1-fr) * numLines;
  //this.initializeLines(rect1);
}	

rs.updateLines = function () {
	let {timeStep,numTimeSteps,startFr} = this;
	let fr = timeStep/numTimeSteps;
	let hwd = 0.5 * this.width;
	let hht = 0.5 * this.height;	
  let corner = Point.mk(-hwd,-hht);
	let extent  = Point.mk(fr*this.width,this.height);
  let rect = geom.Rectangle.mk(corner,extent.copy());

	this.set('lines',core.ArrayNode.mk());
	this.resetSegments(rect);
	this.addLines();
}


rs.updateLines = function () {
	let {theRect} = this;

	this.set('lines',core.ArrayNode.mk());
	this.moveSegmentsBy(theRect,0.01);
	this.resetSegments(theRect);
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
      

