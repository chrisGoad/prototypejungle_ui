
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
  core.root.backgroundColor = 'rgb(200,200,0)';
  this.initializeProto();
  //this.combo = 'white';
  this.combo = 'yellow';
 // this.combo = 'magenta';
 // this.combo = 'cyan';
  //this.combo = 'none';
  this.widthInPixels = 200;
  this.heightInPixels = 200;
  this.pixelDim = 5;
  this.rangeL = [140,140,140];
  this.rangeH = [250,250,250];
  this.maxStep = [25,25,25]
  this.set('pixels',core.ArrayNode.mk());
  this.set('colors',core.ArrayNode.mk());
  debugger;
  this.genGrid1();
  
}	
return item;
});
      

