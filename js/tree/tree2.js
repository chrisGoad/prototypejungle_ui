
   
// for widgetlines whose forNode is an Array, check that counts match up on node and widget

WidgetLine.checkRanges = function () {
  let nd = this.forNode;
  let fsz = this.rangesForSize;
  let tch,rs;
  if (fsz === undefined) {
    tch = this.treeChildren();
    rs = tch.length === nd.length;
  } else {
    rs  = fsz === nd.length;
  }
  core.log("tree","checked range for",this.id," result=",rs);
  return rs;
}
  
//  only works and needed on the workspace side, not on protos, hence no ovr
// showProto shows the __values of __children, as inherited


const showRef = function (nd) {
  let wl = showProtoTop(nd,0);
  if (!wl) {
    return;
  }
  protoPanelShowsRef = true;
  wl.expand();
  return wl;
}
  
  // cause the tree below here to be expanded in the same places as src, when possible. For keeping the main and prototrees in synch 
   
WidgetLine.expandLike = function (src,ovr) {
  let nms,thisHere;
  if (src.expanded) {
    this.expand(ovr);
    nms = src.childrenNames();
    thisHere = this;
    nms.forEach(function (nm) {
      let mych,chovr;
      if (core.internal(nm)) {
        return;
      }
      mych = thisHere.treeSelect(nm);
      if (mych) {
        chovr = ovr?ovr[nm]:ovr;
        if (chovr) {
          mych.expandLike(chovr);
        }
      }
    });
  } else {
    this.contract();
  }
  }
  
WidgetLine.reExpand = function (force) {
  let ch = this.__parent.forChildren;
  if (!ch) {
    if (force) {
      this.expand();
    }
    return;
  }
  ch.removeChildren();
  ch.__reExpanding = true;
  this.expanded = false;
  this.expand();
  ch.__reExpanding = false;
}

// assure that the __children are visible; unless there are more than WidgetLine.maxChildren.
//In this case, display only the target
  
WidgetLine.expand = function (ovr) {
  let nd = this.forNode();
  if (!nd) {
    return;
  }
  let tp,isLNode,el,ch,newCh,incr,toIter,nln,lg10,dt,addLine,
    addRangeLine,addRanges,finishOff,rs;
  if (onlyShowEditable && !hasEditableField(nd,ovr)) {
    return false;
  }
  tp = this.treeTop();
  isLNode = core.ArrayNode.isPrototypeOf(nd);
  if (this.expanded) {
    return;
  }
  el = this.__parent;
  ch = el.forChildren;
  if (!ch) {
    ch  = html.Element.mk('<div style="margin-left:25px"/>');
    el.addChild("forChildren",ch);
    newCh = true;
  } else {
    newCh = ch.__reExpanding;
    ch.$show();
  }
    
  let nameDec = "_t_";
  // primitive decoration scheme.  ch is an html element. Its children are the html elements for the children of the node it represents
  // These children must be named in a way that does not conflict with ch's properties such style or id.
  // So they are decorated with tree.nameDec ("_t_")
  
  addLine = function (child,node,k,tc) { // ch = element to add to nd = the parent, k = prop, tc = child
    let dk = nameDec + k;
    let overriden,knd,options,ln;
    if (child[dk]) {
      return; //already there
    }
    overriden = ovr && ovr[k];
    knd = node.__showInTreeP(k,overriden);
    options = {addTo:child,treeTop:tp,property:k};
    if (!knd) {
      return;
    } else if (knd === "node") {
      ln = tc.__mkWidgetLine(options);
    } else {
      ln = node.__mkPrimWidgetLine(options);
    }
    if (ln) {
      child.addChild(dk,ln.__parent);
      if (knd === "prim") {
        ln.updateValue({node});
      }
    }
    return ln;
  }
  
  addRangeLine = function (node,rlb,rub,increment) { // nd = the parent, k = prop, tc = child
    let  ln = mkRangeWidgetLine(node,rlb,rub,increment);
    ch.addChild(rlb,ln.__parent);
    return ln;
  }

  addRanges= function (node,rlb,rub,incrm) {
    let rk,rv,ci,cub;
    if (incrm < 10) {
      for (rk=rlb;rk<=rub;rk++) {
        rv = node[rk];
        addLine(ch,node,rk,rv);
      }
      return;
    }
    ci = rlb;
    cub = rlb;
    while (cub  < rub) {
      cub = Math.min(rub,ci+incrm-1);
      if ((cub + 1) >= rub) {
        cub = rub;
      }
      addRangeLine(node,ci,cub,incrm);
      ci = ci + incrm;
    }
  }
  if (this.__range && newCh) {
    let rlb = this.lowerBound;
    let rub = this.upperBound;
    let incrm = this.increment;
    incrm = incrm/10;
    addRanges(nd,rlb,rub,incrm);
    finishOff(this);
    return;
  }
  rs = undefined;
  if (newCh) {
    toIter =   function (tc,k) {
      addLine(ch,nd,k,tc);
    }   
    if (isLNode) {
      nln = node.length;
      lg10 = Math.floor(Math.log(nln)/Math.log(10));
      incr = Math.pow(10,lg10);
      if (incr*2 > nln) {
        incr = incr/10;
      }
      addRanges(nd,0,nln-1,incr);
      this.rangesForSize = nln;
    } else {

       dt =  nd.data;
       if (dt) {
         addLine(ch,nd,"data",dt);
       }
       nd.__iterInheritedItems(toIter,showFunctions,true); // true = alphabetical
    }
     // want prototype in there, though it is not enumerable
  } else {
    ch.$show();
  }
  finishOff = function (w){
    w.expanded = true;
    w.hasBeenExpanded = true;
    let elm = w.__parent;
    let tg = elm.main.toggle;
    tg.$html('&#9698;');

  }
  finishOff(this);
  return rs;
  }
  
