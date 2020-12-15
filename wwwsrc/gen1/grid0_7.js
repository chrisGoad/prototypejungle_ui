
core.require('/shape/rectangle.js','/line/line.js','/shape/circle.js','/gen0/grid0.js','/gen0/lines0.js',
function (rectPP,linePP,circlePP,addGridMethods,addLineMethods)	{ 
let rs = svg.Element.mk('<g/>');
addGridMethods(rs);

//let sqd = 128;


debugger;

	let gParams = {saveImage:true,numRows:40,numCols:40,width:250,height:250,pointJiggle:20,
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
	this.circleP.dimension = 5;
	this.circleP.fill = 'red';
	this.circleP.stroke = 'rgba(0,0,0,.8)';
	this.circleP['stroke-width'] = 0.2;
}


rs.setAppearance = function (shape,phase) {
	let {randomOrder} = this;
	for (let i=0;i<16;i++) {
		let subshape = shape['s'+i];
	//	let subshape = shape['s'+inr];
	  if (!subshape) {
			debugger;
		}
		let iphase =  2*Math.PI*randomOrder[i]/16;
		let vl = (Math.cos(phase+iphase) + 1)/2;
		let rvl = Math.floor(255*vl);
		//let fill = `rgb(${rvl},${rvl},0)`;
		let fill = 'white';
		subshape.fill = fill;
		subshape.dimension = vl*5
		console.log('phase',phase,'iphase',iphase,'vl',vl,'fill ', fill)
		subshape.update();
		continue;
		if (i < n) {
			subshape.show();
		} else {
			console.log('hiding ',i);
			subshape.hide();
		}
	}
}

rs.stateOf = function (shape,ts) {
	let {timeStep,numTimeSteps} = this;
	let {waveLength,phase} = shape;
	let waveFraction = (timeStep/waveLength)%1;
	let rpos = 2*Math.PI * waveFraction + phase;
	return rpos;
}

rs.updateAppearance = function (shape) {
	let state = this.stateOf(shape);
	//console.log('state',state);
	this.setAppearance(shape,state);
}
	

let shapeCount = 0;
rs.shapeGenerator = function (rvs,cell,cnt) {
	debugger;
	console.log('center',cnt);

	let {shapes,rectP,circleP,deltaX,deltaY} = this;
	console.log('dx',deltaX,'dy',deltaY);
	let shp = svg.Element.mk('<g/>');
	shp.waveLength = Math.floor(0.25*this.numTimeSteps);
	shp.phase =  2*Math.PI * (rvs.count/16)
	let icount = Math.floor(rvs.count);
  let count = Math.min(16,icount);
	count = 16;
	console.log('count',count);
	debugger;
  for (let i = 0;i<count;i++) {
		shapeCount++;
	  let subshape = circleP.instantiate();
		shp.set('s'+i,subshape);
		subshape.show();
		if (i<icount) {
			//subshape.show();
		}
		let xd = 0.25*(i%4)*deltaX;
		let yd = 0.25*Math.floor(i/4)*deltaY;
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
	this.setAppearance(shp,icount,1);
	return shp;
}

rs.shapeUpdater = function (shape,rvs,cell) {
	if ((cell.x ===2)&&(cell.y===2)) {
		debugger;
	}
	this.updateAppearance(shape);
}




rs.innerInitialize = function () {
	debugger;
	core.root.backgroundColor = 'black';
	this.randomOrder = this.inRandomOrder(16)
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

