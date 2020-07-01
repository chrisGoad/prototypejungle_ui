

// Section: connection support

const addToEdgeArray = function (vertex,edge,whichEnd) {
   let edgeArray;
   if (whichEnd === 0) {
      edgeArray = vertex.__outgoingEdges;
      if (!edgeArray) {
        edgeArray = core.ArrayNode.mk();
        vertex.set('__outgoingEdges',edgeArray);
      }
   } else {
      edgeArray = vertex.__incomingEdges;
      if (!edgeArray) {
        edgeArray = core.ArrayNode.mk();
        vertex.set('__incomingEdges',edgeArray);
      }
   }
   edgeArray.plainPush(edge);
}

const connectedEdgesOf = function (vertex) {
   let edgeArray = vertex.connectedEdges;

   if (!edgeArray) {
     edgeArray = core.ArrayNode.mk();
     vertex.set('connectedEdges',edgeArray);
   }
   return edgeArray;
}
// if no vertex is supplied, this adds to the edge to the connectedEdges of each associated vertex
const addToConnectedEdges = function (edge,ivertex) {
  if (ivertex) {
     connectedEdgesOf(ivertex).plainPush(edge);
     return;
  }
  let vertex = edge.end0vertex;
  if (vertex) {
    connectedEdgesOf(vertex).plainPush(edge);
  }
  vertex = edge.end1vertex;
  if (vertex) {
    connectedEdgesOf(vertex).plainPush(edge);
  }
  
}

const addMultiToConnectedEdges = function (edge,ivertex) {
  if (ivertex) {
     connectedEdgesOf(ivertex).plainPush(edge);
     return;
  }
   let vertex = edge.singleVertex;
   if (vertex) {
     connectedEdgesOf(vertex).plainPush(edge);
   }
   let vertices = edge.vertices;
   if (vertices) {
     vertices.forEach( (v) => {
       connectedEdgesOf(v).plainPush(edge);
      });
   }
}


    
const connect1end = function (edge,whichEnd,vertex,connectionType) {
   edge.undraggable = true;
   edge['end'+whichEnd+'vertex'] = vertex;//.__name;
   edge['end'+whichEnd+'connection'] = connectionType?connectionType:'periphery';
   addToConnectedEdges(edge,vertex);
}

const connectVertices = function (edge,vertex1,vertex2) {
  connect1end(edge,0,vertex1,edge.connectionType);
  connect1end(edge,1,vertex2,edge.connectionType);  
}

const disconnect = function (edge,whichEnd) {
  if (whichEnd === undefined) {
    disconnect(edge,0);
    disconnect(edge,1);
    return;
  }
  edge['end'+whichEnd+'vertex'] = undefined;
  edge['end'+whichEnd+'connection'] = undefined;
  edge.undraggable = false;
}


const disconnectAll = function () {
  let thisHere = this;
  forEachEdge(function (edge) {
    thisHere.disconnect(edge);
  });
}


const yesSome = {};

const forSomeNode = function (checkCondition,check) {
  const recurse = function (node) {
    if (checkCondition(node)) {
      if (check(node)) {
        throw yesSome;
      } else {
       return;
      }u
    } else {
      core.forEachTreeProperty(node,recurse);
    }
  }
  try {
    recurse(core.root);
  } catch (e) {
    if (e === yesSome) {
      return true;
    } else {
     throw(e);
    }
  }
}
 
 const forEachNode = function (condition,action,graph) {
  const recurse = function (node) {
    if (condition(node)) {
      action(node);
    } else  if (node.__name !== 'prototypes') {
      core.forEachTreeProperty(node,recurse);
    }
  }
  recurse(graph?graph:core.root);
}

const forSomeEdge = (check) => forSomeNode((node)=>node.role === 'edge',check);

const forEachEdge =  (action) => forEachNode((node)=>node.role === 'edge',action);

