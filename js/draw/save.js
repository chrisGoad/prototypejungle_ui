
//let saveItem,saveData,resaveItem;

const saveData = function (ipath,newPath) { // accepts either path or url
  let pjUrl,path;
  let dataContainer = findDataContainer();
  if (!dataContainer) {
    return;
  }
  if (core.beginsWith(ipath,'(')) {
    pjUrl = ipath;
    let idx = ipath.indexOf(')');
    path = ipath.substr(idx+1);
  } else {
    pjUrl = '('+userName+')'+ipath;
    path = ipath;
  }
  let parsedData = checkJSON(JSONMessage);
  if (!parsedData) {  
    return;
  }
  let dataString = removeErrorMark(editorValue());
  ui.saveJson(path,dataString,function (err) {
  
    if (checkSaveError(err,core.vars.maxSaveLength)) {
      return;
    }
    core.loadedScripts[pjUrl] = dataString;
    dataModified = false;
    let data = core.lift(parsedData);
    dataContainer.set("data",data);
    dataContainer.__internalDataString = undefined;
    dataContainer.__internalData = undefined;
    data.__sourceUrl = pjUrl;
    const newDataSource = function () {
      setSaved(false);
      setDataSource(pjUrl);
      enableDataButtons(pjUrl);
    }
    if (newPath) {
       setYesNoText("Would you like this to be the new data source? If so, don't forget to save the item");
        afterYes = newDataSource;
        mpg.confirm_lightbox.pop();
    } else {
      setDataMessage(pjUrl);
    }

  });
}

const imageNeedsSave = function (url,extension) {
  let path = core.afterChar(url,')');
  let pathParent = core.stripInitialSlash(core.beforeLastChar(path,'/'));
  let name = core.afterLastChar(path,'/');
  let dirParent = pathParent?core.evalPath(pathParent,directory):directory;
  let imName = name + '.' + extension;
  let itemName = name + '.item';
  let imTime = dirParent[imName];
  let itemTime = Number(dirParent[itemName]);
  return (!imTime) || (Number(imTime) < itemTime);
}
let saveItemBeforeSaveImage = false;

const asImage = function (extension) {
 if (userName && !source) {
    uiAlert((extension==='svg'?'asSvg':'asJpeg')+' is only available for saved items. Please "Save As" and try again.');
    return;
  }
  let owner = fb.uidOfUrl(source);
  if (!owner) {
     uiAlert('No image file is available for this item');
     return;
  }
  let owned = userName === owner;
 
  if (saveItemBeforeSaveImage && fileModified) {
     uiAlert('This item has been modified. Please "Save" or "Save As" and try again.');
     return;
  }
  let withoutExt = core.beforeLastChar(source,'.');
  let needsSave = owned && imageNeedsSave(withoutExt,extension);
  deactivateGrid();
  saveImageMaybe(withoutExt + '.' + extension,true);
}

const asSvg = function () {                                                       
  asImage('svg');
}


const asJpeg = function () {
  asImage('jpg');
}
  
const saveItem = function (path,cb) {
  let toCatalog = core.beginsWith(path,'/exports/') || core.beginsWith(path,'/catalog/');
  let pjUrl = '('+userName+')'+path;
  ui.unselect();
  let afterSaveImage = (err,ln) => {
    let pathParent = core.stripInitialSlash(core.beforeLastChar(path,'/'));
    //let nm = core.afterLastChar(path,'/');
    //let dirParent = core.evalPath(pathParent,directory);
    let loc,msg;
    if (checkSaveError(err,ln)) {
      return;
    } 
    if (cb) {
      cb(null,pjUrl);
      return;
    }
    fileModified = false;
    fb.sendToShell('draw.html?source='+pjUrl);
  }
  let afterSave = function (err,ln) {
    let svgPath = core.beforeLastChar(path,'.') + ".svg";
    if (toCatalog) {
       saveImageMaybe(svgPath,true,afterSaveImage);
    } else {
      afterSaveImage(err,ln);
    }
    dom.fullUpdate();
  }
  let dbval = {},someDbval;
  if (toCatalog) {
    let parts = core.assemblyParts(core.root);
    if (parts.length === 1) {
       dbval.role = parts[0].role;
       someDbval = true;
    }
    let image = ui.findImage(core.root);
    if (image) {
      dbval.imageUrl = image.__imageUrl;
      someDbval = true;
      
    }
  }
  let dbvalJSON = someDbval?JSON.stringify(dbval):undefined;
  deactivateGrid();
  dom.centerOnOrigin();
  ui.saveItem(path,core.root,dbvalJSON,afterSave);
}

const saveHistory = function (path) {
  ui.saveHistory(path,undefined,() => {debugger;});
}

const resaveItem = function () {
  let gridActive;
  const doneSaving = function () {
    /*
    let pathParent = core.stripInitialSlash(core.beforeLastChar(itemPath,'/'));
    let nm = core.afterLastChar(itemPath,'/');
    let dirParent = pathParent?core.evalPath(pathParent,directory):directory;
    dirParent[nm] = String(Date.now());
    */
    core.afterSaveStateHooks.forEach((fn) => {fn();});
    messageElement.$hide();
    setSaved(true);
    if (gridActive) {
      activateGrid();
    }
  }
  ui.displayMessage(messageElement,'Saving...');
  gridActive = deactivateGrid();
  saveItem(itemPath,doneSaving);
}

 
export {setSaved};
