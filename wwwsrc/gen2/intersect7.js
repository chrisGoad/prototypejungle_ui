
core.require('/line/line.js','/gen0/lines0.js',//'/random/addIntersectingLines4.js',
function (linePP,addMethods) {
debugger;
let rs = svg.Element.mk('<g/>');

addMethods(rs);
/*adjustable parameters  */
rs.setName('intersect7');
 rs.width= 200;
  rs.height = 200;
  rs.numLines=5000;
  rs.angleMin = -90;
  rs.angleMax = 90;
	rs.backgroundColor = 'red';
/* end adjustable parameters */

rs.initializeProto = function () {
  core.assignPrototypes(this,'lineP',linePP);
  this.lineP.stroke = 'white';
  this.lineP.radius = 150;
  this.lineP['stroke-width'] = .025; 	
}  

rs.initialize = function () {
  this.initializeProto();
  core.root.backgroundColor = 'black';
	 this.initializeLines();
}

 rs.excludeLineFunction = function (sg) {
    let md = sg.middle();
		//return (Math.abs(md.x) > 60) || (Math.abs(md.y) > 60);
		let ln = md.length();
    return ln > 40;
  //  return (ln >80) || (ln <40) 
  }
 
 //this.lineCenterDistance = 40;
 

return rs;

});
      

