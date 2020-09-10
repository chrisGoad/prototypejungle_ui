
//core.require('/line/line.js','/grid/addLongLineGrid.js',function (linePP,addMethods) {
core.require('/line/line.js','/gen1/broken1.js',function (linePP,addMethods) {
debugger;
let rs = svg.Element.mk('<g/>');

addMethods(rs);
rs.numTimeSteps = 200;
rs.width = 200;
rs.height = 100;
rs.numRows = 40;
rs.numCols = 10;


/*adjustable parameters  */
//rs.setName('broken0_1');


rs.initializeProto = function () {
  core.assignPrototypes(this,'lineP',linePP);
  this.lineP.stroke = 'white';
  this.lineP.stroke = 'black';
 // this.lineP.stroke = 'rgb(200,20,20)';
  this.lineP['stroke-width'] = 2;;// .4;  
}  

rs.initialize = function () {
	let {width,height,numRows,numCols} = this;
	let hwd = width/2;
	let hht = height/2;
	let deltaY = height/numRows;
  core.root.backgroundColor ='white';
  //core.root.backgroundColor ='white';
  this.initializeProto();
	this.set('segmentedLines',core.ArrayNode.mk());
	let hnumLines = 5;
	//for (let i=-hnumLines;i<hnumLines;i++) {
	for (let i=0;i<numRows;i++) {
		let y = i*deltaY - hht;
		let end0 = Point.mk(-hwd,y);
		let end1 = Point.mk(hwd,y);

	  let seg = geom.LineSegment.mk(end0,end1);
	  this.mkRandomlySegmentedLine(seg,1,20);
	}
	
		this.setupShapeRandomizer('deltaA',{step:0.1,stept:0.1,min:0,max:0.5});
		debugger;
    this.lineForEach( (line) => {
			let cell = line.cell;
			let rvs = this.randomValuesAtCell(this.randomGridsForShapes,cell.x,cell.y);
			this.setupShape(line,rvs);
			return;
			let deltaA = rvs.deltaA;
			
			console.log('deltaA ',deltaA);
			line.deltaA =deltaA;
			line.angle = 0.05
		});
	//this.setLengths(segLine,0.5);

}	

 
rs.updateLines = function () {
	let {numTimeSteps,timeStep,segmentedLines} = this;
	let fr = timeStep/numTimeSteps;
	let sfr = fr*fr;
	debugger;
	this.lineForEach( (line) => {
		line.angle = line.deltaA + line.angle;
		let dfr = Math.cos(line.angle) + 1;
		this.setLength(line,dfr);
	});
	return;
	segmentedLines.forEach( (segLine) => {
	  this.setLengths(segLine,sfr/2);
	})
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
      

