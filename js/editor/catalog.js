/* builds the catalog data structure from the file system. In the case of the system catalog, it saves the catalog in (sys)/catalog/catalog.json if
 * the GET variable saveCatalog is on.
 */
 
function pathToTabname(uname,path) {
 let tabname;
  let file = core.afterLastChar(path,'/');
  if (uname === 'sys') {
   tabname = file;
  } else if (uname === userName) {
   let sp = path.split('/');
   let shortName = sp[0] === 'exports'?'(.x)':'(.c)';
   if (sp.length === 1) {
     tabname = shortName;
   } else {
     tabname = shortName+'/'+sp[1];
   }
   
   //tabname = (file==='exports')?'(.x)':'(.c)';
  } else {
   tabname = '('+uname+')';
  }
  //console.log('uname',uname,'path',path,'tab',tabname);
  return tabname;
}

function tabnameToPath (tabname) { // only needs to work for paths owned by userName
  let uname = userName;
  if (uname === 'sys') {
    return 'catalog/'+tabname;
  }
  let sp = tabname.split('/');
  let path;
  let frst = (sp[0] === '(.x)')?'exports':'catalog';
  if (sp.length === 1) {
    path = frst;
  } else {
    path = frst + '/' + sp[1];
  }
  //console.log('tab',tabname,'path',path);
  return path;
}

  
function catalogTabOwned () { 
  let uname = userName;
  let tabname = catalogState.selectedTab;
  if (tabname) {
    let sp = tabname.split('/');
    if (uname === 'sys') {
      return true;
    } else {
      return (sp[0] === '(.c)') || (sp[0] === '(.x)');
    }
  }
  return false;
}


  
function catalogSelectedOwned () { 
  if (!catalogSelected) {
    return;
  }
  return (catalogSelected.uname === userName);
}

  
    
  
const addToCatalog1 = function (catalog,uname,path,keys) {
  let order;
  let entries = {};
  let maxIindex = -1;
  let file = core.afterLastChar(path,'/');
  let tabname = pathToTabname(uname,path);
  tabnameToPath(tabname);
//  catatlog.push(
  for (let key in keys) {
    let isOrder = key === ".order";
    if (isOrder) {
      order = keys[key];
      //console.log('isOrder!!',order);
      continue;
    }
    let isLink = core.endsIn(key,'.link');
    let unamePrefix = '('+uname+')/';
    if (isLink || core.endsIn(key,'.js') || core.endsIn(key,'.item')) {
     let url,role,nm,roles,urls;
     //let file = core.afterLastChar(path,'/');
      nm = core.beforeLastChar(key,'.');
      let svgnm = nm + '.svg';
      let svg = unamePrefix+path + '/' +svgnm;
      let isSvg = keys[svgnm];
      let val = keys[key];
      let pval = (val[0]==='{')?JSON.parse(val):{};
      let iindex = pval.iindex;
      if (typeof iindex === 'number') {
        if (iindex > maxIindex) {
          maxIindex = iindex;
        }
      }
      if (isLink) {
        url = pval.url;
        urls = pval.urls;
        if (!url  && !urls) {
          continue;
        }
        let kySvg = pval.svg;
        if (kySvg) {
          isSvg = true;
          svg = kySvg;
        }
      } else if (pval.imageUrl) { // hack: since images inside svg disappear, if there is an image in the item, use it in the catalog
        isSvg = true;
        svg = pval.imageUrl;
        url = unamePrefix+path + '/' +key;
      } else {
        url = unamePrefix+path + '/' +key;
      }
      if (url || urls) {
         /*let tabname;
         if (uname === 'sys') {
           tabname = file;
         } else if (uname === userName) {
           let sp = path.split('/');
           let shortName = sp[0] === 'exports'?'(.x)':'(.c)';
           if (sp.length === 1) {
             tabname = shortName;
           } else {
             tabname = shortName+'/'+sp[1];
           }
           
           //tabname = (file==='exports')?'(.x)':'(.c)';
         } else {
           tabname = '('+uname+')';
         }*/
         //let tabname = (uname === 'sys')?file:(file==='exports')?'('+uname+')':unamePrefix+file;
         //let tabname = (uname === 'sys')?file:(file==='exports')?'('+uname+')':unamePrefix+file;
         let entry = {'tab':tabname,id:nm,uname:uname,fitFactor:0.6};
        core.setProperties(entry,pval,['url','urls','role','roles','settings','iindex','title','fitFactor']);
        if (url) {
           entry.url = url;
        }
        entry.path = path;
         entry.insertable = (pval.insertable === false)?false:true;
         if (isSvg) {
           entry.svg = svg; // if it is present, use the svg in the original directory, not where the link points
         } else {
           entry.svg = '(sys)/forCatalog/newEntry.svg'; //temporary remove when catalog is ready
         }
         entries[nm] = entry;
         
         catalog.push(entry);
      }
    }
  }
  if (order) {
    let spl = order.split(',');
    let orderOb = {};
    let cnt = 0;
    spl.forEach( (elt) => {orderOb[elt] = cnt++});
    for (let key in keys) {
      let nm = core.beforeLastChar(key,'.');
      let iindex = orderOb[nm];
      if (typeof iindex === 'number') {
        let entry = entries[nm];
        entry.iindex = iindex;
      }
    }
    if (cnt > maxIindex) {
      maxIindex = cnt;
    }
  }
  // now assign iindices to each entry that does not already have one.
  let cindex = maxIindex;
  for (let nm in entries) {
    let elt = entries[nm];
    if (elt.iindex === undefined) {
      elt.iindex = cindex++;
    }
  }
  theOrder(catalog,path);
}
  
  
  
  
const addToCatalog = function (catalog,uname,dir,path) {
  let keyss = core.evalPath(path,dir);
  addToCatalog1(catalog,uname,path,keyss);
}

  

