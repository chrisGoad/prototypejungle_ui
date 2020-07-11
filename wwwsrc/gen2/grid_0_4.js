
core.require('/gen1/grid_0.js',
function (constructor) {
  debugger;	//this.initProtos();

  let rs = constructor();
	//rs.initProtos();
	rs.saveImage = 0;
	rs.setName('grid_0_3');
  rs.loadFromPath = 0;
	
	rs.numCols= 40;
  //let numRows = rs.numRows= 41;
  rs.numRows= 40;
  rs.width = 150;
  rs.height = 100;
 // rs.visChance= 1;
  //rs.visChance= 1;
  rs.pointJiggle =  0;
	
	  rs.boundaryLineGenerator =  function () {};

  rs.shapeGenerator =  function (rvs,cell,cnt) {
    debugger;
	  let {shapes,centerCell,maxLn,rCells} = this;
		let isCircle,rs;
		
		let {index,x,y} = cell;
		//if (Math.random() < 0.5) {
		//if ((x === 15)&&(y===15)) {
		let isRcell = 0;
		rCells.forEach(function (rcell) {
			if ((rcell.x === x) && (rcell.y === y)) {
				isRcell = 1;
			}
		});
		let isRect = Math.random() < 0.5;
		//if (((x === rCell.x)||(y===rCell.y))&&(Math.random() < 0.2)) {
		if (isRect) {
			rs = this.rectP.instantiate();
			//rs = this.circleP.instantiate();
		} else {
			rs = this.circleP.instantiate();
			isCircle = true;
		}
		rs.show();
		let cpnt = Point.mk(x,y);
		let ln = (cpnt.difference(centerCell)).length();
		let ln2 = Math.abs(ln - maxLn/2);
		let lnm = (maxLn - ln)/maxLn;
		let lnm2 = (maxLn - ln2)/maxLn;
		console.log('length ',lnm);
		let sz =.2+2*lnm2*lnm2*lnm2*lnm2;
		//let sz = 1+Math.random();
		if (0 || (lnm > 0)) {
			if (isCircle) {
			  rs.dimension = sz;
			} else {
				rs.width = sz; 
				rs.height = sz;
			  //rs.dimension = 2; 
			}
		  shapes.set(index,rs);
			//let clr = rvs.color;
			/*if (Math.random() < 0.4) {
				rs.fill = 'red';
			} else {
				rs.fill = 'blue';
			}*/
			//rs.fill = `rgb(${clr},0,${255-clr})`;
			console.log('fill',rs.fill);
			let fr = .5;
			if (isRcell) {
				if (isCircle) {
					rs.fill = 'blue';
			//	rs.fill = 'yellow';
					rs.dimension = fr * rs.dimension;
					//rs.dimension = .5;
				} else {
					rs.fill = 'red';
					//rs.fill = 'white';
					rs.width = rs.height= fr * rs.width;
				}
			}
			rs.update();
		  return rs;
		}
	}
	
	rs.initialize = function () {
		this.initProtos();
		let {numRows,numCols} = this;
		this.rCells = [];
		this.rectP.fill = 'blue';		
		this.circleP.fill = 'red';		

		for (let i=0;i<10;i++) {
					this.rCells.push(this.randomCell(2));

		}
		let hw = 0.5 * numRows;
		let hh = 0.5 * numRows;
		this.set('centerCell',Point.mk(hw,hh));
		this.maxLn = hh;//this.centerCell.length();
		core.root.backgroundColor = 'black';
			 debugger;
		this.setupShapeRandomizer('color',{step:35,min:20,max:250});
		this.initializeGrid();
  }	
  return rs;
});

