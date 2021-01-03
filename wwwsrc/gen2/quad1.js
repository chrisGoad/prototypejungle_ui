
core.require('/line/line.js','/gen0/lines0.js','/gen0/basics.js',
function (linePP,addMethods,addSetName) {
	

debugger;	//this.initProtos();
//core.vars.whereToSave = 'images/grid_1_1.jpg';
let rs = svg.Element.mk('<g/>');
addSetName(rs);

let quad1 = rs.set('quad1',svg.Element.mk('<g/>'));
let quad2 = rs.set('quad2',svg.Element.mk('<g/>'));
let quad3 = rs.set('quad3',svg.Element.mk('<g/>'));
let quad4 = rs.set('quad4',svg.Element.mk('<g/>'));


let qParams = {width:200,height:200,numLines:5000,angleMin:-90,angleMax:90};

	
	
const initProtos = function (quad,color) {
  core.assignPrototypes(quad,'lineP',linePP);
  quad.lineP.stroke = color;
  quad.lineP.radius = 150;
  quad.lineP['stroke-width'] = .07; 	
}  

let quads = [quad1,quad2,quad3,quad4];

initProtos(quad1,'white');
initProtos(quad2,'white');
initProtos(quad3,'black');
initProtos(quad4,'black');


quads.forEach( (quad) => 
	{	
		addMethods(quad);
		Object.assign(quad,qParams);
		//quad.setName('spatter0_10','spatter_3');
		//initProtos(quad,'red');
		quad.initialize = function () {
			this.initializeLines();
		}

});
let bkcolor1 = 'black';
let bkcolor2 = 'white';
quad1.backgroundColor = bkcolor1;
quad2.backgroundColor = bkcolor1;
quad3.backgroundColor = bkcolor2;
quad4.backgroundColor = bkcolor2;
/*quad1.backgroundColor = 'black';
quad2.backgroundColor = 'black';
quad3.backgroundColor = 'white';
quad4.backgroundColor = 'white';*/

quad2.numLines = 1000;
quad3.numLines = 1500;
rs.setName('quad1');

	
 const excludeLineFunction = function (sg) {
    let md = sg.middle();
		let ln = md.length();
    return ln > 40;
  }
	
	quad1.excludeLineFunction = excludeLineFunction;
	quad4.excludeLineFunction = excludeLineFunction;
 

	rs.addTheBox = function () {
		this.lineP = quad1.lineP;
		this.width =2.2*quad1.width;
		this.height = quad1.height;
		this.addBox('white',50,1);
		this.show();
		draw.fitTheContents();
	}
	

rs.initialize = function () {
	debugger;
	core.root.backgroundColor ='black';
	let width = qParams.width;
	quads.forEach( (quad) =>  {quad.initialize()});
	//let mv = 0.55*width;
	let mv = 0.5*width;
	quad1.moveto(Point.mk(-mv,-mv));
	quad4.moveto(Point.mk(mv,-mv));
	quad2.moveto(Point.mk(-mv,mv));
	quad3.moveto(Point.mk(mv,mv));
	/*	quad1.moveto(Point.mk(-mv,-mv));
	quad2.moveto(Point.mk(mv,-mv));
	quad4.moveto(Point.mk(-mv,mv));
	quad3.moveto(Point.mk(mv,mv));*/
	this.draw();
	//this.addTheBox();
}

	

	return rs;
});