const forEachVertex =  (action,graph) => forEachNode((node)=>node.role === 'vertex',action,graph);

const forEachMulti =  (action) => forEachNode((node) =>  {
    let role = node.role;
    return (role === 'multiIn') || (role === 'multiOut');
  },action);

const vertexPositionBounds = function (graph) {
  let minX = Number.POSITIVE_INFINITY;
  let maxX = -minX;
  let minY = minX;
  let maxY = maxX;
  const throwIn = (v) => {
    let p = v.getTranslation();
    minX = Math.min(minX,p.x);
    maxX = Math.max(maxX,p.x);
    minY = Math.min(minY,p.y);
    maxY = Math.max(maxY,p.y);
  }
  forEachVertex(throwIn,graph);
  let tr = graph.getTranslation();
  return geom.Rectangle.mk(geom.Point.mk(minX,minY),geom.Point.mk(maxX-minX,maxY-minY));
 
}
const connected = function (v0,v1) {
   forSomeEdge(function (edge) {
     return (edge.end0Vertex === v0) && (edge.end1Vertex === v1);
   });
}

// for multi edges
const removeConnectedTo = function (vertices,connections,v) {
  let ln = vertices.length;
  for (let i=0;i<ln;i++) {
    let vv = vertices[i];
    if (vertices[i] ===  v) {
      vertices[i] = undefined;
      connections[i] = undefined;
    }
  }
}



const recomputeConnectedEdges = function () {
  forEachVertex((vertex) => {
    vertex.connectedEdges = undefined;
  });

  forEachEdge((edge) => {
    addToConnectedEdges(edge);
  });
  forEachMulti((edge) => {
    addMultiToConnectedEdges(edge);
  });
}

core.afterReplaceHooks.push(recomputeConnectedEdges);

  
   
  
 
 
 
    


 // used only in deleting the vertex
const disconnectVertices = function (vs) {
   forEachEdge((edge) => {
     if (vs.indexOf(edge.end0vertex) > -1) {
       edge.end0vertex = undefined;
       edge.end0connection = undefined;
     }
     if (vs.indexOf(edge.end1vertex) > -1) {
       edge.end1vertex = undefined;
       edge.end1connection = undefined;
     }     
  });
  /* needs work
  const forMultiEdge = (edge) => {
  if (vs.indexOf(edge.singleVertex) > -1) {
      edge.singleVertex = undefined;
    }
    let vertices = edge.vertices;
    if (vertices) {
      vertices.forEach((v) => {
        if (vs.indexOf(edge.end1vertex) > -1)
         let idx = vertices.indexOf(v);
      if (idx >= 0) {
        vertices[idx] = undefined;
      }
    }
  };
  forEachMulti(forMultiEdge);
  v.connectedEdges = undefined;
  */
}

const disconnectVertex = function (v) {
  disconnectVertices([v]);
}


//used only in deleleting the edge
const disconnectEdge = function (e) {
  const disconnectEnd = (vertex) => {
    if (vertex) {
      let connected = vertex.connectedEdges;
      let idx = connected.indexOf(e);
      if (idx >= 0) {
        connected.plainSplice(idx,1);
      }
    }
  }
  if (e.end0vertex) {
     disconnectEnd(e.end0vertex);
  }
   if (e.end1vertex) {
     disconnectEnd(e.end1vertex);
  }
}

const disconnecMultiEdge = function (e) {
 //later
}


const updateEnd = function (edge,end,vertex,direction,connectionType) {
   let localPpnt;
   let sticky = connectionType.indexOf(',') > -1;
   if (!direction  && !sticky) {
     return;
   }
  // if (['periphery','EastWest','UpDown','Top','Bottom','Left','Right'].indexOf(connectionType) > -1) {
   if (!sticky) {
  // if ((connectionType === 'periphery') || (connectionType === 'EastWest') || (connectionType === 'UpDown')) {
     localPpnt = vertex.peripheryAtDirection(direction.times(-1)).intersection;
   } else {
     let split = connectionType.split(',');
     let side = Number(split[1]);
     let fractionAlong = Number(split[2]);
     localPpnt = vertex.alongPeriphery(side,fractionAlong);
   }
   let ppnt = localPpnt.plus(vertex.toGlobalCoords());
   let edgePpnt = edge.toLocalCoords(ppnt,true);
   end.copyto(edgePpnt);
 }

