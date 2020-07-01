
core.require('/shape/rectangle.js','/grid/addShaded.js',function (rectPP,addMethods) {
debugger;
let item = svg.Element.mk('<g/>');

addMethods(item);
/*adjustable parameters  */


item.initializeProto = function () {
  core.assignPrototypes(this,'pixelP',rectPP);
  this.pixelP.stroke = 'transparent';
}
  

item.initialize = function () {	
  core.root.backgroundColor = 'black';
  this.initializeProto();
  this.widthInPixels = 10;
  this.heightInPixels = 10;
  this.pixelDim = 5;
  this.range = [40,250];
  this.maxStep = 15;
  this.set('pixels',core.ArrayNode.mk());
  this.set('colors',core.ArrayNode.mk());
  debugger;
  this.genGrid0();
  
}	
return item;
});
      

