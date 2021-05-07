

core.require('/shape/rectangle.js','/gen0/grid0.js',
function (rectPP,addGridMethods)	{ 

  let rs = svg.Element.mk('<g/>');
  addGridMethods(rs);
	let wd = 400;
	let topParams = {width:wd,height:wd,backgroundColor:'rgb(2,2,2)',backgroundPadding:0.1*wd};
	Object.assign(rs,topParams);
	//rs.initProtos();
	rs.saveImage = 1;
	rs.setName('grid0_4');
  rs.loadFromPath = 0;
	
	
	rs.numRows= 100;
	rs.numCols = 100;
	rs.width = 400;
	rs.height = 400;
	
rs.initProtos = function () {
	core.assignPrototypes(this,'rectP',rectPP);
	//this.rectP.stroke = 'rgb(255,255,255,1)';
	this.rectP.fill = 'white';
	this.rectP['stroke-width'] = 0;
	this.rectP.width = 1;
	this.rectP.height = 4;
}  



rs.shapeGenerator = function (rvs,cell) {
		let shapes = this.shapes;
		if ((cell.x == 50) && (cell.y = 50)) {
			debugger;
		}
		let {rectP,deltaX,deltaY} = this;
		let rb = Math.random() > 0.5;
		let shape  = svg.Element.mk('<g/>');

		//let inner = this.circleP.instantiate();
		let inner = this.rectP.instantiate();
		shape.set('i',inner);
		if (rb) {
			inner.width = 1;
			inner.height = 4;
		} else {
			inner.width = 4;
			inner.height = 1;
		}
		shapes.push(shape);
		let jogx = rvs.jogx;
		let jogy = rvs.jogy;
		let r = Math.max(0,rvs.red);
		inner.moveto(Point.mk(jogx,jogy));
		inner.show();
		//shape.fill = `rgb(0,${Math.floor(r)},${Math.floor(g)})`;//${Math.floor(r)})`;
	//	inner.fill = `rgb(0,${Math.floor(r)},${Math.floor(r)})`;
		inner.fill = `rgb(${Math.floor(r)},${Math.floor(r)},${Math.floor(r)})`;
		//shape.fill = `rgb(${Math.floor(g)},${Math.floor(g)},${Math.floor(g)})`;
		
		//shape.update();
		shape.show();
		return shape;
	}
		
		

rs.initialize = function () {
	core.root.backgroundColor = 'black';
	this.initProtos();
	let rnp = {min:0,max:0,step:0}
	let numCols = this.numCols;
	let numRows = this.numRows;
	const walkParams = function (i,j) {
		debugger;
		let hw = 0.5 * numCols;
		let frw = Math.abs(i - hw)/hw;
		let hh = 0.5 * numRows;
		let frh = Math.abs(j - hh)/hh;
		let rtfr = Math.max(frw,frh);
		let fr = rtfr*rtfr * rtfr;
		//let fr = i/numCols;
		let stepFactor,maxFactor;
		
		stepFactor = 4;
		maxFactor = 25;
		maxFactor = 15;
		rnp.min = 0;
		rnp.max = fr * maxFactor;
 		rnp.step = fr *stepFactor;
		return rnp;
	}
	const walkParamsDim = function (i,j) {
		return walkParams(i,j,0);
	}
	const walkParamsRed = function (i,j) {
		return walkParams(i,j,1);
	}
  this.setupShapeRandomizer('jogx', {walkParams:walkParams});
  this.setupShapeRandomizer('jogy', {walkParams:walkParams});
	//this.setupShapeRandomizer('red', {numRows,numCols,step:30,min:150,max:250});//walkParams:walkParamsRed});
	this.setupShapeRandomizer('red', {step:30,min:100,max:250});//walkParams:walkParamsRed});
	this.initializeGrid();

}
		

return rs;

});

