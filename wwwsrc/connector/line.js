//line as connector
core.require('/line/line.js','/connector/connector.js',function (shaft,connectorP) {
let item = connectorP.instantiate();

/* adjustable parameters */
item.stroke = 'black';
item['stroke-width'] =2
/* end adjustable parameters */

item.set('shaftProperties',core.lift(['stroke','stroke-width']));
item.installShaft(shaft);

return item;
});
