

// Section: connection support
//data structure for tree
/*
{k:"v",id:<string>,d:[v0,v1,v2...] }

where each di is a descendant descriptor having the form of a vertex, or an edge
{k:"e",id:<string>,end1:<vertex>,....}
*/
/*
 
var d = {d[{},{d:[{},{}]};

*/
const relativeToAbsolutePositions = function (data,cp) {
  data.position  = cp;
  let descendants = data.descendants;
  descendants.forEach(function (vertex) {
    let rp = vertex.relPos;
    let ap = [cp.x + rp.x,cp.y + rp.y];
    relativeToAbsolutePositions(vertex,ap);
  });
}
    
  
const layoutTree = function (data,hSpacing,vSpacing) {
  var cy = 0;
  var recurseV = function (vertex) {
    let descendants = vertex.d;
    if (descendants) {
      let cw  = 0;
      let widths = [];
      let nmd = descendants.length;
      descendants.forEach((descendant) => {
         let w = recurseV(descendant);
         widths.push(w);
         cw += w;
      });
      let tw = cw + (nmd-1) * hSpacing;
      let cx = -tw/2;
      for (let i=0;i<nmd;i++) {
         let w = widths[i];
         let cp = cx + w/2l
         cx = cx + w + hSpacing;
         descendant.relPos = [cp,vSpacing];
      }
    }
    return tw;
  }
  recurseV(data);
  relativeToAbsolutePositions(data);
  
}

         
    
      
  
 
const function toGraphData = function (vertex) {
  let vertices = {};
  let edges = [];
  let collect = function (vertex) {
    let vid = vertex.id;
    let newVertex = {id:vid};
    let pos = vertex.position;
    if (pos) {
     newVertex.position = [pos[0],pos[1]];
    }
    vertices[vid] = newVertex;
    let descendants = vertex.d;
    if (descendants) {
      descendantVertex.forEach(function (descendantVertex) {
        let dvid = descendantVertex.id;
        let newEdge = {end0:vid,end1:dvid};
        edges.push(newEdge);
        collect(descendantVertex);
      });
    }
  }
     
    
     
  
  
export {layoutTree,toGraphData};
