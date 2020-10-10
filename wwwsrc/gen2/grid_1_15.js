
core.require('/gen1/grid_1.js',
function (constructor) {
  debugger;	//this.initProtos();
  //core.vars.whereToSave = 'images/grid_1_1.jpg';
  let rs = constructor();
	rs.saveImage = true;
	rs.setName('grid_1_15');
	rs.initProtos();
	//rs.path = 'json/grid_1_1.json';
  rs.loadFromPath = 0;
	rs.saveJson = 0;
	//rs.randomCellExclude = 2;
	rs.numRows = 20;
	rs.numCols = 20;
	rs.cNumRows = rs.numRows;
	rs.cNumCols = rs.numCols;
	rs.width = 300;
	rs.height = 300;
	rs.pointJiggle = 0;
	rs.preSteps = 20;
	rs.postSteps = 30;
	rs.mainRange = 80;
	rs.mainRange = 40;
	//rs.numTimeSteps = rs.preSteps+ 5*rs.mainRange;
	rs.speedFactor = 0.05;
	rs.speedFactor = 0.15;
	rs.lineLength = 0.75;
	
	
	/*
rs.defaultPositionFunction = function (i,j) {
  let {deltaX,deltaY,numRows,numCols,width,height} = this;
  let botx = 0.5*deltaX + -0.5 * width;
  let boty = 0.5*deltaY +  -0.5 * height;
  return Point.mk(botx + deltaX*i,boty + deltaY*j);
  
}*/
rs.directionOfPatterns = {ul:'downLeft',lr:'downLeft',ll:'downRight',ur:'downRight'};

rs.moveCell = function (x,y,pos) {
	//let {numRows,shapes,lineLength} = this;
	//let idx = x*numRows + y;
	//let line0 = shapes[idx];
	let line0 = this.shapeAt(x,y);
	line0.moveto(pos);
}

rs.falling0 = function (inner) {
//	debugger;
	let {cNumRows,cNumCols,speedFactor:sp} = this;
	let innerSq = inner*inner;
	let lastRow = cNumRows - 1;
	let ntlRow = cNumRows - 2;
	for (let i=0;i<cNumCols;i++) {
		let pos = this.posFunction(i,lastRow);
    let delta = sp*innerSq;
		let npos = Point.mk(pos.x,pos.y+delta);
	  this.moveCell(i,lastRow,npos);
	}
	for (let i=1;i<cNumCols;i++) {
		let pos = this.posFunction(i,ntlRow);
    let delta = sp*innerSq;
		let npos = Point.mk(pos.x,pos.y+delta);
	  this.moveCell(i,ntlRow,npos);
	}
	this.draw();
}

rs.filling = function (inner) {
//	debugger;
	let {cNumRows,cNumCols,width,speedFactor:sp} = this;
	let innerSq = inner*inner;
	let lastCol = cNumCols - 1;
	let turn = this.posFunction(lastCol,cNumRows-2);
	let mhwd = -0.5*width;
	for (let j=0;j<cNumRows-2;j++) {
		let pos = this.posFunction(lastCol,j);
    let delta = sp*innerSq;
		let npos = Point.mk(pos.x,pos.y+delta);
		if (npos.y >= turn.y) {
      let xdelta = npos.y	- turn.y;
			let dst = this.posFunction(cNumCols-2-j,cNumRows - 2);
			let x = Math.max(dst.x,npos.x - xdelta);
      npos = Point.mk(x,turn.y);
		}			
	  this.moveCell(lastCol,j,npos);
	}
	this.draw();
}

rs.resetPos = function () {
	let {cNumRows,cNumCols} = this;

	for (let i=0;i<cNumCols;i++) {
	  for (let j=0;j<cNumRows;j++) {
			let line0 = this.shapeAt(i,j);
			let pos = this.posFunction(i,j);
			line0.moveto(pos);
			//line0.stroke = 'red';
		}
	}
	this.draw();
}

rs.hideOuterSegs = function () {
  let {numRows,numCols,cNumRows,cNumCols} = this;
	for (let i=0;i<cNumCols;i++) {
		let line0 = this.shapeAt(i,cNumCols-1);
		line0.hide();
	}
	for (let i=0;i<cNumRows;i++) {
		let line0 = this.shapeAt(cNumRows-1,i);
		line0.hide();// = 'yellow';
	}
}

 // for (let j=0;j<cNumRows;j++) {
		
	
	rs.addTheBox = function () {
		this.addBox('white',50,1);
		this.show();
		draw.fitTheContents();
	}
	

rs.initialize = function () {
	core.root.backgroundColor = 'red';
	core.root.backgroundColor = 'black';
	this.innerInitialize();
	this.addTheBox();
}

	
rs.computeDir = function (x,y) {
	let {numRows,numCols} = this;
	let third = Math.floor(numRows/3);
	if ((x === third) || (x === 2*third)) {
		if (y%2 === 0) {
		  return 0;
		} else {
			return 0.5*Math.PI;
		}
	} else {
	  return 2*Math.PI * Math.random();
	}
}

		
		
	rs.patternOp = function (line) {
	//	debugger;
		//line.stroke = 'black';
  };

rs.setTimeRanges = function () {
	let rng = this.mainRange;
	this.computeRanges([this.preSteps,rng,2*rng,rng,rng,2*rng,this.postSteps]);
}

rs.setTimeRanges();


	
rs.step = function ()   {
	//debugger;
	let {timeStep,numTimeSteps,timeRanges,mainRange,speedFactor:sp} = this;
  let range = this.whatTimeRange();
	let start = timeRanges[range];
	let inner = timeStep - start;
	
	if (range === 0) {
		return;
	}
	if (range === 1 ) {
		this.falling0(inner);
	}
	if (range === 2 ) {
		this.filling(inner);
	}
	if ((range === 3) && (this.numRows === this.cNumRows) ) {
		this.hideOuterSegs();
		this.cNumRows--;
		this.cNumCols--;
		this.resetPos();
	}
	if (range === 4 ) {
		this.falling0(inner);
	}
	if (range === 5 ) {
		this.filling(inner);
	}
}

rs.animate = function (resume)  {
	this.animateIt(this.numTimeSteps,50,resume);
	
}
  return rs;
});

