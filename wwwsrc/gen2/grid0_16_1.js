
core.require('/gen1/grid0_16.js',
function (rs) {
  
rs.setName('grid0_16_1');
let wd = 400;
let topParams = {width:400,height:400,numRows:100,numCols:100,pointJiggle:10};

Object.assign(rs,topParams);
	
	

rs.colorGenerator = function (rvs,cell) {
	let r = Math.floor(Math.random()*255);
	let g = Math.floor(Math.random()*255);
	let b = Math.floor(Math.random()*255);
  let tone = Math.random();
	let rgb =`rgb(${r},${g},${b})`;
	return rgb;
}
return rs;
});
 