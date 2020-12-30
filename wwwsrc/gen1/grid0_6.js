
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
	this.circleP.dimension = 4;
	this.circleP.fill = 'red';
	this.circleP.stroke = 'rgba(0,0,0,.8)';
	this.circleP['stroke-width'] = 0.2;
}


rs.setAppearance = function (shape,n,randomize) {
	let {randomOrder} = this;
	//for (let i=0;i<16;i++) {
	for (let i=0;i<64;i++) {
		let subshape = randomize?shape['s'+randomOrder[i]]:shape['s'+i];
	//	let subshape = shape['s'+inr];
	  if (!subshape) {
			debugger;
		}
		//let tg = 16-i;
		let tg = 64-i;
		//let z = 16-n
		let z = 64-n
		let rvl = (i<n)?255:Math.floor((tg/z)*255);
		let fill = `rgb(${rvl},0,0)`;
		subshape.fill = fill;
		console.log('fill ', fill)
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
	let vl = Math.sin(rpos);
	//let rs = 8+Math.round(vl*8);
	//let rs = 8+Math.round(vl*(8));
	let rs = 8+Math.round(vl*(64-8));
	return rs;
}

rs.updateAppearance = function (shape) {
	let state = this.stateOf(shape);
	//console.log('state',state);
	this.setAppearance(shape,state,1);
}
	

let shapeCount = 0;
rs.shapeGenerator = function (rvs,cell,cnt) {
	//debugger;
	console.log('center',cnt);

	let {shapes,rectP,circleP,deltaX,deltaY} = this;
	console.log('dx',deltaX,'dy',deltaY);
	let shp = svg.Element.mk('<g/>');
	shp.waveLength = Math.floor(0.25*this.numTimeSteps);
	shp.phase = 0 * 2*Math.PI * (rvs.count/16)
	let icount = Math.floor(rvs.count);
  let count = Math.min(16,icount);
	count = 16;
	count = 64;
	console.log('count',count);
	//debugger;
  for (let i = 0;i<count;i++) {
		shapeCount++;
	  let subshape = circleP.instantiate();
		shp.set('s'+i,subshape);
		subshape.show();
		if (i<icount) {
			//subshape.show();
		}
		//let xd = 0.2*(i%4)*deltaX;
		let xd = (1/8)*(i%8)*deltaX;
	//	let yd = 0.2*Math.floor(i/4)*deltaY;
		let yd = (1/8)*Math.floor(i/8)*deltaY;
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
	//this.randomOrder = this.inRandomOrder(16)
	this.randomOrder = this.inRandomOrder(64)
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

