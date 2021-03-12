
core.require('/gen1/grid0_16.js',
function (rs) {
  
rs.setName('grid0_16_0');
let topParams = {width:400,height:400,numRows:10,numCols:10,pointJiggle:10};

Object.assign(rs,topParams);
	

rs.finishProtos = function () {
	  this.polygonP['stroke-width'] = 1;
}
rs.colorGenerator = function (rvs,cell) {
	let r = Math.floor(Math.random()*255);
	let g = Math.floor(Math.random()*255);
	let b = Math.floor(Math.random()*255);
  let tone = Math.random();
	let rgb =`rgb(${r},${r},${r})`;
	return rgb;
}
return rs;
});
 