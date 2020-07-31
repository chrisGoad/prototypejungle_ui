

let intro = false;

let gridEnabled = false; 

const enableGrid = function () {
  if (gridBut) {
    gridBut.$show();
  }
};


   

docClose.$click(function () { // close the intro page
  intro = false;
  layout();
});


// Keep user informed about modifications 
let fileAssertedModified = false;


const setSaved = function (value) {
  fileModified = !value;
  if (!value) {
    if (!fileAssertedModified) {
      if (!fb.currentUser) {
         fileDisplay.$html('<span style="color:red">you cannot save work since not logged in ');
      } else {
        fileDisplay.$html(source?sourceFile+'*':'unsaved');
      }
      fileAssertedModified = true;
    }
  } else {
     if (fileAssertedModified) {
      fileDisplay.$html(source?sourceFile:'');
      fileAssertedModified = false;
    }
    
  }
}

ui.vars.setSaved = setSaved;

ui.vars.setSaved = setSaved;
/*begin chooser section;   handles popping the file chooser, and dealing with what it returns*/

let chooserClose = closer.instantiate();
const chooserIframe = html.Element.mk('<iframe width="99%" height="99%" scrolling="no" id="chooser" />');
let chooserDiv = html.Element.mk('<div style="position:relative;width:100%;height:100%"  id="chooserDiv" />').__addChildren([
  chooserClose,
  chooserIframe
]);

let chooserBeenPopped = false;

/* called from the chooser frame */
let chooserMode;
const chooserReturn = function (v) {
  let getArgs,ext,dest,note,sp,ar;
  mpg.chooser_lightbox.dismiss();
  switch (chooserMode) {
    case 'dataSource':
      changeDataSource(v.path);
      break;
    case 'saveData':
      saveData(v.path,true);
      break;
    case'saveAs':
      saveItem(v.path);
      break;  
    case'saveHistoryAs':
      saveHistory(v.path);
      break;
    case'saveAsSvg':
    case'saveAsJpeg':
      saveImageMaybe(`(${userName})${v.path}`,true);
      break;
    case 'open':
      getArgs = '';
      if (v.deleteRequested) {
        fb.deleteFromDatabase(v.path);
        return;
      }
     ext = core.afterLastChar(v.path,'.',true);
     getArgs = '';
     let thePath = v.path;
     if (ext === 'svg') {
       dest = 'image';
       note = v.note;
       if (note) {
         sp = note.split(',');
         if (sp[0] === 'imageFound') {
           ar = sp[1];
           getArgs = '&image=1&aspect='+ar;
         }
       }
     } else if (ext === 'jpg') {
       dest = "image";
     } else if ((ext === 'item')||(ext === 'history') || (ext === 'js')) {
       dest = 'draw';
     } else if (ext == 'json') {
       dest = 'text';
     } else if (ext === 'link') {
       dest = 'draw';
       let dpath = core.afterChar(v.path,'/');
       let keyVal = parseKeyVal(core.evalPath(dpath,directory));
       thePath = keyVal.url;
     }
     // @todo add .json case
     fb.sendToShell(dest+'.html?source='+thePath+getArgs);
     break;
  }
};
/*
const  insertFromFsel = function (v) {
  const afterInsertLoaded = function (erm,item) {
    core.root.set('foob',item);
    delete item.__sourceUrl;
    core.updateParts(item);
    let bnds = item.bounds();
    let cnt = bnds.center();
    item.moveto(cnt.minus());
    console.table(bnds);
  }
   core.install(v.path,afterInsertLoaded);
}
*/
const popChooser = function(keys,operation) {
  if (location.hostname === '127.0.0.1') {
    debugger; //keep used in building the sys catalog json
  }
  let lb,src;
  // this is where the chooser gets its data
  chooserMode = operation;
  if (mpg.lightbox) {
    mpg.lightbox.dismiss();
  }
  lb = mpg.chooser_lightbox;
  src = '/chooser.html';
  // allows communication from the chooser frame
  window.chooserMode = chooserMode;
  window.chooserKeys = keys;
  window.currentUserName = userName;
  window.chooserReturn = chooserReturn;
  if (!chooserBeenPopped) {
    lb.setContent(chooserDiv);
    chooserBeenPopped = true;

  } else {
    chooserIframe.__element.src = src;
  }
  window.setTimeout(function () {lb.pop(undefined,undefined,1);chooserIframe.__element.src = src;},300);
};
  