WidgetLine.fullyExpand = function (ovr,noEdit,__atFrontier) {
  let ch;
  if (core.ArrayNode.isPrototypeOf(this.forNode)) {
    return;
  }
  this.expand(ovr,noEdit,__atFrontier);
  ch = this.treeChildren();
  if (ch) {
    ch.forEach(function (c) {
      let cnd,nm,covr;
      if (!c.__prim) {
        cnd = c.forNode;
        nm = cnd.__name;
        covr = ovr?ovr[nm]:undefined;
        c.fullyExpand(covr,noEdit,__atFrontier);
      }
    });
  }
  }
  
WidgetLine.fullyExpandIfSmall = function(ovr,noEdit,__atFrontier) {
  let nd = this.forNode();
  if (!nd) {
    return;
  }
  let tsz = nd.__treeSize(hiddenProperties);
  if (tsz <= fullyExpandThreshold) {
    this.fullyExpand(ovr,noEdit,__atFrontier);
  } else {
    this.expand(ovr,noEdit,__atFrontier);
  }
}

 

// this adds a Object into the widget tree structure. There are two cases
// If this's parent is in the tree, then whichTree is not needed
// ow, the node is being added to a multiRoot, given by whichTree.
// this is for the protos, which are rooted at i.

  
// find the range child, if any which contains n
WidgetLine.findRangeChild = function (n) {
  let tc = this.treeChildren();
  let rng,ln,i,c;
  if  (tc && (tc.length)) {
    let [c0] = tc; // if any __children are ranges, the first will be
    rng = c0.__range;
    if (rng) {
      ln = tc.length;
      for (i=0;i<ln;i++) {
        c = tc[i];
        let lb = c.lowerBound;
        let ub = c.upperBound;
        if ((lb <= n) && (n <= ub)) {
          return c;
        }
      }
    }
  }
  return undefined;
}


