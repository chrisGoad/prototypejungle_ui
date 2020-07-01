
core.require('/grid/grid24az.js',
function (constructor) {
  debugger;	//this.initProtos();
  let randomRow;

  let rs = constructor();
	rs.path = '/gallery4/grid24az_1.json';
  rs.loadFromPath = 1;
	rs.showBoundaries = 1;
	rs.sideBySide = 0;
	rs.allRandom = 0;
	rs.addLines = 1;
	rs.chanceVisible = 0.4;
	rs.aRectFill = 'rgb(255,50,0)';
	rs.aRectFill = 'red';
	rs.bRectFill = 'rgb(255,0,50)';
	rs.bRectFill = 'red';
	rs.aFill =   'black';
	rs.aStroke =   'white';
	rs.bFill = 'black';
	rs.bStroke = 'white';
	rs.numRows = 8;
	rs.numRows = 20;
	//rs.numRows = 2;
//	rs.numRows = 2;
	rs.numCols = 8;
	rs.numCols = 20;
	//rs.numCols = 2;
	rs.innerCols = 3;
	rs.innerRows = 3;
	rs.innerWidth = 20;
	rs.innerHeight = 20;
	//rs.numCols = 2;
	rs.width = 160;
	rs.width = 400;
	//rs.width = 300;
//	rs.width = 40;
	//rs.width = 20;
	rs.height = 160;
	rs.height = 400;
	//rs.height = 300;
	//rs.height = 40;
	//rs.height = 20;
		rs.pointJiggle = 0;//5;

rs.computeRvalues = function () {
	let {innerCols,innerRows,chanceVisible} = this;
	let rvl = [];
	let ln = (innerRows+1) * innerCols + innerRows*(innerCols+1);
	for (let i =0;i<16;i++) {
		let vl = Math.random()<chanceVisible;
		rvl.push(vl);
	}
	return rvl;
}
rs.initialize = function () {
	core.root.backgroundColor = 'red';
	let {numRows,numCols,path,width} = this;
	this.initProtos();
	this.setupShapeRandomizer('interpolate', {step:0.3,min:0,max:1,numRows,numCols});
	this.setupShapeRandomizer('color', {step:30,min:100,max:250,numRows,numCols});
	if (this.loadFromPath) {
	  core.httpGet('(sys)'+path, (error,json) => {
			debugger;
			let vls = JSON.parse(json);
			this.aValues = vls.aValues;
			this.bValues = vls.bValues;
			this.initializeGrid();
			this.shapeGenerator(undefined,'a',Point.mk(-0.6 * width,0));
			this.shapeGenerator(undefined,'b',Point.mk(0.6 * width,0));
		});
	} else {
    this.aValues = this.computeRvalues();
    this.bValues = this.computeRvalues();
	   debugger;
	  this.initializeGrid();
    let jsn = JSON.stringify({aValues:this.aValues,bValues:this.bValues});
	  ui.saveJson(path,jsn,function (err,rs) {
		  debugger;
		});
  }		
}

/*
let aO = 4; 
let aI = 1;
let bO = 1;
let bI = 4;

rs.kindaValues = [aO,aO,aO,aO, aO,aI,aI,aO, aO,aI,aI,aO, aO,aO,aO,aO];
rs.kindaValues = [aO,0,0,0, aO,aI,0,0, aO,aI,aI,0, aO,aO,aO,aO];
rs.kindaValues = computeRvalues(4);
//rs.kindaValues = [0,0,0,0, aO,aI,aI,aO, aO,aI,aI,aO, 0,0,0,0];
rs.kindbValues = [bO,bO,bO,bO, bO,bI,bI,bO, bO,bI,bI,bO, bO,bO,bO,bO];
rs.kindbValues = [bO,bO,bO,bO, 0,bI,bI,bO, 0,0,bI,bO, 0,0,0,bO];
//rs.kindbValues = [bO,bO,bO,bO, 0,0,0,0, 0,0,0,0, bO,bO,bO,bO];
//rs.kindbValues = [bO,bO,bO,bO, 0,0,0,0, 0,0,0,0, bO,bO,bO,bO];
rs.kindbValues = computeRvalues(4);
*/

	
	

rs.next = function () {
   this.pattern.forEach((line) =>   {line.stroke = 'black';line.show();});
}
 
  return rs;
});

