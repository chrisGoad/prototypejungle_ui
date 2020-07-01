
core.require('/line/line.js','/grid/grid24cons.js',function (linePP,constructor) {
  debugger;
  let rs = constructor();
	core.assignPrototypes(rs,'shapeP',linePP);
  rs.shapeP.stroke = 'white';
  rs.shapeP['stroke-width'] = 1;;
  rs.rgb2color = function (r,g,b) {
    return `rgb(0,${Math.floor(r)},${Math.floor(r)}`;
  }
  rs.numRows= 40;
  rs.numCols = 40;
  rs.width = 200;
  rs.height = 200;
  rs.deltaX = rs.numCols/rs.width;
  rs.deltaY = rs.numRows/rs.height;
  rs.visChance= 0.5;
  rs.pointJiggle = 9;
  rs.includeShapes = true;
  rs.includeCellBoundaries = 1;
 
  rs.boundaryStrokeWidth =0.3;
  rs.shapeStroke = 'white';
  rs.shapeStrokeWidth = 1;
  rs.redP = {step:35,min:100,max:250};
  rs.greenP = {step:35,min:20,max:250};
  rs.blueP = {step:35,min:20,max:250};
  
	/*
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
	*/
	
	
  rs.shapeGenerator = function (shapes,rvs) {
    debugger;
    let rs = svg.Element.mk('<g/>');
	shapes.push(rs);
   // shapes.set(idx,rs);
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
    //let orientations = ['horizontal','vertical','diagonal1','diagonal2'];
    for (let i=0;i<num;i++) {
      let r = this.shapeP.instantiate();
      setup('r'+i,r,i,num);
    } 
    
 
    return rs;
  };
  
  rs.initializeConstructor();
  return rs;
});

