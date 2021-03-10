
core.require('/gen1/grid0_15.js',
function (constructor,addBasicMethods) {
  debugger;	//this.initProtos();
  let randomRow;

  let rs = constructor();
	
	rs.setName('grid0_15_0');
	let inner0 = rs.inner0;
	inner0.initProtos();
	inner0.numRows = 4;
	inner0.numCols = 4;
	inner0.width = 20;
	inner0.height = 20;
		inner0.pointJiggle = 0;
  inner0.lineLength = 0.7;
		let inner1 = rs.inner1;
	inner1.initProtos();
	inner1.lineP.stroke = 'black';
	inner1.numRows = 4;
	inner1.numCols = 4;
	inner1.width = 20;
	inner1.height = 20;
		inner1.pointJiggle = 0;
  inner1.lineLength = 0.7;
	let outer = rs.outer;
outer.initProtos();
	outer.numRows = 8;
//	outer.numRows = 2;
	outer.numCols = 8;
	//outer.numCols = 2;
	outer.width = 160;
	//outer.width = 20;
	outer.height = 160;
	//outer.height = 20;
		outer.pointJiggle = 5;
  outer.lineLength = 0.4;
	
	
rs.next = function () {
   this.pattern.forEach((line) =>   {line.stroke = 'black';line.show();});
}
 
  return rs;
});