chooserClose.$click(function () {
  mpg.chooser_lightbox.dismiss();
});



const saveDataAsClick = function () {
    popChooser(directory,'saveData');
}


const saveDataClick = function () {
  saveData(dataSource());
}

const openDataInTextEditor = function () {
  let ds = dataSource();
  if (ds === 'internal') {
    let d = findDataContainer();
    let ival = encodeURI(d.__internalDataString);
    fb.sendToShell("OPEN text.html?content="+ival);
  } else {
    fb.sendToShell("OPEN text.html?source="+ds);
    //window.open("/text.html?source="+ds,'_blank');
  }
}

 
  
/* end chooser section */

/* file options section */
  
let fsel  = ui.Select.mk();

fsel.containerP = html.Element.mk('<div style="position:absolute;padding-left:5px;padding-right:5px;padding-bottom:15px;border:solid thin black;background-color:white"/>');

fsel.optionP = html.Element.mk('<div class="pulldownEntry"/>');
      
const initFsel = function () {
  let el;
  if (userName === 'sys') {
    fsel.options = ["New","Open or Delete...","Save","Save As...","Save as SVG","Save as JPEG","As SVG","As JPEG","Save History","Save History As"]; 
    fsel.optionIds = ["new","open","save","saveAs","saveAsSvg","saveAsJpeg","asSvg","asJpeg","saveHistory","saveHistoryAs"];
  } else {
    fsel.options = ["New","Open or Delete...","Save","Save As...","As SVG","As JPEG"]; 
    fsel.optionIds = ["new","open","save","saveAs","asSvg","asJpeg"]; 
  }
  el = fsel.build();
  el.__name = undefined;
  mpg.addChild(el);
  el.$hide();
};

// called from the ui module

ui.vars.hideFilePulldown = function () {
 if (fsel) { 
    fsel.hide();
  }
};

let itemPath;

const setFselDisabled = function () {
  let disabled;
  if (!fsel.disabled) {
     fsel.disabled = {};
  }
  disabled = fsel.disabled;
  disabled.insertOwn = disabled.open = disabled.save = disabled.saveAs = disabled.saveAsSvg = disabled.saveAsJpeg =  disabled.asSvg = disabled.asJpeg =  !fb.currentUser;
  //disabled.asSvg = userName !== 'sys';
  if (!disabled.save) {
    if ((!source) || core.endsIn(source,'.js')) {
      disabled.save = true;
   } else {
     itemPath = ownedFilePath(source);
     disabled.save = !itemPath;
   }
  }
  fsel.updateDisabled();
}


/* called from the ui module */
fsel.onSelect = function (n) {
  let opt = fsel.optionIds[n];
  if (fsel.disabled[opt]) {
    return;
  }
  switch (opt) {
    case "new":
      fb.sendToShell('draw.html');
      break;
    case "save":
      resaveItem();
      break;

 /*   case "viewSource":
      viewSource();
      break;
      */
    case "asSvg":
      asSvg();
      break;
    case "asJpeg":
      asJpeg();
      break;
    case "open":
    case "saveAsSvg":
    case "saveAsJpeg":
    case "saveAs":
    case "saveHistoryAs":
      popChooser(directory,opt);
      break;
  }
}

const fileButClick = function () {
  setFselDisabled();
  ui.popFromButton("file",fileBut,fsel.domEl);
};



/* end file options section */

const addImage = function (item,name) {
 dialog('Url of the image:',function (url) {
    ui.afterImageUrl(url,function (erm,proto) {
      let oldImage = item[name];
      if (oldImage) {
        ui.standardDelete(oldImage);
      }
      proto.roles = 'image';
      insertProto = ui.prepareInsertProto(proto,name,insertSettings);
      item.setImage(insertProto.instantiate().unhide());
      addImageBut.$html('Replace Image');
      item.update('width');
      item.draw();
    });
  });
}


const addImageClick = function () {
  addImage(ui.vars.selectedNode,'image');
        editTextBut.$html(ui.vars.selectedNode.text === ''?'Add Text':'Edit Text');

}




let escapeListenerAdded = false;

