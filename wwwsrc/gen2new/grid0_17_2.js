
core.require('/gen1/grid0_17.js',
function (rs) {
  
rs.setName('grid0_17_0');
let topParams = {width:400,height:400,numRows:100,numCols:50,pointJiggle:10,factorX:2.5,factorY:0.005};


Object.assign(rs,topParams);

rs.finishProtos = function () {
	this.polylineP['stroke-width'] = 0.25;
	this.polylineP['stroke'] = 'red';
}	

return rs;
});
 