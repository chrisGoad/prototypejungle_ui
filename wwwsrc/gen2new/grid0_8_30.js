
core.require('/gen1/grid0_8.js','/gen1/sphere_setup0.js','/gen1/layeredGrid2.js','/gen0/basics.js','/shape/textOneLine.js','/shape/rectangle.js',
//core.require('/shape/rectangle.js','/line/line.js','/shape/circle.js','/gen0/grid0.js','/gen0/lines0.js',
function (grd,setupSphere,setupLayers,addBasicMethods,textPP,rectPP)	{ 

	let rs = svg.Element.mk('<g/>');
	addBasicMethods(rs);
  rs.set('sphere',grd);
	
rs.setName('grid0_8_30');

setupLayers(grd);
setupSphere(grd);

let newGlobalParams  = {
	genPolygons:1,
	genCircles:0,
};
		
let gp = grd.globalParams;
Object.assign(gp,newGlobalParams);

let bkdim = 1500;
let newTopParams  = {
	numRows:64,
	numCols:64,
	width:50,
	height:50,
	pointJiggle:5,
	backgroundWidth:bkdim,
	backgroundHeight:bkdim,
	backgroundColor : 'white',
};	
Object.assign(grd,newTopParams);

'/gen1/sphere_setup0.js',
grd.finishProtos = function () {
	this.rectP.stroke = 'rgba(0,0,0,.8)';
	//this.circleP['stroke-width'] = 0;
	this.rectP['stroke-width'] = 0.4;
}
rs.initProtos = function () {
	core.assignPrototypes(this,'textP',textPP);
	this.textP['font-size'] = 10;
//	this.textP['text-align'] = 'right';
	
	core.assignPrototypes(this,'rectP',rectPP);
	this.rectP['stroke-width'] = 10;
	this.rectP.fill = 'transparent';
	this.rectP.stroke = 'black';
}

rs.initialize = function () {
core.root.backgroundColor = 'white';

 let {focalPoint,focalLength,cameraScaling,sphere} = this;
  debugger;

 sphere.initProtos();
 this.initProtos();
  sphere.initializeGrid();
	sphere.moveto(Point.mk(300,0));
	let boxCount = 0;
	const addBox = (width,height,vpos) => {
		let nm = 'box'+ (boxCount++);
		let box = this.set(nm,this.rectP.instantiate());
		box.width = width;
		box.height = height;
		box.show();
		box.moveto(Point.mk(0,vpos));
	}
	addBox(1800,1400,0);
	addBox(1800,500,1100);
	addBox(1800,500,1700);
	addBox(1800,500,2300);
	addBox(1800,500,2900);
	
	/*	
	let box0 = this.set('box0',this.rectP.instantiate());
  box0.width = 1800;
  box0.height = 1400;
	box0.show();
	let box1 = this.set('box1',this.rectP.instantiate());
  box1.width = 1800;
  box1.height = 500;
	box1.show();
	box1.moveto(Point.mk(0,1100));
	let box2 = this.set('box2',this.rectP.instantiate());
  box2.width = 1800;
  box2.height = 500;
	box2.show();
	box2.moveto(Point.mk(0,1400));
	*/
	const addText =  (nm,text,pos) => {
	   let txt = this.set(nm,this.textP.instantiate());
		 txt.text = text;
		 txt.setScale(8);
		 txt.show();
	   txt.moveto(pos);
	   txt.update();
	}
	addText('txt0','Mathematical Description',Point.mk(-400,-600));
	addText('txt01','of Depicted Object',Point.mk(-520,-500));
//	addText('txt1','Shape with',Point.mk(-635,-300));
//	addText('txt11','Surface Texture',Point.mk(-550,-200));
	addText('txt2','Levels of',Point.mk(-1430,-400));
	addText('txt3','Description',Point.mk(-1400,-300));
		addText('txt4','Description in a High Level ',Point.mk(-350,1000));
		addText('txt41','Programming Language (C, Python, etc)',Point.mk(-110,1100));
		addText('txt42','"Source Code"',Point.mk(-570,1200));
		addText('txtML','Description in Machine Language ',Point.mk(-220,1700));

		addText('txt5','Circuit-level Description',Point.mk(-400,2300));
		addText('txt6','Physics-level Description:',Point.mk(-340,2825));
		addText('txt7','Electrons in Wires and Semiconductors',Point.mk(-100,2925));


}
return rs;


});

