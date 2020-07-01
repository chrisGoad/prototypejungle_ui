

core.require('/shape/rectangle.js','/grid/dim2dWalker2.js',function (pixelPP,addMethods) {
return function () {
let item = svg.Element.mk('<g/>');

addMethods(item);


item.setPixelDim = function (px,dim) {
  //px.dimension = dim-1;
  px.width = dim+1;
  px.height = dim+1;
}
item.initializeProto = function () {
  core.assignPrototypes(this,'pixelP',pixelPP);
  this.pixelP.stroke = 'transparent';
  this.pixelP['stroke-width']= 0;
}
  

item.initializeConstructor = function () {	
  //core.root.backgroundColor = 'rgb(40,40,0)';
  core.root.backgroundColor = this.backgroundColor;//'black';
  this.initializeProto();
  this.genPixels(this);
}	
return item;
}
});
      

