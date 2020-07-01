core.require('/line/bulbous.js','/connector/connector.js',function (shaft,connectorP) {
let item = connectorP.instantiate();

/* adjustable parameters */
item.bulbWidth0 = 5;
item.bulbWidth1 = 10;
item.stroke = 'black';
/* end adjustable parameters */

item.set('shaftProperties',core.lift(['bulbWidth0','bulbWidth1','stroke']));
item.installShaft(shaft);

return item;
});
