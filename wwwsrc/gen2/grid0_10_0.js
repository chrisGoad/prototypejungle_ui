
core.require('/gen1/grid0_10.js','/line/line.js',
function (rs,linePP)	{ 
//addSetName(rs);


rs.setName('grid0_10_0');

let nr = 60;

let topParams = {numRows:nr,numCols:nr};///randomizeOrder:1,orderByOrdinal:1,width:300,height:300,pointJiggle:0,backgroundColor:'black',numRows:64,numCols:64};
 
Object.assign(rs,topParams);


rs.initProtos = function () {
	let {lineLength} = this;
	const addProto =  (n,dir,color) => {
		let nm = 'shapeP'+n;
		core.assignPrototypes(this,nm,linePP);
		let pr = this[nm];
		pr.stroke = color;
		pr['stroke-width'] = 1;
		pr['stroke-width'] = 4;
		this.setLineEnds(pr,lineLength,dir);
		//this.setLineEnds(pr,lineLength,0);
	}
	addProto(0,0,'red');
	addProto(1,0.25*Math.PI,'green');
	addProto(2,0.5*Math.PI,'blue');
	addProto(3,0.75*Math.PI,'magenta');
	if (this.finishProtos) {
		finishProtos();
	}
}  

return rs;

});

