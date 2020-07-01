
core.require('/line/line.js','/shape/rectangle.js','/grid/addGrid3.js',function (linePP,rectanglePP,addMethods) {
debugger;
let item = svg.Element.mk('<g/>');

addMethods(item);
/*adjustable parameters  */


item.initializeProto = function () {
  core.assignPrototypes(this,'blineP',linePP);
  this.blineP.stroke = 'yellow';
  this.blineP['stroke-width'] = .8;  
  core.assignPrototypes(this,'lineP',linePP);
  this.lineP.stroke = 'white';
  this.lineP['stroke-width'] = .2;  
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
  this.numRows= 20;
  this.numCols= 40;
  this.width = 200;
  this.height = 100;
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
   this.colorRangeL = [50,50,0];
  this.colorRangeH = [200,200,50]
  this.colorStep = [25,25,25];
  this.colorStep = [5,5,5];
  this.colorStart = [140,140,0];
  this.colorCombo = 'yellow';
  this.shapeGenerationFunction = function (grid,shapes,idx) {
    let rs = svg.Element.mk('<g/>');
    shapes.set(idx,rs);
    const setup = (nm,shp,orientation) => {
      rs.set(nm,shp);
      let factor1 = 0.03;
      let factor2 = 0.3;
      if (orientation == 'horizontal') {
        let x = grid.deltaX*factor2;
        let p0 = Point.mk(-x,0);
        let p1 = Point.mk(x,0);
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
    const which = Math.floor(Math.random()* 17.999);
    let orientations = ['horizontal','vertical','diagonal1','diagonal2'];
    if (which < 4) {
      r0 = grid.lineP.instantiate();
      setup('r0',r0,orientations[which]);
    } 
    if (which === 4) {
       r0 = grid.lineP.instantiate();
      setup('r0',r0,'horizontal');
      r1 = grid.lineP.instantiate();
      setup('r1',r1,'vertical');
    }
     if (which === 5) {
       r0 = grid.lineP.instantiate();
      setup('r0',r0,'diagonal1');
      r1 = grid.lineP.instantiate();
      setup('r1',r1,'diagonal2');
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
      

