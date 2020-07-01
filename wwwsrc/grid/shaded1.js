
core.require('/shape/rectangle.js','/grid/addShaded.js',function (rectPP,addMethods) {
debugger;
let item = svg.Element.mk('<g/>');

addMethods(item);
/*adjustable parameters  */


item.initializeProto = function () {
  core.assignPrototypes(this,'pixelP',rectPP);
  this.pixelP.stroke = 'transparent';
  this.pixelP['stroke-width']= 0;
}
  

item.initialize = function () {	
  core.root.backgroundColor = 'yellow';
  this.initializeProto();
  //this.combo = 'white';
  this.combo = 'yellow';
 // this.combo = 'magenta';
  this.combo = 'cyan';
  //this.combo = 'none';
  this.widthInPixels = 150;
  this.heightInPixels = 150;
  this.pixelDim = 5;
  this.rangeL = [10,10,10];
  this.rangeH = [200,200,200];
  this.maxStep = [15,15,15]
  this.set('pixels',core.ArrayNode.mk());
  this.set('colors',core.ArrayNode.mk());
  debugger;
  this.genGrid1();
  
}	
return item;
});
      

