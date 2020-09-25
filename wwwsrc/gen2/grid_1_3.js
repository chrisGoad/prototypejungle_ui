
core.require('/gen1/grid_1.js',
function (constructor) {
  debugger;	//this.initProtos();
  //core.vars.whereToSave = 'images/grid_1_1.jpg';
  let rs = constructor();
	rs.saveImage = true;
	rs.setName('grid_1_3','grid_1_1');
	rs.initProtos();
	//rs.path = 'json/grid_1_1.json';
  rs.loadFromPath = 1;
	//rs.randomCellExclude = 2;
	rs.numRows = 20;
	rs.numCols = 20;
	rs.width = 300;
	rs.height = 300;
	rs.pointJiggle = 0;
	rs.saveJson = 0;
	rs.preSteps = 20;
	rs.postSteps = 30;
	rs.mainRange = 80;
	rs.numTimeSteps = rs.preSteps+ 5*rs.mainRange;
	rs.speedFactor = 0.05;
	rs.lineLength = 0.75;
	
	//rs.ranRowCol = rs.randomCell(2);

	/*rs.randomRow = 10;
	rs.randomColumn = 15;
	rs.randomRow = 10;
	rs.randomRow = 10;
	rs.randomColumn = 7;// return dir or [dir] ; the latter meaning pattern membership
	rs.randomColumn = 14;// return dir or [dir] ; the latter meaning pattern membership
	*/
	rs.ranRowCol = {x:15,y:10};
	// return dir or [dir] ; the latter meaning pattern membership
	rs.inPattern1 = function (x,y) {
	  let {numRows,ranRowCol} = this;
		let {x:randomColumn,y:randomRow} = ranRowCol;
	  return ((x-y) === (randomColumn - randomRow));
	}

  rs.inPattern2 = function (x,y) {
   let {numRows,ranRowCol} = this;
		let {x:randomColumn,y:randomRow} = ranRowCol;
		if ((x === randomColumn) && (y === randomRow)) {
			return false;
		}
	  return ((x+y) === (randomColumn + randomRow));
	}
	//
rs.defaultPositionFunction = function (i,j) {
  let {deltaX,deltaY,numRows,numCols,width,height} = this;
  let botx = 0.5*deltaX + -0.5 * width;
  let boty = 0.5*deltaY +  -0.5 * height;
  return Point.mk(botx + deltaX*i,boty + deltaY*j);
  
}
	rs.adjustCell = function (x,y,delta,kind,timeRange) {
		let {numRows,shapes,lineLength} = this;
		let idx = x*numRows + y;
		let line0 = shapes[idx];
		let pos = this.defaultPositionFunction(x,y);
		//let pos = line0.getTranslation();
		
		let dst =pos.plus(Point.mk(kind===1?delta:-delta,delta));
		let ln = dst.length();
		let limit = 210;
		if (ln > limit) {
			line0.hide();
		} else {
			line0.show();
		  line0.moveto(dst);
			if (0 && (timeRange > 2)) {
				let dir;
				if (timeRange >4) {
			    dir = (kind===1?0.75:0.25)*Math.PI;
			  } else {
					dir = (kind===1?0.25:0.75)*Math.PI;
				}

			  this.setLineEnds(line0,lineLength,dir);
			  line0.update();
			}
		}
		//line0.moveto(Point.mk(10,10));
	//	line0.stroke = 'yellow';
	//	line0.update();
	//	line0.draw();
	}
	
	rs.adjustCells = function (delta,kind,timeRange) {
	//	debugger;
		let {numRows,numCols} = this;
		for (let i=0;i<numCols;i++) {
			for (let j=0;j<numRows;j++) {
				if ((kind===1) && this.inPattern1(i,j)) {
				  this.adjustCell(i,j,delta,kind,timeRange);
			  } else if ((kind===2) && this.inPattern2(i,j)) {
					this.adjustCell(i,j,delta,kind,timeRange);
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
	this.innerInitialize();
	this.addTheBox();
}

  rs.computeDir = function (x,y) {
		debugger;
	  let {numRows,ranRowCol} = this;
		let dir;
		let {x:randomColumn,y:randomRow} = ranRowCol;
		if (inPattern1(x,y)) {
			dir = 0.75* Math.PI;
			return [dir];
		}  
		if  ((x + y) === (randomRow + randomColumn)) {
			dir = 0.25*Math.PI;
			return [dir];
		} 
		return 2*Math.PI * Math.random();
		
}
		
  rs.computeDirr = function (x,y) {
		debugger;
	  let {numRows,ranRowCol} = this;
		let dir;
		let {x:randomColumn,y:randomRow} = ranRowCol;
		if ((x-y) === (randomColumn - randomRow)) {
			dir = 0.75* Math.PI;
			return [dir];
		}  
		if  ((x + y) === (randomRow + randomColumn)) {
			dir = 0.25*Math.PI;
			return [dir];
		} 
		return 2*Math.PI * Math.random();
		
}
	rs.patternOp = function (line) {
	//	debugger;
		//line.stroke = 'black';
  };


rs.setTimeRanges = function () {
  let pre = rs.preSteps;
	let post = rs.postSteps;
	let rng = rs.mainRange;
  this.timeRanges = [0,pre,pre+rng,pre+2*rng,pre+3*rng,pre+4*rng,pre+4*rng+post];
	this.numTimeSteps = pre+4*rng+post;
}

rs.setTimeRanges();


	
rs.step = function ()   {
	//debugger;
	//this.stepShapeRandomizer('shade');
	let {timeStep,numTimeSteps,timeRanges,mainRange,speedFactor:sp} = this;
	const whatTimeRange = function () {
	  let ln = timeRanges.length;
		for (let i=0;i<ln-1;i++) {
			if ((timeStep >= timeRanges[i]) && (timeStep < timeRanges[i+1])) {
				return i;
			}
		}
		return 'done';
	}
  let range = whatTimeRange();
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
		this.adjustCells(sp*innerSq,1,range);
		return;
	} 
	if (range === 2) {
		//debugger;
		this.adjustCells(sp*innerSq,2,range);
		return;
	} 
	if (range === 3) {
		//debugger;
		this.adjustCells(-sp*untilSq,2,range);
		return;
	} 
	if (range === 4) {
		debugger;
		this.adjustCells(-sp*untilSq,1,range);
		return;
	} 
	if (0 && (range === 5)) {
		debugger;
		this.adjustCells(0,1,range);
		this.adjustCells(0,2,range);
		return;
	} 
}

/*
	if (timeStep < pre) {
		return;
	}
	let timeStep1 = timeStep - pre;
	 if (timeStep1< 80) {
     this.adjustCells(0.05*timeStep1*timeStep1,1);
	 } else {
		 let timeStep2 = timeStep1 - 80;
		 if (timeStep2 < 80) {
		   this.adjustCells(0.05*timeStep2*timeStep2,2);
		 } else {
			 let timeStep3 = timeStep2 - 80;
			 if (timeStep3 < 80) {
				 let until3 = timeStep3 - 80;
				 this.adjustCells(-0.05*until3*until3,2);
			 } 
		 }
   }
	// let until = timeStep1 - 160;
	//	 this.adjustCells(-0.05*until*until);
	// }
	
	*/
	
rs.animate = function (resume)  {
	this.animateIt(this.numTimeSteps,50,resume);
	
}
  return rs;
});

