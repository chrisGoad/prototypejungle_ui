
core.require('/gen1/grid0_8.js','/gen1/layeredGrid2.js',
//core.require('/shape/rectangle.js','/line/line.js','/shape/circle.js','/gen0/grid0.js','/gen0/lines0.js',
function (rs,setupLayers)	{ 

	
rs.setName('grid0_8_27');

setupLayers(rs)

rs.finishProtos = function () {
	this.rectP.stroke = 'rgba(0,0,0,.8)';
	//this.circleP['stroke-width'] = 0;
	this.rectP['stroke-width'] = 0.4;
}

return rs;


});

