
//core.require('/gen0/drop0.js',function (addDropMethods) {
core.require('/gen0/drop0.js',function (addDropMethods) {

let rs = svg.Element.mk('<g/>');
addDropMethods(rs);


rs.randomizerColor = function (p) {
  let {randomGridsForShapes} = this;
  let angle;
  let cell = this.cellOf(p);
  let rvs = this.randomValuesAtCell(randomGridsForShapes,cell.x,cell.y);
  let {r,g,b} =rvs;
  return {r,g,b}
}

rs.randomColor = function () {
  const rrgb = () => {
    return 0 + Math.floor(Math.random()*154);
  }
  let r = rrgb();
  let g = rrgb();
  let b = rrgb();
  return {r,g,b}
}

rs.genSegmentsFan = function (p,clr) {
  let {width,height,separation:sep,sepNext,splitChance,splitAmount,lineLength:len} = this;
  debugger;

	let rn = Math.random();
  if (typeof p.direction === 'number') {
   angle = p.direction + ((rn<0.5)?0.002*Math.PI:-0.002*Math.PI);
  } else{
    angle = Math.floor(Math.random()*4)*0.25*Math.PI;//(r < 0.5)?0:0.5*Math.PI;
  }
  let hsa = 0.5 * splitAmount;
  let a0 = angle+splitAmount;
  let a1 = angle-splitAmount;
 // let a0 = angle+0.02 * Math.PI;
 // let a1 = angle-0.02 * Math.PI;
	//let len = 10;//2 + Math.floor(r*4)*4;
  if (Math.random() < splitChance ) {
	  let seg0 = this.genSegment(p,len,a0,sep,sepNext,0);
	  let seg1 = this.genSegment(p,len,a1,sep,sepNext,0);
    p.isEnd = 1;
		let ln0 = this.genLine(seg0.end0,seg0.end1,2);
		let ln1 = this.genLine(seg1.end0,seg1.end1,2);
	  if (clr) {
		  ln0.stroke = clr;//'white';//clr;
		  ln1.stroke = clr;//'white';//clr;
    }
		return [[seg0,seg1],[ln0,ln1]];
  } else {
	  let seg = this.genSegment(p,len,angle,sep,sepNext,0);
    p.isEnd = 1;
		let ln = this.genLine(seg.end0,seg.end1,2);
	//	let clr = `rgb(${r},${r},${r})`;
    if (clr) {
		  ln.stroke = clr;//'white';//clr;
    }
		return [[seg],[ln]];
  }

}

rs.ringSeeds = function (clr) {
  let {width,height,separation:sep,sepNext,numSeeds,ringRadius:radius,lineLength:len} = this;
  let segs = [];
//  let numStarts = 16;
  let cangle = 0.5* Math.PI;
  let delta = (Math.PI*2)/numSeeds;
 // let radius = 0.2* 0.5 * height;
 // let len = 5;//2 + Math.floor(r*4)*4;
  //let zp = Point.mk(0,0);
  for (let j=0;j<numSeeds;j++) {
    let ip = Point.mk(Math.cos(cangle),Math.sin(cangle)).times(radius)
		let seg =  this.genSegment(ip,len,cangle,sep,sepNext,0);
		segs.push(seg); 
    cangle += delta;
  }
  let lines = segs.map((sg) => this.genLine(sg.end0,sg.end1,1)); 
  if (clr) {
    lines.forEach((ln) => ln.stroke = clr);
  }
  return [segs,lines];
}


rs.randomSeeds = function (clr) {
  let {width,height,separation:sep,sepNext,numSeeds,ringRadius:radius,seedDirections,lineLength:len} = this;
  let segs = [];
	let ld;
	if (seedDirections) {
	  ld = seedDirections.length;
	}
  for (let j=0;j<numSeeds;j++) {
    let ip = this.genRandomPoint();
		let angle;
		if (ld) {
			let ri = Math.floor(Math.random()*ld);
			angle = seedDirections[ri];
		} else {
			angle = 2*Math.random()*Math.PI;
		}
		let seg =  this.genSegment(ip,len,angle,sep,sepNext,0);
		segs.push(seg); 
  }
  let lines = segs.map((sg) => this.genLine(sg.end0,sg.end1,1)); 
  if (clr) {
    lines.forEach((ln) => ln.stroke = clr);
  }
  return [segs,lines];
}





rs.gridSeeds = function (clr) {
  let {width,height,separation:sep,sepNext,fanAngles,numSeedRows:numRows,numSeedCols:numCols} = this;

  let segs = [];//this.rectangleSegments(width,height);
 // let numCols = 4;
//  let numRows = 4;
  let invx = width/(numCols+1);
  let invy = height/(numRows+1);
  let hwd = width/2;
  let hht = height/2;
  let ix = invx-hwd;
 // let iy = hht-invy;
  let iy = hht;
  let angle0 = 0.5*Math.PI;
  let angle1 = -0.5*Math.PI;
  let len = 5;//2 + Math.floor(r*4)*4;
  for (let j=0;j<numRows+1;j++) {
    ix = invx-hwd;
		for (let i=0;i<numCols;i++) {
			let ip = Point.mk(ix,iy);
			ix += invx;
      fanAngles.forEach( (angle) => {
        let seg = this.genSegment(ip,len,angle,sep,sepNext,0);
			  segs.push(seg);
      });
		}	 
    iy -= invy;
  }
  let lines = segs.map((sg) => this.genLine(sg.end0,sg.end1,1)); 
 // lines.forEach((ln) => ln.stroke = clr);//'white');
  return [segs,lines];
}


rs.setupColorRandomizer = function (params) {
  this.setupShapeRandomizer('r',params);
  this.setupShapeRandomizer('g',params);
  this.setupShapeRandomizer('b',params);
}
  

return rs;

});

