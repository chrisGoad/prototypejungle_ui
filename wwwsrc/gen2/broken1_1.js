
//core.require('/line/line.js','/grid/addLongLineGrid.js',function (linePP,addMethods) {
core.require('/line/line.js','/gen1/broken1.js',function (linePP,addMethods) {
debugger;
let rs = svg.Element.mk('<g/>');

rs.height = 80;
rs.width = 80;
addMethods(rs);
rs.numTimeSteps = 100;
rs.numSegs = 10;

/*adjustable parameters  */
rs.setName('broken1_1');


rs.initializeProto = function () {
  core.assignPrototypes(this,'lineP',linePP);
  this.lineP.stroke = 'white';
 // this.lineP.stroke = 'rgb(200,20,20)';
  this.lineP['stroke-width'] = .4;  
}  

rs.initialize = function () {
  core.root.backgroundColor ='black';
  //core.root.backgroundColor ='white';
  this.initializeProto();
	this.set('segmentedLines',core.ArrayNode.mk());
	let hnumLines = 1;
	let hwd = 0.5*this.width;
	let numSegs = this.numSegs;
	//for (let i=0;i<2;i++) {
		let end0 = Point.mk(-hwd,0);
		let end1 = Point.mk(hwd,0);
	  let seg = geom.LineSegment.mk(end0,end1);
		this.segment = seg;
	  //this.mkEvenlySegmentedLine(seg,numSegs,i===0?'red':'blue');
	//}*/
	//this.setLengths(segLine,0.5);
	//debugger;
  /*let segLine0 = this.segmentedLines[0];
  let segLine1 = this.segmentedLines[1];
	let hht = 0.5*this.height;
	let xd = 0.5*this.width/numSegs;
	segLine0.moveto(Point.mk(-xd,-hht));
	segLine1.moveto(Point.mk(xd,hht));*/
	this.blueAdds = [];
	this.redAdds = [];
  this.addBox(this.lineP,15);

}	

 
rs.updateLines = function () {
	debugger;
	let {numTimeSteps,timeStep,segmentedLines,height,numSegs} = this;
	let hnts = numTimeSteps/2;
	let fr = 2 * timeStep/numTimeSteps;
	let sfr = fr*fr;
	let hwd = 0.5*height;
	let step = 2  *height/numTimeSteps;
  /*let segLine0 = this.segmentedLines[0];
  let segLine1 = this.segmentedLines[1];	
	//this.setLengths(segLine0,0.5);
	this.setLengths(segLine0,fr);
	this.setLengths(segLine1,fr);*/
		let xd = 0.5*this.width/numSegs;
	if (timeStep < hnts) {
		let segLineR = this.mkEvenlySegmentedLine(this.segment,numSegs,'red');
    this.setLengths(segLineR,fr);
		segLineR.moveto(Point.mk(0,step*timeStep - hwd));
		debugger;
		this.redAdds.push(segLineR);
		let segLineB = this.mkEvenlySegmentedLine(this.segment,numSegs,'blue');
    segLineB.moveto(Point.mk(xd,hwd - step*timeStep));
    this.setLengths(segLineB,fr);
		this.blueAdds.push(segLineB);

	}  else {
		debugger;
		let ts = timeStep - hnts;
		this.redAdds[ts].hide();
		this.redAdds[ts].draw();
		this.blueAdds[ts].hide();
	}
		
		
	//this.setLengths(segLine1,0.5);
	//segLine0.moveto(Point.mk(0,step*timeStep - hwd));
	//segLine1.moveto(Point.mk(xd,hwd - step*timeStep));
}

rs.step = function ()   {
	//debugger;
	//this.stepShapeRandomizer('shade');
	
  this.updateLines();
	//draw.saveFrame(rs.timeStep);
}
rs.animate = function ()  {
	this.animateIt(this.numTimeSteps,50);
	
}
return rs;
});
      