// If core.root.main.insertUnder is a function, use that for insertion, unless the insertee is itself a kit

const showIfAssembly = function (item) {
  if (item.__assembly) {
    core.forEachTreeProperty(item,(part) => {
      if (part.__showInstance) {
        part.__update();
        part.show();
      }
    });
  }
}

let poppingCatalog;

let popCatalog = function (cb) {
  if (poppingCatalog) { // prevent recursive calls
    return;
  }
  poppingCatalog = true;
  if (ui.vars.selectedNode) {
    ui.unselect();
  }
  ui.vars.hideFilePulldown();
  panelMode = 'catalog';
  layout();
  insertDiv.$show();
  enableButtons();
	debugger;
  if (!catalogState) {  // catalog has not been loaded or shown
    if (theCatalogs === 'JsonError') {
     displayError('Bad JSON in your config.json');
    } else {
      loadCatalog(theCatalogs,function () {
        poppingCatalog = false;
        catalog.show(catalogState);
        if (cb) {
          cb();
        }
      });
    }
  } else {
    poppingCatalog = false;
    if (cb) {
      cb();
    }
  }
  setCatalogMode(catalogMode,cb);
}


let catalogMode = 'insert';

const setCatalogMode = function (mode,cb) {
	if (cb) { //cgstub7/20
		cb();
	}
	return;
  const nextC = function () {
    //enableButton1(insertBut,mode !== 'insert');
    boxButton(insertBut,mode == 'insert');
    //enableButton1(replaceBut,mode !== 'replace');
    boxButton(replaceBut,mode == 'replace');
    //enableButton1(replaceProtoBut,mode !== 'replaceProto');
    boxButton(replaceProtoBut,mode == 'replaceProto');

    catalogMode = mode;
    if (mode === 'replace') {
      ui.vars.replaceMode = true;
      replaceProtoMode = false;
      dragMessage.$html('Drag to replace');
    } else if (swapMachine || (mode === 'replaceProto')) {
      ui.vars.replaceMode = true;
      replaceProtoMode = true;
      dragMessage.$html('Drag to replace  prototype');
    } else {
      ui.vars.replaceMode = false;
      replaceProtoMode = false;
      dragMessage.$html('Drag to insert');
    }
    if (cb) {
      cb();
    }
  }
  if (panelMode !== 'catalog') {
    popCatalog(nextC);
  } else {
    nextC();
  }
}

const deactivateGrid = () => {
  let grid = core.root.__grid;
  if (grid) {
    grid.hide();
  }
  gridBut.$html('Activate Grid');
  let rs = ui.vars.snapMode;
  ui.vars.snapMode = false;
  return rs;
}

const activateGrid = () => {
  let grid = core.root.__grid;
  if (grid) {
     grid.show();
  }
  ui.setGridRect();
  ui.vars.snapMode = true;
  gridBut.$html('Deactivate Grid');
}

const gridButClick = () => {
  let grid = core.root.__grid;
  if (!grid ||  grid.__hidden()) {
     activateGrid();
     ui.selectGrid();

  } else {
    deactivateGrid();
  }
}

 
const closeSidePanel = function () {
  boxButton(insertBut,false);
  boxButton(replaceBut,false);
  boxButton(replaceProtoBut,false);
  panelMode = 'chain';
  layout();
};

ui.selectCallbacks.push(closeSidePanel);

const doneInserting = function () {
  if (controlRect) {
    controlRect.hide();
  }
  if (ui.vars.copyMode) {
     dom.svgMain.__element.style.cursor = "";
  }
  
  resumeActionPanelAfterCloning();
  nowReplacingFromClone = false;
  enableButtons();
}


/* end insert section */

/* start replace section */

// this is called during drags; if it returns true, the target is highlighted

const replaceable = function (iitem) {
  if (!iitem) {
    return;
  }
  let item = ui.selectableAncestor(iitem);
  if (!item) {
    return;rep
  }
  let itemUrl = item.__sourceUrl;
  let replacementUrl = dragSelected.url;
  let role = dragSelected.role;
  let roles = dragSelected.roles;
  //console.log('replace','replacementUrl',replacementUrl,'itemUrl',itemUrl,//'replacementKind',replacementKind,'itemKind',itemKind,
  //            'item role',item.role,'replacementRoles',role);
  if (replacementUrl && (replacementUrl === itemUrl) && dragSelected.settings) {  // just change settings
    return item;
  }
  //if ((replacementUrl === itemUrl) && dragSelected.settings) {  // just change settings
  //  return true;
  //}
  let descendant =  core.descendantWithRole(item,role,roles);
  if (descendant) {
    return descendant;
  }
  let ancestor = core.ancestorWithRole(item,role,roles);
  if (ancestor) {
    return ancestor; // this is the target of the replacement, and what is highlighted
  }
  return undefined;
 // return core.descendantWithRole(item,role,roles)?item:undefined;
}

