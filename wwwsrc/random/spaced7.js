
core.require('/shape/circle.js','/shape/rectangle.js','/line/line.js','/random/addLinesShapes0.js','/grid/addColorGrid.js',
  function (elementPP1,elementPP2,elementPP3,addMethods,addColorMethods) {
debugger;
let item = svg.Element.mk('<g/>');

addMethods(item);

item.initializeProtos= function () {
  core.assignPrototypes(this,'elementP1',elementPP1);
    this.elementP1.fill = 'blue';

   core.assignPrototypes(this,'elementP2',elementPP2);
  this.elementP2.fill = 'red';
  core.assignPrototypes(this,'elementP3',elementPP3);
  this.elementP3.stroke = 'white';  
 // this.elementP3.stroke = 'magenta';  
  this.elementP3['stroke-width'] = 0.5;
  this.lineP = this.elementP3;
}

  



item.initialize = function () {
  debugger;
  this.width = 300;
  this.height = 200;
  this.initializeProtos();
  core.root.backgroundColor = 'black';
  let colorGrid = this.set('colorGrid',core.ObjectNode.mk());
  addColorMethods(colorGrid);
  colorGrid.numRows = 8;
  colorGrid.numCols = 12;
  colorGrid.width = this.width;
  colorGrid.height = this.height;
  colorGrid.initializeGrid();
  colorGrid.colorRangeL = [50,50,0];
  colorGrid.colorRangeH = [180,180,50]
  colorGrid.colorStep = [15,15,15];
  colorGrid.colorStart = [140,140,0];
  colorGrid.randomColorWalk();
  /*
    let colors = colorGrid.colors;

  colors[0] = [0,0,0]
  colors[1] = [0,0,255];
  colors[2] = [0,255,0]
  colors[3] =[255,0,0];
   colors[0] = [100,100,100]
  colors[1] = [100,100,150];
  colors[2] = [100,150,100]
  colors[3] =[150,100,100];
  */
  this.numPoints = 600;
  this.minRadius = 2;
  this.maxRadius = 6;
  this.maxTries = 20000;
  this.generatePoints();
  
  console.log('numPoints',this.points.length);
  let scaleFactor = 1;
  const setDimension1 = function (grid,shape,dim) {
    let p =shape.getTranslation();
    //p = Point.mk(0,0);
    let color = grid.colorGrid.interpolateColor(p);
  //  shape.fill = grid.colorGrid.color2rgb(color);
    shape.dimension = scaleFactor*dim;//ry*dim;
  }
   const setDimension2 = function (grid,shape,dim) {
    shape.width = scaleFactor*dim;
    shape.height = scaleFactor*dim;
  }
  const setDimension3 = function (grid,shape,dim) {
    debugger;
    let p =shape.getTranslation();
    let color = grid.colorGrid.interpolateColor(p);

    //let dir = 0;// Math.random() * 2 * Math.PI;
    let y = p.y;
    let ht = 200;
    let ry = Math.abs(y)	/ht;
    let dir = (Math.random() -0.5) * ry * Math.PI;
    let lineLength = dim * 1.0;//lineLengthRatio;
    let vec = Point.mk(Math.cos(dir),Math.sin(dir)).times(lineLength/2);
    let end0 = vec.minus();
    let end1 = vec;
    shape.setEnds(end0,end1);
    shape.stroke = grid.colorGrid.color2rgb(color);
  }
   let {elementP1,elementP2,elementP3} = this;
 //this.generateShapes([elementP1,elementP2,elementP3],[setDimension1,setDimension2,setDimension3],[.1,.1]);
 //this.generateShapes([elementP3],[setDimension3]);
  //this.generateShapes([elementP1,elementP3],[setDimension1,setDimension3],[0.2]	);
  //this.generateShapes([elementP1],[setDimension1],[1]	);
this.generateShapes([elementP1,elementP3],[setDimension1,setDimension3],[.5]	);
 //this.generateShapes([elementP1,elementP2],[setDimension1,setDimension2],[0.5]	);
 

}	
return item;
});
      

