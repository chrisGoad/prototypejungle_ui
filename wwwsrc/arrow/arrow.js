
core.require('/arrow/arrow0.js','/line/line.js','/arrow/solidHead.js',function (arrowP,linePP,headPP) {
let item = arrowP.instantiate();

item.installShaftAndHead(linePP,headPP);

return item;
});


