
//core.require('/gen0/drop0.js',function (addDropMethods) {
core.require('/gen1/drop0_0.js',function (rs) {

rs.setName('drop0_0_5');
let topParams = {width:600,height:400,maxDrops:20000,maxTries:40,lineLength:2,backgroundColor:'rgb(1,1,1)',backgroundPadding:40,separation:15}
topParams = {width:600,height:400,maxDrops:10000,maxTries:10,lineLength:2,backgroundColor:'rgb(100,1,1)',backgroundPadding:40,separation:0,fromEnds:1,sepNext:1}

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
 // let params = {direction:0.75*Math.PI,zigzag:1,randomness:0,vertical:0,widths:[10],heightRatio:0.05,numSegs:4,pos:p};

  let which = this.computeWhichByCenterInterpolation(p);
  which = 0;
  let rgb0 = [250,250,0];
  let rgb2 = rgb0;//[0,0,250];
  let rgb1 = [250,250,250];
  let rgb3 = rgb1;
  let clr = this.computeColorByInterpolation(p,rgb0,rgb1,rgb2,rgb3);
  let segs;
  let sizes = [5,10,20];
  let angle;
  if (0) {
		segs = this.sizedRectangleSegments(sizes,p); //Upper left
		let lines = segs.map((sg) => this.genLine(sg));
		lines.forEach( (line) => line.stroke = clr);
		return ( [segs,lines]);
  }
  if (which === 1) {
    angle = 0.25*Math.PI;
    angle = 0;
    //angle = 0.25*Math.PI; // center
  } else if (which === 0) {
    angle = 0.75*Math.PI; //  outside
    angle = 0; //  outside
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
	//let seg = this.genSegment(p,len,angle,sep,sepNext,0);
	let seg0 = this.genSegment(p,len,a0,sepNext);
	let seg1 = this.genSegment(p,len,a1,sepNext);
  p.isEnd = 1;
	//let eseg = this.genSegment(p,len+sep,angle,0);
	//let ln = this.genLine(seg);
	let ln0 = this.genLine(seg0.end0,seg0.end1);
	let ln1 = this.genLine(seg1.end0,seg1.end1);
  
	//ln.stroke = 'blue';//clr;
	ln0.stroke = 'white';//clr;
	ln1.stroke = 'white';//clr;
	return [[seg0,seg1],[ln0,ln1]];
	//return [[seg],[ln],[seg.end],[angle]];

}


rs.genSegmentss = function (p) {
  let {width,height,separation:sep} = this;
  debugger;
 // let params = {direction:0.75*Math.PI,zigzag:1,randomness:0,vertical:0,widths:[10],heightRatio:0.05,numSegs:4,pos:p};

  let which = this.computeWhichByCenterInterpolation(p);
  let rgb0 = [250,250,0];
  let rgb2 = rgb0;//[0,0,250];
  let rgb1 = [250,250,250];
  let rgb3 = rgb1;
  let clr = this.computeColorByInterpolation(p,rgb0,rgb1,rgb2,rgb3);
  let segs;
  let sizes = [5,10,20];
  let angle;
  if (which === 1) {
    segs = this.sizedRectangleSegments(sizes,p); //Upper left
    let lines = segs.map((sg) => this.genLine(sg));
    lines.forEach( (line) => line.stroke = clr);
    return ( [segs,lines]);
    //angle = 0.25*Math.PI; // center
  } else if (which === 0) {
    let angle = 0.75*Math.PI; //  outside
    let r = Math.random();
    let len = 2 + Math.floor(r*4)*4;
	  let seg = this.genSegment(p,len,angle);
    let eseg = this.genSegment(p,len+sep,angle);
    let ln = this.genLine(seg);
    ln.stroke = clr;
    return [[eseg],[ln]];
  }
}

rs.initialSegments = function () {
  let {width,height} = this; 
  let segs = this.rectangleSegments(width,height);
 // let csegs = [];// this.crossSegments(1*width,1*height);
  let csegs = this.crossSegments(1*width,1*height);
  let asegs = segs.concat(csegs);
  let lines = asegs.map((sg) => this.genLine(sg)); 
  lines.forEach((ln) => ln.stroke = 'rgb(100,0,0)');
  return [asegs,lines];
}

  
rs.initialize = function () {
  debugger;
  core.root.backgroundColor = 'black';
	this.initializeDrop();
}

return rs;

});

