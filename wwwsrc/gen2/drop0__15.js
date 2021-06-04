
core.require('/gen0/drop0.js','/shape/rectangle.js',function (addDropMethods,rectPP) {

let rs = svg.Element.mk('<g/>');
addDropMethods(rs);
rs.setName('drop0__13');
let ht = 400;
let topParams = {width:1*ht,height:ht,maxDrops:10000,maxTries:100,lineLength:15,backgroundColor:'rgb(2,2,2)',backgroundPadding:0.1*ht,minSeparation:0,}
//topParams = {width:50,height:50,maxDrops:1000,maxTries:10,lineLength:2,backgroundColor:undefined,minSeparation:0}

Object.assign(rs,topParams);


rs.finishProtos = function () {
	this.lineP.stroke = 'white';
	//this.lineP.stroke = 'black';
	//this.lineP.stroke = 'yellow';
	this.lineP['stroke-width'] = .2;
	this.lineP['stroke-width'] = 1;

}  




rs.genSegments = function (p) {
  debugger;
  let {lineLength}  = this;
	let dir = 0.05 *Math.random() * Math.PI;
  let segs = this.crossedSegments({direction:dir,length0:lineLength,length1:0.1*lineLength,pos:p});
	 const genRandomColor = function () {
    const rval  = function () {
      return Math.floor(Math.random()*250);
    }
    return  `rgb(${rval()},${rval()},${rval()})`;
  }
	let clr = genRandomColor();
	 let lines = segs.map((sg) => {
		 let ln = this.genLine(sg.end0,sg.end1,0.5);
		 ln.stroke  =clr;
		 return ln;
	 });

  return [segs,lines];
}


rs.initialize = function () {
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

