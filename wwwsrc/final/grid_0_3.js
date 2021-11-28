
core.require('/shape/blurredCircle.js','/gen1/grid_0.js',
function (blurredCirclePP,constructor) {
  debugger;	//this.initProtos();

  let rs = constructor();
	//rs.initProtos();
	rs.saveImage = 0;
	rs.setName('grid_0_3');
  rs.loadFromPath = 0;
	core.assignPrototypes(rs,'blurredCircleP',blurredCirclePP);
  rs.blurredCircleP.__contents.stroke = 'transparent';
  rs.blurredCircleP.__contents.fill = 'rgb(255,0,0)';//'red';
  rs.blurredCircleP.dimension = 12;
  rs.blurredCircleP.stdDeviation  = 2;


	rs.numCols= 40;
	rs.numCols= 10;
  //let numRows = rs.numRows= 41;
  rs.numRows= 40;
  rs.numRows= 10;
  rs.width = 100;
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
		//if (((x === rCell.x)||(y===rCell.y))&&(Math.random() < 0.2)) {
		if (isRcell) {
			rs = this.rectP.instantiate();
		} else {
			rs = this.blurredCircleP.instantiate();
			isCircle = true;
		}
		rs.show();
		let cpnt = Point.mk(x,y);
		let ln = (cpnt.difference(centerCell)).length();
		let lnm = (maxLn - ln)/maxLn;
		console.log('length ',lnm);
		let sz =2;//*lnm;
		if (0 && (lnm > 0)) {
			if (isCircle) {
			  rs.dimension = sz;
			} else {
				rs.width = sz; 
				rs.height = sz; 
			}
		  shapes.set(index,rs);
		  return rs;
		}
	}
	
	rs.initialize = function () {
		this.initProtos();
		let {numRows,numCols} = this;
		this.rCells = [];
		this.rectP.fill = 'red';
		for (let i=0;i<5;i++) {
			this.rCells.push(this.randomCell(2));
		}
		let hw = 0.5 * numRows;
		let hh = 0.5 * numRows;
		this.set('centerCell',Point.mk(hw,hh));
		this.maxLn = hw;//this.centerCell.length();
		core.root.backgroundColor = 'black';
			 debugger;
		this.setupBoundaryRandomizer('color',{step:35,min:20,max:250});
		this.initializeGrid();
  }	
  return rs;
});

