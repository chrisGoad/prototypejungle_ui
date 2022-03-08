
 
import {rs as linePP} from '/line/line.mjs';
import {rs as basicsP} from '/generators/basics.mjs';
import {rs as addGridMethods} from '/mlib/grid.mjs';
import {rs as addRandomMethods} from '/mlib/topRandomMethods.mjs';
let rs = basicsP.instantiate();
addGridMethods(rs);
addRandomMethods(rs);
rs.setName('grid_tracks');

rs.initProtos = function () {
  this.blineP = linePP.instantiate();
  this.blineP.stroke = 'white';
  this.blineP['stroke-width'] = 0.1;
  this.rlineP = linePP.instantiate();
  this.rlineP.stroke = 'yellow';
  this.rlineP['stroke-width'] = 0.3 
 
} 
let wd = 100; 
let nr = 64;
let topParams = {backgoundColor:'black',numRows:nr,numCols:nr,width:wd,height:wd,pointJiggle:0};



Object.assign(rs,topParams);

rs.boundaryLineGenerator = function (p11,p21,rvs) {
  let {blineP,lines} = this;
  let line = this.blineP.instantiate().show();
  line.setEnds(p11,p21);
  line.stroke = 'white';
  lines.push(line);
  return line;
}


rs.regionLineGenerator = function (p11,p21,rvs) {
  let v = rvs.value;
  let color = `rgb(${v},${v},0)`;
  let line = this.rlineP.instantiate().show();
  line.setEnds(p11,p21);
  line.stroke = color;
  return line
}
  rs.initialize = function () {
     this.initProtos()
     this.addBackStripe();
		 this.setupBoundaryRandomizer('value', {step:50,min:100,max:255});
     this.initializeGrid();
  }
 

export {rs}

/*
core.require('/line/line.js','/shape/circle.js','/shape/rectangle.js',
  '/grid/addGrid3.js',
  function (linePP,circlePP,rectanglePP,addGridMethods) {
debugger;
let item = svg.Element.mk('<g/>');

item.initializeProtos = function (itm) {
  core.assignPrototypes(itm,'lineP',linePP);
  itm.lineP.stroke = 'yellow';
  itm.lineP['stroke-width'] = .2; 
  core.assignPrototypes(itm,'circleP',circlePP);
  itm.circleP.fill = 'rgba(255,0,0,0.8)';
  itm.circleP.dimension = 10;
  itm.circleP['stroke-width'] = 0.05; 

  core.assignPrototypes(itm,'rectangleP',rectanglePP);
  itm.rectangleP.fill = 'black';
  itm.rectangleP.stroke = 'transparent';
  itm.rectangleP.width = item.deltaX*0.5;
  itm.rectangleP.height = item.deltaX*0.05;
}  



item.initializeGridProtos = function (grid) {
  core.assignPrototypes(grid,'blineP',linePP);
  grid.blineP.stroke = 'rgb(130, 130, 206)';//'blue';
  grid.blineP['stroke-width'] = 0.1; 
  core.assignPrototypes(grid,'rlineP',linePP);
  grid.rlineP.stroke = 'yellow';
  grid.rlineP['stroke-width'] = 0.2;   
  core.assignPrototypes(grid,'shapeP1',circlePP);
  grid.shapeP1.fill = 'red';
  grid.shapeP1.dimension = (grid.width/grid.numRows)*0.3;
  grid.shapeP1['stroke-width'] = 0.05; 	
}  

item.initialize = function () {
  debugger;
 
  core.root.backgroundColor = 'black';
 
  //let quad = this.set('quadtree',svg.Element.mk('<g/>'));
  let grid = this.set('grid',svg.Element.mk('<g/>'));
  //addQuadMethods(quad);
  addGridMethods(grid);
  
 let nr = 64;
 // let nr = 6;
  grid.numRows= nr;
  grid.numCols= nr;
  grid.width = 100;
  grid.height = 100;
  this.initializeGridProtos(grid);

  grid.includeShapes = false;
  grid.includeCellBoundaries = true;
 
  grid.visChance= 1;
  grid.pathLength = 10;
  grid.generative = true;
  grid.fadeIn = false;
  grid.fractionToOccupy = 0.9;
  grid.randomizeWhichColors = 'regions';
  grid.boundaryLineFraction = 1;
  
  grid.includeShapes = false;
  grid.randomizeWhichColors = 'regions';
   grid.colorRangeL = [50,50,0];
  grid.colorRangeH = [200,200,50]
  grid.colorStep = [15,15,15];
  grid.colorStart = [140,140,0];
  grid.colorCombo = 'yellow';
  //core.root.backgroundColor = 'black';
  debugger;
  grid.initializeGrid();
}	
return item;
});
      
*/