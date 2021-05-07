
//core.require('/gen0/drop0.js',function (addDropMethods) {
core.require('/gen0/drop0.js',function (addDropMethods) {

let rs = svg.Element.mk('<g/>');
addDropMethods(rs);
rs.setName('drop0__10');
let topParams = {width:600,height:400,maxDrops:20000,maxTries:40,lineLength:2,backgroundColor:'black',/*'rgb(1,1,1)',*/backgroundPadding:40,separation:15}
topParams = {width:1300,height:1300,numRows:20,numCols:30,maxDrops:10000,maxTries:10,lineLength:2,backgroundColor:'black',/*'rgb(100,1,1)',*/backgroundPadding:40,separation:0,fromEnds:1,sepNext:1,onlyFromSeeds:1,extendWhich:'random'}

Object.assign(rs,topParams);


rs.finishProtos = function () {
	this.lineP.stroke = 'white';
	this.lineP.stroke = 'transparent';
	//this.lineP.stroke = 'yellow';
	//this.lineP.stroke = 'black';
	this.lineP['stroke-width'] = .1;
	this.lineP['stroke-width'] = .6;
	this.lineP['stroke-width'] = 1;
}  

rs.genSegments = function (p) {
  let {width,height,separation:sep,sepNext,randomGridsForShapes} = this;
  debugger;
  let angle;
  if (0) {
		segs = this.sizedRectangleSegments(sizes,p); //Upper left
		let lines = segs.map((sg) => this.genLine(sg));
		lines.forEach( (line) => line.stroke = clr);
		return ( [segs,lines]);
  }
  let cell = this.cellOf(p);
  let rvs = this.randomValuesAtCell(randomGridsForShapes,cell.x,cell.y);
  let {r,g,b} =rvs;
	let rn = Math.random();
  if (p.direction) {
   angle = p.direction + ((rn<0.5)?0.002*Math.PI:-0.002*Math.PI);
  } else{
    angle = Math.floor(Math.random()*4)*0.25*Math.PI;//(r < 0.5)?0:0.5*Math.PI;
  }
  let a0 = angle+0.02 * Math.PI;
  let a1 = angle-0.02 * Math.PI;
	let len = 10;//2 + Math.floor(r*4)*4;
  if (Math.random() < 0.2 ) {
	  let seg0 = this.genSegment(p,len,a0,sep,sepNext,0);
	  let seg1 = this.genSegment(p,len,a1,sep,sepNext,0);
    p.isEnd = 1;
		let ln0 = this.genLine(seg0.end0,seg0.end1,2);
		let ln1 = this.genLine(seg1.end0,seg1.end1,2);
		let clr = `rgb(${r},${r},${r})`;
		ln0.stroke = clr;//'white';//clr;
		ln1.stroke = clr;//'white';//clr;
		return [[seg0,seg1],[ln0,ln1]];
  } else {
	  let seg = this.genSegment(p,len,angle,sep,sepNext,0);
    p.isEnd = 1;
		let ln = this.genLine(seg.end0,seg.end1,2);
		let clr = `rgb(${r},${r},${r})`;
		ln.stroke = clr;//'white';//clr;
		ln.stroke = 'white';//clr;
		return [[seg],[ln]];
  }

}

rs.initialSegments = function () {
  let {width,height,separation:sep,sepNext} = this;

  let segs = this.rectangleSegments(width,height);
  let csegs = [];// this.crossSegments(1*width,1*height);
 // let csegs = this.crossSegments(1*width,1*height);
  let asegs = segs.concat(csegs);
  let numStarts = 16;
  let cangle = 0.5* Math.PI;
  let delta = (Math.PI*2)/numStarts;
  let radius = 0.2* 0.5 * height;
  let len = 5;//2 + Math.floor(r*4)*4;
  //let zp = Point.mk(0,0);
  for (let j=0;j<numStarts;j++) {
    let ip = Point.mk(Math.cos(cangle),Math.sin(cangle)).times(radius)
		let seg =  this.genSegment(ip,len,cangle,sep,sepNext,0);
		asegs.push(seg); 
    cangle += delta;
  }
  let lines = asegs.map((sg) => this.genLine(sg.end0,sg.end1,1)); 
  const rrgb = () => {
    return 0 + Math.floor(Math.random()*154);
  }
  let r = rrgb();
  let g = rrgb();
  let b = rrgb();
  let clr = `rgb(${r},${g},${b})`;
  lines.forEach((ln) => ln.stroke = 'transparent');
  return [asegs,lines];
}

rs.initialSegmentss = function () {
  let {width,height} = this; 
  let segs = this.rectangleSegments(width,height);
  let csegs = this.crossSegments(1*width,1*height);
  let asegs = segs.concat(csegs);
  let lines = asegs.map((sg) => this.genLine(sg)); 
  //lines.forEach((ln) => ln.stroke = 'rgb(100,0,0)');
  //lines.forEach((ln) => ln.stroke = 'cyan');
  return [asegs,lines];
}

  
rs.initialize = function () {
  debugger;
  core.root.backgroundColor = 'black';
 this.setupShapeRandomizer('r',{step:10,min:50,max:240});
 this.setupShapeRandomizer('g',{step:10,min:50,max:240});
 this.setupShapeRandomizer('b',{step:10,min:50,max:240});

	this.initializeDrop();
}

return rs;

});

