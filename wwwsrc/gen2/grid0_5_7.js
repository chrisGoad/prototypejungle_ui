
core.require('/gen1/grid0_5.js',
//core.require('/shape/rectangle.js','/line/line.js','/shape/circle.js','/gen0/grid0.js','/gen0/lines0.js',
function (rs)	{ 

	
	rs.setName('grid0_5_4');

const ranC1 = function () {
	return 255*Math.random();
}

const ranColor1 = function (opacity) {
	return `rgba(${ranC1()},${ranC1()},${ranC1()},${opacity})`;
}


const ranC2 = function () {
	return 155+ 100*Math.random();
}
const ranColor2 = function (opacity) {
	return `rgba(${ranC2()},${ranC2()},${ranC2()},${opacity})`;

}

const toFun = function (v) {
	return () => v;
}
// var 3
rs.randomizeOrder = 0;
rs.orderByOrdinal = 1;
rs.widthFactor = 1;
rs.heightFactor = 1;
rs.width = 1200;
rs.height = 300;
rs.genCircles = 1;
rs.backgroundColor = 'white';
rs.colorMap[0] =  ranColor1;
rs.colorMap[1] =  toFun('red');
//rs.colorMap[1] =  ranColor2;
rs.colorMap[2] =  ranColor2;
rs.colorMap[4] =  toFun('green');
rs.colorMap[3] =  ranColor2;
rs.colorMap[4] =  ranColor2;
//rs.colorMap[4] =  (r,g,b,opacity) => `rgba(0,0,${r},${opacity})`;
//rs.colorMap[4] =  (r,g,b,opacity) => `rgba(0,0,255,${opacity})`;
rs.colorMap[5] =  (r,g,b,opacity) => `rgba(${r/2},${r/2},${r},${opacity})`;
rs.colorMap[5] =  (r,g,b,opacity) => `rgba(${r/2},0,0,${opacity})`;
rs.colorMap[5] =  (r,g,b,opacity) => `rgba(0,0,0,${opacity})`;
rs.colorMap[6] =  (r,g,b,opacity) => `rgba(${r},${r},0,${opacity})`;
rs.sizeMap = {0:1,1:1,2:2,3:6,4:4,5:0,6:0};
rs.sizeMap = {0:1.5,1:1,2:2,3:3,4:4,5:0,6:0};
rs.opacityMap = {0:0.4,1:0.4,2:0.4,3:0.4,4:1.8,5:1,6:1};
//	rs.sizeMap = {0:1,1:0,2:0,3:0,4:0,5:0,6:0};

return rs;


});

