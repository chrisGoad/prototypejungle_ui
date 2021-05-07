
core.require('/shape/polygon.js','/gen0/grid0.js',
function (polygonPP,addGridMethods) {
  
let rs = svg.Element.mk('<g/>');

addGridMethods(rs);
rs.setName('grid0_46');
let topParams = {width:400,height:400,numRows:100,numCols:100,pointJiggle:10};

Object.assign(rs,topParams);
	

rs.initProtos = function () {
  core.assignPrototypes(this,'polygonP',polygonPP);
  this.polygonP['stroke-width'] = 0;
  this.polygonP.stroke = 'yellow';
  this.polygonP.fill = 'transparent';
}  

rs.shapeGenerator = function (rvs,cell) {
  debugger;
	let {shapes,polygonP,deltaX,deltaY} = this;
	let {ulx,uly,urx,ury,lrx,lry,llx,lly,interior} = rvs;
	let ul = Point.mk(-ulx,-uly).times(deltaX/200);
	let ur = Point.mk(urx,-ury).times(deltaX/200);		
	let lr = Point.mk(lrx,lry).times(deltaX/200);
	let ll = Point.mk(-llx,lly).times(deltaX/200);
	let col = cell.x;
  let shape = polygonP.instantiate();
  shapes.push(shape);
	shape.corners = [ul,ur,lr,ll,ul];
	shape.update();
	//if (interior > 0.5) {
	let r = Math.floor(Math.random()*255);
	let g = Math.floor(Math.random()*255);
	let b = Math.floor(Math.random()*255);
  let tone = Math.random();
	let rgb =`rgb(${r},${g},${b})`
//	rgb =`rgb(${tone},${tone},${tone})`
//	 rgb =`rgba(255,255,255,${tone})`
	//if (Math.random() > 0.7) {
		shape.fill = rgb;
	//}
	shape.show()
  return shape;
}
	
rs.initialize = function () {
  debugger;
  this.initProtos();
  core.root.backgroundColor = 'black';
	let rmin = 0;
	let rmax = 50;
	let rstep = 15;
	this.setupShapeRandomizer('ulx',  {step:rstep,min:rmin,max:rmax});
	this.setupShapeRandomizer('uly',  {step:rstep,min:rmin,max:rmax});
  this.setupShapeRandomizer('urx',  {step:rstep,min:rmin,max:rmax});
	this.setupShapeRandomizer('ury',  {step:rstep,min:rmin,max:rmax});
	this.setupShapeRandomizer('lrx',  {step:rstep,min:rmin,max:rmax});
	this.setupShapeRandomizer('lry',  {step:rstep,min:rmin,max:rmax});
	this.setupShapeRandomizer('llx',  {step:rstep,min:rmin,max:rmax});
	this.setupShapeRandomizer('lly',  {step:rstep,min:rmin,max:rmax});
	this.setupShapeRandomizer('interior',  {step:0.1,min:0,max:1});
  this.initializeGrid();
}	
return rs;
});
 