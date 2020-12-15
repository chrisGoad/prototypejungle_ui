core.require('/gen1/spatter0.js','/gen0/animation.js',
function (sub,addMethods) {
	

  debugger;	//this.initProtos();
  //core.vars.whereToSave = 'images/grid_1_1.jpg';
	let rs = svg.Element.mk('<g/>');
	addMethods(rs);
	rs.setName('multi0');
	
	//let grid1 = rs.set('grid1',sub);
	let grid1 = rs.set('grid1',sub.instantiate());
	grid1.numDrops = 1000;
	
	rs.drawLine = function (end0,end1,n) {
	  let {circles} = this;
		let circleP = this.grid1.circleP;
		let vec = end1.difference(end0);
		let intv = vec.times(1/(n-1));
		for (let i = 0;i<n;i++) {
			let ps = end0.plus(intv.times(i));
			let circle=circleP.instantiate();
			//circle.dimension = 30;
			circle.moveto(ps);
	    circles.push(circle)
			circle.show();
		}
	}
	
	rs.numDrawn = 0;
	rs.drawLine = function (end0,end1,sep) {
		debugger;
	  let {circles} = this;
		let circleP = this.grid1.circleP;
		let shapes = this.grid1.shapes;
		let vec = end1.difference(end0);
		let ln = vec.length();
		let n = Math.floor(ln/sep);
		let intv = vec.times(1/(n-1));
		let nmd = this.numDrawn;
		let nn = nmd+n;
		for (let i = 0;i<n;i++) {
			let ps = end0.plus(intv.times(i));
			let circle=shapes[i+nmd];
		///	circle.fill = 'white';
			//circle.dimension = 30;
			circle.moveto(ps);
	    //circles.push(circle)
			//circle.show();
		}
		this.numDrawn = nn;
	}
			
			
		
		
	rs.initialize = function () {
		debugger;
	  let {width,height} = grid1;
		let sep = 40;
		let hwd = 0.5 * width;
		let hht = 0.5 * height;
		grid1.show();
    grid1.initialize();
		this.set('circles',core.ArrayNode.mk());
    let end0 = Point.mk(-hwd,-hht);
    let end1 = Point.mk(hwd,hht);
		this.drawLine(end0,end1,sep);
		end0 = Point.mk(0,-hht);
		end1 = Point.mk(0,hht);
		this.drawLine(end0,end1,sep);
		return;
		//debugger;
	  grid2.initialize();
	  grid3.initialize();
	  grid4.initialize();
	  let mv = 0.5*width;
		grid1.moveto(Point.mk(-mv,-mv));
		grid2.moveto(Point.mk(mv,-mv));
		grid3.moveto(Point.mk(-mv,mv));
		grid4.moveto(Point.mk(mv,mv));
					
						this.draw();
	}
	return rs;
	//this.addTheBox();
});