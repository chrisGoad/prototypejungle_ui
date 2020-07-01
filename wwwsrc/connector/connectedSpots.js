
core.require('/line/connectedSpots.js','/connector/connector.js',function (shaft,connectorP) {
let item = connectorP.instantiate();



/* adjustable parameters */
item.interval = 20;
item.spotFill = 'black';
item.lineStroke = 'black';
item.lineWidth = 1;
item.spotDimension = 5;
/* end adjustable parameters */


item.shaftProperties = core.lift(['interval','spotFill','spotDimension','lineStroke','lineWidth']);
item.installShaft(shaft);

item.setFieldType('spotFill','svg.Rgb');
item.setFieldType('lineStroke','svg.Rgb');

return item;
});