const updateConnectedEnd = function (edge,end,vertex,direction,connectionType) {
  //let edgeConnectionType = edge.__connectionType; // some edges, eg elbow edges, mandate a connection type.
  //let edgeConnectionType = edge.connectionType; // some edges, eg elbow edges, mandate a connection type.
  //let vertexpos;
 // let direction = idirection;
 // let tr = edge.toGlobalCoords();
 // let endG = end.plus(tr);
 /* if (vertex) {
    vertexpos = vertex.toGlobalCoords();
  } else {
    vertexpos = tr.plus(end);
  }
  if (connectionType === 'EastWest') {
     let dirPositive = endG.x < vertexpos.x;
    direction = Point.mk(dirPositive?-1:1,0);
  } else if (connectionType === 'UpDown') {
    let dirPositive = endG.y < vertexpos.y;
    direction = Point.mk(0,dirPositive?-1:1);
  }*/
  if (vertex) {
    updateEnd(edge,end,vertex,direction,connectionType);
  }
}



const updateEnds = function (edge) {
  let vertex0 = edge.end0vertex;
  let vertex1 = edge.end1vertex;
  let updated = [0,0];
  if (edge.updateConnectedEnds) { // custom version - only arcArrow for the moment
    updated = edge.updateConnectedEnds(vertex0,vertex1);
  }
  let {end0connection,end1connection} = edge;
  if (!end0connection && !end1connection) {
    return;
  }
  let {end0,end1} = edge;
  let tr = edge.toGlobalCoords();
  let vertex0pos,vertex1pos;
  let direction0,direction1;
  if (vertex0) {
      vertex0pos = vertex0.toGlobalCoords();
    } else {
      vertex0pos = tr.plus(end0);
  }
  if (vertex1) {
      vertex1pos = vertex1.toGlobalCoords();
  } else {
      vertex1pos = tr.plus(end1);
  }
  if (!updated[0]) {
   
    if (!end0connection || (end0connection === 'periphery')) {
      direction0 = vertex1pos.directionTo(vertex0pos);
    } else {
      direction0 = edge.direction0;
    }
    updateConnectedEnd(edge,end0,edge.end0vertex,direction0,end0connection);
  }
  if (!updated[1]) {
   
    if (!end1connection || (end1connection === 'periphery')) {
      direction1 = vertex0pos.directionTo(vertex1pos);
    } else {
      direction1 = edge.direction1;
    }
    updateConnectedEnd(edge,end1,edge.end1vertex,direction1,end1connection);
  }
}



