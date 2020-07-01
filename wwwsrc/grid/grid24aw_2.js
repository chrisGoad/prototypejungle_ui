
core.require('/grid/grid24aw.js',
function (constructor) {
  debugger;	//this.initProtos();
  let randomRow;

  let rs = constructor();
	let inner0 = rs.inner0;
	inner0.initProtos();
	inner0.numRows = 2;
	inner0.numCols = 2;
	inner0.width = 10;
	inner0.height = 10;
		inner0.pointJiggle = 0;
  inner0.lineLength = 0.7;
		let inner1 = rs.inner1;
	inner1.initProtos();
	inner1.lineP.stroke = 'black';
	inner1.numRows = 2;
	inner1.numCols = 2;
	inner1.width = 10;
	inner1.height = 10;
		inner1.pointJiggle = 0;
  inner1.lineLength = 0.7;
	let outer = rs.outer;
outer.initProtos();
	outer.numRows = 16;
	outer.numCols = 16;
	outer.width = 160;
	outer.height = 160;
		outer.pointJiggle = 5;
  outer.lineLength = 0.4;
	
	
rs.next = function () {
   this.pattern.forEach((line) =>   {line.stroke = 'black';line.show();});
}
 
  return rs;
});