ui.vars.replaceable = replaceable;

let standardTransferProperties = ['fill','stroke'];

const transferUIStatus = function (dst,src) {
  let dstStatus;
  let srcStatus = src.__get('__UIStatus');
  if (srcStatus) {
    dstStatus = dst.__get('__UIStatus');
    if (!dstStatus) {
      dstStatus = dst.set('__UIStatus',core.ObjectNode.mk());
    }
    core.forEachAtomicProperty(srcStatus,function (value,prop) {
      dstStatus[prop] = value;
    });
  }
}

/* end replace section */

/* start buttons section */


const deleteClick = function () {
 let kit;
  let selnode = ui.vars.selectedNode;
  ui.unselect();
  popCatalog();
  kit = core.containingKit(selnode);
  if (kit && kit.__delete) {
    kit.__delete(selnode);
  } else {
    ui.standardDelete(selnode);
  }
  core.saveState('delete');
}

let allButtons,topbarButtons;

const disableAllButtons = function () {
  allButtons.forEach(disableButton);
}

const disableTopbarButtons = function () {
  topbarButtons.forEach(disableButton);
}

const enableTopbarButtons = function () {
  topbarButtons.forEach(enableButton);
}

const deleteable = function (x) {
  return !(x.__notDeleteable);
}

const theKitRoot = function () {
  let rs;
  if (ui.vars.selectedNode) {
    rs =core.containingKit(ui.vars.selectedNode);
  }
  if (rs) {
    return rs;
  }
  let multiple = false;
  core.forEachTreeProperty(core.root,function (node) {
    if (node.isKit) {
      if (rs) {
        multiple = true;
      } else {
        rs = node;
      }
    }
  });
  return multiple?undefined:rs;
}
 

enableButtons = function () {
  let kitRoot = theKitRoot();
  let isAnimation = (kitRoot && kitRoot.isAnimation);
  if (kitRoot) {
    kitRootBut.$show();
  } else {
    kitRootBut.$hide();
  }
  //enableButton1(kitRootBut,kitRoot);
  let selnode = ui.vars.selectedNode;
  if (ui.vars.copyMode) {
    return;
  }
  allButtons.forEach(enableButton);
  let hideAdvancedButs = true;
  if (selnode) {
    let kit = core.containingKit(selnode);
    if (kit) {
      hideAdvancedButs = kit.hideAdvancedButtons;
    } else {
      hideAdvancedButs = false;
    }
  }
  if (hideAdvancedButs) {
    advancedButs.forEach((but) => {
      but.$hide()
    });
  } else {
    advancedButs.forEach((but) => {
      but.$show()
    });
  }
  if (selnode) {
    enableButton1(deleteBut,deleteable(selnode));
    if (!hideAdvancedButs) {
      enableButton1(cloneBut,!selnode.isKit);
    }
    let source = selnode.__sourceUrl;
    
    enableButton1(addImageBut,source && core.beginsWith(source,'/container/'));
    addImageBut.$html(selnode.image?'Replace Image':'Add Image');

    if (typeof(selnode.text) === 'string') {
      editTextBut.$html(selnode.text === ''?'Add Text':'Edit Text');
    } else {
      disableButton(editTextBut);
    }
    if ((!hideAdvancedButs) && (selnode.role !== 'vertex')) {
      disableButton(toggleConnectBut);
    }
  } else {
    editTextBut.$html('Edit Text');
    disableButton(editTextBut);
    disableButton(addImageBut);
    disableButton(deleteBut);
    if (!hideAdvancedButs) {
      disableButton(cloneBut);
      disableButton(moveToBackBut);
      disableButton(showCohortBut);
      disableButton(separateBut);
      disableButton(toggleConnectBut);
    }

  }
  if ((panelMode === 'data') || !dataSource()) {
    disableButton(dataBut);
  }
  if (core.canRedo()) {
    enableButton(redoBut); 
  } else {
    disableButton(redoBut);
  }
  /*
  if (panelMode === 'insert') {
    if  (!ui.vars.replaceMode) {
      disableButtonRed(insertBut);
    } 
    if ( ui.vars.replaceMode && !replaceProtoMode) {
      disableButtonRed(replaceBut);
    }
    if (ui.vars.replaceMode && replaceProtoMode) {
      disableButtonRed(replaceProtoBut);
    }
  }
  enableTreeClimbButtons();
  if (nowSelectingForActionPanel) {
    disableTopbarButtons();
  }
  */
}
ui.selectCallbacks.push(enableButtons);
ui.unselectCallbacks.push(function () {
  enableButtons();
  actionPanelMessage.__element.innerHTML="No item selected";
  actionPanelCustom.__element.innerHTML = '';
  popCatalog();
});

