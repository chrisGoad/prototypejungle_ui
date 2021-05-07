
core.require('/gen1/grid0_18.js',
function (rs) {
  
rs.setName('grid0_18_0');
let topParams = {width:400,height:400,numRows:40,numCols:40,pointJiggle:10,fcLineX:.25,fcLineY:0.5,fcGonX:0.5,fcGonY:0.5,fcCircle:0.7,
fcCrossA0:0.5,fcCrossA1:0.5,fcCrossLength:0.5,options:['cross','horizontalLine','verticalLine','polygon']};//'polygon','circle']};


Object.assign(rs,topParams);
	
rs.finishProtos = function () {
	this.polylineP['stroke-width'] = 0.75;
	this.polylineP.stroke = 'blue';
	this.polygonP['stroke-width'] = 0.25;
	this.polygonP.fill = 'transparent';
	this.circleP['stroke-width'] = 0.25;
	//this.polylineP['stroke'] = 'yellow';
}	

return rs;
});
 