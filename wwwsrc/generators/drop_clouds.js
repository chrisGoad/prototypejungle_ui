core.require('/line/line.js','/generators/basics.js','/mlib/drop.js','/mlib/interpolate.js','/mlib/segsets.js',
function (linePP,rs,addDropMethods,addInterpolateMethods,addSegsetMethods) {
addDropMethods(rs);
addInterpolateMethods(rs);
addSegsetMethods(rs);
rs.setName('drop_clouds');
let topParams = {width:600,height:400,maxDrops:100000,dropTries:50,lineLength:2,backgroundColor:'rgb(1,1,1)',backgroundPadding:40,minSeparation:0}

Object.assign(rs,topParams);


rs.initProtos = function () {
	let lineP = this.set('lineP',linePP.instantiate()).hide();
	this.lineP.stroke = 'white';
	this.lineP['stroke-width'] = .6;
}  

rs.genSegments = function (p) {
  let {width,height} = this;
  let params = {direction:0.75*Math.PI,zigzag:1,randomness:0,vertical:0,widths:[10],heightRatio:0.05,numSegs:4,pos:p};
  let which = this.computeWhichByCornerInterpolation(p);
  let rgb0 = [250,0,0];
  let rgb2 = [0,0,250];
  let rgb1 = [250,250,250];
  let rgb3 = rgb1;
  let clr = this.computeColorByInterpolation(p,rgb0,rgb1,rgb2,rgb3);
  let segs;
  let sizes = [5,10,20];
  if (which === 0) {
    segs = this.sizedRectangleSegments(sizes,p); //Upper left
  } else if (which === 1) {
     segs = this.wigglySegments(params);  //  Upper right
  } else if (which === 2) { // Lower right
    segs = this.sizedRectangleSegments(sizes,p); //Lower left
  } else if (which === 3) {
     segs = this.wigglySegments(params); //  lower right
  }
  let lines = segs.map((sg) => this.genLine(sg));
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
	this.initializeDrop();
}

return rs;

});

