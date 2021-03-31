
core.require('/gen1/grid0_20.js',
function (rs) {
 let numTimeSteps = 100;
 rs.setName('grid0_20_12');
 let threeD = 0;
 let bkdim = threeD?1200:40;
let gdim = 64;
let topParams = {width:40,height:40,numRows:gdim,numCols:gdim,pointJiggle:0,fcTriX:1,fcTriY:1,fcLineX:.4,fcLineY:.7,fcGonX:.5,fcGonY:.5,fcCircle:0.7,numTimeSteps:numTimeSteps,frameSpeed:0.15,timeSpeed:0.15,interpolateFromStep:undefined,interpolateSteps:0,
backgroundWidth:bkdim,backgroundHeight:bkdim,threeD, backgroundColor:'rgb(10,10,10)',
smooth:1,vFactor:1/16,
fcCrossA0:2,fcCrossA1:0.5,fcCrossLength:1,options:['polygon'],//['horizontalLine','verticalLine','cross','polygon'],
sphereCenter:Point3d.mk(0,0,-20),sphereDiameter:35,focalPoint:Point3d.mk(0,0,50),focalLength:10,cameraScaling:100};//'polygon','circle']};

Object.assign(rs,topParams);
	
rs.finishProtos = function () {
	this.lineP['stroke-width'] = .11;
  this.lineP.stroke = 'yellow';
	this.polylineP['stroke-width'] = threeD?5:.1;
	this.polylineP.stroke = 'white';
	this.polylineP.stroke = 'yellow';
	this.polygonP.stroke = 'yellow';
	this.polylineP.fill = 'green';
	this.polylineP.fill = 'transparent';
	this.polygonP['stroke-width'] = threeD?1:.1;
	this.polygonP.fill = 'transparent';
//	this.polygonP.fill = 'white';
	this.circleP['stroke-width'] = 0.25;
	core.root.backgroundColor ='rgb(30,30,30)';
	//this.polylineP['stroke'] = 'yellow';
}	


rs.chooseWhich = function (rvs, cell) {
	let {numRows:nr,numCols:nc,HVValues,timeStep,numTimeSteps} = this;
  if (!HVValues) {
		this.HVValues = HVValues = [];
		HVValues.length = nr*nc;
	}
  let kind;
  kind = 'triangle';
  kind = 'cross';
   kind = 'horizontalLine';
  // kind = 'verticalLine';
  kind = 'polygon';
	let hnr = nr/2;
	let hnc = nc/2;
	let {x,y} = cell;
	let idx = x*nc + y;
  let chkdim = 4;
  let chksz = nc/chkdim;
  let xsq = Math.ceil(x/chksz);
  let ysq = Math.ceil(y/chksz);
  let fr = (timeStep/100)%1;//numTimeSteps;
  //if (((x/nc < fr)&&(y/nr < fr))||(((nc-x)/nc < fr)&&((nr-y)/nr < fr))){
  if ((xsq + ysq)%2 === 0) {
  //if ((Math.abs(x - hnc)<5) && (Math.abs(y - hnr)<5)) {
 // if (((x<hnc) && (y<hnr))|| ((x>hnc) && (y>hnr))) {
   return {which:kind,freeGons:1};
  //  return {which:'verticalLine',freeGons:1};
  }
  //return null;
return {which:'cross',whichRvs:1};
 // return {which:kind,whichRvs:1};
 return {which:'polygon',freeGons:1,whichRvs:1};
 //return {which:'horizontalLine',freeGons:1,whichRvs:1};
 return {which:'verticalLine',freeGons:1,whichRvs:1};
  
		//return 'cross';
	

}

return rs;
});
 