// this assures that the parent is expanded, and this node is visible
core.ObjectNode.__expandToHere = function () {
  let wd = findWidgetLine(this);
  let pr,pwd,n,cw,isLNode;
  if (wd && wd.visible()) {
    return;
  }
  pr = this.__parent;
  pr.__expandToHere();
  // pr might have range kids if pr is an Array
  pwd = findWidgetLine(this);
  pwd.expand();
  isLNode = core.ArrayNode.isPrototypeOf(pr);
  if (isLNode) {
    n = this.__name;
    cw = pwd;
    while (cw) {
      cw = cw.findRangeChild(n);
      if (cw) {
        cw.expand();
      }
    }
  }
}
  
core.ArrayNode.__expandToHere = core.ObjectNode.__expandToHere;
 
  
WidgetLine.contract = function () {
  // generates widget lines for the childern
  let el,ch,tg;
  if (!this.expanded) {
    return;
  }
  el = this.__parent;
  ch = el.forChildren;
  ch.$hide();
  this.expanded = false;
  tg = el.main.toggle;
  tg.$html('&#9655;');
}

WidgetLine.assertOverridden = function (k) {
  let ch = this.treeSelect(k);
  if (ch) {
    let {ovr} = ch;
    if (ovr) {
      ovr.show();
    }
  }
}
    
  
// find the widget line for this node

const findWidgetLine = function (nd) {
  let pth = nd.__pathOf(core.root);
  let [tp] = tops;
  return tp.treeSelectPath(pth); 
}

const applyToTops = function (fn,except) {
  tops.forEach(function (tp) {
    if (tp  !== except) {
      fn(tp);
    }
  });
}

const forAllWidgetLines = function (fn) {
  let perTop = function (top) {
    top.forTreeDescendants(fn);
  }
  applyToTops(perTop);
}

  
const refreshValues = function () {
  forAllWidgetLines(function (w) {
    w.updateValue({});
  });
}

WidgetLine.expandTops = function (except) {
  this.applyToTops(function (wl) {
    wl.expand();
  },except);
}

const expandTopsLike = function (wl) {
  let wtop = wl.treeTop();
  applyToTops(function (tp) {
    tp.expandLike(wtop);
  },wtop);
}

WidgetLine.toggle = function () {
  if (this.expanded) {
    this.contract();
  } else {
    this.expand();
  }
  expandTopsLike(this); 
}

core.ArrayNode.expandWidgetLine = core.ObjectNode.expandWidgetLine;
core.ArrayNode.contractWidgetLine = core.ObjectNode.contractWidgetLine;
core.ArrayNode.toggleWidgetLine =  core.ObjectNode.toggleWidgetLine;
 
const attachTreeWidget = function (options) {
  let {div,root} = options;
  let wOptions = core.ObjectNode.mk();
  core.setProperties(wOptions,options,["forProto","__inWs","__atFrontier"]);
  wOptions.top = 1;
  let ds = dpySelected.instantiate();
  let wline = root.__mkWidgetLine(wOptions);
  ds.draw(div); // interupt the Element tree here
  if (!wline) {
    core.log('tree','no wline');
    return;
  }
  wline.__parent.draw(div);

  wline.dpySelected = ds;
  return wline;
}
 
core.ObjectNode.__atProtoFrontier = function () { // the next fellow in the prototype chain is outside the ws
  let prnd = Object.getPrototypeOf(this);
  return (!prnd.__parent)||(!prnd.__inWs());
}
core.ArrayNode.__atProtoFrontier = function () {
  return false;
}

let protoLines = [];
//n = nth in  proto chain.
// ovr is an object with __properties k:1 where k is overriden further up the
// chain, or k:covr , where covr is the ovr tree for prop k
const showProto = function (prnd,n,ovr) {
  let __inWs = prnd.__inWs();
  let atF,wl;
  if (__inWs) {
    atF =  !(Object.getPrototypeOf(prnd).__inWs());
  } else {
    atF = false;
  }
  wl = showProtoTop(prnd,atF,__inWs,ovr);
  if (!wl) {
    return;
  }
  protoTops.push(wl);
  tops.push(wl);
  wl.expandLike(mainTop,ovr);
}
let showWsOnly = true;
  
