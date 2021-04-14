
//core.require('/gen0/drop0.js',function (addDropMethods) {
core.require('/gen1/drop0_0.js',function (rs) {

rs.setName('drop0_0_0');
let topParams = {width:400,height:400,maxDrops:100000,maxTries:100,lineLength:2,backgroundColor:undefined,minSeparation:0,backgroundColor:'black'}
//topParams = {width:200,height:200,maxDrops:10000,maxTries:10,lineLength:2,backgroundColor:undefined,minSeparation:0,backgroundColor:'rgb(125,125,125)'}

Object.assign(rs,topParams);


rs.finishProtos = function () {
	this.lineP.stroke = 'white';
	this.lineP.stroke = 'yellow';
	this.lineP['stroke-width'] = .1;
	this.lineP['stroke-width'] = .6;
}  

rs.genSegments = function (p) {
  let {width,height} = this;
  let params = {direction:Math.PI/4,zigzag:1,randomness:0,vertical:0,widths:[10],heightRatio:0.05,numSegs:4,pos:p};
  debugger;
  let params1 = Object.assign({},params);
  params1.direction = 0.75*Math.PI;
  let params2 = Object.assign({},params);
  params2.direction = Math.PI/2;
  let params3 = Object.assign({},params);
  params3.direction = 0;
  let which = this.computeWhichByCornerInterpolation(p);
  let rgb0 = [250,0,0];
  let rgb2 = [0,0,250];
  let rgb1 = [250,250,250];
  let rgb3 = rgb1;
 /* let rgb0 = [255,255,255];
  //let rgb0 = [0,0,255];
  let rgb1 = [0,0,0];
  let rgb2 = rgb0
  let rgb3 = rgb1;*/
  let clr = this.computeColorByInterpolation(p,rgb0,rgb1,rgb2,rgb3);
  let segs;
  if (which === 0) {
    segs = this.wigglySegments(params);
  } else if (which === 1) {
    segs = this.wigglySegments(params1);
  } else if (which === 2) {
    segs = this.wigglySegments(params2);
  } else if (which === 3) {
    segs = this.wigglySegments(params3);
  }
  let lines = segs.map((sg) => this.genLine(sg));
  const genRGBval = function () {
    return 155 + Math.floor(Math.random()*100);
  }
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
  debugger;
  core.root.backgroundColor = 'black';
	this.initializeDrop();
}

return rs;

});

