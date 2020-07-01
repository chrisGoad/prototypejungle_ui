

// an edge has properties endN endNVertex, endNSide endNsideFraction  for N = 0,1. The periphery of a vertex has a series
// of sides (which are currently regarded as straight, but might be arcs in future). The sides are numbered from the top in
// clockwise order. endOSide = 3 and endNsideFraction = 0.2 means 20% of the way along the 3rd side.
// later: multiedges



const setEdgeEnds = function (edge,p0,p1) {
  edge.end0.copyto(p0);
  edge.end1.copyto(p1);
}


const edgeTransferElementState = function (dest,src) {
  setEdgeEnds(dest,src.end0,src.end1);  

  if (src.end0vertex) {
    dest.end0vertex = src.end0vertex;
  }
  if (src.end1vertex) {
    dest.end1vertex = src.end1vertex;
  }
  core.setProperties(dest,src,['end0connection','end1connection'],true); 
}


vars.uiHideEdgeProperties = () => {};

const installEdgeOps = function (where) {


where.role = 'edge';
where.transferGraphState = edgeTransferElementState;
vars.uiHideEdgeProperties(where);


where.connected = function (idx) {
  if (idx === 0) {
    return !!(this.end0vertex);
  }
  if (idx === 1) {
    return !!(this.end1vertex);
  }
  return false;
}

where.dropControlPoint = function (iidx,droppedOver) {
    if (!droppedOver) {
      return;
    }
    let vertex = core.ancestorWithRole(droppedOver,'vertex');
    if (!vertex) {
      return;
    }
    let idx = this.endFromIndex?this.endFromIndex(iidx):iidx;
    if ((idx === 0) && (!this.end0vertex)) {
      graph.connect1end(this,0,vertex,this.connectionType);
    } else if ((idx === 1) && (!this.end1vertex)) {
      graph.connect1end(this,1,vertex,this.connectionType);
    }
    graph.updateEnds(this);
    if (this.update) {
      this.update();
    }
    this.draw();
    if (vars.unselect) {
      vars.unselect();
    }
  }




}

export {installEdgeOps,edgeTransferElementState};