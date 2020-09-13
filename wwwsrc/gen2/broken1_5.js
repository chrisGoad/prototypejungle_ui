
//core.require('/line/line.js','/grid/addLongLineGrid.js',function (linePP,addMethods) {
core.require('/line/line.js','/shape/circle.js','/gen1/broken1.js','/gen1/backToSame.js',function (linePP,circlePP,addMethods,addBackToSameMethods) {
debugger;
let rs = svg.Element.mk('<g/>');

addMethods(rs);
addBackToSameMethods(rs)
rs.numTimeSteps = 200;
rs.width = 190;
rs.height = 190;
rs.numRows = 80;
rs.numRows = 40;
rs.numCols = 80;
rs.numCols = 40;
rs.numRotations = 4;
//rs.angleInc = 0.1;
rs.rotConst = 0.0003;
rs.rotConst = 0.005;

/*adjustable parameters  */
rs.setName('broken1_5');
rs.whiteOnBlack = 1;

rs.initializeProto = function () {
  core.assignPrototypes(this,'lineP',linePP);
  this.lineP.stroke = this.whiteOnBlack?'white':'black';
 // this.lineP.stroke = 'rgba(250,250,250,0.3)';
 // this.lineP.stroke = 'green';
 // this.lineP.stroke = 'cyan';
  //this.lineP.stroke = 'black';
 // this.lineP.stroke = 'rgb(200,20,20)';
this.lineP['stroke-width'] = this.whiteOnBlack?.5:3;;// .4;  
this.lineP['stroke-width'] = this.whiteOnBlack?0.25:3;;// .4;  
 // this.lineP['stroke-width'] = .4;;// .4;  
 // this.lineP['stroke-width'] = .6;;// .4;  
  //this.lineP['stroke-width'] = .5;;;// .4;  
	core.assignPrototypes(this,'circleP',circlePP);
	this.circleP.fill = 'red';
	
}  

rs.initialize = function () {
	let {width,height,numRows,numCols} = this;
	let hwd = width/2;
	let hht = height/2;
	let deltaX = width/numCols;
	let deltaY = height/numRows;
  core.root.backgroundColor = this.whiteOnBlack?'black':'white';
 // core.root.backgroundColor ='black';
  //core.root.backgroundColor ='white';
  this.initializeProto();
	this.circleP.dimension = 0.5 * deltaX;

	this.set('segmentedLines',core.ArrayNode.mk());
	this.set('circles',core.ArrayNode.mk());
	let hnumLines = 5;
	//for (let i=-hnumLines;i<hnumLines;i++) {
	let hr = numRows/2;
	let hc = numCols/2;
  for (let i=0;i<numRows;i++) {
		let y = i*deltaY - hht;
		let end0 = Point.mk(-hwd,y);
		let end1 = Point.mk(hwd,y);

	  let seg = geom.LineSegment.mk(end0,end1);
	  //this.mkRandomlySegmentedLine(seg,1,20);
	  //this.mkRandomlySegmentedLine(seg,5,20);
		let color = (0 && (Math.abs(i - hr) < numRows/20))?'red':'white';
	 // this.mkRandomlySegmentedLine(seg,30,40,color);
	  this.mkRandomlySegmentedLine(seg,30,40,color);
	}
	for (let j=0;j<numCols;j++) {
		let x = j*deltaX - hwd;
		let end0 = Point.mk(x,-hht);
		let end1 = Point.mk(x,hht);
	  let seg = geom.LineSegment.mk(end0,end1);
	  //this.mkRandomlySegmentedLine(seg,1,20);
	  //this.mkRandomlySegmentedLine(seg,5,20);
			let color = (0 && (Math.abs(j - hc) < numRows/20))?'red':'white';
    //this.mkRandomlySegmentedLine(seg,30,40,color);
    this.mkRandomlySegmentedLine(seg,30,40,color);
	}
		this.setupShapeRandomizer('aDelta',{step:0.2*Math.PI,stept:0.1,min:0*Math.PI,max:0.5*Math.PI});
		this.setupShapeRandomizer('initialPhase',{step:0.2*Math.PI,stept:0.1,min:0*Math.PI,max:0.5*Math.PI});
	/*for (let i=0;i<numRows;i++) {
		let y = (0.5 + i)*deltaY - hht;
	  for (let j=0;j<numCols;j++) {
			let x = (0.5 + j)*deltaX - hwd;
			 let c = this.circleP.instantiate();
			 this.circles.push(c);
			 c.moveto(Point.mk(x,y));
			 c.show();
			 let cell = this.inCell(c);
			 let rvs = this.randomValuesAtCell(this.randomGridsForShapes,cell.x,cell.y);
       //debugger;
			 this.setupShape(c,rvs);
			 c.initialPhase = rvs.initialPhase;


		}
	}*/
			


	/*for (let j=0;j<numCols;j++) {
		let hc = numCols/2;
		let hr = numRows/2;
		let y = j*deltaY - hht;
		let x = j*deltaX - hwd;
		let end0 = Point.mk(x,-hwd);
		let end1 = Point.mk(-hht,y);
 debugger;
	  let seg = geom.LineSegment.mk(end0,end1);
	  //this.mkRandomlySegmentedLine(seg,1,20);
	  //this.mkRandomlySegmentedLine(seg,5,20);
			let color = (0 && (Math.abs(j - hc) < numRows/20))?'red':'white';
    //this.mkRandomlySegmentedLine(seg,30,40,color);
    this.mkRandomlySegmentedLine(seg,30,31,color);
	}*/
	
	
		debugger;
    this.lineForEach( (line) => {
			let cell = line.cell;
			let rvs = this.randomValuesAtCell(this.randomGridsForShapes,cell.x,cell.y);
			this.setupShape(line,rvs);
			line.initialPhase = rvs.initialPhase;
			line.angle = 0.05
			let {end0,end1} = line;
			let vc = end1.difference(end0);
			line.dir = Math.atan2(vc.y,vc.x);

			return;
			let deltaA = rvs.deltaA;
			
			console.log('deltaA ',deltaA);
			line.deltaA =deltaA;
			line.angle = 0.05
		});
		this.updateLines();
	//this.setLengths(segLine,0.5);

}	



const updateTheShape = function (top,line,angle) {
//	let dfr =Math.max( 0.5*( Math.cos(angle+(line.initialPhase)) + 1),0.0 );
	//let dfr =Math.max( 0.8 * 0.5*( Math.cos(angle+(line.initialPhase)) + 1),0.0 );
	let c =0.0;
	let dfr = c + (1 -c) * 0.5*( Math.cos(angle+(line.initialPhase)) + 1);
	top.setLength(line,dfr);
}

const updateTheCircle = function (top,circle,angle) {
//	let dfr =Math.max( 0.5*( Math.cos(angle+(line.initialPhase)) + 1),0.0 );
	//let dfr =Math.max( 0.8 * 0.5*( Math.cos(angle+(line.initialPhase)) + 1),0.0 );
	debugger;
	let c =0.0;
	let dfr = c + (1 -c) * 0.5*( Math.cos(angle+(circle.initialPhase)) + 1);
	circle.dimension = 1.5 *dfr;
//	top.setLength(line,dfr);
}
 
rs.updateLines = function () {
	let {numTimeSteps,timeStep,segmentedLines} = this;
	let fr = timeStep/numTimeSteps;
	let sfr = fr*fr;
	debugger;
	this.lineForEach( (line) => {
		this.shapeUpdater(line,null,null,null,updateTheShape);
	});
	
}


rs.updateCircles = function () {
	let {numTimeSteps,timeStep,segmentedLines} = this;
	let fr = timeStep/numTimeSteps;
	let sfr = fr*fr;
	debugger;
	this.circles.forEach( (circle) => {
		this.shapeUpdater(circle,null,null,null,updateTheCircle);
	});
	
}


rs.step = function ()   {
	//debugger;
	//this.stepShapeRandomizer('shade');
	
  this.updateLines();
  //this.updateCircles();
	//draw.saveFrame(rs.timeStep);
}
rs.animate = function (resume)  {
	this.animateIt(this.numTimeSteps,50,resume);
	
}
return rs;
});
      

