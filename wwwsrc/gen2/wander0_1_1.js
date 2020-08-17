
core.require('/line/line.js','/gen1/wander0_1.js',
function (linePP,addGrid1Methods) {
  
	
let numTimeSteps = 1000;
let rs = svg.Element.mk('<g/>');
rs.motionStep = 1;
addGrid1Methods(rs);
rs.saveImage = true;
rs.setName('wander0_2');
rs.width = 200;
  rs.height = 200;
  rs.numDrops =3000;
  rs.numRows = 20;
  rs.numRows = 20;
  rs.numCols = 40;
  rs.numCols = 20;
	rs.lineLength = 4.8;
	rs.lineLength = .8;
	rs.pointJiggle = 0.0;
	
rs.initProtos = function () {
  core.assignPrototypes(this,'lineP',linePP);
  this.lineP.stroke = 'rgba(250,250,250,1)';
  this.lineP['stroke-width'] = 0.5;
 
}  

let wrs =  {step:.2,stept:.1,min:0,max:Math.PI};

const walkParams = function (i,j,ti) {
	wrs.biasUp = 0;
//	return wrs;
 let t = ti%100;
  let abb = 0.6;
	if (t < 10 ) {
		wrs.biasUp=0;
	}  else if (t<60) {
		wrs.biasUp = abb;
	} else if (t < 70) {
		wrs.biasUp = 0;
	} else {
		wrs.biasUp = -abb;
	}
	if ((i===0) && (j===0)) {
		debugger;
	}
	return wrs;
}
	
		
	

rs.initialize = function () {
  debugger;
  this.initProtos();
  core.root.backgroundColor = 'black';
		this.setupShapeRandomizer('dir',{walkParams});

	//this.setupShapeRandomizer('r',{step:35,stept:5,min:150,max:250});
	//this.setupShapeRandomizer('g',{step:35,stept:5,min:150,max:250});
	//this.setupShapeRandomizer('b',{step:35,stept:5,min:150,max:250});
//	this.setupShapeRandomizer('dimension',{step:1,stept:1,min:1,max:5});
	//this.setupShapeRandomizer('dir',{step:.2,stept:.2,min:0,max:2*Math.PI,biasUp:0.4});
  this.initializeGrid();
	this.generatorsDoMoves = 1;
}	

rs.timeStep = 0;
rs.step = function ()   {
	debugger;
	//this.stepShapeRandomizer('r');
	//this.stepShapeRandomizer('g');
	//this.stepShapeRandomizer('b');
	//this.stepShapeRandomizer('dimension');
	this.stepShapeRandomizer('dir');
  this.updateGrid();
	//draw.saveFrame(rs.timeStep);
	rs.timeStep++;
}
return rs;
});
 