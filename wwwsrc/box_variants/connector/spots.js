core.require('/line/spots.js','/connector/connector.js',function (shaft,connectorP) {
let item = connectorP.instantiate();


/* adjustable parameters */
item.interval = 10;
item['stroke-width'] = 4;
item.stroke = 'black';
/* end adjustable parameters */

item.numSpots = 0;

item.set('shaftProperties',core.lift(['numSpots','stroke','stroke-width','interval']));
item.installShaft(shaft);

ui.hide(item,['numSpots']);

return item;
});
