
core.require(function (linePP,circlePP,rectanglePP) {
  return function (item) {
/*adjustable parameters  */


item.width = 30;
item.height = 30;
item.fractionOfLinesVisible = 1;
item.fractionOfCircles = 0;
item.addTheShapes = true;
item.maxDepth = 4;
item.addLines = false;



let partsByRing = [4,3];

item.addLine = function (p1,p2) {
  let line = this.lineP.instantiate();
  this.lines.push(line);
        //hlines.set('h_'+j+'_'+i,line);
  line.setEnds(p1,p2);
  line.update();
  line.show();
}
// cellOrientation = 'vertical', 'horizontal', or 'full'
item.partitionCell = function (center,xdim,ydim,depth) {
  let cx = center.x;
  let cy = center.y;
  let cell = core.ObjectNode.mk();
  cell.centerX = cx;
  cell.centerY = cy;
  cell.dimX = xdim;
  cell.dimY = ydim;
  this.cells.push(cell);
  let hxdim = 0.5*xdim;
  let hydim = 0.5*ydim;
  let qxdim = 0.25*xdim;
  let qydim = 0.25*ydim;
  if  (this.addLines && (depth === 4)) {
    let top = Point.mk(cx,cy-hydim);
    let bottom = Point.mk(cx,cy+hydim);
    let left = Point.mk(cx-hxdim,cy);
    let right = Point.mk(cx+hxdim,cy);
    this.addLine(left,right);
    this.addLine(top,bottom);
  }
  if (depth > this.maxDepth) {
    return;
  }
  if (1) {
    let innerCenter = Point.mk(cx - qxdim,cy - qydim);
    this.partitionCell(innerCenter,hxdim,hydim,depth+1);
  }
 if (1) {
    let innerCenter = Point.mk(cx + qxdim,cy - qydim);
    this.partitionCell(innerCenter,hxdim,hydim,depth+1);
  }  
 if (1) {
    let innerCenter = Point.mk(cx - qxdim,cy + qydim);
    this.partitionCell(innerCenter,hxdim,hydim,depth+1);
  }   
  if (1) {
    let innerCenter = Point.mk(cx + qxdim,cy + qydim);
    this.partitionCell(innerCenter,hxdim,hydim,depth+1);
  }
 
}


item.addCircleToCell = function (cell) {
  let circle = this.circleP.instantiate();
 // circle.dimension = .5+0.05*Math.min(cell.dimX,cell.dimY);
  circle.dimension = .35+0.035*Math.min(cell.dimX,cell.dimY);
//  circle.dimension = .25+0.025*Math.min(cell.dimX,cell.dimY);
  this.elements.push(circle);
  let jiggle  = 0	;
  circle.moveto(Point.mk(cell.centerX+Math.random()*jiggle,cell.centerY+Math.random()*jiggle));
  circle.update();
  circle.show();
}
  
    
 item.addRandomLine = function (cell) {
  //let dir = 2 * Math.PI * Math.random();
  if (Math.random() < (1 - this.lineProbability)) {
    return;
  }
  let dir = Math.random() < .5?0.5 * Math.PI:0;
  //let dir = 2 * Math.PI * Math.random();
  let lineLength = Math.min(cell.dimX,cell.dimY) * 0.7;//lineLengthRatio;
  let vec = Point.mk(Math.cos(dir),Math.sin(dir)).times(lineLength/2);
  let center = Point.mk(cell.centerX,cell.centerY);
  let end0 = center.difference(vec);
  let end1 = center.plus(vec);
  let line = this.lineP.instantiate();
  line.setEnds(end0,end1);
  this.shapes.push(line);
 
  line.update();
  line.show();
 
 }

item.addShapeToCell = function (cell) {
  if (1 || (Math.random() < this.fractionOfCircles)) {
    
    this.addCircleToCell(cell);
  } else if (1){
    this.addRandomLine(cell);
  }
}
  


    

let maxGval = 100;
let delta = 40;



  

  
item.addShapesToCells = function () {
  let cells = this.cells;
  cells.forEach((cell)=>{
    this.addShapeToCell(cell);
    //this.addCircleToCell(cell);
  });
}


item.randomizeLineColors= function () {
  let lines = this.lines;
  let r = 0.5*maxGval;
  let g = 0.5*maxGval;
  let b = 0.5*maxGval;
  lines.forEach(function (ln) {
    let rd = delta*Math.random()-0.5*delta;
    let bd = delta*Math.random()-0.5*delta;
    let gd = delta*Math.random()-0.5*delta;
    r = Math.min(Math.max(r + rd,0),maxGval);
    g = Math.min(Math.max(g + gd,0),maxGval);
    b = Math.min(Math.max(b + bd,0),maxGval);
     let clr = `rgb(${Math.round(r)},${Math.round(r)},${Math.round(r/20)})`;
    ln.stroke = clr;
    ln.update();
    ln.show();
  });
}

item.hideLinesAtRandom= function () {
  debugger;
  let lines = this.lines;
  lines.forEach((ln) => {
    if (Math.random() < (1 - this.fractionOfLinesVisible)) {
      ln.hide();	
      ln.update();
    }
  });
}

 
item.initializeGrid = function (parts) {
  debugger;
 // this.initializeProtos();
  this.set('lines',core.ArrayNode.mk());
  this.set('cells',core.ArrayNode.mk());
  this.set('elements',core.ArrayNode.mk());
  //this.addRings(20,20,[6,7,8,9,10,8,4,2]);
  this.partitionCell(Point.mk(0,0),this.width,this.height,0);
 // this.randomizeLineColors();
  if (this.addTheShapes) {
    this.addShapesToCells();
  }
 this.hideLinesAtRandom();

  this.show();
    core.tlog('show');

}
}
});

      

