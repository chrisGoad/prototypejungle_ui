// bulls eye

//core.require('/shape/blurredCircle.js',function (elementPP) {
core.require('/line/line.js','/random/addRandomLines4.js', 
 function (linePP,addMethods) {
  debugger;
let item = svg.Element.mk('<g/>');

addMethods(item);


item.initializeProtos = function () {
  core.assignPrototypes(this,'diagLineP',linePP);
  this.diagLineP.stroke = 'red';
  this.diagLineP.stroke = 'black';
  this.diagLineP['stroke-width'] = 0.2;
  core.assignPrototypes(this,'lineP',linePP);
  this.lineP.stroke = 'black';
  this.lineP['stroke-width'] = 0.2;
}  
item.initialize = function () {
  debugger;
  this.initializeProtos();
  this.showEveryDiag = 1;
  this.cross = 1;
  let numRC = 10;
  this.numRows = numRC;
  this.numCols = numRC;
  this.width = 100;
  this.height = 100;
  this.lineLengthRatio = 1;
  let linesC = this.set('linesC',svg.Element.mk('<g/>'));
  let lines = linesC.set('lines',core.ArrayNode.mk());
  let linesC2 = this.set('linesC2',svg.Element.mk('<g/>'));
  let lines2 = linesC2.set('lines',core.ArrayNode.mk());
  let randoms = this.set('randoms',core.ArrayNode.mk());
  let n = numRC*numRC
  lines.length = n;
  lines2.length = n;
  randoms.length = n;
  //let dir = 0.75 * Math.PI;
  const addDiagonals = (lines) => {
    let dir = this.cross?0.25 * Math.PI:0.75*Math.PI;
    for (let i=0;i<numRC;i++) {
      if (this.showEveryDiag || (i%2 === 0)) {
        this.addLine(lines,this.diagLineP,i,i,dir);
      }
    }
    dir = this.cross?0.75 * Math.PI:0.25 * Math.PI;
    for (let i=0;i<numRC;i++) {
    //  this.addLine(this.diagLineP,i,numRC-i,dir);
      if (this.showEveryDiag  || i%2 === 0) {
        this.addLine(lines,this.diagLineP,i,numRC-i,dir);
      }
    } 
  }   
  addDiagonals(lines);  
  this.addTheLines(lines,this.lineP);
  this.useRandoms = true;
  debugger;
  addDiagonals(lines2);  
  this.addTheLines(lines2,this.lineP);
  let f = 0.6;
  linesC.moveto(Point.mk(-f * this.width,0));
  debugger;
  linesC2.moveto(Point.mk(f*this.width,0));
  debugger;
  let ri = Math.floor(Math.random()* numRC);
  let rj = Math.floor(Math.random()* numRC);
  let rline = this.lineAt(lines,ri,rj);
  let rline2 = this.lineAt(lines2,ri,rj);
  let  idx = this.indexAt(ri,rj);
  let r = this.randoms[idx];
  let dir = 2 * Math.PI * r;

 // let rline = lines2[ridx];
  this.setLineDir(rline2,ri,rj,dir+1);
  //rline.stroke = 'red';
  //rline2.stroke = 'red';
  rline.update();
  rline.show();
  //this.addTheLines();
  
}
 return item;
});
