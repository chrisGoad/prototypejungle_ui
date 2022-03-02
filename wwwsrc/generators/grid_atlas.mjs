
import {rs as rectPP} from '/shape/rectangle.mjs';
import {rs as basicsP} from '/generators/basics.mjs';
import {rs as addGridMethods} from '/mlib/grid.mjs';
import {rs as addRandomMethods} from '/mlib/topRandomMethods.mjs';
let rs = basicsP.instantiate();

  addGridMethods(rs);
  addRandomMethods(rs);
	rs.setName('grid_atlas');

  let sqd = 50;
  let ht=0.8*sqd*sqd;

let topParams = {numCols:1.5*sqd,numRows:sqd,height:ht,width:1.5*ht,backStripeColor:'rgb(2,2,2)',backStripePadding:0.17*ht};
Object.assign(rs,topParams);

rs.initProtos = function () {
	this.rectP = rectPP.instantiate();
	this.rectP = rectPP.instantiate();
	this.rectP.stroke = 'black';
	this.rectP.fill = 'blue';
	this.rectP['stroke-width'] = 2;
	this.rectP.width = sqd;
  this.rectP.height = sqd;
}  



rs.shapeGenerator = function (rvs,cell) {
		let {shapes,rectP,numRows,numCols} = this;
    let rOw = rvs.redOrWhite;
	  let shape = rectP.instantiate();
    let hc = 0.5*numCols;
    let fc = Math.abs(cell.x - hc)/numRows+0.05;
    let dim = fc * 2 * sqd;
    shape.width = dim;
    shape.height = dim;
		shapes.push(shape);
    let lev = 100 + rOw*50;
    shape.fill = (rOw < 1)?'rgba(255,255,255,0.6)':'rgba(255,25,25,0.6)';
  
		shape.show();
		return shape;
	}

rs.initialize = function () {
  this.addBackStripe();
	this.initProtos();
 this.setupShapeRandomizer('redOrWhite',{step:0.5,min:0,max:2});
	this.initializeGrid();
}
		

export {rs};