const updateMultiConnectedEnd = function (edge,whichEnd) {
  let end,direction,vertex,typ;
  let vertical = edge.vertical;
 /* if (vertical) {
    down = edge.singleEnd.y > edge.ends[0].y;
  } else {
    toRight = edge.singleEnd.x < edge.ends[0].x;
  }
  
  let vertices = edge.vertices;
  // the top-bottom/left-right status is determined the first time
  // by which way the edge is going, but is fixed thereafter
  const updateConnectionType = () => {
    if (whichEnd === 'single') {
      typ = edge.outConnection;
      vertex = edge.singleVertex;
      end = edge.singleEnd; 
    } else {
      typ = edge.inConnections[whichEnd];
      vertex = vertices[whichEnd];
      end = edge.ends[whichEnd];

    }
    if (typ.indexOf(',')>-1) {
      return;
    }
    if (typ === 'top') {
      down = true;
    } else if (typ === 'bottom') {
      down = false;
    } else if (typ === 'right') {
      toRight = false;
    } else if (typ == 'left') {
      toRight = true;
    } else {
      if (whichEnd === 'single') {
        if (vertical) {
          typ = edge.outConnection = down?"top":"bottom";
        } else {
          typ = edge.outConnection = toRight?"left":"right";
        }
      } else {
        if (vertical) {
          typ = edge.inConnections[whichEnd] =  down?"bottom":"top";
        } else {
          typ = edge.inConnections[whichEnd] =  toRight?"right":"left";
        }
      }
    }
    //direction = vertical?Point.mk(0,down?-1:1,0):Point.mk(toRight?-1:1,0);
    direction = vertical?Point.mk(0,down?-1:1,0):Point.mk(toRight?1:-1,0);

  }*/
  //updateConnectionType();
 
  if (whichEnd === 'single') {
    end = edge.singleEnd;
    vertex = edge.singleVertex;
    direction = edge.singleDirection;
    typ = edge.outConnection;

  } else {
    end = edge.ends[whichEnd]
    vertex = edge.vertices[whichEnd];
    if (!edge.armDirections) { // so as not to break old items
      return;
    }
    direction = edge.armDirections[whichEnd];
    typ = edge.inConnections[whichEnd];

  }
  /*if (whichEnd === 'single') { // the top-bottom/left-right status is determined the first time
    end = edge.singleEnd; // but which way the edge is going, but is fixed thereafter
    vertex = edge.singleVertex;
    connectionType = edge.outConnection;
    if (connectionType === 'top') {
      down = true;
    } else if (connectionType === 'bottom') {
      down = false;
    } else {
       edge.outConnection = down?"bottom":"top";
    }
    direction = vertical?Point.mk(0,down?-1:1,0):Point.mk(toRight?-1:1,0);
  } else {
    connectionType = edge.inConnections[whichEnd];
    end = edge.ends[whichEnd];
    vertex = vertices[whichEnd];
    direction = vertical?Point.mk(0,down?1:-1,0):Point.mk(toRight?1:-1,0);
    //direction = Point.mk(toRight?1:-1,0);
   }
   updateConnectionType();*/
   updateConnectedEnd(edge,end,vertex,direction,typ);
}

const updateMultiEnds = function (edge) {
  let singleVertex = edge.singleVertex;
  if (singleVertex) {
    updateMultiConnectedEnd(edge,'single');
  }
  //let inConnections = edge.inConnections;  
  let vertices = edge.vertices;
  if (vertices) {
    let ln = vertices.length;
    for (let i=0;i<ln;i++) {
      let vertex = vertices[i];
      if (vertex) {
        updateMultiConnectedEnd(edge,i);
      }
    }
  }
}

function isVertex(x) {
  let p = x.__parent;
  if (p) {
    let gp = p.__parent;
    if (gp) {
      return ((p.__name === 'vertices') && (gp.isGraph));
    }
  }
}

// end section: connection support

// section: update and buildFromData

let beenUpdated = false;

// vertex is defined if the only change since the last graph update  is moving or resizing this vertex
const graphUpdate = function (x) { // x is either a particular vertex or the string "full"
  let full = x === 'full';
  let vertex;
  if (!full) {
    if (x) {
      if (x.connectedEdges) {
        vertex = x;
      } else {
        full = true;
      }
    }
  }
  let stm = performance.now();
  if (vertex) {
      vertex.__update();
     let edges = vertex.connectedEdges;
     if (edges) {
       edges.forEach((edge) => {
         let role = edge.role;
         if ((role === "multiIn") || (role === 'multiOut')) {
            updateMultiEnds(edge);
         } else {
           updateEnds(edge);
         }
         edge.__update();
       });
     }
  } else {
    if (full || !beenUpdated) {
      let vtm = performance.now();
      forEachVertex(function (vertex) {
        vertex.__update();
      });
      core.advanceTimer('graphUpdateV',performance.now() - vtm);
      beenUpdated = true;
    }
    forEachEdge((edge) => {
      updateEnds(edge);
      edge.__update();
    });
    let mtm = performance.now();
    forEachMulti((edge) => {
     updateMultiEnds(edge);
     edge.__update();
    });
    core.advanceTimer('graphUpdateM',performance.now() - mtm);
  }

  //forEachVertex(function (vertex) {
  //  vertex.__update();
  //});

  core.root.draw();
  core.advanceTimer('graphUpdate',performance.now() - stm);
}

