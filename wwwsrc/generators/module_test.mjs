//import {item as circlePP} from '../shape_modules/circle.mjs';
//import {item as circlePP} from '../shape_modules/circle.mjs';
//debugger;
let rs = svg.Element.mk('<g/>');
/*import('../shape_modules/circle.js').then((module) => {
  let circlePP = module.rs;
  circlePP.dimension = 6;
  circlePP.fill = 'red';
  rs.set('cc',circlePP.instantiate().show());
});*/
import {rs as circlePP} from '../shape/circle.mjs'
//let rs = svg.Element.mk('<g/>');
debugger;
let c = rs.set('c',circlePP.instantiate().show());
c.fill = 'yellow'
c.dimension = 30;
export {rs};
