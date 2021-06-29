 https://zoom.us/j/81090675083?pwd=bmh1QVkwUUxFTE9tTHZ1SUoxakpJUT09
core.require('/line/line.js',function (linePP) {

let rs = svg.Element.mk('<g/>');
//addCgonMethods(rs);
//rs.setName('cgon0__0');
let ht = 200;
let topParams = {width:1.5*ht,height:ht,maxDrops:5000,maxTries:100,lineLength:2,backgroundColor:'rgb(2,2,2)',backgroundPadding:0.1*ht,minSeparation:0}
//topParams = {width:50,height:50,maxDrops:1000,maxTries:10,lineLength:2,backgroundColor:undefined,minSeparation:0}

//Object.assign(rs,topParams);


rs.initProtos = function () {
	core.assignPrototypes(this,'lineP',linePP);
	//return;
	this.lineP.stroke = 'white';
	this.lineP['stroke-width'] = 15;

}  

rs.initialize = function () {
	debugger;
  core.root.backgroundColor = 'black';
	this.initProtos();
	let lineP = this.lineP;
	let cs = this.set('cs',core.ArrayNode.mk());
	let y = 0;
	let maxh;
	let hinc = 10;
	let winc = 80;
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
		ln.show();
		cs.push(ln);

		y = y+ 1.0*ht;
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

