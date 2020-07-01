
core.require('/grid/grid24cons.js',function (constructor) {
  debugger;
  let rs = constructor();
  rs.rgb2color = function (r,g,b) {
    return `rgb(0,${Math.floor(r)},${Math.floor(r)}`;
  }
  rs.numRows= 40;
  rs.numCols = 40;
  rs.width = 200;
  rs.height = 200;
  
  
  
  rs.outerRadius = 100;
  rs.innerRadius = 0.3 * rs.outerRadius;
  rs.angleMin = 0;
  rs. angleMax = 90;
  rs.center = Point.mk(0,0);
  
  rs.positionFunction = rs.radialPositionFunction;
  /*rs.positionFunction = function (grid,i,j) {
	debugger;
    let {numRows,numCols,angleMin,angleMax,
	       innerRadius,outerRadius,center} = grid;
	let aMinR = (angleMin * Math.PI)/180;
	let aMaxR = (angleMax * Math.PI)/180;
	let aDiff = aMaxR - aMinR;
	let aR = aMinR +  aDiff * (i/(numRows-0));
	let rDiff = outerRadius - innerRadius;
	let r = innerRadius + rDiff * (j/(numCols -1));
	let vec = Point.mk(Math.cos(aR), Math.sin(aR));
	let rs = center.plus(vec.times(r));
	return rs;
  }
  */
  
  
  rs.deltaX = rs.numCols/rs.width;
  rs.deltaY = rs.numRows/rs.height;
  rs.visChance= 0.5;
  rs.visChance= 1;
  rs.pointJiggle = 9;
  rs.includeShapes = true;
  rs.includeCellBoundaries = 1;
 
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
  rs.redP = {step:35,min:150,max:250,biasFun,numRows,numCols};
  //rs.greenP = {step:35,min:20,max:250};
 // rs.blueP = {step:35,min:20,max:250};
  
  rs.shapeGenerationFunction = function (grid,shapes,idx) {
    debugger;
    let rs = svg.Element.mk('<g/>');
    shapes.set(idx,rs);
    const setup = (nm,shp,idx,count) => {
      rs.set(nm,shp);
      let dx = grid.deltaX;
      let hln = (grid.deltaX/count) * 0.05;// = 0.03;
      let x = -0.5*dx + (dx/(count+1))*(idx+1);
      if (1 || orientation == 'horizontal') {
        let p0 = Point.mk(x-hln,0);
        let p1 = Point.mk(x+hln,0);
        shp.setEnds(p0,p1);
      } else  if (orientation === 'vertical') {
        let y = grid.deltaY*factor2;
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
        let x = grid.deltaX*factor2;
        let y = grid.deltaY*factor2;
        let p0 = Point.mk(x,-y);
        let p1 = Point.mk(-x,y);
        shp.setEnds(p0,p1);
      }
      shp.update();
      shp.show();
    }
    
    let r0,r1;
    let disp = grid.deltaX * 0.25;
    const num = Math.floor(Math.random()* 7.999)+1;
    if (num > 4) return;
    //let orientations = ['horizontal','vertical','diagonal1','diagonal2'];
    for (let i=0;i<num;i++) {
      let r = grid.shapeP.instantiate();
      setup('r'+i,r,i,num);
    } 
    
 
    return rs;
  };
  
  rs.initializeConstructor();
  return rs;
});

