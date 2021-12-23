



import {rs as eyeP} from '/generators/lines_bugeye.mjs';
import {rs as basicP} from '/generators/basics.mjs';

let item = basicP.instantiate();
item.setName('lines_bugeyes');

item.initialize = function () {
  core.root.backgroundColor = 'black';
  let left = this.set('left',eyeP.instantiate());
  left.left = 1;
  let right = this.set('right',eyeP.instantiate());
	left.initialize();
	right.initialize();
  left.moveto(Point.mk(-90,0));
  right.moveto(Point.mk(90,0));
 
}	

export {item as rs};


      

