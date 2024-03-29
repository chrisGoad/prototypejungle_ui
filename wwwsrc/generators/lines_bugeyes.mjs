



import {rs as eyeP} from '/generators/lines_bugeye.mjs';
import {rs as basicP} from '/generators/basics.mjs';

let item = basicP.instantiate();
item.setName('lines_bugeyes');
let ht= 235;
let topParams = {width:ht*1.5,height:ht,backStripeColor:'rgb(2,2,2)',backStripeWidth:1.5*1.12*ht,backStripeHeight:1.12*ht,backStripeVisible:0,sigX:0.4,sigY:0.35};
Object.assign(item,topParams);

item.initialize = function () {
  core.root.backgroundColor = 'black';
  let left = this.set('left',eyeP.instantiate());
  left.left = 1;
  let right = this.set('right',eyeP.instantiate());
	left.initialize();
	right.initialize();
  left.moveto(Point.mk(-90,0));
  right.moveto(Point.mk(90,0));
  this.addBackStripe();
 
}	

export {item as rs};


      

