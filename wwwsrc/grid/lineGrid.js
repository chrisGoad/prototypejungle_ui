
core.require('/line/line.js','/shape/circle.js','/shape/rectangle.js',function (linePP,circlePP,rectanglePP) {
debugger;
let item = svg.Element.mk('<g/>');


/*adjustable parameters  */

item.numRows= 20;
item.numCols= 20;
item.deltaX = 5;
item.deltaY = 5;


item.initializePrototype = function () {
  core.assignPrototypes(this,'lineP',linePP);
  this.lineP.stroke = 'black';
  this.lineP['stroke-width'] = 0.3; 
  core.assignPrototypes(this,'circleP',circlePP);
  this.circleP.fill = 'black';
  this.circleP.dimension = item.deltaX*0.5;
  core.assignPrototypes(this,'rectangleP',rectanglePP);
  this.rectangleP.fill = 'black';
  this.rectangleP.stroke = 'transparent';
  this.rectangleP.width = item.deltaX*0.5;
  this.rectangleP.height = item.deltaX*0.05;
}  

let points = [];

item.genPoints = function () {
  debugger;
  
  let points = this.points;
  if (points) {
    return;
  }  
  points = this.set('points',core.ArrayNode.mk()); 
  let {numRows,numCols,deltaX,deltaY} = this;
  let xdim = numCols * deltaX;
  let ydim = numRows * deltaY;
  let ly = -0.5 * ydim;
  
  for (let j = 0;j < numRows; j++) {
    let lx = -0.5 * xdim;
    let y = ly + j* deltaY;
    for (let i = 0;i < numCols; i++) {
      let x = lx + i * deltaX;
      points.push(Point.mk(x,y));
      //points[j*numCols + i] = Point.mk(x,y);
    }
  }
  debugger;
}

item.genHorizontalLines = function () { 

  let hlines = this.hlines;
  let points = this.points;
  let circles = this.circles;
  if (hlines) {
    return;
  }  
  hlines = this.set('hlines',svg.Element.mk('<g/>')); 
  circles = this.set('circles',svg.Element.mk('<g/>')); 

  let {numRows,numCols,deltaX,deltaY} = this;
  let xdim = numCols * deltaX;
  let ydim = numRows * deltaY;
  let ly = -0.5 * ydim;
  
  for (let j = 0;j < numRows; j++) {
    for (let i = 0;i < numCols - 0; i++) {
      let p1 = points[j*numCols + i];
      let p2 = (i<(numCols-1))?points[j*numCols + i + 1]:null;
      let p3 = null;
      let p4 = null;
      if (j < (numRows -0	)) {
        p3 = points[(j+1)*numCols + i];
        p4 = points[j*numCols+i].plus(Point.mk(0.5*deltaX,0.5*deltaY));
        
      }
      if (p2) {
        let line = this.lineP.instantiate();
        hlines.set('h_'+j+'_'+i,line);
        line.setEnds(p1,p2);
        line.update();
        line.show();
      }
      if (p3) {
        let line = this.lineP.instantiate();
        hlines.set('v_'+j+'_'+i,line);
        line.setEnds(p1,p3);
        line.update();
        line.show();
        if (1 && p2  && (Math.random() > 0.5)) {
         // let circle = this.circleP.instantiate();
          let circle = this.rectangleP.instantiate();
          circles.set('v_'+j+'_'+i,circle);
         
          circle.moveto(p4);
          circle.update();
          circle.show();
        }
      }
      //line.update();
    }
  }
}

let maxGval = 100;
let delta = 40;
item.randomizeLines = function () {
  let hlines = this.hlines;
  let r = 0.5*maxGval;
  let g = 0.5*maxGval;
  let b = 0.5*maxGval;
  core.forEachTreeProperty(hlines,function (ln) {
    let rd = delta*Math.random()-0.5*delta;
    let bd = delta*Math.random()-0.5*delta;
    let gd = delta*Math.random()-0.5*delta;
    /*let g = Math.floor(maxGval*Math.random());
    let b = Math.floor(maxGval*Math.random());
    let r = Math.floor(maxGval*Math.random());
    let g = Math.floor(maxGval*Math.random());
    let b = Math.floor(maxGval*Math.random());    
    */
    r = Math.min(Math.max(r + rd,0),maxGval);
    g = Math.min(Math.max(g + gd,0),maxGval);
    b = Math.min(Math.max(b + bd,0),maxGval);
     let clr = `rgb(${Math.round(r)},${Math.round(r)},${Math.round(r/20)})`;

    console.log('clr',clr,rd,gd,bd);
    ln.stroke = clr;
    ln.update();
    ln.show();
  });
}
  
let pointJiggle = .5;  
item.randomizePoints = function () {
  let {numRows,numCols,points} = this;
  for (let i = 0;i < numRows*numCols;i++) {
    let pnt = points[i];
    pnt.x = pnt.x + Math.random()*pointJiggle -0.5*pointJiggle;
    pnt.y = pnt.y + Math.random()*pointJiggle  -0.5*pointJiggle;
  }
}
  
  

  

  
      
item.update = function () {
  this.genPoints();
    this.randomizePoints();

  this.genHorizontalLines();
  debugger;
  this.randomizeLines();
  this.show();
}

return item;
});

      

