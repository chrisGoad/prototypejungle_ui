
core.require('/gen0/drop0.js','/shape/rectangle.js',function (addDropMethods,rectPP) {

let rs = svg.Element.mk('<g/>');
addDropMethods(rs);
rs.setName('drop0__16');
let ht = 600;
let topParams = {width:1*ht,height:ht,maxDrops:100000,maxTries:100,lineLength:5,backgroundColor:'rgb(2,2,2)',backgroundPadding:0.1*ht,minSeparation:10}
//topParams = {width:50,height:50,maxDrops:1000,maxTries:10,lineLength:2,backgroundColor:undefined,minSeparation:0}

Object.assign(rs,topParams);


rs.finishProtos = function () {
	this.lineP.stroke = 'blue';
	//this.lineP.stroke = 'black';
	//this.lineP.stroke = 'yellow';
	this.lineP['stroke-width'] = 1.0;
	//this.lineP['stroke-width'] = 1;

}  




rs.genSegments = function (p) {
  debugger;
  let {lineLength,minSeparation:sep}  = this;
	let dir = 0.00005 *Math.random() * Math.PI;
	let clr = 'rgb(200,200,250)';
	let dd1 = Math.abs(p.x - p.y);
	let dd2 = Math.abs(p.x + p.y);
	let dt = 10;
	if ((dd1 < dt) || (dd2<dt))  {
		return;
	}
	let ad1 = p.x > p.y;
	let ad2 = p.x + p.y < 0;
	if (ad1) {
		if (ad2) {
		//if (Math.random()<0.5) {
			dir = 0.5 * Math.PI;
			//clr = 'rgb(0,200,200)'
			sep = 4;
		} else {
			dir  = Math.PI;
						clr = 'rgb(200,0,200)'
						sep = 10;
						clr = 'rgb(200,250,200)'

		}
	} else {
		if (ad2) {
			dir = 1.5*Math.PI;
						clr = 'rgb(200,250,200)';
						//clr  = 'green'
						sep = 10;

		} else {
			sep = 4;
			dir = 0;
		}
	}
		//	clr = 'white';
			/*
	if (p.x > p.y) {
		dir = 0.5*Math.PI;
		//clr = 'blue';
	}
	if (ad2) {
		//dir = 0.5*Math.PI;
		clr = 'blue';
	}*/
	let ln = lineLength + 0.8*Math.random()*lineLength;
	let segs;
	let fc = 3;
	let wh;
	let esegs;
	if (Math.random() < -0.015) {
    segs = this.rectangleSegments(fc*ln,fc*ln,p);
		esegs = segs;
		wh = 'rectangle';
	} else {
    segs = this.crossedSegments({direction:dir,length0:ln,length1:ln,pos:p,centered:0});
    esegs = this.crossedSegments({direction:dir,length0:ln+sep,length1:ln+sep,pos:p,centered:0});
		wh = 'cross';
	}
	 const genRandomColor = function () {
    const rval  = function () {
      return Math.floor(Math.random()*250);
    }
    return  `rgb(${rval()},${rval()},${rval()})`;
  }
//	let clr = genRandomColor();
	 let lines = segs.map((sg) => {
		 let ln = this.genLine(sg.end0,sg.end1,0.5);
		 ln.stroke = clr;
		// ln.stroke  = (wh==='rectangle')?'red':'white';
		 if (wh === 'rectangle') {
			 ln['stroke-width'] =1;
		 }
		 return ln;
	 });

  return [esegs,lines];
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