const showProtoChain = function (nd) {
  let cnd,n,ovr,__inWs,prnd,atF;
  protoPanelShowsRef = false;
  protoState = {nd};
  protoTops = [];
  tops = [mainTop];
  cnd = nd;
  n = 0;
  ovr = {}; 
  // ovr is a tree structure which contains, hereditarily, the __properties set in the node nd,, rather than the prototype prnd
  // in other words, ovr shows what is overriden
  const addToOvr = function (node,parent,ov) {
    let op = Object.getOwnPropertyNames(nd);
    op.forEach(function (p) {
      let v = node[p];
      let pv = parent[p];
      let covr;
      if (core.isAtomic(v)||(typeof v === "function")) {
        if (typeof ov === 'object') {
          ov[p] = true;
        } else {
          core.error('unexpected');
        }
      } else if (core.treeProperty(nd,p)) {
        if (!pv) { // this branch did not come from a prototype
          return;
        }
        covr = ovr[p];
        if (!covr) {
          ovr[p] = covr = {};
        }
        if (typeof covr === 'object') {
          addToOvr(v,pv,covr);
        }
      }
    });
  }
  addToOvr(nd,Object.getPrototypeOf(nd),ovr);
  __inWs = true;
  if (cnd.isKit) { //for now at least (since kits can't be copied at the moment -5/19)
    return;
  }
  while (true) {
    prnd = Object.getPrototypeOf(cnd);
    if ((!prnd.__parent)||(prnd === cnd)) {
     return;
    }
    if (prnd.__singleton) { // skip this one
      cnd = prnd;
      continue;
    }
    atF = __inWs && (!prnd.__inWs());
    if (atF) {
      if (showWsOnly) {
        return; 
      }
      __inWs = false;
    }
    showProto(prnd,n++,ovr);
    cnd = prnd;
    addToOvr(cnd,Object.getPrototypeOf(cnd),ovr);
  }
}
  
const refreshProtoChain = function () {
  let s= protoState;
  if (s) {
    showProtoChain(s.nd);
  }
}
const pathToTerm = function (pth) {
  let rs = "";
  pth.forEach(function (p) {
    if (p === "/") {
      return;
    } else if (p === ".") {
      rs = "ws";
      return;
    } else if (p === "") {
      return;
    } else if (typeof p === "string") {
      if (core.beginsWith(p,"https://prototypejungle.org/")) {
        rs = p.substr(26);
        if (core.endsIn(rs,"/item.js")) {
          rs = rs.substring(0,rs.length-8);
        }
      } else {
        if (rs === "") {
          rs = p;
        } else {
          rs += "."+p;
        }
      }
    } else {
      rs += "["+p+"]";
    }
  });
  return rs;
}
  
const withTypeName = function (nd,nm,top) {
  let ntu,rp,tpn;
  if (top) {
    if (nd === core.root) {
      ntu = "ws";
    } else {
      rp = core.xpathOf(nd,core.root);
      if (rp) {
        ntu = pathToTerm(rp,true);
      } else {
        core.error('unexpected');
      }
    }
  } else {
    ntu = nm;
  }
  tpn=nd.__protoName();
  if (tpn === "Object" || ntu === tpn) {
    return ntu;
  } else {
    return ntu+ " : " + tpn;
  }
}

const shapeTextFun = function (nd) {
  let tnm = nd.__name;
  let nm = (typeof tnm === "undefined")?"root":tnm;
  return withTypeName(nd,nm);
}
  

const showProtosInObDiv = true;

// Treatment of which member of the prototype chain is under adjustment
let adjustRequestedFor;
let adjusteeFound = false;


  
  

let adjustingSubjects = [];
let adjustingCheckboxes = [];
const setWhatToAdjust = function (iindex) {
  core.log('adjust','setWhatToAdust',iindex);
  let index = (adjustRequestedFor === undefined)?iindex:adjustRequestedFor;
  let n;
  ui.vars.whatToAdjust = adjustingSubjects[index];
  ui.vars.whatToAdjustIndex = index;
  core.log("tree","WHAT TO ADJUST ",index,ui.vars.whatToAdjust);
  n = 0;
  adjustingCheckboxes.forEach(function (el) {
    el.__element.checked = index === n++;
  });
}

