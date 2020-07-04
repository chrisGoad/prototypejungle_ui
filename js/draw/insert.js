
     
/* support for inserting and replacing from the catalog*/


// glogals for this section.
let idForInsert,insertSettings,replacement,insertProto,draggedOver,dragSelected,textForImageReplacement,anyImageUrl,imageProto,urlToLoad;


// draggedOver is the object to replace in replacement, and dragSelected represents the thing  in the catalog that was dragged into the graphics panel, whether for insert or replacement


/*  sequence of events
  *   mainDropCallBack(draggedOver,point,scale) called from svgx (where mouse is handled)
  *   loadProtoFork(point,scale); loadProtoFork dispathes to either
  *        loadProto(dragSelected,replacedPart.role,() => afterInstallReplace(replacedPart)); // in replace mode
  * or 
  *        loadProto(dragSelected,undefined,() => insertItem(ui.vars.snapMode?ui.snapPointToGrid(point):point,scale));
  
  *  loadProto(dragSelected,role of replacedPart,cb) extracts the url/path from dragSelected
  *      dragSelected supplies a mapping from roles to urls. For insert, rather than replace, role is undefined, and the first role, url pair is selected
  *  loadProtoFromPath(path,id,dragSelected.settings,cb);
  *  core.install(path,(erm,proto) =>afterProtoLoaded(undefined,proto,cb)); does the actual installation 
  *  afterProtoLoaded(erm,proto,cb)
  *       cb is finally executed; it will be either () => afterInstallReplace(replacedPart) for replacement or () => insertItem(ui.vars.snapMode?ui.snapPointToGrid(point):point,scale) for  insert
  *        these two functions (afterInstallReplace and insertItem) finish the job
  *        
   */  


const mainDropCallBack = function(draggedOvr,point,scale) {
 imageProto = undefined;
 draggedOver = draggedOvr; // globalize it
 anyImageUrl = undefined;
 if ((!ui.vars.replaceMode) && (dragSelected.tab === 'arrowHead')) {// special cased for now
   uiAlert('Arrow heads are for swapping only, not insertion');
   return;
 }
 
 const loadImage = function (url) {
   anyImageUrl = url;
   ui.afterImageUrl(url,function (erm,proto) {
     proto.role = 'vertex';
     imageProto = ui.prepareInsertProto(proto,'image',insertSettings);
     imageProto.resizable = true;
     imageProto.scalable = true;
     if (ui.vars.replaceMode) { // in swap mode, images are inserted in containers
       loadProtoFork();
     } else {  
       core.root.add(imageProto.instantiate().unhide());
     }
   });
 };
 if (dragSelected.id === 'image') {
   dialog('Url of the image:',loadImage);
   return;
 }
 loadProtoFork(point,scale);
};

ui.afterDropCallbacks.push(mainDropCallBack);

const loadProtoFork = function (point,scale) {
    if (ui.vars.replaceMode  && draggedOver) {
      let dragged = dragSelected;
      //debugger;
      let ancestor = ui.selectableAncestor(draggedOver);
      if (!ancestor) {
        return;
      }
      let replacedPart = core.descendantWithRole(ancestor,dragged.role,dragged.roles);
      if (!replacedPart) {
         replacedPart = core.ancestorWithRole(ancestor,dragged.role,dragged.roles);
      }
      loadProto(dragSelected,replacedPart.role,() => afterInstallReplace(replacedPart));
    } else {
      loadProto(dragSelected,undefined,() => insertItem(ui.vars.snapMode?ui.snapPointToGrid(point):point,scale));
    }
  };
  
  
const loadProto = function (catalogEntry,role,cb) {
  let url =urlForRole(catalogEntry,role);
  urlToLoad = url;
  let id;
  if (catalogEntry.id) {
    id = catalogEntry.id;
  } else {
   // try using the filename
    id  = core.beforeLastChar(core.afterLastChar(url,'/'),'.');
    if ((id.length > 10) || !core.checkName(id)) {
      id = 'x';
    }
  }
  loadProtoFromPath(url,id,catalogEntry.settings,cb);
}


const loadProtoFromPath = function (path,id,settings,cb) {
  let ins;
  fromItem = core.endsIn(path,'.item');
  idForInsert = id;
  insertSettings = settings;
 // ins = ui.vars.theInserts[path];// already loaded?
  ins = core.installedItems[path];// already loaded?
  if (ins) {    
    insertProto = ui.prepareInsertProto(ins,id,settings);
    if (replaceProtoMode) {
      replacement = insertProto;
      insertProto = undefined;
    }
    if (cb) {
      cb();
    }
    return;
  }
  if (fromItem) {
    core.vars.installPrototypeDisabled = true;
  }
  core.install(path,(erm,proto) =>afterProtoLoaded(undefined,proto,cb));
}