dom.vars.fullUpdateHooks.push(() => graphUpdate('full'));
    

const stateOf = function () {
  let edgeStates = core.ObjectNode.mk();
  let vertexStates = core.ObjectNode.mk();
  forEachEdge(function (edge) {
    let path = core.stringPathOf(edge);
    let e0 = edge.end0.copy();
    let e1 = edge.end1.copy();
    let st = core.ObjectNode.mk();
    st.end0 = e0;
    st.end1 = e1;
    if (edge.end0vertex) {
      st.end0vertex = edge.end0vertex;
      st.end0connection = edge.end0connection;
    }
     if (edge.end1vertex) {
      st.end1vertex = edge.end1vertex;
      st.end1connection = edge.end1connection;
    }
    edgeStates.set(path,st);
  });
  forEachVertex(function (vertex) {
    let path = core.stringPathOf(vertex);
    let p = vertex.getTranslation().copy();
    vertexStates.set(path,p);
  });
  let rs = core.ObjectNode.mk();
  rs.set('edges',edgeStates);
  rs.set('vertices',vertexStates);
  return rs;
}


const restoreState = function (state) {
  let edgeStates = state.edges;
  let vertexStates = state.vertices;
  core.forEachTreeProperty(edgeStates,function (edgeState,prop) {
    let edge = core.evalPath(prop);
    edge.end0.copyto(edgeState.end0);
    edge.end1.copyto(edgeState.end1);
    if (edgeState.end0vertex) {
      edge.end0vertex = edgeState.end0vertex;
      edge.end0connection = edgeState.end0connection;
    }
    if (edgeState.end1vertex) {
      edge.end1vertex = edgeState.end1vertex;
      edge.end1connection = edgeState.end1connection;
    }
  });
 core.forEachTreeProperty(vertexStates,function (position,prop) {
    let vertex = core.evalPath(prop);
    vertex.moveto(position);
  });
 graphUpdate();
}

const recenter = function (node) {
  if (node && node.isGraph && node.vertices) {
    let bnds = node.vertices.bounds();
    let vbnds = graph.vertexPositionBounds(node);
    let xt = vbnds.extent;
    let cn = vbnds.center();
    let bcn = bnds.center();
    forEachVertex( (vertex) => {
      let tr = vertex.getTranslation();
      let ntr = tr.difference(cn);
      vertex.moveto(ntr);
    },node);
    node.moveto(node.getTranslation().plus(cn));
    node.width = xt.x;
    node.height = xt.y;
    graphUpdate();
  }
}
  
const graphSetExtent = function (graph,xt) {
  //let cxt = bnds.extent;
  //let widthRatio = (xt.x)/cxt.x;
  //let heightRatio = (xt.y)/cxt.y;
  let widthRatio = (graph.width<1)?1:(xt.x)/graph.width;
  let heightRatio = (graph.height<1)?1:(xt.y)/graph.height;
  forEachVertex( (vertex) => {
    let tr = vertex.getTranslation();
    let ntr = geom.Point.mk(widthRatio * tr.x,heightRatio * tr.y);
    vertex.moveto(ntr);
  },graph);
  //let bnds = graph.vertices.bounds();
  graph.width = xt.x;
  graph.height = xt.y;
  //graphUpdate();
}

