
core.require('/shape/circle.js','/line/line.js','/line/arc.js','/grid/addArcGrid.js',function (circlePP,linePP,arcPP,addMethods) {
debugger;
let item = svg.Element.mk('<g/>');

addMethods(item);
/*adjustable parameters  */


item.initializeProto = function () {
  core.assignPrototypes(this,'circleP',circlePP);
  this.circleP.stroke = 'white';
  this.circleP['stroke-width'] = .04;   
  core.assignPrototypes(this,'lineP',linePP);
  this.lineP.stroke = 'white';
  this.lineP['stroke-width'] = .06;  
   core.assignPrototypes(this,'arcP',arcPP);
  this.arcP.stroke = 'white';
  this.arcP['stroke-width'] = .06;  
}  

item.initialize = function () {
  core.root.backgroundColor ='rgb(0,0,20)';
  this.initializeProto();
  this.numRows= 100;
  this.numCols= 100;
  this.width = 200;
  this.height = 200;
  this.maxThere = 5;
  this.minThere = 0;
  this.maxMissing = 3;
  this.minMissing = 3;
  this.numSpokes = 30;
 
   this.colorRangeL = [50,50,0];
  this.colorRangeH = [200,200,50]
  this.colorStep = [25,25,25];
  this.colorStep = [5,5,5];
  this.colorStart = [140,140,0];
  this.colorCombo = 'yellow';
  

this.numCircles = 100;
this.maxRadius = 100;
this.minRadius = 50;
this.startAngle = 70;
this.stopAngle = 110;
this.numSpokes = 30;

this.angleThere = .5;
this.angleMissing = 3;
let circle1 = this.circleP.instantiate();
circle1.stroke = 'rgb(0,0,20)';
circle1['stroke-width'] = 3;
let circle2 = this.circleP.instantiate();

debugger;
  this.initializeArcGrid();
  this.set('circle1',circle1);
  let cntr = Point.mk(0,0.5* (this.minRadius + this.maxRadius));
  circle1.moveto(cntr);
  circle1.update();
  circle1.show();
  this.set('circle2',circle2);
  circle2.moveto(cntr);
  circle2.update();
  circle2.show();


  //this.initializeLineGrid();
}	
return item;
});
      

