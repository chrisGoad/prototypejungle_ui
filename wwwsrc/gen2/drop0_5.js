//active
core.require('/gen0/Drop.js','/line/line.js',function (rs,linePP) {

rs.setName('drop0_5');
let wd = 400;
let topParams = {width:wd,height:wd,maxDrops:100000,maxTries:100,lineLength:2,backStripeColor:'rgb(2,2,2)',backStripePadding:0.1*wd,backStripeVisible:0,minSeparation:0}
//let topParams = {width:200,height:200,maxDrops:10000,maxTries:10,lineLength:2,backgroundColor:undefined,minSeparation:0}

Object.assign(rs,topParams);


rs.initProtos = function () {
	  let lineP = this.set('lineP',linePP.instantiate()).hide();

	this.lineP.stroke = 'white';
	this.lineP.stroke = 'yellow';
	this.lineP['stroke-width'] = .1;
	this.lineP['stroke-width'] = .3;
}  

rs.segParams = function () {
  let r = Math.random();
  let np = 4;
  let angle = Math.floor(r*np)* (Math.PI/np)
  let length = 2 + Math.floor(r*np)*4;
  
 // let rs = r>0.5?Math.PI/2:0;
  return {angle,length};
}


rs.genSegments = function (p) {
  let {width,height} = this;
  let hh = height/2;
  let fr = (p.y+hh)/height;
  console.log('fr',fr);
 // let segs = this.wigglySegments({zigzag:1,randomness:1,vertical:1,widths:[10,20,50],heightRatio:0.05,numSegs:15,pos:p});
  let params = {direction:Math.PI/4,zigzag:1,randomness:0,vertical:1,widths:[10],heightRatio:0.05,numSegs:4,pos:p};
  let params2 = Object.assign({},params);
  params2.direction = 0;
  let segs = (Math.random() < 0.5)?this.wigglySegments(params):this.wigglySegments(params2);
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
  let r = genRGBval();
  let g = genRGBval();
  let b = genRGBval();
  let clr = `rgb(${r},${r},${r})`;
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
	this.initProtos();
	this.addBackStripe();
/*let r0 = geom.Rectangle.mk(Point.mk(-100,-100),Point.mk(100,100));
  let r1 = geom.Rectangle.mk(Point.mk(0,-100),Point.mk(100,100));
  let r2 = geom.Rectangle.mk(Point.mk(-100,0),Point.mk(100,100));
  let r3 = geom.Rectangle.mk(Point.mk(0,0),Point.mk(100,100));
  this.rectangles = [r0,r1,r2,r3];*/
	this.initializeDrop();
}

return rs;

});

