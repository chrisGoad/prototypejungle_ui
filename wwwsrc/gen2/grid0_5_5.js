
core.require('/gen1/grid0_5.js',
//core.require('/shape/rectangle.js','/line/line.js','/shape/circle.js','/gen0/grid0.js','/gen0/lines0.js',
function (rs)	{ 

	
	rs.setName('grid0_5_0');
	rs.numTimeSteps = 20;
	let sz = 48;
	rs.numRows = sz;
	rs.numCols = sz;
	rs.pointJiggle = 0;
	rs.backgroundColor = 'gray';
	rs.colorMap[0] =  (r,g,b,opacity) => `rgba(0,${r},0,${opacity})`;

	rs.colorMap[1] =  (r,g,b,opacity) => `rgba(${r},0,0,${opacity})`;
	rs.colorMap[2] = (r,g,b,opacity) => `rgba(255,255,255,${opacity})`,
	rs.colorMap[3]  = (r,g,b,opacity) => `rgba(0,${b},${b},${opacity})`,
		        
	//rs.colorMap[2] =  (r,g,b,opacity) => 'rgba(255,255,255,0.4)';
	//rs.colorMap[3] =  (r,g,b,opacity) => `rgba(255,255,255,0.4)`;
	rs.colorMap[4] =  (r,g,b,opacity) =>  'rgba(255,255,255,0.4)';
	rs.colorMap[4] =  (r,g,b,opacity) =>  'white';
		//rs.colorMap[3] =  (r,g,b,opacity) => `rgba(0,${b},${b},${opacity})`;

	rs.widthFactor = 2;
	rs.heightFactor = 1;
	rs.randomizeOrder = 0;
	rs.orderByOrdinal = 0;

	rs.backgroundColor = 'gray';
	//rs.opacityMap = {0:1,1:1,2:2,3:3,4:4,5:0,6:0};
	rs.opacityMap = {0:0.4,1:0.4,2:0.4,3:1,4:0.4,5:0,6:0};
	rs.sizeMap = {0:1,1:1,2:2,3:3,4:4,5:0,6:0};
	rs.sizeMap = {0:1,1:1,2:1,3:1,4:1,5:0,6:0};
	//rs.sizeMap = {0:0,1:1,2:0,3:0,4:0,5:0,6:0};

	rs.initialize = function () {
		debugger;
	  rs.innerInitialize();

	}
const interpolate = function (bnds,fr) {
	let [low,high] = bnds;
	return low + fr * (high - low);
}	

const interpolateMap = function (bndsMap,fr) {
	let rs = {};
	for (let i in bndsMap) {
	 let bnds = bndsMap[i];
	 rs[i] = interpolate(bnds,fr);
	}
	return rs;
}

let bndsMap = {0:[1,1],1:[1,1],2:[1,2],3:[1,3],4:[0,0],5:[0,0],6:[0,0]};




	 
		 
rs.widthFactorIbnds = [1,1];

rs.step = function ()   {
	//debugger;
	//this.stepShapeRandomizer('shade');
	let {timeStep,numTimeSteps,widthFactorIbnds} = this;
	let fr = timeStep/numTimeSteps;
	let wf  = interpolate(widthFactorIbnds,fr);
	this.widthFactor = interpolate(widthFactorIbnds,fr);
	let szm = interpolateMap(bndsMap,fr);
	this.sizeMap = szm;
	debugger;
	this.updateGrid();
}
rs.animate = function (resume)  {
	this.animateIt(this.numTimeSteps,20,resume);
	
}
  return rs;


});