let adjustingEls = [];
const addAdjustSelector = function (div,itm) {
  core.log('adjust','addAdjustSelector');
  if (adjustmentOwnedBy) {
    return;
  }
  adjustmentOwnedBy = itm.getOwnExtent?(itm.getOwnExtent()?itm:undefined):undefined;
  let adjustingEl = html.Element.mk('<span style="padding-left:10px;font-style:italic">Adjusting this:</span>');
  let adjustingCheckbox,idx;
  div.addChild(adjustingEl);
  adjustingCheckbox = html.Element.mk('<input style="position:relative;top:3px" type="checkbox" />');
  div.addChild(adjustingCheckbox);
  adjustingSubjects.push(itm);
  adjustingCheckboxes.push(adjustingCheckbox);
  adjustingEls.push(adjustingEl);
  idx = adjustingEls.length-1;
  adjustingCheckbox.$change(function () {
    if (adjustingCheckbox.__element.checked) {
      adjustRequestedFor = idx;
      setWhatToAdjust();
    }
  });
}

// should be called when a particular custom control box is clicked, with the index of that box
// idx is defined for the custom boxes, and undefined for control boxes (extent adjusters)

const showAdjustSelectors = function () {
  core.log('adjust','showAdjustSelectors');
  if (!adjustingSubjects) {
    return;
  }
  let ln = adjustingSubjects.length;
    core.log('adjust','adustingSubects length',ln);
  if (ln === 0) {
    return;
  }
  adjusteeFound = false;
  let thisIsAdjustee = false;
  let i;
  for (i=0;i<ln;i++) {
    let itm = adjustingSubjects[i];
    let el = adjustingEls[i];
    let checkbox = adjustingCheckboxes[i];
    if (adjusteeFound) {
      el.$hide();
      checkbox.$hide();
    } else  {
      el.$show();
      checkbox.$show();
      thisIsAdjustee = (itm === adjustmentOwnedBy) || (i === ln - 1);
      if (thisIsAdjustee) {
        adjusteeFound = true;
        setWhatToAdjust(i);
      } else {
        checkbox.__element.checked = false;
      }
    }
  }
}

ui.vars.showAdjustSelectors = showAdjustSelectors;

  // This does the display of each but the first element o of the prototype chain
const showProtoTop = function (o,__atFrontier,__inWs) {
  let editName,subdiv,divForProto,thisProto,rs;
  if (o.__get('__hideInEditPanel')) {
    return;
  }
  editName = o.__get('__editPanelName');
  if (!editName) {
    editName = 'Prototype';
  }
  subdiv = vars.protoSubDiv.instantiate();
  if (showProtosInObDiv) {
    divForProto = vars.obDiv;
    thisProto = html.Element.mk('<span>'+editName+'</span>');
     subdiv.addChild(thisProto);
  }
  divForProto.addChild(subdiv);
  if (adjustSelectorsActive) {
    addAdjustSelector(subdiv,o);
  }
  subdiv.draw();
  const clickFun = function (wl) {
     core.log("tree","CLICKKK ",wl);
    wl.selectThisLine("tree");
  }
  rs = attachTreeWidget({div:subdiv.__element,root:o,__atFrontier,__inWs,clickFun,forProto:true});
  rs.protoTree = true;
  return rs;
}
    
const attachShapeTree= function (root) {
  const clickFun = function (wl) {
    core.log("tree","CLICKKK ",wl);
    wl.selectThisLine("tree");
  }
  let tr,mtop;
  vars.obDivRest.$empty();
  tr = attachTreeWidget({div:vars.obDivRest.__element,root:root,clickFun,textFun:shapeTextFun});
  if (mainTop) {
    mtop = mainTop;
    mainTop = tr;
    tops = [tr];
    tr.isShapeTree = true;
    tr.expandLike(mtop);
  } else {
    mainTop = tr;
    tops = [tr];
    tr.isShapeTree = true;
  }
}

  
const excludeFromProtos = {core:1,fileTree:1,jqPrototypes:1,lightbox:1,geom:1,mainPage:1,top:1,trees:1,draw:1};

