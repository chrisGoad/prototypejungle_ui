
core.require('/gen1/grid0_1.js','/gen0/basics.js',
function (rs,addSetName)	{ 
addSetName(rs);


rs.setName('grid0_1_2','grid0_1_1');

let topParams = {loadFromPath:1,numRows:20,numCols:20};///randomizeOrder:1,orderByOrdinal:1,width:300,height:300,pointJiggle:0,backgroundColor:'black',numRows:64,numCols:64};
 
 
rs.computeDir = function (x,y) {
	let {numRows:nr} = this;
	let hnr = nr/2;
	let qpi = 0.25*Math.PI;
	if (x === y) {// diagonally down
		return [-qpi];
	}
	if (x + y === nr) {// diagonally down
		return [qpi];
	}
	return 2*Math.PI * Math.random();
	
}

Object.assign(rs,topParams);

return rs;

});

