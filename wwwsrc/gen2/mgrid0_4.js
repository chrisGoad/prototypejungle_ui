
core.require('/line/line.js','/gen0/mgrid0.js',
function (linePP,addGridMethods) {
	debugger;
 
let rs = svg.Element.mk('<g/>');	
addGridMethods(rs);

rs.numTimeSteps = 100;
rs.numLines = 10;
rs.sepH = 5;
rs.sepV= 5;
rs.alternateGaps = 1;
rs.setName('mgrid0_0');

rs.lineParams = {segL:10,gapL:2,numSegs:10};
let lineSeps = [];
let lineSep = 2;
let lineSepInc = 0.05;
let numLines = 256;
const mkLineSeps = function (n) {	
  let qn = Math.floor(numLines/8);
	for (let i=0;i<qn;i++) {
		//let lineSep = bLineSep + lineSepInc * i;
		lineSeps.push(lineSep);
	}
	for (let i=0;i<6*qn;i++) {
		//let lineSep = bLineSep + lineSepInc * i;
		lineSeps.push(2*lineSep);
	}
	for (let i=0;i<qn;i++) {
		//let lineSep = bLineSep + lineSepInc * i;
		lineSeps.push(lineSep);
	}
	
	
}
mkLineSeps(numLines);
rs.lineSetParams = {numLines:numLines,lineSeps:lineSeps};
rs.initProtos = function () {
  core.assignPrototypes(this,'lineP',linePP);
  this.lineP['stroke-width'] = 0.4;
	this.lineP.stroke = 'white';
}  


rs.initialize = function () {
  debugger;
	let {lineParams,lineSetParams} = this;
	core.root.backgroundColor = 'black';
  this.initProtos();
	//let hlines = this.mkLines(0,this.lineP,10,2,10,51,1);
	let hlines = this.mkLines(0,this.lineP,lineParams,lineSetParams);
	this.set('hlines',hlines);
	//let vlines = this.mkLines(0.5*Math.PI,this.lineP,10,2,10,51,1);
	let vlines = this.mkLines(0.5*Math.PI,this.lineP,lineParams,lineSetParams);
	this.set('vlines',vlines);
	
}

rs.moveLine = function (line,st,fin,fr) {
	debugger;
	let vec = fin.difference(st);
	let pos = st.plus(vec.times(fr));
	line.moveto(pos);
	line.draw();
}

rs.step = function ()   {
	//debugger;
	let {timeStep,numTimeSteps} = this;
	let  ps1 = 40;
	let  ps2 = 60;
	//this.moveLine(this.vlines,Point.mk(-ps1,0),Point.mk(ps1,0),timeStep/numTimeSteps);
	this.moveLine(this.vlines,Point.mk(-ps1,0),Point.mk(0,0),timeStep/numTimeSteps);
	//this.moveLine(this.hlines,Point.mk(0,-ps2),Point.mk(0,ps2),timeStep/numTimeSteps);
	this.moveLine(this.hlines,Point.mk(0,-ps2),Point.mk(0,0),timeStep/numTimeSteps);
}



rs.animate = function (resume)  {
	this.animateIt(this.numTimeSteps,50);
}
return rs;
});

      

