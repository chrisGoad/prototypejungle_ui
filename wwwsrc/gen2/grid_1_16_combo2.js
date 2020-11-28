
core.require('/gen1/grid_1.js',
function (constructor) {
  debugger;	//this.initProtos();
  //core.vars.whereToSave = 'images/grid_1_1.jpg';
	  let rs = svg.Element.mk('<g/>');

	let grid0= rs.set('grid0',constructor());
	let grid1 = rs.set('grid1',constructor());

  let gParams = {saveImage:true,loadFromPath:true,numRows:20,numCols:20,width:300,height:300,pointJiggle:0,lineLength:0.75,strokeWidth:1};
	Object.assign(grid0,gParams);
	Object.assign(grid1,gParams);
  grid0.setName('grid_1_9','grid_1_7');
  grid1.setName('grid_1_9','grid_1_7');
	
const finishProtos = function (grid) {
	grid.lineP.stroke = 'rgb(255,255,255)';
	grid.lineP.stroke = 'black';
	grid.lineP['stroke-width'] = 1;
	grid.lineP.dimension = 4;
}  
	grid0.initProtos();
	grid1.initProtos();
	finishProtos(grid0);
	finishProtos(grid1);


	/*
	rs.saveImage = true;
	rs.setName('grid_1_9','grid_1_7');
	rs.initProtos();
	//rs.path = 'json/grid_1_1.json';
  rs.loadFromPath = 1;
	rs.saveJson = 1;
	//rs.randomCellExclude = 2;
	rs.numRows = 20;
	rs.numCols = 20;
	rs.width = 300;
	rs.height = 300;
	rs.pointJiggle = 0;
	rs.preSteps = 20;
	rs.preSteps = 10;
	rs.midSteps = 10;
	rs.postSteps = 10;
	rs.mainRange = 80;
	rs.numTimeSteps = rs.preSteps+ 5*rs.mainRange;
	rs.speedFactor = 0.05;
	rs.lineLength = 0.75;
	*/
	
	/*
rs.defaultPositionFunction = function (i,j) {
  let {deltaX,deltaY,numRows,numCols,width,height} = this;
  let botx = 0.5*deltaX + -0.5 * width;
  let boty = 0.5*deltaY +  -0.5 * height;
  return Point.mk(botx + deltaX*i,boty + deltaY*j);
  
}*/
let directionOfPatterns = {ul:'downLeft',lr:'downLeft',ll:'downRight',ur:'downRight',mid:'down'};
//grid1.directionOfPatterns = grid0.directionOfPatterns;

const adjustCell = function (grid,x,y,fraction,showing) {
		let {numRows,shapes,lineLength,strokeWidth} = grid;
		let idx = x*numRows + y;
		let line0 = shapes[idx];
		let clr = showing?(1-fraction) * 255:fraction*255;
		line0.stroke = `rgb(255,${clr},${clr})`;
		line0['stroke-width'] = strokeWidth + (showing?fraction*strokeWidth:(1-fraction)*strokeWidth);
		//line0.stroke = `rgb(${clr},${clr},${clr});
	
	}
	
const adjustCells = function (grid,fraction,showing) {
//	debugger;
	let {numRows,numCols} = grid;
	for (let i=0;i<numCols;i++) {
		for (let j=0;j<numRows;j++) {
			let pat = inPattern(grid,i,j);
			console.log('pat ',pat,' fraction ',fraction);
			if (pat !== 'none') {
			  adjustCell(grid,i,j,fraction,showing);
			}
		}
	}
	grid.draw();
}
	
	
const adjustDirs = function (grid) {
//	debugger;
	let {numRows,numCols,shapes,lineLength} = grid;
	for (let i=0;i<numCols;i++) {
		for (let j=0;j<numRows;j++) {
			let pat = inPattern(grid,i,j);
			console.log('pat ',pat);
			if (pat !== 'none') {
				let dirname = directionOfPatterns[pat];
				let dir;
				if (dirname === 'downLeft') {
					dir = 0.25;
				} else if (dirname === 'downRight') {
					dir = 0.75; 
				} else {
					dir = 0.5;
				}
				let idx = i*numRows + j;
				let line0 = shapes[idx];
				grid.setLineEnds(line0,lineLength,dir*Math.PI);
		  }
		}
	}
	grid.draw();
}
	rs.addTheBox = function () {
		this.addBox('white',50,1);
		this.show();
		draw.fitTheContents();
	}
	

rs.initialize = function () {
	core.root.backgroundColor = 'red';
	core.root.backgroundColor = 'white';
	let wd = this.grid0.width;
	this.grid0.outerInitialize(() => {
		adjustDirs(this.grid0);
	  this.grid1.outerInitialize(() => {
			adjustDirs(this.grid1);
	    adjustCells(this.grid1,1,1);
			let mvp = 0.6;
			this.grid0.moveto(Point.mk(-mvp*wd,0));
			this.grid1.moveto(Point.mk(mvp*wd,0));
		});
	//  this.addTheBox();
	});
}

const inPattern = function (grid,x,y) {
	let {numRows,numCols} = grid;
  let hr = 0.5 * numRows;
	//if (y === hr) {
	//	return 'mid';
	//}
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
	

	
const computeDir = function (grid,x,y) {
	let pat = inPattern(grid,x,y);
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
	this.computeRanges([this.preSteps,rng,this.midSteps,rng,this.postSteps]);
}
/*
rs.setTimeRanges = function () {
  let pre = rs.preSteps;
	let post = rs.postSteps;
	let rng = rs.mainRange;
  this.timeRanges = [0,pre,pre+rng,pre+2*rng,pre+2*rng+post];
	this.numTimeSteps = pre+2*rng+post;
}
*/
//rs.setTimeRanges();


	
rs.step = function ()   {
	//debugger;
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
	let dur = finish-start;
	let inner = timeStep - start;
	let fr = inner/dur;
	
	if (range === 0) {
		return;
	}
	if (range ===  1) {
	  this.adjustCells(fr,1);
		return;
	} 
	if (range === 3) {
		this.adjustCells(fr,0);
	}
	
}

rs.animate = function (resume)  {
	this.animateIt(this.numTimeSteps,50,resume);
	
}
  return rs;
});

