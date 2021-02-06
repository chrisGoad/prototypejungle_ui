
core.require('/gen1/grid0_1.js','/gen0/basics.js',
function (rs,addSetName)	{ 
addSetName(rs);


rs.setName('grid0_1_4');

let topParams = {loadFromPath:0,saveJson:0,numRows:20,numCols:20,setLow:[0,0],setHigh:[80,360]};///randomizeOrder:1,orderByOrdinal:1,width:300,height:300,pointJiggle:0,backgroundColor:'black',numRows:64,numCols:64};
 
Object.assign(rs,topParams);

rs.inSetN = function (n,cell) {
	let {numRows,numCols} = this;
	let {x,y} = cell;
	if (n === 0) {
		debugger;
    return x<y;
	}
	return x>=y;
}

rs.computeDir = function (cell) {
	let {setLow,setHigh} = this;
  let {x,y} = cell;
	let numSets = setLow.length;
	let aLow,aHigh,rLow,rHigh;
  for (let i=0;i<numSets;i++) {
	  if (this.inSetN(i,cell)) {
		  aLow = setLow[i];
		  aHigh = setHigh[i];
		  rLow = geom.degreesToRadians(aLow);
		  rHigh = geom.degreesToRadians(aHigh);
		}
	}
	let rs = rLow + Math.random()*(rHigh-rLow);
	return rs;
}
      			
		
rs.shapeGenerator = function (rvs,cell,cnt) {
	let idx = cell.index;
	let {x,y} = cell;
  let {shapes,dirValues,lineLength} = this;
	let line0 = this.lineP.instantiate();
	shapes.push(line0);
	let dir = dirValues?dirValues[idx]:this.computeDir(cell);
	this.setLineEnds(line0,lineLength,dir);
	return line0;
}

rs.initialize = function () {
	let cb = () => {
		debugger;
		let {shapes} = this;
		this.shapeAdjustor(shapes[7],0,'red');
	};
	this.innerInitialize(cb);

}

return rs;

});