const theOrder = function (catalog,path) {
 // let catalog = catalogState.catalog;
  let entries = [];
  catalog.forEach ( (elt) => {if (elt.path === path) {entries.push(elt);}});
  entries.sort((a,b) => a.iindex - b.iindex);
  let names = entries.map((elt) => elt.id);
  let rs = names.join(',');
  return rs;
}

let tabsNeedingSave = {};

const enableCatButtons = function () {
  let tab = catalogState.selectedTab;
  if (catalogSelectedOwned() && (catalogSelected.tab === tab)) {
    moveUpBut.$show();
    moveDownBut.$show();
  } else {
    moveUpBut.$hide();
    moveDownBut.$hide();
  }
  if (tabsNeedingSave[tab]) {
    saveOrderBut.$show();
  } else {
    saveOrderBut.$hide();
  }
}
    
  
const moveSelection = function (up) {
  if (!catalogTabOwned()) {  //should not happen
    return;
  }
  if (catalogSelected) {
    if (catalogSelected.tab === catalogState.selectedTab) {
      let catlog = catalogState.catalog;
      let path = catalogSelected.path;
      let idx = catalogSelected.iindex;
      let fidx = up?idx-1:idx+1;
      let toSwap = catlog.find((elt) => (elt.iindex === fidx)&&(elt.path === path));
      if (toSwap) {
        toSwap.iindex = idx;
        catalogSelected.iindex = fidx;
        catalog.showCurrentTab(catalogState);
        tabsNeedingSave[catalogSelected.tab] =1;
        enableCatButtons();
       /* let path = catalogSelected.path;
        let ord = theOrder(catlog,path);
       fb.addToDirectory('/'+path,'.order',ord);*/
      }
    }
  }
}


const saveCatalogOrder = function () {
  let tab = catalogState.selectedTab;
  let path = tabnameToPath(tab);
  let catlog = catalogState.catalog;
  let ord = theOrder(catlog,path);
  fb.addToDirectory('/'+path,'.order',ord);
  tabsNeedingSave[tab] = undefined;
  enableCatButtons();

}


const catalogFolders = function (dir,top) {
  let catFolder = dir[top];
  if (catFolder) {
    return Object.getOwnPropertyNames(catFolder);
  } else {
    return [];
  }
}

const loadAcatalog = function (catalog,uname,cb) {
  fb.getDirectoryForUsername(uname, (err,dir) => {
     let folders = catalogFolders(dir,'catalog');
     folders.forEach((folder) => {
       addToCatalog(catalog,uname,dir,'catalog/'+folder);
     });
     cb();
   });
}

