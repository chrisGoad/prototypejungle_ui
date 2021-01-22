
core.require('/gen1/grid0_1.js','/gen0/basics.js',
function (rs,addSetName)	{ 
addSetName(rs);


rs.setName('grid0_1_3','grid0_1_1');

let topParams = {loadFromPath:1,numRows:20,numCols:20};///randomizeOrder:1,orderByOrdinal:1,width:300,height:300,pointJiggle:0,backgroundColor:'black',numRows:64,numCols:64};
 
Object.assign(rs,topParams);

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

