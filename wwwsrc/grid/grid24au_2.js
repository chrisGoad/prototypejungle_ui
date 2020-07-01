
core.require('/grid/grid24au.js',
function (constructor) {
  debugger;	//this.initProtos();

  let rs = constructor();
	rs.initProtos();
  let numRows,numCols;
	numRows = rs.numRows = 40;
	numRows = rs.numRows = 30;
	numCols = rs.numCols = 80;
	numCols = rs.numCols = 60;
	rs.width = 180;
	rs.height = 100;
  rs.pointJiggle =  1;
  rs.sx = Math.floor(Math.random() * numCols);
  rs.sy = Math.floor(Math.random() * numRows);
	let exz = 2;
 rs.bx = exz+ Math.floor(Math.random() * (numCols-exz));
  rs.by = exz + Math.floor(Math.random() * (numRows-exz));
	if ((rs.bx + rs.by)%2 === 0) {
		rs.bx = rs.bx+1;
	}
	//rs.bx = 6;
	//rs.by = 23;
	console.log('bx '+rs.bx+' by '+rs.by);

  //rs.bx = 0;
  //rs.by = 2;
 // alert('bx '+rs.bx+' by '+rs.by);
  rs.lineLength = 0.4;
  //rs.setupBoundaryRandomizer('red', {step:35,min:100,max:250,numRows,numCols});
  rs.setupBoundaryRandomizer('red', {step:35,min:150,max:250,numRows,numCols});
 // rs.setupBoundaryRandomizer('red', {step:35,min:0,max:100,numRows,numCols});
  core.root.backgroundColor = 'black';
	//rs.blineP.stroke = 'black';

rs.boundaryLineGenerator = function (end0,end1,rvs,cell,orientation) {
 let {bx,by,numRows,numCols} = this;
	   
 let {x,y} = cell; 
 let hy = this.numRows/2;
 let hx = this.numCols/2;
 
 debugger;
 //if (((x+y)%2 === 0) && !((x === bx) || (y === by)) ) {
 ///i f (((x+y)%2 === 0) && (((y === by) || (y === (by+1))) && (orientation === 'vertical' ))) {
 //let cxy = !((x === (bx+6)) && (y === (by+6)));
 let cxy = (x === bx) && (y === by) && (orientation === 'horizontal');
 if (((x+y)%2 === 0) || cxy)  {
 //if (((x+y)%2 === 0))  {
	 /*if (((y!==by) && (y!==(by+1))) || ((y === (by+1)) && (orientation === 'vertical'))) {
		 return;
	 }*/
	 let cy = ((y!==hy) && (y!==(hy+1))) || ((y === (hy+1)) && (orientation === 'vertical')); 
	 let cx = ((x!==hx) && (x!==(hx+1))) || ((x === (hx+1)) && (orientation === 'horizontal'));
	
	 if (cx && cy) {
		 return;
	 }
	  /*if ((x!==bx) && (x!==(bx+1))) {
     return;
	 }
	 if ((x === (bx+1)) && (orientation === 'horizontal')) {
		 return;
	 }*/
 }

	let r = rvs.red;

  let lines = this.lines;
  let line;
	line = this.blineP.instantiate();
	lines.push(line);
  let  ends = this.shortenLine(end0,end1,0.8);
  //let  ends = this.shortenLine(end0,end1, Math.random() + 0.5);
  line.setEnds(ends[0],ends[1]);

	line.stroke = `rgb(${Math.floor(r)},${Math.floor(r)},${Math.floor(r)})`;
  if (cxy) {
		line.stroke = 'cyan';
	}
	line.update();
	line.show();
}

  return rs;
});

