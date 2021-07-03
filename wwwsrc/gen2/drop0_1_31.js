 https://zoom.us/j/81090675083?pwd=bmh1QVkwUUxFTE9tTHZ1SUoxakpJUT09
core.require('/gen1/drop0_1.js','/line/line.js','/shape/zigzag.js',function (rs,linePP,zigzagPP) {

//let rs = svg.Element.mk('<g/>');
//addCgonMethods(rs);
rs.setName('drop0_1_31');
let ht = 5000;
//ht = 50;
let topParams = {width:1.5*ht,height:ht,maxDrops:2000,maxTries:100,lineLength:2,backgroundColor:'rgb(20,2,2)',backgroundPadding:0.1*ht,minSeparation:0}
//topParams = {width:50,height:50,maxDrops:1000,maxTries:10,lineLength:2,backgroundColor:undefined,minSeparation:0}

topParams = {width:ht,height:ht,numRows:20,numCols:30,maxDrops:10000,maxTries:10,endLoopss:10000,lineLength:50,backgroundColor:'rgb(2,2,2)',backgroundPadding:0.1*ht,separation:0,randomDirectionChange:0.03*Math.PI,fromEnds:1,sepNext:.1,lineExt:.2,onlyFromSeeds:1,extendWhich:'random',numSeeds:10,splitChance:0.5,splitAmount:0.08 * Math.PI,directionChange:0.025 * Math.PI}
Object.assign(rs,topParams);


rs.finishProtos = function () {
	core.assignPrototypes(this,'lineP',linePP);
	//return;
	this.lineP.stroke = 'white';
	this.lineP['stroke-width'] = 15;
	this.lineP['stroke-width'] = 15;
	core.assignPrototypes(this,'zigzagP',zigzagPP);
	this.zigzagP.stroke = 'cyan';
	this.zigzagP.height = 0.9*ht;
	this.zigzagP.width = ht/6;
	this.zigzagP.width = ht/10;
	this.zigzagP.zigwidth = ht/32;
	this.zigzagP.numzigs = 8;
	this.zigzagP.location =  Point.mk(0,0);// Point.mk(ht/2,0);
	this.zigzagP.fill = 'gray';
	this.zigzagP.fill = 'red';
		this.zigzagP['stroke-width'] = 1;

	

}  


rs.genSeeds = function () {
 debugger;
  let leftseeds =this.leftSideSeeds('cyan');
  let rightseeds =this.rightSideSeeds('cyan');

	let grs = this.concatEachArray([leftseeds,rightseeds]);
	///return seeds;
	return grs;
}


rs.initialSegments = function () {
	debugger;
  let {width,height,zig0,zig1} = this; 
	let zigzag0 = this.zigzagP.instantiate();
	//let zigzag1 = this.zigzagP.instantiate();
	zigzag0.show();
	//zigzag1.show();
	//zigzag1.location = Point.mk(-height/2,0);
	this.set('zig0',zigzag0);
	//this.set('zig1',zigzag1);
	zigzag0.update();
	let segs = [];
	let lines = [];
	//zigzag1.update();
	/*let lineP = this.lineP;
	let lines  = [];
	let segs = [];
	//let cs = this.set('cs',core.ArrayNode.mk());
	let y = -2000;
	let maxh;
	let hinc = 10;
	let winc = 80;
	winc = 60;
	let n = 40;
	let gap = 0;
	let wd = 20;
	let ht = 10;
	let fc = 0;
	for  (let i=0;i<n;i++) {
		let hw = 0.5*wd;
	  let hh = 0.5*ht;
		if (i===(n/2)) {
			hinc = -hinc;
			winc = -winc;
		}
		let ln = lineP.instantiate();
		let rn1 = fc*(Math.random()-1);
		let rn2 = fc*(Math.random()-1);
		let e0 = Point.mk(-wd,y+rn1);
		let e1 = Point.mk(wd,y+rn2);
		ln.setEnds(e0,e1);
		ln.stroke  = 'blue';
		let sg = LineSegment.mk(e0,e1)
		ln.show();
		lines.push(ln);
		segs.push(sg);

		y = y+ 1.0*ht;
		ht = ht +hinc;
		wd = wd +winc;

	}*/
	debugger;
	let zsegs0 = zigzag0.segments;
//	let zsegs1 = zigzag1.segments;
	segs.push(...zsegs0);
	//segs.push(...zsegs1);
 // let segs = this.rectangleSegments(width,height);
 // let lines = segs.map((sg) => this.genLine(sg)); 
  return [segs,lines];
}
rs.genSegments = function (p) {
  return this.genSegmentsFan(p,'white');
}
	
	
	
rs.genSegmentss = function (p) {
	let sep = 100;
	let len = 200;
	let angle = Math.random() > 0.2?0.5 * Math.PI:0.75*Math.PI;
  //let p = this.genRandomPoint();
	let seg = this.genSegment(p,len,angle);
	let ln = this.genLine(seg);
	ln.stroke = 'yellow';
	ln.stroke = 'gray';
	let eseg = this.genSegment(p,len+sep,angle);
  debugger;
	return [[eseg],[ln]];
}

rs.initialize = function () {
	debugger;
  core.root.backgroundColor = 'rgb(200,0,0)';
  core.root.backgroundColor = 'rgb(0,0,0)';
	this.initProtos();
/*	let zigzag0 = this.zigzagP.instantiate();
	let zigzag1 = this.zigzagP.instantiate();
		zigzag0.show();
		zigzag1.show();
		zigzag1.location = Point.mk(-ht/2,0);
		this.set('zig0',zigzag0);
		this.set('zig1',zigzag1);
		zigzag0.update();
		zigzag1.update();*/
		this.initializeDrop();
		
}


		/*
		c.width = width + 4*i;
		if (i<10) {
			maxh  = height + 2*i;
		
		  c.height =  maxh;
		} else {
			debugger;
			c.height = maxh - 2*(i-10); 
		}
		hw = 0.5 * c.width;
		//c.update();
		cs.push(c);
		c.show();
		c.moveto(Point.mk(-hw,y));
		y = y + 2*(c.height-1)-2*armHeight;
		
	}
	y = height - 1.0*armHeight;
  hw = 0.5*width;
	for (let i=0;i<20;i++) {
		let c = cgonP.instantiate();
		if (i<10) {
			maxh  = height + 2*i;
		
		  c.height =  maxh;
		} else {
			debugger;
			c.height = maxh - 2*(i-10); 
		}

		c.rotation = Math.PI;
		cs.push(c);
		c.show();
		c.moveto(Point.mk(hw,y));
				y = y + 2*(c.height-1)-2*armHeight;


	}
	*/

  

return rs;

});

