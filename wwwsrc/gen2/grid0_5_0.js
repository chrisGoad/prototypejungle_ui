
core.require('/gen1/grid0_5.js',
//core.require('/shape/rectangle.js','/line/line.js','/shape/circle.js','/gen0/grid0.js','/gen0/lines0.js',
function (rs)	{ 

	
	
	rs.setName('grid0_5_0');
	rs.widthFactor = 3;
	rs.heightFactor = 0.7;
	rs.backgroundColor = 'gray';
	rs.colorMap[0] =  (r,g,b,opacity) => `rgba(${r},0,0,0.4)`;
	rs.colorMap[1] =  (r,g,b,opacity) => `rgba(${r},0,0,0.4)`;
	rs.colorMap[2] =  (r,g,b,opacity) => 'rgba(255,255,255,0.4)';
	rs.colorMap[3] =  (r,g,b,opacity) => `rgba(255,255,255,0.4)`;
	rs.colorMap[4] =  (r,g,b,opacity) =>  'rgba(255,255,255,0.4)';
	rs.colorMap[4] =  (r,g,b,opacity) =>  'white';
		rs.colorMap[3] =  (r,g,b,opacity) => `rgba(0,${b},${b},${opacity})`;

	rs.orderByOrdinal = 1;

	rs.backgroundColor = 'gray';
	

  return rs;


});

