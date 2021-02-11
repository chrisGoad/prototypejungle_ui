
core.require('/gen1/grid0_1.js','/gen0/basics.js',
function (rs,addSetName)	{ 
addSetName(rs);


rs.setName('grid0_1_5');

let topParams = {loadFromPath:0,saveJson:0,numRows:20,numCols:60,width:90,height:30,numValues:[4,3,4],lineLength:0.5};///randomizeOrder:1,orderByOrdinal:1,width:300,height:300,pointJiggle:0,backgroundColor:'black',numRows:64,numCols:64};
 
Object.assign(rs,topParams);

rs.finishProtos = function () {
	
	this.lineP['stroke-width'] = .4;

}  

rs.inSetN = function (n,cell) {
	let {numRows,numCols} = this;
	let lt = numCols/3
	let rt = (2*numCols)/3;
	let {x,y} = cell;
	if (n === 0) {
		debugger;
    return x<lt;
	}
	if (n === 1) {
		debugger;
    return  (x>=lt) && (x<rt);
	}
	return x>=rt;
}

rs.computeDir = function (cell) {
	let {numValues} = this;
  let {x,y} = cell;
	let numSets = numValues.length;
	let dir;
  for (let i=0;i<numSets;i++) {
		let inSet = this.inSetN(i,cell);
	
	  if (inSet) {
			console.log('in set ',i,' x y ',x,y);
		  let nmv = numValues[i];
			dir = (Math.floor(Math.random() * nmv)/nmv)*Math.PI
		}
	}
	return dir;
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