const decodeUname = (uname) => {
  if (uname.indexOf('.catalog') > -1) {
    return [userName,'catalog'];
  }
  if (uname.indexOf('.exports') > -1) {
    return [userName,'exports'];
  }
  return [uname,'exports'];
}
const loadCatalogsFromDB = function (catalog,unames,foldersByUname,cb,iindex) {
//  console.log('loadCatalogs');
  let ln = unames.length;
  let index = iindex?iindex:0;
  if (index >=  ln) {
    cb();
    return;
  }
  let uname = unames[index];
  if (uname === 'sys') { // already loaded
    index++;
    if (index >= ln) {
      cb();
      return;
    }
    uname = unames[index];
  }
  //let pidx = uname.indexOf('.c')  || ;
  //let decodedUname = pidx > -1?uname.substr(0,pidx):uname;
  
  let decodedUname = decodeUname(uname)[0];
  let listedFolders = foldersByUname[uname];
  let next = (err,dir) => {
  // $(uname}.private  codes  for the private catalog 
     let [decodedUname,top] = decodeUname(uname);
     let folders = (listedFolders.indexOf('*') > -1)?catalogFolders(dir,top):listedFolders;
     if (listedFolders[0] === '*') {
       addToCatalog(catalog,decodedUname,dir,top);
     } //else {
       folders.forEach((folder) => {
         addToCatalog(catalog,decodedUname,dir,top+'/'+folder);
       });
    // }
     loadCatalogsFromDB(catalog,unames,foldersByUname,cb,index+1);
  };
  if (decodedUname === userName) {
    next(undefined,directory);
  } else {
    fb.getDirectoryForUsername(decodedUname, next);
  }
}

// a source has the form userName or userName/folder
// the username "." represents the current user

const foldersByUser = function (isources) { // * represents all folders; return [users,foldersByUser]
  let sources = isources.split(',');
  let rs = {};
  let users = [];
  sources.forEach((isrc) => {
    let spl = isrc.split('/');
    let iusr = spl[0];
    
    let folder = (spl.length > 1)?spl[1]:'*';
    let usr;
    if (iusr === ".") {
      usr=userName;
    } else if (iusr === '.private') {
      usr = userName + ".private";
    } else {
      //let ln = iusr.length;
      //usr = iusr.substr(1,ln-2);
      usr = iusr;
    }

    let folders = rs[usr];
    if (folders) {
      if (folders !== "*") {
         if (folders.indexOf(folder) === -1) {
           folders.push(folder);
         }
      }
    } else {
     rs[usr] = [folder];
     users.push(usr);
    }
  });
  return [users,rs];
}

const loadCatalog = function (isources,cb) {
  let catalog = [];
  if (userName === 'sys') { // derive catalog from the file system (for sys)
    const addToSysCatalog = (path) => {
      addToCatalog(catalog,'sys',directory,path);
    }
      addToSysCatalog('catalog/shape');
  addToSysCatalog('catalog/connector');
 // if (!saveCatalog) {
 //   addToSysCatalog('catalog/variants');
 // }
   addToSysCatalog('catalog/line');
   addToSysCatalog('catalog/variant');

      addToSysCatalog('catalog/box');

    addToSysCatalog('catalog/arrowHead');
  //  addToSysCatalog('catalog/image');
    addToSysCatalog('catalog/kit');

    catalogState = mkCatalogState(catalog);
    if (saveCatalog) {
      stashCatalog(catalog);
      cb();
      return;
    }
    //cb();
    //return;
  }
  //let sources = (!userName)?'sys/*':((userName === 'sys')?isources:'./*,.private/*,'+isources);
  let sources = (!userName)?'sys/*':((userName === 'sys')?isources:''+isources);
  let [users,byUser] = foldersByUser(sources);
  let next = (catalog) => {
    loadCatalogsFromDB(catalog,users,byUser, () => {
      catalogState = mkCatalogState(catalog);
      cb();
    });
  }
  if ((userName !== 'sys') && (users.indexOf('sys') > -1)) {
    core.httpGet('(sys)/catalog/catalog.json',function (error,json) {
      let sysFolders = byUser['sys'];
      let catalog = JSON.parse(json);
      if (sysFolders.indexOf('*') === -1) {
        catalog = catalog.filter((entry) => {
          let tab = entry.tab;
          return sysFolders.indexOf(tab) > -1;
        });
      }
      next(catalog);
    });
  } else {
    next(catalog);
  }
}

const stashCatalog = function (catalog) {
 let catstr = JSON.stringify(catalog);
 ui.saveJson('/catalog/catalog.json',catstr,() => {});
}

let catalogSelected;

const mkCatalogState = function (catalog) {
   return {catalog:catalog,
                  forInsert:true,role:null,dragMessage:dragMessage.__element,tabsDiv:insertTab.__element,
                  cols:[insertDivCol1.__element,insertDivCol2.__element],
                  whenDrag: function (selected) {
                    dragSelected = selected;
                   },
                   whenClick: function (selected) {
                     catalogSelected = selected;
                     if (selected) {
                       codeButton.innerHTML = 'View Source';
                       enableCatButtons();
                     }
                   }
                   };
                   
}

catalog.tabSelectCallbacks.push(function (tab) {
  enableCatButtons();
});

export {mkCatalogState};

