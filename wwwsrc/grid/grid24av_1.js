
core.require('/grid/grid24av.js',
function (constructor) {
  debugger;	//this.initProtos();
  let randomRow;

  let rs = constructor();
	rs.initProtos();
	rs.numRows = 20;
	rs.numCols = 20;
	rs.width = 300;
	rs.height = 300;
		rs.pointJiggle = 0;
  rs.lineLength = 0.7;
  rs.symmetrical = false;
  rs.generateVariant = true;
  //rs.set('adjustedLines', core.ArrayNode.mk())
  rs.adjustedLines0 = []; 
  rs.adjustedLines1 = []; 


/*
rs.next = function () {
	debugger;
  this.pattern.forEach((line) =>  { line.stroke = 'black';line['stroke-width'] = 2;this.show();});
}
*/
rs.next = function () {
	debugger;
  this.pattern.forEach((line) =>  { line.stroke = 'black';this.show();});
}
  
/*	rs.step0 = 0.05;
	rs.min0 = 0;
	rs.max0 = 0.4;
	//rs.maxLeft = 0.8;
 rs.min1 = -0.4;//0.9;
	rs.max1 = 0;	
	rs.step1 = 0.05;
	rs.spatter = 0;
	rs.changePoint =  0.5;
	rs.lineLengthFactor = 4;
	rs.numDrops = 100;*/
  return rs;
});

