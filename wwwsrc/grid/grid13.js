
core.require('/line/line.js','/shape/rectangle.js','/grid/addGrid3.js',function (linePP,rectanglePP,addMethods) {
debugger;
let item = svg.Element.mk('<g/>');

addMethods(item);
/*adjustable parameters  */


item.initializeProto = function () {
  core.assignPrototypes(this,'blineP',linePP);
  this.blineP.stroke = 'yellow';
  this.blineP['stroke-width'] = .3;  
  core.assignPrototypes(this,'lineP',linePP);
  this.lineP.stroke = 'white';
  this.lineP['stroke-width'] = 1;;  
  //this.rectangleP.fill = 'white';
  //this.rectangleP.stroke = 'transparent';
  /*core.assignPrototypes(this,'shapeP1',linePP);
  this.shapeP1.stroke = 'white';
  let vec = Point.mk((this.width/this.numRows)*0.15,0);
  this.shapeP1.setEnds(vec.minus(),vec);
  this.shapeP1['stroke-width'] = .4; */	
}  

item.initialize = function () {
  this.initializeProto();
  this.numRows= 40;
  this.numCols = 40;
 // this.numRows= 2;
//  this.numCols= 4;
  this.width = 200;
  this.height = 200;
  this.deltaX = this.numCols/this.width;
  this.deltaY = this.numRows/this.height;
  this.visChance= 0.5;
  this.pointJiggle = 0.5;
  this.includeShapes = true;
  this.includeCellBoundaries = 1;
  core.root.backgroundColor = 'black';
  this.chanceAshapeIsVisible =0.05;
  this.fadeIn = false;
  this.lineShapeLength = undefined;
  this.ywander = 0;
  this.randomizeWhichColors = 'boundaries';
  this.randomizeWhichColors = 'both';
   this.colorRangeL = [0,0,100];
   this.colorRangeL = [0,100,100];
  this.colorRangeH = [0,250,250]
 // this.colorRangeH = [0,0,50]
  this.colorStep = [25,25,25];
  this.colorStep = [5,5,5];
  this.colorStart = [0,0,50];
  this.colorStart = [0,100,100];
  this.colorCombo = 'cyan';
  this.pointJiggle = 2;
  this.shapeGenerationFunction = function (grid,shapes,idx) {
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
      let r = grid.lineP.instantiate();
      setup('r'+i,r,i,num);
    } 
    
    /*
    if (r0) {
      r0.moveto(Point.mk(-disp,0));
      r0.update();
      r0.show();
    }
    if (r1) {
      r1.moveto(Point.mk(disp,0));
      r1.update();
      r1.show();
    }*/
    //r0.update();
   // r1.update();
   // r0.show();
   // r1.show();
    return rs;
  };
  this.initializeGrid();
}	
return item;
});
      

