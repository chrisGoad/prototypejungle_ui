core.require('/gen1/grid0_5.js','/gen0/basics.js',
function (sub,addMethods) {
	

  debugger;	//this.initProtos();
  //core.vars.whereToSave = 'images/grid_1_1.jpg';
	let rs = svg.Element.mk('<g/>');
	addMethods(rs);
	rs.setName('multi1');
	
	//let grid1 = rs.set('grid1',sub);
	let grid1 = rs.set('grid1',sub.instantiate());
	let grid2 = rs.set('grid2',sub.instantiate());

let commonParamss = {randomizeOrder:0,orderByOrdinal:1,widthFactor:1,heightFactor:1,width:300,height:300,poinJiggle:3,
sizePower:2,numRows:96,numCols:94,genCircles:1,backgroundColor:'black',randomizingFactor:1,
colorMap:{
0:(r,g,b,opacity) => `rgba(0,${r},0,${opacity})`,
1:(r,g,b,opacity) => `rgba(${r},0,0,${opacity})`,
2:(r,g,b,opacity) => `rgba(255,255,255,${opacity})`,
3:(r,g,b,opacity) => `rgba(0,${b},${b},${opacity})`,
4:(r,g,b,opacity) => `rgba(0,0,${r},${opacity})`,
5:(r,g,b,opacity) => `rgba(0,0,0,${opacity})`,
6:(r,g,b,opacity) => `rgba(${r},${r},0,${opacity})`},
sizeMap:{0:1.5,1:1,2:2,3:3,4:4,5:0,6:0},
opacityMap:{0:0.4,1:0.4,2:0.4,3:0.4,4:0.8,5:1,6:1}};
let commonParams = {randomizeOrder:0,orderByOrdinal:1,widthFactor:1,heightFactor:0.3,width:300,height:5,poinJiggle:3,
sizePower:2,numRows:1,numCols:96,genCircles:0,backgroundColor:'black',randomizingFactor:0.8,
ranRows:[43,48],
colorMapp:{
//0:(r,g,b,opacity) => `rgba(0,${r},0,${opacity})`,
//1:(r,g,b,opacity) => `rgba(${r},0,0,${opacity})`,
0:(r,g,b,opacity) => `rgba(255,255,255,${opacity})`,
1:(r,g,b,opacity) => `rgba(255,255,255,${opacity})`,
2:(r,g,b,opacity) => `rgba(255,255,255,${opacity})`,
3:(r,g,b,opacity) => `rgba(255,255,255,${opacity})`,
4:(r,g,b,opacity) => `rgba(255,255,255,${opacity})`,
5:(r,g,b,opacity) => `rgba(0,0,0,${opacity})`,
6:(r,g,b,opacity) => `rgba(${r},${r},0,${opacity})`},
sizeMap:{0:1.5,1:1,2:2,3:3,4:4,5:0,6:0},
opacityMap:{0:0.4,1:0.4,2:0.4,3:0.4,4:0.8,5:1,6:1}};
	
	
		Object.assign(grid1,commonParams);
		Object.assign(grid2,commonParams);

Object.assign(grid1,{numRows:96,numCols:96});
		
	rs.initialize = function () {
		debugger;
	  let {width,height} = grid1;
		let sep = 40;
		let hwd = 0.5 * width;
		let hht = 0.5 * height;
		grid1.show();
		grid2.show();
    grid1.initialize();
    grid2.initialize();
	  let mv = 0.6*width;
		grid1.moveto(Point.mk(-mv,-mv));
		grid2.moveto(Point.mk(mv,-mv));
	}
	return rs;
	//this.addTheBox();
});