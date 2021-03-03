
core.require('/gen1/grid0_2.js','/gen0/basics.js',
function (rs,addSetName)	{ 
addSetName(rs);


rs.setName('grid0_2_0','grid0_2_0');

let topParams = {loadFromPath:1,saveJson:0,numRows:20,numCols:20};///randomizeOrder:1,orderByOrdinal:1,width:300,height:300,pointJiggle:0,backgroundColor:'black',numRows:64,numCols:64};
 
 
rs.patternDir = function (x,y) {
	let {numRows:nr} = this;
	let hnr = nr/2;
	let qpi = 0.25*Math.PI;
	if (x === y) {// diagonally down
		return -qpi;
	}
	if (x + y === nr) {// diagonally down
		return qpi;
	}
	return null;
	
}

rs.patternOp = function (shape) {
	shape.stroke = 'red';
}

Object.assign(rs,topParams);

return rs;

});

