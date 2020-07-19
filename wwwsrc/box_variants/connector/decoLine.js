core.require('/line/decoLine.js','/connector/connector.js',function (shaft,connectorP) {
let item = connectorP.instantiate();

/* adjustable parameters */
item.wavesToSkip = 0;
item.waveAmplitude = 0.2;
item.waveLength = 40;
item.stroke = 'black';
item['stroke-width'] =2;
/* end adjustable parameters */

item.set('shaftProperties',core.lift(['wavesToSkip','waveAmplitude','waveLength','stroke','stroke-width']));
item.installShaft(shaft);

return item;
});
