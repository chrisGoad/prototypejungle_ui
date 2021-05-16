core.require('/gen2/grid0_5_9.js','/gen0/basics.js',
function (sub,addMethods) {
	
  
  debugger;	//this.initProtos();
  //core.vars.whereToSave = 'images/grid_1_1.jpg';
	let rs = svg.Element.mk('<g/>');
	addMethods(rs);
	rs.setName('grid0_5_10');
	//let grid1 = rs.set('grid1',sub);
	let grid1 = sub.instantiate();
	//let grid1 = rs.set('grid1',sub.instantiate());
	let grid2 = sub.instantiate();
	let grid3 = sub.instantiate();
	let grid4 = sub.instantiate();
	/*let grid2 = rs.set('grid2',sub.instantiate());
	let grid3 = rs.set('grid3',sub.instantiate());
	let grid4 = rs.set('grid4',sub.instantiate());*/
	let wd = 2.0*grid1.width;
	let topParams = {width:wd,height:wd,backgroundColor:'rgb(2,2,2)',backgroundPadding:0.1*wd};
	Object.assign(rs,topParams);

	grid1.randomizingFactor = 1.5;
	grid2.randomizingFactor = 1.5;
	grid3.randomizingFactor = 0;
	grid3.randomizingFactor = 1.5;
	grid3.randomizingFactor = 0;
	grid3.loadFromPath = 0;
	grid4.randomizingFactor = 0.8;
	grid4.randomizingFactor = 2;
	
	rs.initialize = function () {
		debugger;
	  let {width} = grid1;
		this.addBackground();
		this.set('grid1',grid1);
		this.set('grid2',grid2);
		this.set('grid3',grid3);
		this.set('grid4',grid4);
		grid1.show();
    grid1.initialize();
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