
core.require('/grid/grid24at.js',
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
  //rs.set('adjustedLines', core.ArrayNode.mk())
  rs.adjustedLines0 = []; 
  rs.adjustedLines1 = []; 

rs.next = function () {
  let {lineLength,numRows,numCols,shapes} = this;
  let cnt = 0;
  let num = 500;
  let n = numCols * numRows;
  let done = [];
  done.length = n;
  const step = () => {
     let i = Math.floor(Math.random()*numCols);
     let j = Math.floor(Math.random()*numRows);
     let idx = i*numCols + j;
     if (!done[idx]) {
			 done[idx] = 1;
			 let line = shapes[idx];
			 this.setLineEnds(line,lineLength,0);//0.25*Math.PI);
			 cnt++;
			 if (cnt<n) {
				 setTimeout(step,50);
       }
			
     } else {
       setTimeout(step,0);
     }
  }
  step();
}  
  /*setTimeout( () => {
    
      
     adlines0.forEach((line) =>   this.setLineEnds(line,lineLength,0.25*Math.PI));
     adlines1.forEach((line) =>   this.setLineEnds(line,lineLength,0.75*Math.PI));

     //adlines0.forEach((line) => line.stroke = 'blue');
    },1000);
}*/
  
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

