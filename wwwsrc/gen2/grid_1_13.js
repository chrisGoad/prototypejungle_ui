
core.require('/gen1/grid_1.js','/gen0/animation.js',
function (constructor,addMethods) {
	

  debugger;	//this.initProtos();
  //core.vars.whereToSave = 'images/grid_1_1.jpg';
	let rs = svg.Element.mk('<g/>');
	addMethods(rs);
	rs.numTimeSteps = 3;
	
	rs.setNameee = function (name,jsonName) {
		this.name = name;
		core.vars.whereToSave = name;
		let theName = jsonName?jsonName:name;
		this.path = `json/${theName}.json`;
  }
	let grid1 = rs.set('grid1',constructor());
	let grid2 = rs.set('grid2',constructor());
  //let rs = constructor();
	rs.saveImage = true;
	rs.setName('grid_1_13','grid_1_7');
	grid1.setName('grid_1_13','grid_1_7');
	grid2.setName('grid_1_13','grid_1_7');
	grid1.initProtos();
	grid2.initProtos();
	//rs.path = 'json/grid_1_1.json';
  grid1.loadFromPath = 1;
  grid2.loadFromPath = 1;
	//rs.randomCellExclude = 2;
	grid1.numRows = grid2.numRows = 20;
	grid1.numCols = grid2.numCols= 20;
	grid1.width = grid2.width =  300;
	grid1.height = grid2.height =  300;
	grid1.pointJiggle = grid2.pointJiggle =  0;
	
	
	
	/*
rs.defaultPositionFunction = function (i,j) {
  let {deltaX,deltaY,numRows,numCols,width,height} = this;
  let botx = 0.5*deltaX + -0.5 * width;
  let boty = 0.5*deltaY +  -0.5 * height;
  return Point.mk(botx + deltaX*i,boty + deltaY*j);
  
}*/
rs.directionOfPatterns = {ul:'downLeft',lr:'downLeft',ll:'downRight',ur:'downRight'};

grid2.cellsAdjusted = [];

grid2.adjustCell = function (x,y) {
	let {lineLength,numRows} = this;
	let idx = x*numRows + y;
	let line0 = this.shapeAt(x,y);
	let odir = this.dirValues[idx];
	if (typeof odir === 'number') {
	  let dir = odir + 0.5 * Math.PI;
		//line0.stroke = 'red';
	  this.setLineEnds(line0,lineLength,dir);
    //this.cellsAdjusted.push({x:x,y:y,dir:dir});		
    this.cellsAdjusted.push({x,y});	
    debugger;		
		return 1;
	}
  return 0;
}
	
grid2.adjustCells = function () {
	debugger; 
  let {numRows,numCols} = this;
  let limit = 36;
	let chance = 1.6*limit/(numRows*numCols);
  let cnt = 0;
	for (let i=1;i<(numCols-1);i++) {
		for (let j=1;j<(numRows-1);j++) {
			 if (Math.random() < chance) {
			   cnt += this.adjustCell(i,j);
			   if (cnt >limit) {
				   alert('adjusted');
				   return;
			   }
			 }
		}
	}
	this.draw();
}

rs.paintCells = function (grid,color,sw) {
	this.grid2.cellsAdjusted.forEach( (adj) => {
		let {x,y} = adj;
		let line0 = grid.shapeAt(x,y);
		line0.stroke  = color;
		line0['stroke-width'] = sw;
		line0.update();
		line0.draw();
	});
}
	
	rs.addTheBox = function () {
		this.lineP = grid1.lineP;
		this.width =2.2*grid1.width;
		this.height = grid1.height;
		this.addBox('white',50,1);
		this.show();
		draw.fitTheContents();
	}
	

rs.initialize = function () {
	let {width} = grid1;
	core.root.backgroundColor = 'red';
	core.root.backgroundColor = 'black';
	debugger;
	this.grid1.innerInitialize(() => {
		this.grid2.innerInitialize( () => { 
			debugger;
			let mv = 0.6*width;
			grid1.moveto(Point.mk(-mv,0));
			grid2.moveto(Point.mk(mv,0));
			grid2.adjustCells();
		});
	});
	//this.addTheBox();
}

rs.step = function ()   {
	let {timeStep} = this;
	if (timeStep === 1) {
	  this.paintCells(this.grid1,'magenta',2);
	  this.paintCells(this.grid2,'magenta',2);
	} else if (0  && (timeStep > 1)) {
		grid1.paintCells('white');
		grid2.paintCells('white');
	}
}


rs.animate = function (resume)  {
	this.animateIt(this.numTimeSteps,1000,resume);
	
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
	return rs;
});

