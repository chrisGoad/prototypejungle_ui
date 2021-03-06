
core.require('/line/line.js','/grid/grid24cons.js','/grid/dim2dWalker2.js',function (linePP,constructor,addRandomMethods) {
  debugger;
  let rs = constructor();
  core.root.backgroundColor = 'black';
	core.assignPrototypes(rs,'shapeP',linePP);
  rs.shapeP.stroke = 'white';
  rs.shapeP['stroke-width'] = 1;
	core.assignPrototypes(rs,'boundaryLineP',linePP);
	rs.boundaryLineP.stroke = 'rgb(255,255,0)';
	rs.boundaryLineP['stroke-width'] = 0.3;
  rs.numRows= 40;
  rs.numCols = 40;
  rs.width = 200;
  rs.height = 200;
  rs.deltaX = rs.numCols/rs.width;
  rs.deltaY = rs.numRows/rs.height;
  //rs.visChance= 1;
  rs.pointJiggle = 9;
  rs.includeShapes = true;
  //rs.includeCellBoundaries = 1;
 
  rs.boundaryStrokeWidth =0.3;
  rs.shapeStroke = 'white';
  rs.shapeStrokeWidth = 1;
  const biasFun = function (grid,i,j) {
    let {numCols,numRows} = grid;
    let xf = i/numCols;
    let yf = j/numRows;
    let weight;
    if (xf < 0.2) {
      weight = 0;
    } else if (xf > 0.8){
      weight = 0;
    } else {
      weight = 1;
    }
    weight = Math.max(1 - 2*Math.abs(xf - 0.5),0.4);
    let rs = {weight:weight,value:.2};
    return rs;
  }
  let {numRows,numCols} = rs;
  rs.setupBoundaryRandomizer('red', {step:35,min:150,max:250,biasFun,numRows,numCols});
  rs.shapeGenerator = function (shapes,rvs) {
		let rs = svg.Element.mk('<g/>');
		shapes.push(rs);
		let factor2 = 1;
    const setup = (nm,shp,idx,count) => {
      rs.set(nm,shp);
      let dx = this.deltaX;
      let hln = (dx/count) * 0.05;// = 0.03;
      let x = -0.5*dx + (dx/(count+1))*(idx+1);
      if (1 || orientation == 'horizontal') {
        let p0 = Point.mk(x-hln,0);
        let p1 = Point.mk(x+hln,0);
        shp.setEnds(p0,p1);
      } else  if (orientation === 'vertical') {
        let y = this.deltaY*factor2;
        let p0 = Point.mk(0,-y);
        let p1 = Point.mk(0,y);
        shp.setEnds(p0,p1);
     
      } else  if (orientation === 'diagonal1') {
         let x = grid.deltaX*factor2;
        let y = grid.deltaY*factor2;
        let p0 = Point.mk(-x,-y);
        let p1 = Point.mk(x,y);
        shp.setEnds(p0,p1);
      } else  if (orientation === 'diagonal2') {
        let x = this.deltaX*factor2;
        let y = this.deltaY*factor2;
        let p0 = Point.mk(x,-y);
        let p1 = Point.mk(-x,y);
        shp.setEnds(p0,p1);
      }
      shp.update();
      shp.show();
    }
    
    let r0,r1;
    let disp = this.deltaX * 0.25;
    const num = Math.floor(Math.random()* 7.999)+1;
    if (num > 4) return;
    for (let i=0;i<num;i++) {
      let r = this.shapeP.instantiate();
      setup('r'+i,r,i,num);
    } 
    return rs;
  };
	
	
rs.boundaryLineGenerator = function (lines,end0,end1,rvs,cell,orientation) {
	debugger;
	if (orientation === 'vertical') {
		return;
	}
	let line = this.boundaryLineP.instantiate();
	lines.push(line);
	line.setEnds(end0,end1);
	let r = rvs.red;
	line.stroke = `rgb(0,${Math.floor(r)},${Math.floor(r)})`;
	line.update();
	line.show();
}
  
  rs.initializeConstructor();
  return rs;
});

