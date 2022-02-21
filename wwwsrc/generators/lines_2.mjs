

import {rs} from '/generators/lines_cobweb.mjs';

rs.setName('lines_2');
let ht = 200;
let topParams = {width:ht*1.5,height:ht,numLines:3000,angleMin:-90,angleMax:90,backgroundColor:'black',lineColor:'white'};
Object.assign(rs,topParams);

export {rs}
