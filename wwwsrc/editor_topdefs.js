
let {core,geom,dom,graph,ui,editor}=Window,codeRoot=core.codeRoot,root=core.root,Point=geom.Point;
let svg;
if (dom) {
	svg = dom.svg;
}
core.afterLoadTop();