const afterProtoLoaded = function (erm,proto,cb) {
   core.vars.installPrototypeDisabled = false;
  //  proto.role = catalogEntry.role;
   let whereToSetImage,theProto,toInstall;
   if (fromItem) {
     theProto = core.importItem(proto);
     theProto.resizable = true;
     theProto.scalable = true;
   } else {
     //ui.vars.theInserts[proto.__sourceUrl] = proto;
     theProto = ui.prepareInsertProto(proto,idForInsert,insertSettings);
   }
   if (replaceProtoMode) {
     insertProto = undefined;
     replacement = theProto;
     if (insertSettings) {
        replacement.set(insertSettings);
     }
     //textForImageReplacement = catalogEntry.title;
   } else {
     insertProto = theProto;

     if (!fromItem) {
       whereToSetImage = insertProto;
     }
   }
   if (cb) {
     cb();
   }
 }
  


const urlForRole = function (catalogEntry,irole) {
  let rs = catalogEntry.url;
  if (!rs) { // multi role entry
     let role = irole?irole:catalogEntry.roles[0]; //choose the first one if no role is specified
     rs = catalogEntry.urls[role]; 
  }
  return rs;
}


const afterSaveState =  () => {
  if ((core.history.length > 1) && (!core.historyFailed)) {
    enableButton(undoBut);
  }
  disableButton(redoBut);
}

core.afterSaveStateHooks.push(afterSaveState);

const saveState = function (kind) {
  core.saveState(kind);
 // afterSaveState();
}

 

 const insertItem = function (point,scale) {
    let itm;
    let insertUnder;  //insertUnder is a function
    if (insertProto.isKit) {
      insertUnder = core.root;
    } else if (core.root.main?core.root.main.insertUnder:false) {
      insertUnder = core.root.main.insertUnder(insertProto);
    } else {
      insertUnder = core.root; // by default, insert under core.root
    }
    itm = insertProto.instantiate();
    showIfAssembly(itm);
    let anm = core.autoname(insertUnder,idForInsert);
    itm.unhide();
    insertUnder.set(anm,itm);
    if (imageProto) {
     itm.height = (itm.width)/(imageProto.aspectRatio);
     itm.setImage(imageProto.instantiate().unhide());
    }
    if (itm.initialize) {
      itm.initialize();
    }
    
    
    dom.fullUpdate();
    if (itm.addToPointSeries && !fromItem) {
      ui.vars.activePointSeries = itm;
      if (!escapeListenerAdded) {
        window.addEventListener('keydown',function (e) {
          let iitm = ui.vars.activePointSeries;
          if (!iitm) {
            return;
          }
          if((e.key === 'Escape')||(e.keyCode === 27)) {
            iitm.completePointSeries();
            dom.svgMain.__element.style.cursor = 'default';
            resumeActionPanelAfterSelect();
            ui.vars.activePointSeries = undefined;
          }
        });
        escapeListenerAdded = true;
      }
      itm.startPointSeries();
      setActionPanelForPointSeries();
      dom.svgMain.__element.style.cursor = 'crosshair'; 
    }
    if (itm.customMoveto) {
      itm.customMoveto(point);
    } else {
      itm.moveto(point);
    }
    itm.show();
  	saveState('insert');
    enableButtons();
    setSaved(false);
    return itm;
  }
  
  
const afterInstallReplace = function (replacedPart) {
  let dragged = dragSelected;
  let settings = dragged.settings;
  // just apply the settings from the catalog item,if the item to be replaced comes from the same place as the replacement
  if (settings && (replacedPart.__sourceUrl === urlToLoad)) {
    if (replaceProtoMode) {
      let rProto = Object.getPrototypeOf(replacedPart);
      rProto.set(settings);
      core.forInheritors(rProto,function (ireplaced) {
        if (ireplaced === rProto) { // any node counts as an inheritor of itself - we're  only interested in strict inheritors
          return;
        }
        ireplaced.updateAndDraw();
      });
    } else {
      replacedPart.set(settings);
      replacedPart.updateAndDraw();
    }
    return;
  }
  if (!dragged.role && !dragged.roles) {
     core.error('No role assigned to dragged item');
  }
  let climbCount = 0;
  if (replaceProtoMode) {// insert the image into each instance, if image it be
    if (imageProto) {
       if (!settings) {
          settings = {};
       }
       settings.image = imageProto.instantiate().show();
       settings.text = textForImageReplacement;
    }
    core.replace(Object.getPrototypeOf(replacedPart),replacement,climbCount,settings);
  } else {
     // for an individual swap, transer both the prototype's and the instanc'e's state into the replaced instance
     if (imageProto && core.beginsWith(replacedPart.__sourceUrl,'/container/')) { // swap a raw image into rather than replacing the container
       replacedPart.setImage(imageProto.instantiate().unhide());
     } else {
       core.transferState(insertProto,Object.getPrototypeOf(replacedPart),undefined,false);// settings = undefined,own = false
       replacement = core.replace(replacedPart,insertProto,climbCount,settings);// true: doNotTransferState mod 8/17
     }
  }
  dom.fullUpdate();
  saveState('replace');
}

/* end insert section */
