

core.require('/shape/rectangle.js','/grid/dim2dWalker.js',function (pixelPP,addMethods) {
debugger;
let item = svg.Element.mk('<g/>');

addMethods(item);
/*adjustable parameters  */


item.setPixelDim = function (px,dim) {
  //px.dimension = dim-1;
  px.width = dim+1;
  px.height = dim+1;
}
  
item.shade2rgb = function (ic) {
  let [r,g,b] = ic;
  let c = [r,r,0]; //yellow
 // let c = [r,g,b]; //yellow
 // let c = [r,r,r]; //white
  return `rgb(${Math.floor(c[0])},${Math.floor(c[1])},${Math.floor(c[2])}`;
}
item.initializeProto = function () {
  core.assignPrototypes(this,'pixelP',pixelPP);
  this.pixelP.stroke = 'transparent';
  this.pixelP['stroke-width']= 0;
}
  

item.initialize = function () {	
  //core.root.backgroundColor = 'rgb(40,40,0)';
  core.root.backgroundColor = 'black';
  this.initializeProto();
  debugger;
  this.genPixels({numRows:200,numCols:200,pixelDim:5,
                                    rangeL:[40,40,40],rangeH:[250,250,250],maxStep:[25,25,25]});
}	
return item;
});
      

