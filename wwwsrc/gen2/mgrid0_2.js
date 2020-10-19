
core.require('/line/line.js','/gen0/mgrid0.js',
function (linePP,addGridMethods) {
	debugger;
 
let rs = svg.Element.mk('<g/>');	
addGridMethods(rs);

rs.numTimeSteps = 50;
rs.numLines = 10;
rs.sepH = 5;
rs.sepV= 5;
rs.alternateGaps = 0;

rs.hlineParams = {segL:10,gapL:10,numSegs:10};
rs.vlineParams = {segL:10,gapL:20,numSegs:10};
rs.hlineSetParams = {numLines:20,lineSep:2};
rs.vlineSetParams = {numLines:10,lineSep:2};
rs.psh = 40;
rs.psv = 20;
rs.initProtos = function () {
  core.assignPrototypes(this,'lineP',linePP);
  this.lineP['stroke-width'] = 0.2;
  this.lineP['stroke-width'] = 1;
	this.lineP.stroke = 'white';
}  


rs.initialize = function () {
  debugger;
	let {hlineParams,vlineParams,hlineSetParams,vlineSetParams,psh,psv} = this;
	core.root.backgroundColor = 'black';
  this.initProtos();
	//let hlines = this.mkLines(0,this.lineP,10,2,10,51,1);
	let hlines = this.mkLines(0,this.lineP,hlineParams,hlineSetParams);
	this.set('hlines',hlines);
	//let vlines = this.mkLines(0.5*Math.PI,this.lineP,10,2,10,51,1);
	let vlines = this.mkLines(0.5*Math.PI,this.lineP,vlineParams,vlineSetParams);
	this.set('vlines',vlines);
	debugger;
	let hsc = hlines.lines[0].segCenters;
	//let hlines = hlines.lines;
	//hlines.forEach( (line) = {this.setMinCenters(hline);});
	//this.contractLineL(hline,40);
	let lastC = hsc[hsc.length - 1]-psh;
	let vx = lastC - 0.5*hlineParams.segL;
	//let vx = lastC;

	this.sth = Point.mk(-psh,0);
	this.stv = Point.mk(vx,-psv);
	hlines.moveto(this.sth);
	vlines.moveto(this.stv);
	
}

rs.moveLine = function (line,st,fin,fr) {
	debugger;
	let vec = fin.difference(st);
	let pos = st.plus(vec.times(fr));
	line.moveto(pos);
	line.draw();
}

rs.step = function ()   {
	debugger;
	let {timeStep,numTimeSteps,lastC,sth,stv,hlines,vlines} = this;
	let fr = timeStep/numTimeSteps;
	let delta = fr*150;
	let linesH = hlines.lines;
	let linesV = vlines.lines;
	let lnh = linesH.length;
	let lnv = linesV.length;
	for (let i=0;i<lnh;i++) {
		let hline = linesH[i]
	  this.contractLineL(hline,(i/20) * (1 + (0.0*Math.random())) * delta);
	}
	for (let i=0;i<lnv;i++) {
		let vline = linesV[i]
	  this.contractLineL(vline,(i/20) * (1 + (0.0*Math.random())) * delta);
	}
}



rs.animate = function (resume)  {
	this.animateIt(this.numTimeSteps,50);
}
return rs;
});

      