/* end buttons  section */
  
const setInstance = function (itm,fromSelect) { 
  if (!itm) {
    return;
  }
  topBut.$show();
  upBut.$show();
 // tree.showItemAndChain(itm,tree.vars.exandMode,fromSelect); cgstub7/20
  enableTreeClimbButtons();
}

ui.selectCallbacks.push(setInstance); 

treeVars.protoSubDiv = html.Element.mk('<div style="background-color:white;margin-top:20px;border:solid thin green;padding:10px"/>');

treeVars.viewNote = function(k,note) {
  let h = k?'<b>'+k+':</b> '+note:note;
  mpg.lightbox.pop();
  mpg.lightbox.setHtml(h)
}



let itemToCopy;

const setupForCopy = function () {
  itemToCopy = ui.actionSubject(ui.vars.selectedNode);
  if (!(Object.getPrototypeOf(itemToCopy).__inWs())) {
    uiAlert('The main item cannot be copied');
    return;
  }
  ui.vars.copyMode = true;
  actionPanelMessage.__element.innerHTML = `Now copying`;
  actionPanelButton.__element.innerHTML = `Done copying`;
  setClickFunction(actionPanelButton,stdActionPanelButtonAction);
  dom.svgMain.__element.style.cursor = "cell";
  actionPanelCommon.__element.style.display = "none";
  actionPanelCustom.__element.style.display = "none";
  resizable = false;
  disableAllButtons();
}

ui.vars.setupForCopy = setupForCopy;

const completeTheCopy = function (pos) {
  let rs = core.copyItem(itemToCopy,core.root);
  if (rs.afterCopy) {
    rs.afterCopy(itemToCopy);
  }
  showIfAssembly(rs);
  rs.moveto(pos);
  rs.show();
  rs.__update();
  rs.draw();
  saveState('copy');
}

ui.vars.completeTheCopy = completeTheCopy;
  
const showClones = function (proto) {
  let inheritors = core.inheritors(proto);
  dom.highlightNodes(inheritors);

}

const showCohortClick = function () {
  let proto = Object.getPrototypeOf(ui.vars.selectedNode);
  showClones(proto);
}

const undoClick = function () {
  if (core.history.length == 2)  {
    disableButton(undoBut);
  }
  ui.unselect();
  core.undo();
  enableButton(redoBut);
}

core.afterHistoryFailureHooks.push( () => {
  disableButtonRed(undoBut);
});


const unwrapClick = function () {
  if (ui.vars.unwrapAll) {
    ui.vars.unwrapAll = false;
    unwrapBut.$html('Unwrap');
  } else {
    ui.vars.unwrapAll = true;
    unwrapBut.$html('Wrap');
  }
  ui.unselect();
  dom.fullUpdate();
}


const separate = function (item) {
  ui.unselect();
  let proto = Object.getPrototypeOf(item);
  let protoProto = Object.getPrototypeOf(proto);
  let newProto = ui.prepareInsertProto(protoProto,proto.__name);
  core.transferState(newProto,proto);
  let rs = core.replace(item,newProto);
  rs.__update();
  dom.highlightNodes([rs]);
  window.setTimeout(dom.unhighlight,1000);
  rs.__select('svg');
}

  
const activateCloneButtons = function () {
  setClickFunction(cloneBut,() => {setupForCopy()});
  setClickFunction(separateBut,() => {separate(ui.vars.selectedNode)});
}

