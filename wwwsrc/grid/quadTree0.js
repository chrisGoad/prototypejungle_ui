
core.require('/line/line.js','/shape/circle.js','/shape/rectangle.js','/grid/addQuadTree.js',function (linePP,circlePP,rectanglePP,addMethods) {
debugger;
let item = svg.Element.mk('<g/>');

addMethods(item);
/*adjustable parameters  */
item.initializeProtos = function () {
  core.assignPrototypes(this,'lineP',linePP);
  this.lineP.stroke = 'yellow';
  this.lineP['stroke-width'] = .1; 
  core.assignPrototypes(this,'circleP',circlePP);
  this.circleP.fill = 'rgba(255,0,0,0.8)';
  this.circleP.dimension = 10;
  this.circleP['stroke-width'] = 0.05; 

  core.assignPrototypes(this,'rectangleP',rectanglePP);
  this.rectangleP.fill = 'black';
  this.rectangleP.stroke = 'transparent';
  this.rectangleP.width = item.deltaX*0.5;
  this.rectangleP.height = item.deltaX*0.05;
}  

item.initialize = function () {
  debugger;
  this.initializeProtos();
  //let c = this.set('c',this.circleP.instantiate());
  //c.dimension = 20;
 // c.update();
  //this.c.show();
  //this.initializeProto();
  core.root.backgroundColor = 'black';
  this.addLines = true;
  this.width = 100;
  this.height = 100;
  this.maxDepth = 5;
  this.fractionOfLinesVisible =.5;
  let quad = this.set('quadtree',core.ObjectNode.mk());
  //core.root.backgroundColor = 'black';
  this.initializeGrid(quad);
}	
return item;
});
      

