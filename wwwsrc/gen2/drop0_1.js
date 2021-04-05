
core.require('/gen0/drop0.js',function (addDropMethods) {

let rs = svg.Element.mk('<g/>');
addDropMethods(rs);
rs.setName('drop0_1');
let topParams = {width:300,height:300,maxDrops:10000,maxTries:100,lineLength:2,backgroundColor:undefined,minSeparation:0}

Object.assign(rs,topParams);


rs.finishProtos = function () {
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

rs.initialSegments = function () {
  let {width,height} = this; 
  let hw = 0.5*width;
  let hh = 0.5*width;
  let sg0 = LineSegment.mk(Point.mk(-hw,-hh),Point.mk(hw,-hh));
  let sg1 = LineSegment.mk(Point.mk(-hw,hh),Point.mk(hw,hh));
  let sg2 = LineSegment.mk(Point.mk(-hw,-hh),Point.mk(-hw,hh));
  let sg3 = LineSegment.mk(Point.mk(hw,-hh),Point.mk(hw,hh));
  let segs = [sg0,sg1,sg2,sg3];
  let lines = segs.map((sg) => this.genLine(sg));  
  return [segs,lines];
}



rs.genSegments = function (p) {
  let sizes = [2,5,10,20,40];
  let which = Math.floor(Math.random()*5);
  let sz = sizes[which];
  let wd = sz;
  let ht = sz;
  debugger;

  let sg0 = LineSegment.mk(Point.mk(0,0).plus(p),Point.mk(wd,0).plus(p));
  let sg1 = LineSegment.mk(Point.mk(0,ht).plus(p),Point.mk(wd,ht).plus(p));
  let sg2 = LineSegment.mk(Point.mk(0,0).plus(p),Point.mk(0,ht).plus(p));
  let sg3 = LineSegment.mk(Point.mk(wd,0).plus(p),Point.mk(wd,ht).plus(p));
  //let sg0 = LineSegment.mk(Point.mk(0,0).plus(p),Point.mk(0.5*wd,ht).plus(p));
  //let sg1 = LineSegment.mk(Point.mk(0.5*wd,ht).plus(p),Point.mk(wd,0).plus(p));
  let segs = [sg0,sg1,sg2,sg3];
  let lines = segs.map((sg) => this.genLine(sg));
/*
  let ln0 = this.genLine(sg0);
  let ln1 = this.genLine(sg1);
  let ln2 = this.genLine(sg2);
  let ln3 = this.genLine(sg3);*/
  const genRGBval = function () {
    return 55 + Math.floor(Math.random()*200);
  }
  let r = genRGBval();
  let g = genRGBval();
  let b = genRGBval();
  let clr = `rgb(${r},${r},${r})`;
  lines.forEach( (line) => line.stroke = clr);
  /*ln0.stroke = clr;
  ln1.stroke = clr;
  ln2.stroke = clr;
  ln3.stroke = clr;*/
 /* if (which === 0) {
  ln0['stroke-width']  = 1;
  ln1['stroke-width']  = 1;
}*/

  return [segs,lines];
}
  
rs.initialize = function () {
  core.root.backgroundColor = 'black';
  let r0 = geom.Rectangle.mk(Point.mk(-100,-100),Point.mk(100,100));
  let r1 = geom.Rectangle.mk(Point.mk(0,-100),Point.mk(100,100));
  let r2 = geom.Rectangle.mk(Point.mk(-100,0),Point.mk(100,100));
  let r3 = geom.Rectangle.mk(Point.mk(0,0),Point.mk(100,100));
  this.rectangles = [r0,r1,r2,r3];
	this.initializeDrop();
}

return rs;

});