const openCodeEditor = function () {
  let url = 'code.html';
  if (source && core.endsIn(source,'.js')) {
    url += '?source='+source;
  }
  fb.sendToShell(url);
}
const moveToBack = function () {
  if (ui.vars.selectedNode) {
    let nd = ui.vars.selectedNode;
    ui.unselect();
    nd.__moveToBack();
    nd.__select('svg');
  }
}

const toggleConnect = function () {
  if (ui.vars.selectedNode) {
    let nd = ui.vars.selectedNode;
    ui.unselect();
    nd.inert = !nd.inert;
    setToggleConnectText(nd);
    nd.__select('svg');
  }
}

const setToggleConnectText = (nd) => {
    toggleConnectBut.__element.innerHTML = nd.inert?'Enable Connections':'Disable Connections';
}

ui.selectCallbacks.push(setToggleConnectText);

const selectKitRoot = function () {
  let kitRoot = theKitRoot();
  if (kitRoot) {
    kitRoot.__select('svg');
  }
}


//let dimDelta = 1.02;
let dimDelta = 0.5;
let numChanges = 0;
const setDim = function (dim) {
  let nd = ui.vars.selectedNode;
  let proto;
  let mn = core.root.main;
  if (mn) {
    numChanges++;
    let els = mn.elements;
    els.forEach((el) => {
      el.dimension = dim;
    });
    console.log('numChanges ',numChanges);
    ui.refresh();
  }
}

const changeDim = function (delta) {
  let nd = ui.vars.selectedNode;
  let proto;
  if (!nd) {
    let mn = core.root.main;
    let dim;
    if (mn) {
      numChanges++;
      let els = mn.elements;
      els.forEach((el) => {
        dim = el.dimension;
        el.dimension = dim + delta;
      });
      console.log('dimension',dim);
      //console.log('numChanges ',numChanges);
      ui.refresh();
      return;
    }
    let protos = core.root.prototypes;
     let elP = protos.elementP;
     if (elP) {
      proto = elP;
     }
      
  }
  if (proto) {
    dim = proto.dimension;
    if (dim) {
      //proto.dimension = delta * dim;
      proto.dimension =  dim + delta;
      console.log('dimension = ',proto.dimension);
      ui.refresh();
    }
  }
}
/*
let path = '/animate/test_';
let count = 0;
let save_as_jpeg_enabled = 1;;
const save_as_jpeg = function () {
  if (!save_as_jpeg) {
    return;
  }
  convertToJpeg(path+count+'.jpg',(err,sz) => {
    count++;
    uiAlert('done '+count);
  });
}
*/

  
const incrementDim = function () {
  changeDim(dimDelta*5);
 // save_as_jpeg();	
}


const decrementDim = function () {
  changeDim(-dimDelta*5);
}


const incrementdim = function () {
  changeDim(dimDelta);
 // save_as_jpeg();

}


const decrementdim = function () {
  changeDim(-dimDelta);
}
/*
const incrementDim = function () {
  changeDim(1 +(dimDelta-1)*5);
}


const decrementDim = function () {
  changeDim(1/(1 + (dimDelta-1)*5));
}


const incrementdim = function () {
  changeDim(dimDelta);
}


const decrementdim = function () {
  changeDim(1/dimDelta);
}
*/

