core.require('/shape/rectangle.js','/gen0/Basics.js','/mlib/grid.js','/mlib/topRandomMethods.js',

//core.require(,'/grid/grid24cons.js','/grid/dim2dWalker2.js',
function (rectPP,rs,addGridMethods,addRandomMethods) {

addGridMethods(rs);
addRandomMethods(rs);
//core.require('/shape/rectangle.js','/gen0/GridRandom.js',
//function (rectPP,GridRandom)	{ 
//let rs = GridRandom;

	let wd = 400;
	let topParams = {width:wd,height:wd,backStripeColor:'rgb(2,2,2)',backStripePadding:0.2*wd,backStripeVisible:0};
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
		//let r = Math.max(0,rvs.red);
		//r = Math.max(0,rvs.r);
		let {r,g,b} = rvs;
		console.log('r',r);
		inner.moveto(Point.mk(jogx,jogy));
		inner.show();
		//shape.fill = `rgb(0,${Math.floor(r)},${Math.floor(g)})`;//${Math.floor(r)})`;
	//	inner.fill = `rgb(0,${Math.floor(r)},${Math.floor(r)})`;
		inner.fill = `rgb(${Math.floor(r)},${Math.floor(r)},${Math.floor(r)})`;
		inner.fill = `rgb(${Math.floor(r)},${Math.floor(g)},${Math.floor(g)})`;
		//r = Math.max(r,g);
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
	//this.setupShapeRandomizer('red', {step:30,min:100,max:250});//walkParams:walkParamsRed});
	this.setupColorRandomizer({step:30,min:50,max:240});

	this.initializeGrid();

}
		

return rs;

});

