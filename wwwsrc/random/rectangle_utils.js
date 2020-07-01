//This code implements the randomized rectangle shape
core.require(function () {

let item = core.ObjectNode.mk();



const genRandomPoint = function (itm) {
  debugger;
  let {width,height,randomFactor} = itm;
  let minDim = Math.min(width,height);
  let rnd0 = minDim * (randomFactor * (Math.random()-0.5));
  let rnd1 = minDim * (randomFactor * (Math.random()-0.5));
  return Point.mk(rnd0,rnd1);
}


const randomize = function (itm) {
  itm.set('ULD',genRandomPoint(itm));
  itm.set('URD',genRandomPoint(itm));
  itm.set('LRD',genRandomPoint(itm));
  itm.set('LLD',genRandomPoint(itm));
  itm.initialWidth = itm.width;
  itm.initialHeight = itm.height;

}

const genCorners = function (itm) {
  let hw = 0.5 * itm.width;
  let hh = 0.5 * itm.height;
  randomize(itm);
  itm.set('UL',Point.mk());
  itm.set('UR',Point.mk());
  itm.set('LR',Point.mk());
  itm.set('LL',Point.mk());

}

const updateCorners = function (itm) {
  if (!itm.UL) {
    genCorners(itm);
  }
  let w = itm.width;
  let h = itm.height;
  let hw = 0.5 * w;
  let hh = 0.5 * h;
  let wr = w/(itm.initialWidth);
  let hr = h/(itm.initialHeight);
  itm.UL.copyto(Point.mk(-hw,-hh).plus(Point.mk(wr * itm.ULD.x,hr * itm.ULD.y)));
  itm.UR.copyto(Point.mk(hw,-hh).plus(Point.mk(wr * itm.URD.x,hr * itm.URD.y)));
  itm.LR.copyto(Point.mk(hw,hh).plus(Point.mk(wr * itm.LRD.x,hr * itm.LRD.y)));
  itm.LL.copyto(Point.mk(-hw,hh).plus(Point.mk(wr * itm.LLD.x,hr * itm.LLD.y)));
}

item.genPath = function (itm) {
  updateCorners(itm);
  let p2str = function (letter,point,after) {
    return letter+' '+point.x+' '+point.y+after;
  }
  let path = p2str('M',itm.UL,' ');
  path += p2str('L',itm.UR,' ');
  path += p2str('L',itm.LR,' ');
  path += p2str('L',itm.LL,' ');
  path += p2str('L',itm.UL,' ');
  return path;
}

return item;
});
