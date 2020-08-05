
core.require('/grid/grid24aw.js',
function (constructor) {
  debugger;	//this.initProtos();
  let randomRow;

  let rs = constructor();
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
	outer.numRows = 4;
	outer.numCols = 4;
	outer.width = 80;
	outer.height = 80;
		outer.pointJiggle = 0;
  outer.lineLength = 0.2;
	
	
rs.next = function () {
   this.pattern.forEach((line) =>   {line.stroke = 'black';line.show();});
}
 
  return rs;
});
