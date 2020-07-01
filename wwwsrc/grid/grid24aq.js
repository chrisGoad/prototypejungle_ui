
core.require('/line/line.js','/grid/grid24cons.js','/grid/dim2dWalker2.js',
function (linePP,gridConstructor,addRandomMethods) {
	debugger;
return function () {

  debugger;
  let rs = gridConstructor();
  core.root.backgroundColor = 'black';
  rs.initProtos = function () {
	  core.assignPrototypes(this,'shapeP',linePP);
    this.shapeP.stroke = 'white';
    this.shapeP['stroke-width'] = 1;
	  core.assignPrototypes(this,'boundaryLineP',linePP);
	  this.boundaryLineP.stroke = 'rgb(255,255,0)';
	  this.boundaryLineP['stroke-width'] = 0.3;
	}
	
	
  rs.numRows= 40;
  rs.numCols = 40;
  rs.width = 200;
  rs.height = 200;

  //rs.visChance= 1;
  rs.pointJiggle = 9;
  rs.includeShapes = true;
  //rs.includeCellBoundaries = 1;
 
  rs.boundaryStrokeWidth =0.3;
  rs.shapeStroke = 'white';
  rs.shapeStrokeWidth = 1;
 
  let {numRows,numCols} = rs;
  //rs.setupBoundaryRandomizer('visible', {step:0.1,min:0,max:1,numRows,numCols});
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
	
	
rs.boundaryLineGenerator = function (lines,end0,end1,rvs,cell) {
	debugger;
	let v = rvs.visible;
	if (v > 0.5) {
		let line = this.boundaryLineP.instantiate();
		lines.push(line);
		line.setEnds(end0,end1);
		
		//line.stroke = `rgb(0,${Math.floor(r)},${Math.floor(r)})`;
		line.update();
		line.show();
		return line;
	}
}

 const biasFun = function (grid,i,j) {
		debugger;
    let {numCols,numRows} = grid;
		
		let hw = numCols/2;
    let xf = i/numCols;
    let yf = j/numRows;
    let weight;
    if (xf > 0.2) {
      weight = 0;
    } else {
      weight = 1;
    }
    weight = 1 - 2*Math.abs(xf - 0.5);
    let rs = {weight:weight,value:0};
    return rs;
  }

rs.initialize = function () {
	debugger;
	
	let {numRows,numCols} = this;
	this.initProtos();
	this.deltaX = rs.numCols/rs.width;
  this.deltaY = rs.numRows/rs.height;
  rs.setupBoundaryRandomizer('visible', {step:0.3,min:0.3,max:1,biasFun,numRows,numCols});
 // rs.setupBoundaryRandomizer('visible', {step:0.3,min:0,max:1,numRows,numCols});
	this.initializeConstructor();
}
  
  //rs.initializeConstructor();
  return rs;
}
});

