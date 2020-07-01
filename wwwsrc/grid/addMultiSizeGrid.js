
core.require('/line/line.js','/shape/circle.js','/shape/rectangle.js',function (linePP,circlePP,rectanglePP) {
  return function (item) {
/*adjustable parameters  */


item.width = 30;
item.height = 30;
item.fractionOfLinesVisible = 1;
item.fractionOfCircles = 0.5;
item.addTheShapes = true;


item.initializeProtos = function () {
  core.assignPrototypes(this,'lineP',linePP);
  this.lineP.stroke = 'black';
  this.lineP['stroke-width'] = 0.1; 
  core.assignPrototypes(this,'circleP',circlePP);
  this.circleP.fill = 'transparent';
  this.circleP.dimension = item.deltaX*0.3;
  this.circleP['stroke-width'] = 0.05; 

  core.assignPrototypes(this,'rectangleP',rectanglePP);
  this.rectangleP.fill = 'black';
  this.rectangleP.stroke = 'transparent';
  this.rectangleP.width = item.deltaX*0.5;
  this.rectangleP.height = item.deltaX*0.05;
}  

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
item.addCell = function (cx,cy,deltaX,deltaY,orientation) {
  let p00 = Point.mk(cx,cy);
  let p01 = Point.mk(cx+deltaX,cy);
  let p10 = Point.mk(cx,cy+deltaY);
  let p11 = Point.mk(cx+deltaX,cy+deltaY);
  let centerX = cx+0.5*deltaX;
  let centerY = cy+0.5*deltaY;
  let cell = core.ObjectNode.mk();
  cell.centerX = cx+0.5*deltaX;
  cell.centerY = cy+0.5*deltaY;
  cell.dimX = deltaX;
  cell.dimY = deltaY;
  this.cells.push(cell);
  //return;
  let fr =this.fractionOfLinesVisible;
  if (Math.random() < fr) {this.addLine(p00,p01);}
  if (Math.random() < fr) {this.addLine(p00,p10);}

 // this.addLine(p00,p01);
 // this.addLine(p00,p10);
  if ((orientation === 'vertical') || (orientation === 'full')) {
    if (Math.random() < fr) {this.addLine(p01,p11);}
  }
  if ((orientation === 'horizontal') || (orientation === 'full')) {
    if (Math.random() < fr) {this.addLine(p10,p11);}
 //this.addLine(p10,p11);
  }
}

item.addRow = function (parts,cx,cy,deltaX,deltaY,orientation,withoutFirst,withoutLast) {
  let x = cx;
  let y = cy;
  const bump = function () {
    if (orientation === 'horizontal') {
      x += deltaX;
    } else {
      y += deltaY;
    }
  }
  for (i = 0;i<parts;i++) {
    if ((i===0) && withoutFirst) {
      bump();
      continue;
    }
    if ((i===(parts-1)) && withoutLast) {
      continue;
    }
    if (i === (parts-1)) {
      this.addCell(x,y,deltaX,deltaY,'full');
    } else {
      this.addCell(x,y,deltaX,deltaY,orientation);
    }
    bump();
  }
}

item.addRing = function (outerSizeX,outerSizeY,parts) {
  let {width,height} = this;
  let deltaX = outerSizeX/parts;
  let deltaY = outerSizeY/parts;
  let cx = -outerSizeX/2;
  let cy = -outerSizeY/2;
  this.addRow(parts,cx,cy,deltaX,deltaY,'vertical');
  this.addRow(parts,cx,cy,deltaX,deltaY,'horizontal',true);
  this.addRow(parts,cx+outerSizeX-deltaX,cy,deltaX,deltaY,'vertical',true);
  this.addRow(parts,cx,cy+outerSizeY-deltaY,deltaX,deltaY,'horizontal',true,true);
}



item.addRings = function (outerSizeX,outerSizeY,arrayOfParts) {
  let csizeX = outerSizeX;
  let csizeY = outerSizeY;
  arrayOfParts.forEach(  (parts) => {
    this.addRing(csizeX,csizeY,parts);
    csizeX = csizeX - 2*(csizeX/parts);
    csizeY = csizeY - 2*(csizeY/parts);
  });
}

item.addCircleToCell = function (cell) {
  let circle = this.circleP.instantiate();
  circle.dimension = 0.7*Math.min(cell.dimX,cell.dimY);
  this.shapes.push(circle);
  circle.moveto(Point.mk(cell.centerX,cell.centerY));
  circle.update();
  circle.show();
}
  
    
 item.addRandomLine = function (cell) {
  //let dir = 2 * Math.PI * Math.random();
  if (Math.random() < 0.5) {
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
  if (Math.random() < this.fractionOfCircles) {
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
item.initializeGrid = function (parts) {
  this.initializeProtos();
  this.set('lines',core.ArrayNode.mk());
  this.set('cells',core.ArrayNode.mk());
  this.set('shapes',core.ArrayNode.mk());
  //this.addRings(20,20,[6,7,8,9,10,8,4,2]);
  this.addRings(this.width,this.height,parts);
  this.randomizeLineColors();
  if (this.addTheShapes) {
    this.addShapesToCells();
  }
  
  return;
  
  core.tlog('initialize');
  this.genPoints();
    core.tlog('genPoints');

    this.randomizePoints();
      core.tlog('randomizePoints');
  //  this.addSymmetry();

  this.genHorizontalLines();
    core.tlog('genHorizontalLines');

  this.genShapes0();
  this.genShapes1();
  //this.genShapes2();
 
  this.randomizeLines();
    core.tlog('randomizeLines');
  this.show();
    core.tlog('show');

}
}
});

      

