
//core.require('/line/line.js','/grid/addLongLineGrid.js',function (linePP,addMethods) {
core.require('/line/line.js','/gen1/broken1.js','/gen1/backToSame.js',function (linePP,addMethods,addBackToSameMethods) {
debugger;
let rs = svg.Element.mk('<g/>');

addMethods(rs);
addBackToSameMethods(rs)
rs.numTimeSteps = 200;
rs.width = 190;
rs.height = 80;
rs.numRows = 40;
rs.numCols = 10;
rs.numRotations = 4;
//rs.angleInc = 0.1;
rs.rotConst = 0.0003;
rs.rotConst = 0.005;

/*adjustable parameters  */
rs.setName('broken1_4');
rs.whiteOnBlack = 1;

rs.initializeProto = function () {
  core.assignPrototypes(this,'lineP',linePP);
  this.lineP.stroke = this.whiteOnBlack?'white':'black';
 // this.lineP.stroke = 'rgba(250,250,250,0.3)';
 this.lineP.stroke = 'green';
 // this.lineP.stroke = 'cyan';
  //this.lineP.stroke = 'black';
 // this.lineP.stroke = 'rgb(200,20,20)';
//this.lineP['stroke-width'] = this.whiteOnBlack?.5:3;;// .4;  
 // this.lineP['stroke-width'] = .4;;// .4;  
 // this.lineP['stroke-width'] = .6;;// .4;  
  this.lineP['stroke-width'] = 1;;;// .4;  
}  

rs.initialize = function () {
	let {width,height,numRows,numCols} = this;
	let hwd = width/2;
	let hht = height/2;
	let deltaY = height/numRows;
  core.root.backgroundColor = this.whiteOnBlack?'black':'white';
 // core.root.backgroundColor ='black';
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
	  //this.mkRandomlySegmentedLine(seg,1,20);
	  //this.mkRandomlySegmentedLine(seg,5,20);
	  this.mkRandomlySegmentedLine(seg,30,40);
	}
	
		this.setupShapeRandomizer('aDelta',{step:0.2*Math.PI,stept:0.1,min:0*Math.PI,max:0.5*Math.PI});
		this.setupShapeRandomizer('initialPhase',{step:0.2*Math.PI,stept:0.1,min:0*Math.PI,max:0.5*Math.PI});
		debugger;
    this.lineForEach( (line) => {
			let cell = line.cell;
			let rvs = this.randomValuesAtCell(this.randomGridsForShapes,cell.x,cell.y);
			this.setupShape(line,rvs);
			line.initialPhase = rvs.initialPhase;
			line.angle = 0.05

			return;
			let deltaA = rvs.deltaA;
			
			console.log('deltaA ',deltaA);
			line.deltaA =deltaA;
			line.angle = 0.05
		});
		this.updateLines();
	//this.setLengths(segLine,0.5);

}	


rs.updateTheShape = function (line,angle) {
//	let dfr =Math.max( 0.5*( Math.cos(angle+(line.initialPhase)) + 1),0.0 );
	//let dfr =Math.max( 0.8 * 0.5*( Math.cos(angle+(line.initialPhase)) + 1),0.0 );
	let c =0.0;
	let dfr = c + (1 -c) * 0.5*( Math.cos(angle+(line.initialPhase)) + 1);
	this.setLength(line,dfr);
}
 
rs.updateLines = function () {
	let {numTimeSteps,timeStep,segmentedLines} = this;
	let fr = timeStep/numTimeSteps;
	let sfr = fr*fr;
	debugger;
	this.lineForEach( (line) => {
		this.shapeUpdater(line);
		return;
		line.angle = line.aDelta + line.angle;
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
rs.animate = function (resume)  {
	this.animateIt(this.numTimeSteps,50,resume);
	
}
return rs;
});
      

