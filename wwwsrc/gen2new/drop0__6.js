
//core.require('/gen0/drop0.js',function (addDropMethods) {
core.require('/gen0/drop0.js',function (addDropMethods) {

let rs = svg.Element.mk('<g/>');
addDropMethods(rs);
rs.setName('drop0__6');
let topParams = {width:600,height:400,maxDrops:20000,maxTries:40,lineLength:2,backgroundColor:'rgb(1,1,1)',backgroundPadding:40,separation:15}
topParams = {width:600,height:400,maxDrops:10000,maxTries:10,lineLength:2,backgroundColor:'rgb(100,1,1)',backgroundPadding:40,separation:0,fromEnds:1,sepNext:1}

Object.assign(rs,topParams);


rs.finishProtos = function () {
	this.lineP.stroke = 'white';
	this.lineP['stroke-width'] = .6;
}  

rs.genSegments = function (p) {
  let {width,height,separation:sep,sepNext} = this;
  debugger;
 // let params = {direction:0.75*Math.PI,zigzag:1,randomness:0,vertical:0,widths:[10],heightRatio:0.05,numSegs:4,pos:p};

  let angle;
	let r = Math.random();
  if (p.direction) {
   angle = p.direction + ((r<0.5)?0.1*Math.PI:-.1*Math.PI);
  } else{
    angle = 0.5*Math.PI;// Math.floor(Math.random()*4)*0.25*Math.PI;//(r < 0.5)?0:0.5*Math.PI;
  }
  let a0 = angle+0.02 * Math.PI;
  let a1 = angle-0.02 * Math.PI;
	let len = 10;//2 + Math.floor(r*4)*4;
	let seg = this.genSegment(p,len,angle,sep,sepNext,0);
	
  p.isEnd = 1;
	let ln = this.genLine(seg.end0,seg.end1,2);
	ln.stroke = 'white';//clr;
	return [[seg],[ln],[seg.end],[angle]];

}


rs.initialSegments = function () {
  let {width,height} = this; 
  let segs = this.rectangleSegments(width,height);
 // let csegs = [];// this.crossSegments(1*width,1*height);
  let csegs = this.crossSegments(1*width,1*height);
  let asegs = segs.concat(csegs);
  let lines = asegs.map((sg) => this.genLine(sg)); 
  lines.forEach((ln) => ln.stroke = 'black');
  return [asegs,lines];
}

  
rs.initialize = function () {
  debugger;
  core.root.backgroundColor = 'black';
	this.initializeDrop();
}

return rs;

});

