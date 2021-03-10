

core.require('/arrow/arrow0.js','/line/decoLine.js','/arrow/curvedHead.js',function (arrowP,linePP,headPP) {
let item = arrowP.instantiate();
item.installShaftAndHead(linePP,headPP);
return item;
});
