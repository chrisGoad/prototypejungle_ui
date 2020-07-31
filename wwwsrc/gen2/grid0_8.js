
core.require('/shape/rectangle.js','/gen0/grid0.js',
function (rectPP,addGridMethods) {
  debugger;	//this.initProtos();


  let rs = svg.Element.mk('<g/>');
  addGridMethods(rs);
	//rs.initProtos();
	rs.saveImage = true;
	rs.setName('grid0_8');
  rs.loadFromPath = 0;
	
rs.initProtos = function () {
	core.assignPrototypes(this,'rectP',rectPP);
	//this.rectP.stroke = 'rgb(255,255,255,1)';
	this.rectP.fill = 'white';
	this.rectP['stroke-width'] = 0;
	this.rectP.width = 1;
	this.rectP.height = 4;
}  

	let numRows = rs.numRows= 50;
		let numCols = rs.numCols = 50;
		rs.width = 200;
	rs.height = 200;
	
	
	rs.shapeGenerator = function (rvs,cell) {
	
		let {rectP,shapes} = this;
		let v = rvs.v;
		let shape  = svg.Element.mk('<g/>');
		let inner = this.rectP.instantiate();
		shape.set('i',inner);
		let r = rvs.red;
		if (v<0.5) {
			inner.width = 4;
			inner.height = 3;
			inner.fill = 'rgb(100,50,50)';
			inner.fill = `rgb(${Math.floor(r)},${Math.floor(r)},${Math.floor(r)})`;
		} else {
			inner.width = 3;
			inner.height = 4;
			inner.fill = 'rgb(50,50,100)';
			inner.fill = `rgb(${Math.floor(r)},${Math.floor(r)},${Math.floor(r)})`;
		}
		shapes.push(shape);
		inner.update();
		inner.show();
		//shape.fill = `rgb(0,${Math.floor(r)},${Math.floor(g)})`;//${Math.floor(r)})`;
	//	inner.fill = `rgb(0,${Math.floor(r)},${Math.floor(r)})`;
		//inner.fill = `rgb(${Math.floor(r)},${Math.floor(r)},${Math.floor(r)})`;
		//shape.fill = `rgb(${Math.floor(g)},${Math.floor(g)},${Math.floor(g)})`;
		
		//shape.update();
		shape.show();
		debugger;
		return shape;
	}


rs.initialize = function () {
	core.root.backgroundColor = 'black';
	this.initProtos();
	
	debugger;
	//let convergenceValue = 0
	let rnp = {min:0,max:0,step:0}
	const walkParams = function (i,j) {
	//	debugger;
		let t0 = 0.1*numCols;
		let t1 = 0.5*numCols;
		let t2 = 0.9*numCols;
		let step = 0.3;
		let max,min;
	  if (i < t0) {
			min = 0;
			max = i/t0;
			max = 0;
		} else if (i < t2) {
			min = 0;
			max = 1;
		} else {
			min  = (i-t2)/(1-t2);
			min  = 1;
			max = 1;
		}
		rnp.min = min;
		rnp.max = max;
 		rnp.step = step;
		return rnp;
	}

		
		
this.setupShapeRandomizer('v', {walkParams});
this.setupShapeRandomizer('red', {step:30,min:100,max:200});


		
		
		

 
this.initializeGrid();
}
return rs;

});