const initShapeTreeWidget = function () {
  attachShapeTree(core.root);
  mainTop.expand();
  showProtoChain(core.root);
}

const itemClickFun = function (wl) {
  wl.selectThisLine();
}
   
const selectInTree = function (nd) {
  if (enabled && nd) {
    nd.__expandToHere();
    let wd =  findWidgetLine(nd); 
    if (wd) {
      wd.selectThisLine("canvas",true);
    }
  }
}
 

const selectPathInTree = function (path) {
  if (enabled && path) {
    let nd = core.evalXpath(core.root,path);
    selectInTree(nd);
  }
}

const openTop = function () {
 mainTop.expand();
}

let toExceptForPrototypeDifference =
  {__UIStatus:1,__element:1,__beenUpdated:1,__newData:1,__name:1,__parent:1,
  __selected:1,__setIndex:1,__updateCount:1,role:1,__topProto:1,draggableInKit:1,
   transform:1,visibility:1,__beenAdjusted:1,__mark:1,__sourceUrl:1,container:1,__setCount:1};//backgroundColor:1};
     
  


let adjustmentOwnedBy = undefined; // while cruising down the proto chain, we don't wish to allow adjustments beyond the owner of adjustment
let adjustSelectorsActive = false; // is the adjustment selection machinery needed?
const showItem = function (itm,mode,noSelect,noName) {
  let editName,notog,subdiv,tr,atf;
  shownItem = itm;
  if (!itm) {
    return;
  }
  vars.obDivRest.$empty();
  if (itm.__get('__hideInEditPanel')) {
    return;
  }
  editName = itm.__get('__editPanelName');
  if (!editName) {
    editName = (itm.__assembly)?'Assembly (use Unwrap to access parts)':'Instance';
  }
  notog = 0 && mode==="fullyExpand";
  subdiv = vars.protoSubDiv.instantiate();
  vars.obDivRest.addChild(subdiv);
  if (!noName) {
    subdiv.addChild(html.Element.mk('<span>'+editName+'</span>'));
  }
  if (itm.__assembly) {
    subdiv.draw();
    return;
  }
  if (ui.vars.nowAdjusting && !itm.adjustInstanceOnly && !itm.__get('__beenAdjusted')) {
    adjustSelectorsActive = true; 
    adjusteeFound = false;
    adjustRequestedFor = undefined;
    adjustmentOwnedBy = undefined;
    adjustingSubjects = [];
    adjustingEls = [];
    adjustingCheckboxes = [];
    addAdjustSelector(subdiv,itm);
  } else {
    adjustSelectorsActive = false;
    ui.vars.whatToAdjust = itm;

  }
  if (!itm.__disableRevertToPrototype && itm.__differsFromPrototype(toExceptForPrototypeDifference)) {
    let revertBut = html.Element.mk('<div style="display:none" class="roundButton">revert to prototype </div>');
    subdiv.addChild(revertBut);
    revertBut.addEventListener("click",function () {
      itm.__revertToPrototype(toExceptForPrototypeDifference);
      itm.__update();
      itm.draw();
      itm.__beenResized = false;
      itm.__beenAdjusted = false;
      revertBut.$hide();
      ui.clearControl();
    });
  }
  tr = attachTreeWidget({div:subdiv.__element,root:itm,textFun:shapeTextFun,noToggle:notog});
  mainTop = tr;
  tr.noToggle = notog;
  tr.isShapeTree = true;
  tops = [tr];
  atf = itm.__atProtoFrontier();
  if (mode==="fullyExpand") {
    tr.fullyExpand(undefined,false,atf);
  } else if (mode==="expand") {
    tr.expand(undefined,false,atf);
  }  else if (mode ==="auto") {
    tr.fullyExpandIfSmall(undefined,false,atf);
  } else {
    tr.expand(undefined,false,atf);
  }
  mainTree = tr;
  if (!noSelect) {
    itm.__select('tree');
  }
  subdiv.draw();
}
let topItem;
const showItemAndChain = function(itm,mode,noSelect,noName) {
  topItem = itm;
  adjustmentOwnedBy = undefined;
  showItem(itm,mode,noSelect,noName);
  if (!itm.__assembly) {
    showProtoChain(itm);
    if (adjustSelectorsActive) {
      showAdjustSelectors();
    }
  }
}

