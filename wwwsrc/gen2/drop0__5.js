
//core.require('/gen0/drop0.js',function (addDropMethods) {
core.require('/gen0/drop0.js',function (addDropMethods) {

let rs = svg.Element.mk('<g/>');
addDropMethods(rs);
rs.setName('drop0__5');
let topParams = {width:600,height:400,maxDrops:20000,maxTries:40,lineLength:2,backgroundColor:'rgb(1,1,1)',backgroundPadding:40,separation:15}
topParams = {width:600,height:400,maxDrops:10000,maxTries:40,lineLength:2,backgroundColor:'rgb(100,1,1)',backgroundPadding:40,separation:0,fromEnds:1,sepNext:1}

Object.assign(rs,topParams);


rs.finishProtos = function () {
	this.lineP.stroke = 'white';
	//this.lineP.stroke = 'yellow';
	//this.lineP.stroke = 'black';
	this.lineP['stroke-width'] = .1;
	this.lineP['stroke-width'] = .6;
}  

rs.genSegments = function (p) {
  let {width,height,separation:sep,sepNext} = this;
  debugger;
  let angle;
  if (0) {
		segs = this.sizedRectangleSegments(sizes,p); //Upper left
		let lines = segs.map((sg) => this.genLine(sg));
		lines.forEach( (line) => line.stroke = clr);
		return ( [segs,lines]);
  }
	let r = Math.random();
  if (p.direction) {
   angle = p.direction + ((r<0.5)?0.01*Math.PI:-0.01*Math.PI);
  } else{
    angle = Math.floor(Math.random()*4)*0.25*Math.PI;//(r < 0.5)?0:0.5*Math.PI;
  }
  let a0 = angle+0.02 * Math.PI;
  let a1 = angle-0.02 * Math.PI;
	let len = 10;//2 + Math.floor(r*4)*4;
	let seg0 = this.genSegment(p,len,a0,sep,sepNext,0);
	let seg1 = this.genSegment(p,len,a1,sep,sepNext,0);
  p.isEnd = 1;
	let ln0 = this.genLine(seg0.end0,seg0.end1,2);
	let ln1 = this.genLine(seg1.end0,seg1.end1,2);
  
	ln0.stroke = 'white';//clr;
	ln1.stroke = 'white';//clr;
	return [[seg0,seg1],[ln0,ln1]];
}

rs.initialSegments = function () {
  let {width,height} = this; 
  let segs = this.rectangleSegments(width,height);
  let csegs = this.crossSegments(1*width,1*height);
  let asegs = segs.concat(csegs);
  let lines = asegs.map((sg) => this.genLine(sg)); 
  //lines.forEach((ln) => ln.stroke = 'rgb(100,0,0)');
  lines.forEach((ln) => ln.stroke = 'cyan');
  return [asegs,lines];
}

  
rs.initialize = function () {
  debugger;
  core.root.backgroundColor = 'black';
	this.initializeDrop();
}

return rs;

});

