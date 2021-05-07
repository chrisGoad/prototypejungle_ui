
core.require('/gen1/grid0_2.js','/gen0/basics.js','/shape/rectangle.js',
function (pr,addBasicMethods)	{ 

let rs = svg.Element.mk('<g/>');
addBasicMethods(rs);

let p1 = pr.instantiate();
let p2 = pr.instantiate();

p1.setName(null,'grid0_2_0');
p2.setName(null,'grid0_2_0');

p2.patternDir = function (x,y) {
	let {numRows:nr} = this;
	let hnr = nr/2;
	let qpi = 0.25*Math.PI;
	if ((x - y) === hnr) { // diagonally down
		return -qpi;
	}
	if ((x - y) === -hnr) { // diagonally down
		return -qpi;
	}
	if ((x + y) === hnr) { // diagonally up
		return qpi;
	}
	if ((x + y) === nr+hnr) { // diagonally up
		return qpi;
	}
	return null;
	
}

p1.patternDir = function (x,y) {
	let {numRows:nr} = this;
	let hnr = nr/2;
	let qpi = 0.25*Math.PI;
	if ((x<2) || (y<2) || (y>(nr-3))) {
    return null;
	}
	if (x === y) {// diagonally down
		  return -qpi;
	}
	if (x + y === nr) {// diagonally down
		return qpi;
	}
	return null;
	
}

p1.patternOp = function (line) {
	line.stroke = 'red';
	//line['stroke-width'] = 2;
}


p2.patternOp = function (line) {
	line.stroke = 'red';
}

rs.setName('grid0_2_4');

let pdim = 300;
let twid = 2.2*pdim;
let bpad = 50;
let partParams = {loadFromPath:1,saveJson:0,numRows:20,width:pdim,height:pdim,numCols:20};
let topParams = {width:twid,height:pdim,backgroundColor:'rgb(10,10,10)',backgroundWidth:twid+bpad,backgroundHeight:pdim+bpad};
Object.assign(p1,partParams);
Object.assign(p2,partParams);
Object.assign(rs,topParams);


rs.initialize = function () {
	debugger;
	this.addBackground();
	this.set('p1',p1);
	this.set('p2',p2);
	p1.initialize( () => {
    p2.initialize(() => {
			let mv = 0.6 * p1.width;
			p2.moveto(Point.mk(-mv,0,0));
			p1.moveto(Point.mk(mv,0,0));
	})});
}
return rs;

});

