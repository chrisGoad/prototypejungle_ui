
core.require('/gen0/cgon0.js',function (addCgonMethods) {

let rs = svg.Element.mk('<g/>');
addCgonMethods(rs);
rs.setName('cgon0__0');
let ht = 200;
let topParams = {width:1.5*ht,height:ht,maxDrops:5000,maxTries:100,lineLength:2,backgroundColor:'rgb(2,2,2)',backgroundPadding:0.1*ht,minSeparation:0}
//topParams = {width:50,height:50,maxDrops:1000,maxTries:10,lineLength:2,backgroundColor:undefined,minSeparation:0}

//Object.assign(rs,topParams);

rs.finishProtos = function () {
	let cgonP = this.cgonP;
	cgonP['stroke-width'] =0.2;
	cgonP.stroke = 'yellow';
	cgonP.fill = 'red';
	cgonP.width = 20;
  cgonP.height = 10;
  cgonP.armHeight = 25;
  cgonP.strutWidth = 3;
  cgonP.rotation = 0;
	//this.cgonP.rotation = .1*Math.PI;
	this.rectP.width = 10;
	this.rectP.height = 10;
	this.rectP.fill = 'red';
}

rs.initialize = function () {
	debugger;
  core.root.backgroundColor = 'black';
	this.initProtos();
	let cgonP = this.cgonP;
	let {width:wd,height:ht,armHeight:aht} = cgonP;
	let cs = this.set('cs',core.ArrayNode.mk());
	let y = 0;
	let maxh;
	let hinc = 10;
	let winc = 80;
	let n = 50;
	let gap = 0;
	for  (let i=0;i<n;i++) {
		let hw = 0.5*wd;
	  let hh = 0.5*ht;
		if (i===(n/2)) {
			hinc = -hinc;
			winc = -winc;
		}
		let cR = cgonP.instantiate();
		cR.rotation = Math.PI;
		cR.height = ht;
		cR.width = wd;
		cR.show();
		cs.push(cR);
		let cL = cgonP.instantiate();
		cL.height = ht;
		cL.width = wd;
		cL.show();
		cs.push(cL);
		cL.moveto(Point.mk(-0.5*gap-hw,y));
		//y = y+ 0.5*ht+aht+hh;
		y = y+ 1.0*ht - aht;
		cR.moveto(Point.mk(0.5*gap+hw,y));
		//cR.moveto(Point.mk(0.5*gap+hw,y-hh));
	//  ht = ht+2;
		y = y+ 1.0*ht + 0.5*hinc -aht;
		ht = ht +hinc;
		wd = wd +winc;

	}
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

