
core.require('/gen1/grid0_5.js',
//core.require('/shape/rectangle.js','/line/line.js','/shape/circle.js','/gen0/grid0.js','/gen0/lines0.js',
function (rs)	{ 

	
	
	rs.setName('grid0_5_0');
	rs.widthFactorLeft = 3;
	rs.widthFactorRight = 0.9;
	rs.heightFactorTop = 0.9;
	rs.heightFactorBottom = 3;
	rs.backgroundColor = 'yellow';
	rs.backgroundColor = 'white';
	rs.colorMap[0] =  (r,g,b,opacity) => `rgba(${r},0,0,0.4)`;
	rs.colorMap[1] =  (r,g,b,opacity) => `rgba(${r},0,0,0.4)`;
	rs.colorMap[2] =  (r,g,b,opacity) => 'rgba(255,255,255,0.4)';
	rs.colorMap[3] =  (r,g,b,opacity) => `rgba(255,255,255,0.4)`;
	rs.colorMap[4] =  (r,g,b,opacity) =>  'rgba(255,255,255,0.4)';
	rs.colorMap[4] =  (r,g,b,opacity) =>  'white';
		rs.colorMap[3] =  (r,g,b,opacity) => `rgba(0,${b},${b},${opacity})`;
	//rs.sizeMap = {0:1,1:1,2:2,3:3,4:4,5:0,6:0};

	rs.orderByOrdinal = 1;

	

  return rs;


});

