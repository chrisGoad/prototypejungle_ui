
core.require('/shape/rectangle.js','/line/line.js','/shape/circle.js','/gen0/grid0.js','/gen0/lines0.js',
function (rectPP,linePP,circlePP,addGridMethods,addLineMethods)	{ 
let rs = svg.Element.mk('<g/>');
addGridMethods(rs);

//let sqd = 128;


debugger;

	let gParams = {saveImage:true,numRows:40,numCols:40,width:300,height:300,pointJiggle:20,
	 opacity1:0.4,opacity2:0.4,opacity3:0.4,opacity4:0.4,randomizeOrder:0
		};

Object.assign(rs,gParams);
	
rs.initProtos = function () {
	core.assignPrototypes(this,'rectP',rectPP);
	
		core.assignPrototypes(this,'circleP',circlePP);
}  


rs.finishProtos = function () {
	this.rectP.stroke = 'rgba(0,0,0,.8)';
	this.rectP['stroke-width'] = 0.2;
	this.circleP.dimension = 2;
	this.circleP.fill = 'red';
	this.circleP.stroke = 'rgba(0,0,0,.8)';
	this.circleP['stroke-width'] = 0.2;
}


rs.setAppearance = function (shape,n) {
	for (let i=0;i<n;i++) {
		let subshape = shape['i'+i];
		supshape.show();
	}
	for (let i=n;i<16;i++_) {
		let subshape = shape['i'+i];
		subshape.hide();
	}
}

rs.stateOf = function (shape,ts) {
	let {timeStep,numTimeSteps} = this;
	let {waveLength,phase} = shape;
	let rpos = 2*Math.PI * ( timeStep%waveLength) + phase;
	let vl = Math.sin(rpos);
	let rs = 8+Math.round(vl*8);
	return rs;
}

rs.updateAppearance = function (shape) {
	let state = this.stateOf(shape);
	this.setAppearance(state);
}
	

let shapeCount = 0;
rs.shapeGenerator = function (rvs,cell,cnt) {
	debugger;
	console.log('center',cnt);
	shape.waveLength = this.numTimeSteps;
	shape.phase = 2*Math.PI *0;
	let {shapes,rectP,circleP,deltaX,deltaY} = this;
	console.log('dx',deltaX,'dy',deltaY);
	let shp = svg.Element.mk('<g/>');
	let icount = Math.floor(rvs.count);
  let count = Math.min(16,icount);
	count = 16;
	console.log('count',count);
  for (let i = 0;i<count;i++) {
		shapeCount++;
	  let subshape = circleP.instantiate();
		shp.set('s'+i,subshape);
		if (i<icount) {
			//subshape.show();
		}
		let xd = 0.2*(i%4)*deltaX;
		let yd = 0.2*Math.floor(i/4)*deltaY;
		//let xd = deltaX*(Math.random()-0.5);
		//let yd = deltaY*(Math.random()-0.5);
		//console.log('xd',xd,'yd',yd);
		let dp = Point.mk(xd,yd);
		//let ps = cnt.plus(dp);
		subshape.moveto(dp);
		
		subshape.update();
	}
	console.log('shapeCount',shapeCount);
	shapes.push(shp);
	this.setAppearance(shp,icount);
	return shp;
}




rs.innerInitialize = function () {
	core.root.backgroundColor = 'black';
	this.initProtos();
	this.finishProtos();
	if (this.backgroundColor) {
	  let bkr = this.set('rect',this.rectP.instantiate());
	  bkr.show();
	  bkr.width = this.width;
	  bkr.height = this.height;
		bkr.fill = this.backgroundColor;
		bkr['stroke-width'] = 0;
	}
	this.setupShapeRandomizer('count',{step:2,stept:25,min:2,max:10});
	this.initializeGrid();
}

rs.initialize = rs.innerInitialize;

return rs;

});

