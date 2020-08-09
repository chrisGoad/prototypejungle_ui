
let graph = {};
graph.installCirclePeripheryOps = () => {};
let ui = {};
ui.hide = () => {};
let {core,geom,dom,draw}=Window,codeRoot=core.codeRoot,root=core.root,Point=geom.Point;
let svg;
if (dom) {
	svg = dom.svg;
}
core.afterLoadTop();
