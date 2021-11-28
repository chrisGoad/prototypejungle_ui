
//core.require('/gen1/grid0_10.js','/line/line.js',
//function (rs,linePP)	{ 
//addSetName(rs);
core.require('/line/line.js','/shape/rectangle.js','/gen0/Basics.js','/mlib/grid.js','/mlib/topRandomMethods.js','/mlib/sphere.js',
function (linePP,rectPP,rs,addGridMethods,addRandomMethods,addSphereMethods) {

addGridMethods(rs);
addRandomMethods(rs);
addSphereMethods(rs);
rs.setName('grid0_10_0');


 let nR = 60;
let aR = 1;
let topParams = {saveImage:1,saveJson:1,loadFromPath:0,numRows:nR,numCols:aR*nR,width:nR,height:nR,pointJiggle:10,
lineLength:15,sphereCenter:Point3d.mk(0,0,-30),sphereDiameter:35,focalPoint:Point3d.mk(0,0,50),focalLength:10,cameraScaling:100} ;

Object.assign(rs,topParams);

Object.assign(rs,topParams);


rs.initProtos = function () {
	let {lineLength} = this;
	const addProto =  (n,dir,color) => {
		let nm = 'shapeP'+n;
		core.assignPrototypes(this,nm,linePP);
		let pr = this[nm];
		pr.stroke = color;
		pr['stroke-width'] = 1;
		pr['stroke-width'] = 4;
		this.setLineEnds(pr,lineLength,dir);
		//this.setLineEnds(pr,lineLength,0);
	}
	addProto(0,0,'red');
	addProto(1,0.25*Math.PI,'green');
	addProto(2,0.5*Math.PI,'blue');
	addProto(3,0.75*Math.PI,'magenta');
	if (this.finishProtos) {
		finishProtos();
	}
} 


rs.shapeGenerator = function (rvs,cell,cnt) {
	let {numRows,numCols} = this;
	let {x,y} = cell;
	let frx = x/numCols;
	let fry = y/numRows;
  //let {shapes,dirValues,lineLength,shapeP0} = this;
  let {shapes} = this;
	let pr0 = (frx < 0.5)?0.5:0;
	//let pr0 = 0.5*frx;
	let pr1 = 0.5 - pr0;
	let pr2 = (fry < 0.5)?0.5:0;
	//let pr2 = 0.5*fry;
	let pr3 = 1-pr2;
	let r = Math.random();
	let shape;
	if (r < pr0) {
		shape = this.shapeP0.instantiate();
	} else if (r < (pr0+pr1)) {
		shape = this.shapeP1.instantiate();
	} else if (r < (pr0+pr1+pr2)) {
		shape = this.shapeP2.instantiate();
	} else {
		shape = this.shapeP3.instantiate();
	} 
	shape.show();
	shapes.push(shape);
	return shape;
}


rs.initialize = function (cb) {
	debugger;
	let {focalPoint,focalLength,cameraScaling} = this;
	let {width,height,numRows,numCols} = this;
	this.deltaX = width/numCols;
  this.deltaY = height/numRows;
	this.initProtos();
	this.camera = geom.Camera.mk(focalPoint,focalLength,cameraScaling,'z');
	this.initializeGrid();
}
 

return rs;

});

