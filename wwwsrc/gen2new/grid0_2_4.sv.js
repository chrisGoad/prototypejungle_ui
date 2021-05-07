
core.require('/gen1/grid0_2.js','/gen0/basics.js',
function (pr,addSetName)	{ 

let rs = svg.Element.mk('<g/>');

let p1 = pr.instantiate();
let p2 = pr.instantiate();

p1.setName(null,'grid0_2_0');
p2.setName(null,'grid0_2_0');

rs.set('p1',p1);
rs.set('p2',p2);

 
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

p2.patternOp = function (line) {
	line.stroke = 'red';
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
}



addSetName(rs);
rs.setName('grid0_2_4');

let pdim = 300;
let topParams = {loadFromPath:1,saveJson:0,numRows:20,width:pdim,height:pdim,numCols:20};///randomizeOrder:1,orderByOrdinal:1,width:300,height:300,pointJiggle:0,backgroundColor:'black',numRows:64,numCols:64};
 
Object.assign(p1,topParams);
Object.assign(p2,topParams);

rs.initialize = function () {
	debugger;
	p1.initialize( () => {
    p2.initialize(() => {
			let mv = 0.6 * p1.width;
			p2.moveto(Point.mk(-mv,0,0));
			p1.moveto(Point.mk(mv,0,0));
	})});
}
return rs;

});

