
core.require('/gen1/grid_1.js',
function (constructor) {
  debugger;	//this.initProtos();
  //core.vars.whereToSave = 'images/grid_1_1.jpg';
  let rs = constructor();
	rs.saveImage = true;
	rs.setName('grid_1_7','grid_1_7');
	rs.initProtos();
	//rs.path = 'json/grid_1_1.json';
  rs.loadFromPath = 1;
	rs.saveJson = 0;
	//rs.randomCellExclude = 2;
	rs.numRows = 20;
	rs.numCols = 20;
	rs.width = 300;
	rs.height = 300;
	rs.pointJiggle = 0;
	rs.preSteps = 20;
	rs.postSteps = 30;
	rs.mainRange = 80;
	//rs.numTimeSteps = rs.preSteps+ 5*rs.mainRange;
	rs.speedFactor = 0.05;
	rs.lineLength = 0.75;
	
	
	/*
rs.defaultPositionFunction = function (i,j) {
  let {deltaX,deltaY,numRows,numCols,width,height} = this;
  let botx = 0.5*deltaX + -0.5 * width;
  let boty = 0.5*deltaY +  -0.5 * height;
  return Point.mk(botx + deltaX*i,boty + deltaY*j);
  
}*/
rs.directionOfPatterns = {ul:'downLeft',lr:'downLeft',ll:'downRight',ur:'downRight'};

	rs.adjustCell = function (x,y,delta,kind,timeRange) {
		//let {numRows,shapes,lineLength} = this;
		//let idx = x*numRows + y;
		//let line0 = shapes[idx];
		let line0 = this.shapeAt(x,y);
		let pos = this.posFunction(x,y);
		let dop = this.directionOfPatterns[kind];
		let dst =pos.plus(Point.mk(dop==='downRight'?delta:-delta,delta));
		let ln = dst.length();
		let limit = 190;
		if (ln > limit) {
			line0.hide();
		} else {
			line0.show();
		  line0.moveto(dst);
		}
	}
	
rs.adjustCells = function (delta,kind,timeRange) {
//	debugger;
	let {numRows,numCols} = this;
	for (let i=0;i<numCols;i++) {
		for (let j=0;j<numRows;j++) {
			let pat = this.inPattern(i,j);
			if (pat === kind) {
			  this.adjustCell(i,j,delta,pat,timeRange);
			}
		}
	}
	this.draw();
}
	
	rs.addTheBox = function () {
		this.addBox('white',50,1);
		this.show();
		draw.fitTheContents();
	}
	

rs.initialize = function () {
	core.root.backgroundColor = 'red';
	core.root.backgroundColor = 'black';
	this.outerInitialize();
	//this.innerInitialize();
	this.addTheBox();
}

rs.inPattern = function (x,y) {
	let {numRows,numCols} = this;
  let hr = 0.5 * numRows;
	if ((x+y) === hr) {
			return 'ul'; 
	}		
  if ((x+y) === 3*hr) {
			return 'lr';
	}		
  if ((y-x) === hr) {
			return 'll';
	}	
	if ((x-y) === hr) {
		return 'ur';
	}
  return 'none';	
}


	
rs.computeDir = function (x,y) {
	let pat = this.inPattern(x,y);
	if (pat === 'none') {
		return 2*Math.PI * Math.random();
	}
	let dirname = this.directionOfPatterns[pat];
	return [(dirname === 'downLeft'?0.25:0.75)*Math.PI];
}

		
		
	rs.patternOp = function (line) {
	//	debugger;
		//line.stroke = 'black';
  };

rs.setTimeRanges = function () {
	let rng = this.mainRange;
	this.computeRanges([this.preSteps,rng,rng,this.postSteps]);
}

rs.setTimeRanges();


	
rs.step = function ()   {
	//debugger;
	let {timeStep,numTimeSteps,timeRanges,mainRange,speedFactor:sp} = this;
  let range = this.whatTimeRange();
	let start = timeRanges[range];
	let finish = timeRanges[range+1];
	let inner = timeStep - start;
	let innerSq = inner*inner;
	let until = mainRange - inner;
	let untilSq = until*until;
	
	if (range === 0) {
		return;
	}
	if (range === 1 ) {
			  this.adjustCells(sp*innerSq,'ur',range);
	  this.adjustCells(sp*innerSq,'ll',range);

		this.adjustCells(sp*innerSq,'ul',range);
	  this.adjustCells(sp*innerSq,'lr',range);

		return;
	} 
	if (range === 2) {
		debugger;
		this.adjustCells(-sp*untilSq,'ur',range);
		this.adjustCells(-sp*untilSq,'ll',range);
		this.adjustCells(-sp*untilSq,'ul',range);
		this.adjustCells(-sp*untilSq,'lr',range);

		return;
	} 
}

rs.animate = function (resume)  {
	this.animateIt(this.numTimeSteps,50,resume);
	
}
  return rs;
});