const buildFromData = function (node,idata,doUpdate=true) {
  let data = core.getData(node,idata);
 /* if (idata %% !data) {
    if (idata.__get('__sourceUrl')) {
      node.data = idata;
    } else {
      data = core.lift(idata);
      if (data.__parent) {
        node.data = data;
      } else {
        node.set('data',data);
      }
    }*/
  /*if (idata) {
    if (idata.__get('__sourceUrl')) {
      node.data = idata;
    } else {
      data = core.lift(idata);
      if (!node.data) {  // data might be already be present in another form (eg tree data)
        node.set('data',data);
    }
  } else {
    data = core.getData(node);
  }
  if (!data) {
    return;
  }*/
  // use the saved versions if none passed in
  let  vertexP = node.vertexP;
  if (!vertexP) {
    core.error('Missing vertexP in buildFromData');
  }
  let edgeP = node.edgeP;
  if (!edgeP) {
    core.error('Missing edgeP in buildFromData');
  }
  if (node.vertices) {
    node.vertices.remove();
  }
  if (node.edges) {
   node.edges.remove();
  }
  let vertices = node.set('vertices',svg.Element.mk('<g/>'));
  let edges = node.set('edges',svg.Element.mk('<g/>'));
  data.vertices.forEach((vertexData) => {
    let vertex = vertices.set(vertexData.id,vertexP.instantiate()).show();
    let position = vertexData.position;
    if (position) {
      vertex.moveto(geom.toPoint(position));
    }
    let txt = vertexData.text;
    if (txt) {
      vertex.text = txt;
    }
  });
  let n = 0;
  data.edges.forEach((edgeData) => {
    let eid = 'E'+(n++);
    let edge = edges.set(eid,edgeP.instantiate()).show();
    let v0 = vertices[edgeData.end0];
    let v1 = vertices[edgeData.end1];
    connectVertices(edge,v0,v1);
    let label = edgeData.label;
    if (label) {
      edge.text = label;
    }
  });
  node.resizable = true;
  node.draggable = true;
  node.isGraph = true;
  node.vertices.unselectable = true;
  node.edges.unselectable = true;
  node.__setExtent = function (xt) {
    graphSetExtent(node,xt);
  }
  if (doUpdate) {
    graphUpdate();
  }
}

const reset = function (graph) {
 if (graph.vertices) {
   graph.vertices.remove();
 }
 if (graph.edges) {
   graph.edges.remove();
 }
 graph.set('vertices',svg.Element.mk('<g/>'));
 graph.vertices.unselectable = true;
 graph.set('edges',svg.Element.mk('<g/>'));
 graph.edges.unselectable =true;
}


const connectMultiSingleVertex = function (edge,vertex,connectionType) {
  edge.undraggable = true;
  edge.singleVertex = vertex;
  //edge.outConnection = 'periphery';
  edge.outConnection = connectionType?connectionType:edge.vertical?'UpDown':'EastWest';
  addToConnectedEdges(edge,vertex);  // edge is incoming to vertex
}

const connectMultiVertex = function (edge,idx,vertex,connectionType) {
  edge.undraggable = true;
  let vertices = edge.vertices;
 let inConnections = edge.inConnections; 
  let cnt = edge.ends.length;
  if (!vertices) {
     vertices = edge.set('vertices',core.ArrayNode.mk(cnt));
     inConnections = edge.set('inConnections',core.ArrayNode.mk(cnt));
  }
  let vln = vertices.length;
  if (cnt > vln) {
    for (let i = 0;i<(cnt-vln);i++) {
      vertices.push(undefined);
    }
  }
  let cln = inConnections.length;
  let ctype = connectionType?connectionType:edge.vertical?'UpDown':'EastWest';
  if (cnt > cln) {
    for (let i = 0;i<(cnt-cln);i++) {
      inConnections.push(ctype);
    }
  }
  vertices[idx] = vertex;
  //inConnections[idx] = 'periphery';
  inConnections[idx] = ctype;
  //inConnections[idx] = 'UpDown';
 addMultiToConnectedEdges(edge,vertex); // edge is outgoing  from vertex

}