const refresh = function () {
  if (topItem) {
    showItemAndChain(topItem,vars.expandMode,true);
  }
}

ui.vars.refreshTree = refresh;

let originalSelectionPath;

 const getParent = function (top) {
  let sh,pr;
  // are we climbing from a different start point?
  if (!originalSelectionPath || !ui.matchesStart(ui.vars.selectedNodePath,originalSelectionPath)) {
    originalSelectionPath = ui.vars.selectedNodePath;
  }
  sh = shownItem;
  if (sh) {
    if (sh===core.root) {
      return top?core.root:undefined;
    }
    if (top ) {
      pr = core.root;
    } else {
      pr = sh.__parent;
      while (!pr.__isSelectable()) {
        pr = pr.__parent;
      }
    }
    return pr;
  }
  return undefined;
}
  
// returns false if at root, true if there is another parent to go
const showParent = function (top) {
  let sh,pr;
  // are we climbing from a different start point?
  if (!originalSelectionPath || !ui.matchesStart(ui.vars.selectedNodePath,originalSelectionPath)) {
    originalSelectionPath = ui.vars.selectedNodePath;
  }
  sh = shownItem;
  if (sh) {
    if (sh===core.root) {
      return [false,true];
    }
    if (top ) {
      pr = core.root;
    } else {
      pr = sh.__parent;
      while (!pr.__isSelectable()) {
        pr = pr.__parent;
      }
    }
    showItemAndChain(pr,vars.expandMode);
    return [pr !== core.root,true];
  }
  return [false,false];
}

const showTop = function (force) {
  if (force) {
    showItemAndChain(core.root,vars.expandMode,'noSelect','noName');
  } else {
    showParent(true);
  }
}

const refreshTop = function () {
  if (!shownItem || (shownItem === core.root)) {
    showTop('force');
  }
}
// down the originalSelectionPath - ie undoing showParents
// returns [hasParent,hasChild] 

const showChild = function () {
  let sh = shownItem;
  let osp,cp,ln,oln,ci,ch;
  if (!sh) {
    return [false,false];
  }
  osp = originalSelectionPath;
  cp = ui.vars.selectedNodePath;
  if (osp) {
    if (!ui.matchesStart(cp,osp)) {
      originalSelectionPath = undefined;
      return [sh!==core.root,false];
    }
    ln = cp.length;
    oln = osp.length;
    if (oln === ln) {
      return [true,false];
    }
    ci = ln;
    ch = sh[osp[ci]];
    while ((ci < oln) && ch && !ch.__isSelectable()) {
      ci++;
      ch = ch[osp[ci]];
    }
    if (ch) {
      showItemAndChain(ch,vars.expandMode);
      return [true,ci < (oln-1)];
    }
  }
  return [sh!==core.root,false];
}

const selectionHasChild = function () {
  let osp = originalSelectionPath;
  let cp = ui.vars.selectedNodePath;
  if (!osp || !cp) {
    return false;
  }
  if (cp.length >= osp.length) {
    return false;
  }
  return ui.matchesStart(cp,osp);
}

const selectionHasParent = function () {
  let sh = ui.vars.selectedNode;
  return (sh && (sh!==core.root));
}

export {selectionHasChild,selectionHasParent,showItemAndChain,getParent,showChild};
