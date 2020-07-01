// bulls eye

//core.require('/shape/blurredCircle.js',function (elementPP) {
core.require('/line/line.js','/shape/circle.js','/random/addRandomLines3.js', 
 function (linePP,circlePP,addMethods) {
  debugger;
let item = svg.Element.mk('<g/>');

addMethods(item);


item.initializeProtos = function () {
  core.assignPrototypes(this,'lineP',linePP);
  this.lineP.stroke = 'red';
  this.lineP['stroke-width'] = 0.5;
  core.assignPrototypes(this,'circleP',circlePP);
  this.circleP.stroke = 'red';
  this.circleP['stroke-width'] = 0.5;
}  
item.initialize = function () {
  debugger;
  core.root.backgroundColor = 'rgb(150, 43, 43)';
  //core.root.backgroundColor = 'grey';
  this.initializeProtos();
  let lines1 = this.set('lines1',core.ArrayNode.mk());
  this.ydim = 200;
  this.xdim = 200;
  let numRows = this.numRows = 50;
  let numCols = this.numCols = 50;
  let hnr = 0.5*numRows;
  let hnc = 0.5*numCols;
  let maxd = 0.5 * this.xdim;
  this.addTheLines();
  for (let i = 0;i<numRows;i++){
    for (let j = 0;j<numCols;j++) {
      let shp = this.lineAt(i,j);
      let center = this.cellCenter(i,j);
      let dist = center.length();
   
      if (dist > maxd) {
        shp.hide();
      } else {
        let opacity = 1 - dist/maxd;
        let clr;
        if (opacity < 0.7) {
          clr = 'rgba(255,255,255,'+opacity+')';
        } else {
          clr = 'rgba(0,0,0,'+opacity+')';
        }
        
        //let clr = 'rgba(255,0,0,'+opacity+')';
        //let clr = 'rgba(255,255,255,'+opacity+')';
        shp.stroke = clr;
        shp.fill = clr;
      }
    }
  }
        
  
  
}
 return item;
});