const addMultiInToEdgeArrays = function (edge) {
  let inVertices = edge.inVertices;
  if (inVertices) {
    inVertices.forEach(function (vertex) {
      addToEdgeArray(vertex,edge,0);
    });
  }
  let outVertex = edge.outVertex;
  if (outVertex) {
     addToEdgeArray(outVertex,edge,0);
  }
}

 
  
 

const connectMultiOutInVertex = function (edge,vertex) {
 edge.undraggable = true;
  edge.inVertex = vertex;
  edge.inConnection = 'periphery';
  edge.nowConnected = true;
  addToEdgeArray(vertex,edge,0); // edge is outgoing  from vertex
}

const connectMultiOutOutVertex = function (edge,idx,vertex) {
  edge.undraggable = true;
  let outVertices = edge.outVertices;
  let outConnections = edge.outConnections; 
  let cnt = edge.outEnds.length;
  if (!edge.outVertices) {
     outVertices = edge.set('outVertices',core.ArrayNode.mk(cnt));
     outConnections = edge.set('outConnections',core.ArrayNode.mk(cnt));
  }
  outVertices[idx] = vertex;
  outConnections[idx] = 'periphery';
  edge.nowConnected = true;
  addToEdgeArray(vertex,edge,1); // edge is incoming to vertex

}



const addMultiOutToEdgeArrays = function (edge) {
  let outVertices = edge.outVertices;
  if (outVertices) {
    outVertices.forEach(function (vertex) {
      addToEdgeArray(vertex,edge,1);
    });
  }
  let inVertex = edge.inVertex;
  if (inVertex) {
     addToEdgeArray(inVertex,edge,0);
  }
}

// end section:connection for multiIns and multiOuts





// begin section: support for arrows being directed to the peripheries of vertices
// these functions are called by the implementations of the edge types (eg arrow)

// an edge has properties endN endNVertex, endNSide endNsideFraction  for N = 0,1. The periphery of a vertex has a series
// of sides (which are currently regarded as straight, but might be arcs in future). The sides are numbered from the top in
// clockwise order. endOSide = 3 and endNsideFraction = 0.2 means 20% of the way along the 3rd side.
// later: multiedges


const mapDirectionToPeriphery = function(edge,end,vertex,connectionName,direction,connectionIndex) {
  let ppnt = vertex.peripheryAtDirection(direction);
  let connection = 'sticky,'+(ppnt.side)+','+core.nDigits(ppnt.sideFraction,4);
  if (typeof connectionIndex === 'number') {
    edge[connectionName][connectionIndex] = connection;
  } else {
    edge[connectionName]  = connection;
  }
  let gpnt = vertex.toGlobalCoords().plus(ppnt.intersection);
  let epnt = edge.toLocalCoords(gpnt,true);
  end.copyto(epnt);
}


const mapEndToPeriphery = function(edge,end,vertex,connectionName,rpos,connectionIndex) {  
  let center = vertex.toGlobalCoords();
  let endGpos = edge.toGlobalCoords().plus(rpos);
  let direction = endGpos.difference(center).normalize();
  this.mapDirectionToPeriphery(edge,end,vertex,connectionName,direction,connectionIndex);
}


// end section: support for arrows being directed to the peripheries of vertices


export {forEachVertex,forEachEdge,connect1end,graphUpdate,updateEnds,connectVertices,connectMultiVertex,
        connectMultiSingleVertex,buildFromData,connected,reset,vertexPositionBounds,
        updateMultiEnds,mapDirectionToPeriphery,mapEndToPeriphery,recenter,graphSetExtent,
        stateOf,restoreState,disconnect,disconnectAll,disconnectVertices,disconnectVertex,disconnectEdge,
        connectMultiOutInVertex,connectMultiOutOutVertex};