const activateButtons = function () {  
 /* if (includeTest) {
   setClickFunction(testBut,() => {
     debugger;//keep
     svg.fitContents();
   });
  }*/
  setClickFunction(fileBut,fileButClick);
  setClickFunction(redoBut,() => {core.next(); if (!core.canRedo()) {disableButton(redoBut);}});
  setClickFunction(insertBut,() => setCatalogMode('insert'));
  setClickFunction(replaceBut,() => setCatalogMode('replace'));
  setClickFunction(replaceProtoBut,() => setCatalogMode('replaceProto'));
  setClickFunction(gridBut,gridButClick);
  setClickFunction(kitRootBut,selectKitRoot);
  setClickFunction(deleteBut,deleteClick);
  activateTreeClimbButtons();
  setClickFunction(editTextBut,popTextEdit);
  setClickFunction(addImageBut,addImageClick);
  setClickFunction(moveToBackBut,moveToBack);
  setClickFunction(plusDimBut,incrementDim);
  setClickFunction(minusDimBut,decrementDim);
  setClickFunction(plusdimBut,incrementdim);
  setClickFunction(minusdimBut,decrementdim);
  //setClickFunction(animateBut,animate); mothballed
  setClickFunction(toggleConnectBut,() => toggleConnect());
   activateCloneButtons();
  setClickFunction(unwrapBut,unwrapClick);
  setClickFunction(undoBut,undoClick);
  setClickFunction(dataBut,popData);
  /* rebuildFromDataBut.$click(rebuildFromData); cgstub7/20
  setClickFunction(changeDataSourceBut,changeDataSourceClick);
  setClickFunction(saveDataAsBut,saveDataAsClick);
  setClickFunction(saveDataBut,saveDataClick);
  setClickFunction(checkJSONBut,() => checkJSON(JSONMessage,true));
  setClickFunction(openDataInTextEditorBut,openDataInTextEditor);
  setClickFunction(showCohortBut,showCohortClick);
  setClickFunction(actionPanelButton,stdActionPanelButtonAction);
  setClickFunction(moveDownBut,() => moveSelection(false));
  setClickFunction(moveUpBut,() => moveSelection(true));
  setClickFunction(saveOrderBut,() => saveCatalogOrder());
  
*/
  allButtons = [fileBut,dataBut,cloneBut,separateBut,moveToBackBut,toggleConnectBut,showCohortBut,redoBut,//joinAction,showClonesAction,splitCohortAction,insertBut,replaceBut,replaceProtoBut,
                  editTextBut,addImageBut,deleteBut,upBut,downBut,topBut];
  topbarButtons = [fileBut,insertBut,replaceBut,replaceProtoBut,dataBut,unwrapBut];
}

const setMachineMessage = function (txt) {
  actionPanelMessage.__element.innerHTML=txt;
}



/* edit text section */

let editTextArea = html.Element.mk('<textarea style="margin-left:10px" cols="50" rows="15"/>');
let editTextDone = html.Element.mk('<div class="roundButton">Ok</div>');
const backslashU = '\\u';  

const encodeUnicode = function (s) {
  let pointer = 0;
  let rs = '';
  while (true) {
    let nxt = s.indexOf(backslashU,pointer);
    if (nxt >= 0) {
      let beforeUnicode = s.substring(pointer,nxt);
      let code = parseInt(s.substr(nxt+2,4),16);
      let codePoint = String.fromCharCode(code);
      rs += beforeUnicode;
      rs += codePoint;
      pointer = nxt + 6;
    } else {
      let afterUnicode = s.substr(pointer);
      return rs + afterUnicode
    }
  }
}

editTextDone.$click(function () {
  let ival = editTextArea.$prop("value");
  let val = encodeUnicode(ival);
  editTextBut.$html(val === ''?'Add Text':'Edit Text');
  let prevText = ui.vars.selectedNode.text;
  ui.vars.selectedNode.text = val;
  ui.vars.selectedNode.update();
  ui.vars.selectedNode.draw();
  dom.fullUpdate();
  saveState('editText');
  mpg.textedit_lightbox.dismiss();
  ui.updateControlBoxes();
  if (!prevText) {
   setInstance(ui.vars.selectedNode,true);
  }
  setSaved(false);
});

let editTextDiv = html.Element.mk('<div style="position:relative;width:100%;height:100%"  id="editTextDivDiv" />').__addChildren([
  editTextArea,
  html.Element.mk('<div/>').__addChildren([editTextDone])
]);

let texteditBeenPopped = false;

const popTextEdit = function () {
  let val = ui.vars.selectedNode.text?ui.vars.selectedNode.text:'';
  if (!texteditBeenPopped) {
    mpg.textedit_lightbox.setContent(editTextDiv);
  }
  mpg.textedit_lightbox.pop(undefined,300);
  editTextArea.$prop('value',val);
  texteditBeenPopped = true;
}

/*mothballed 
const animate1 = function (dest,numFrames) {
  for (let i = 0;i<numFrames;i++) {
    incrementDim();
  }
}

const animate = function () {
  animate1(null,50);
}
 */   
export {disableTopbarButtons,fileModified,enableButtons,setDim};