
core.require('/gen1/grid0_17.js','/gen0/image3.js',
function (rs,addImageMethods) {
  
rs.setName('grid0_17_0');
let topParams = {width:800,height:400,numRows:100,numCols:50,pointJiggle:10,factorX:.25,factorY:0.05,crossColor:'yellow'};


Object.assign(rs,topParams);
	
rs.finishProtos = function () {
	this.polylineP['stroke-width'] = 0.75;
	this.polylineP['stroke'] = 'yellow';
}	

return rs;
});
 