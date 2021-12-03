// A simple drop of wiggly sets of segments. Metal_2
core.require('/line/line.js','/generators/basics.js','/mlib/drop.js','/mlib/segsets.js',function (linePP,rs,addDropMethods,addSegsetMethods) {
addDropMethods(rs);
addSegsetMethods(rs);
rs.setName('drop_metal_2');
let wd = 400;
let topParams = {width:wd,height:wd,dropTries:40,backStripeColor:'rgb(2,2,2)',backStripePadding:0.1*wd,backStripeVisible:0}

Object.assign(rs,topParams);


rs.initProtos = function () {
	let lineP = this.set('lineP',linePP.instantiate()).hide();
	this.lineP['stroke-width'] = .3;
}  

rs.segParams = function () {
  let r = Math.random();
  let np = 4;
  let angle = Math.floor(r*np)* (Math.PI/np)
  let length = 2 + Math.floor(r*np)*4;
  return {angle,length};
}


rs.genSegments = function (p) {
  let {width,height} = this;
  let hh = height/2;
  let fr = (p.y+hh)/height;
  this.wigglySegments({zigzag:1,randomness:1,vertical:1,widths:[10,20,50],heightRatio:0.05,numSegs:15,pos:p});
  let params = {direction:Math.PI/4,zigzag:1,randomness:0,vertical:1,widths:[10],heightRatio:0.05,numSegs:4,pos:p};
  let params2 = Object.assign({},params);
  params2.direction = 0;
  let segs = (Math.random() < 0.5)?this.wigglySegments(params):this.wigglySegments(params2);
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
  let lines = segs.map((sg) => this.genLine(sg)); 
  return [segs,lines];
}

  
rs.initialize = function () {
  core.root.backgroundColor = 'black';
	this.initProtos();
	this.addBackStripe();
	this.initializeDrop();
}

return rs;

});

