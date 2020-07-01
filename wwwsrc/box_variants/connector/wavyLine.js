core.require('/line/wavyLine.js','/connector/connector.js',function (shaft,connectorP) {
let item = connectorP.instantiate();

/* adjustable parameters */
item.cornerFraction = 0.4;
item.waveAmplitude = 10;
item.waveLength = 20;
item.stroke = 'black';
item['stroke-width'] =2;
/* end adjustable parameters */

//the properties to be transferred to the shaft
item.set('shaftProperties',core.lift(['cornerFraction','waveAmplitude','waveLength','stroke','stroke-width']));
item.installShaft(shaft);

return item;
});
