
core.require('/gen0/drop0.js',function (addDropMethods) {

let rs = svg.Element.mk('<g/>');
addDropMethods(rs);
rs.setName('drop0_7');
let topParams = {width:400,height:400,maxDrops:100000,maxTries:100,lineLength:2,backgroundColor:undefined,minSeparation:0}
topParams = {width:200,height:200,maxDrops:10000,maxTries:10,lineLength:2,backgroundColor:undefined,minSeparation:0}

Object.assign(rs,topParams);


rs.finishProtos = function () {
	this.lineP.stroke = 'white';
	this.lineP.stroke = 'yellow';
	this.lineP['stroke-width'] = .1;
	this.lineP['stroke-width'] = .6;
}  

rs.segParams = function () {
  let r = Math.random();
  let np = 4;
  let angle = Math.floor(r*np)* (Math.PI/np)
  let length = 2 + Math.floor(r*np)*4;
  
 // let rs = r>0.5?Math.PI/2:0;
  return {angle,length};
}

rs.computeWhichByInterpolation = function (p) {
  let {width,height} = this;
  let frw = (p.x+0.5*width)/width; 
  let frh = (p.y+0.5 * height)/height;  
  let likelyhood0 = (1-frw)*(1-frh);
  let likelyhood1 = frw*(1-frh);
  let likelyhood2 = frw*frh;
  let likelyhood3 = (1-frw)*frh;
  let fd0 = likelyhood0;
  let fd1 = fd0 + likelyhood1;
  let fd2 = fd1 + likelyhood2;
  let total = fd2 + likelyhood3;
  let rn = Math.random();
  let which;
  if (rn < fd0/total) {
    which = 0;
  } else if (rn < fd1/total) {
    which = 1;
  } else if (rn < fd2/total) {
    which = 2;
  } else {
    which = 3;
  }
  return which;
}

rs.computeColorByInterpolation = function (p,c0,c1,c2,c3) {
  let {width,height} = this;
  let frw = (p.x+0.5*width)/width; 
  let frh = (p.y+0.5 * height)/height; 
  let wt0 = 1 - Math.max(frw,frh);
  let wt1 = 1 - Math.max(1-frw,frh);
  let wt2 = 1 - Math.max(1-frw,1-frh);
  let wt3 = 1 - Math.max(frw,1-frh);
  let totalw = wt0+wt1+wt2+wt3;
  const weightedAvg = function (v0,v1,v2,v3) {
    return (wt0*v0+wt1*v1+wt2*v2+wt3*v3)/totalw;
  }
  let rgb0 = [250,0,0];
  let rgb2 = [0,0,250];
  let rgb1 = [250,250,250];
  let rgb3 = rgb1;
  let r = weightedAvg(c0[0],c1[0],c2[0],c3[0]);
  let g = weightedAvg(c0[1],c1[1],c2[1],c3[1]);
  let b = weightedAvg(c0[2],c1[2],c2[2],c3[2]);
  let clr = `rgb(${r},${g},${b})`;
  return clr;
}

rs.genSegments = function (p) {
  let {width,height} = this;
  //let hh = height/2;
  //let fr = (p.y+hh)/height;
//  console.log('fr',fr);
 // let segs = this.wigglySegments({zigzag:1,randomness:1,vertical:1,widths:[10,20,50],heightRatio:0.05,numSegs:15,pos:p});
  let params = {direction:Math.PI/4,zigzag:1,randomness:0,vertical:0,widths:[10],heightRatio:0.05,numSegs:4,pos:p};
  debugger;
  let params1 = Object.assign({},params);
  params1.direction = 0.75*Math.PI;
  let params2 = Object.assign({},params);
  params2.direction = Math.PI/2;
  let params3 = Object.assign({},params);
  params3.direction = 0;
  let which = this.computeWhichByInterpolation(p);
  let rgb0 = [250,0,0];
  let rgb2 = [0,0,250];
  let rgb1 = [250,250,250];
  let rgb3 = rgb1;
  let clr = this.computeColorByInterpolation(p,rgb0,rgb1,rgb2,rgb3);

  let segs;
 /* let frw = (p.x+0.5*width)/width; 
  let frh = (p.y+0.5 * height)/height; 
  let wt0 = 1 - Math.max(frw,frh);
  let wt1 = 1 - Math.max(1-frw,frh);
  let wt2 = 1 - Math.max(1-frw,1-frh);
  let wt3 = 1 - Math.max(frw,1-frh);
  let totalw = wt0+wt1+wt2+wt3;
  const weightedAvg = function (v0,v1,v2,v3) {
    return (wt0*v0+wt1*v1+wt2*v2+wt3*v3)/totalw;
  }

  let r = weightedAvg(rgb0[0],rgb1[0],rgb2[0],rgb3[0]);
  let g = weightedAvg(rgb0[1],rgb1[1],rgb2[1],rgb3[1]);
  let b = weightedAvg(rgb0[2],rgb1[2],rgb2[2],rgb3[2]);

  console.log('r',r,'g',g,'b',b);
*/
 /*
  let likelyhood0 = (1-frw)*(1-frh);
  let likelyhood1 = frw*(1-frh);
  let likelyhood2 = frw*frh;
  let likelyhood3 = (1-frw)*frh;
  let fd0 = likelyhood0;
  let fd1 = fd0 + likelyhood1;
  let fd2 = fd1 + likelyhood2;
  let total = fd2 + likelyhood3;
  
  let rn = Math.random();
  if (rn < fd0/total) {
    which = 0;
  } else if (rn < fd1/total) {
    which = 1;
  } else if (rn < fd2/total) {
    which = 2;
  } else {
    which = 3;
  }
*/
  //console.log('frw',frw,'frh',frh,'lk0',likelyhood0,'lk1',likelyhood1,'lk2',likelyhood2,'lk3',likelyhood3);

  if (which === 0) {
    segs = this.wigglySegments(params);
  } else if (which === 1) {
    segs = this.wigglySegments(params1);
  } else if (which === 2) {
    segs = this.wigglySegments(params2);
  } else if (which === 3) {
    segs = this.wigglySegments(params3);
  }

 // let segs = (Math.random() < 0.5)?this.wigglySegments(params):this.wigglySegments(params2);
  //let segs = this.wigglySegments({direction:0,zigzag:1,randomness:0,vertical:0,widths:[20],heightRatio:0.05,numSegs:4,pos:p});
 // let segs = (Math.random() < fr)?this.wigglySegments(1,[10,20,50],0.05,15,p):this.wigglySegments(0,[10,20,50],0.05,15,p);
 // let segs = (Math.random() < fr)?this.sizedRectangleSegments([2,5,10,40,40],p,1):this.wigglySegments(0,[10,20,50],0.05,15,p);
//  let segs = (p.y < 0)?this.sizedRectangleSegments([2,5,10,40,40],p,1):this.wigglySegments(0,[10,20,50],0.05,15,p);
 // let segs = Math.random()>0.5?this.wigglySegments(1, [10,20,50],0.05,15,p):this.wigglySegments(0,[10,20,50],0.05,15,p);
 // let segs = Math.random()>0.9?this.rectangleSegments([2,5,10,40,40],p,1):this.wigglySegments([20,50],0.13,15,p);
 // let segs =Math.random()>0.5?this.rectangleSegments([2,5,10,40,40],p,1): this.triangleSegments([2,5,10,40,40],p,1);
  let lines = segs.map((sg) => this.genLine(sg));
  const genRGBval = function () {
    return 155 + Math.floor(Math.random()*100);
  }
/*let r = genRGBval();
  let g = genRGBval();
  let b = genRGBval();*/
 // let clr = `rgb(${r},${g},${b})`;
  lines.forEach( (line) => line.stroke = clr);
  return [segs,lines];
}

rs.initialSegments = function () {
  let {width,height} = this; 
  let segs = this.rectangleSegments(width,height);
 /* let hw = 0.5*width;
  let hh = 0.5*width;
  let sg0 = LineSegment.mk(Point.mk(-hw,-hh),Point.mk(hw,-hh));
  let sg1 = LineSegment.mk(Point.mk(-hw,hh),Point.mk(hw,hh));
  let sg2 = LineSegment.mk(Point.mk(-hw,-hh),Point.mk(-hw,hh));
  let sg3 = LineSegment.mk(Point.mk(hw,-hh),Point.mk(hw,hh));
  let sg4 = LineSegment.mk(Point.mk(-hw,-hh),Point.mk(hw,hh));
  let sg5 = LineSegment.mk(Point.mk(hw,-hh),Point.mk(-hw,hh));
 // let segs = [sg0,sg1,sg2,sg3,sg4,sg5];*/
  //let segs = [sg0,sg1,sg2,sg3];
  let lines = segs.map((sg) => this.genLine(sg)); 
   // lines.forEach( (line) => line.stroke = 'transparent');

  return [segs,lines];
}

  
rs.initialize = function () {
  debugger;
  core.root.backgroundColor = 'black';
/*let r0 = geom.Rectangle.mk(Point.mk(-100,-100),Point.mk(100,100));
  let r1 = geom.Rectangle.mk(Point.mk(0,-100),Point.mk(100,100));
  let r2 = geom.Rectangle.mk(Point.mk(-100,0),Point.mk(100,100));
  let r3 = geom.Rectangle.mk(Point.mk(0,0),Point.mk(100,100));
  this.rectangles = [r0,r1,r2,r3];*/
	this.initializeDrop();
}

return rs;

});

