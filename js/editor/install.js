
let loadingItem = undefined;

const installMainItem = function (source,settings)  {
  mainUrl = source;
  if (settings) {
    settings = settings;
  }
  if (source) {
    core.setRoot(dom.SvgElement.mk('<g/>'));
    let ext = core.afterLastChar(source,'.',true);
    if (ext === 'history') {
      core.installHistory(source,afterMainInstall);
    } else {
      core.install(source,afterMainInstall); 
    }
  } else  {
    finishMainInstall();
  }
}

const afterMainInstall = function (e,rs) {
  if (e) {
    installError = e;
    finishMainInstall();
  } else if (rs) {
    delete rs.__sourceUrl;
    main = rs;
  } 
  finishMainInstall();
}

const setBackgroundColor = function (item) {
      if (!item.backgroundColor) {
        item.backgroundColor="white";
      }
   if (!item.__nonRevertable) {
     core.root.set('__nonRevertable',core.lift({backgroundColor:1}));
   }
}

let enableTheGrid = true;
const mergeIn = function (dst,src) {
  core.forEachTreeProperty(src,(child) => {
    let nm = child.__name;
    let anm = core.autoname(dst,nm);
    dst.set(anm,child);
  }); 
}

const svgInstall = function () {
  let fromItemFile = mainUrl && core.endsIn(mainUrl,'.item');
  if (main && fromItemFile) {
    let svProtos = core.root.prototypes; // loading main may have involved installing prototypes
    core.setRoot(main);
    if (svProtos && main.prototypes) {
      mergeIn(main.prototypes,svProtos);
    }
  } else if (!core.root) {
    core.setRoot(dom.SvgElement.mk('<g/>'));
  }
  
  setBackgroundColor(core.root);
  dom.svgMain.addBackground(core.root.backgroundColor);
  dom.svgMain.fitFactor = fitFactor;
  ui.initControlProto();
  dom.installRoot();
  if (main && !fromItemFile) {
      core.root.set('main',main);
  }
  let rmain = core.root.main;
  
  if (rmain) {
    if (rmain.initializePrototype) {
      rmain.initializePrototype();
    }
    if (rmain.initialize) {
      rmain.initialize();
    }
    core.propagateDimension(rmain);
  }
  if (ui.vars.whichPage === 'structure_editor')  {
//    popCatalog(); cgstub7/20
  }
  if ((core.root.__grid ||enableTheGrid) && enableGrid) {
    enableGrid();
  }
  dom.fullUpdate();
  if (core.root.draw) {
    core.root.draw(dom.svgMain.__element); // update might need things to be in svg
  }
  /*if (core.root.soloInit) { 
    core.root.soloInit(); 
  }*/
  //debugger;
  if (!core.throwOnError) {
    ui.refresh(ui.vars.fitMode);
  } else {
    try {
      ui.refresh(ui.vars.fitMode);
  } catch (e) {
    handleError(e);
  }
}
}

let enableButtons; //defined differently for different pages
let fitFactor = 0.8;
const findInstance = function (url) {
  let proto = core.installedItems[url]; 
  if (!proto) {
    return undefined;
  }
  let rs =  core.findDescendant(core.root,function (node) {
    return proto.isPrototypeOf(node);
  });
  if (rs) {
    return rs;
  }
}

const displayError = function (msg) {
  svgMessageDiv.$show();
  svgMessageDiv.$html('<div style="padding:150px;background-color:white;text-align:center">'+msg+'</div>');
  //svgDivReady = false;
}

core.setDisplayError(displayError);

const finishMainInstall = function () {
  let e = installError;
  let emsg;
  
  if (e) {
    emsg = '<p style="font-weight:bold">'+e+'</p>';
    core.displayError(emsg);
    
  }
  if (svgDiv && !e) {
    svgMessageDiv.$hide();
    svgInstall();
  }
  layout();
  if (ui.vars.fitMode) {
    dom.svgMain.fitContents();
  }
  if (ui.vars.whichPage !== 'text_editor' && !core.root.transform) {
     core.root.set('transform',dom.vars.defaultTransform);
  }
  let next2 = function () {
    enableButtons();
    dom.svgMain.fitContents();
    $(window).resize(function() {
      layout();
      if (ui.vars.fitMode) {
        dom.svgMain.fitContents();
      }
    });
  }
  let afterLoad = function (x,y,z) {
    let itm = insertItem(Point.mk(0,0),1);
    if (itm.afterLoad) {
      itm.afterLoad();
    }
    next2();
  }
  if (loadUrl) {
   loadProtoFromPath(loadUrl,'m',null,afterLoad);
   return;
  }

  if ((ui.vars.whichPage === 'code_editor') || (ui.vars.whichPage === 'text_editor')) {
    viewSource();
    next2();
    return;
  } else if (ui.vars.whichPage === 'structure_editor') {
     // tree.showItemAndChain(core.root,tree.vars.expandMode,true);  //cgstub7/20 true -> noSelect
      //setCustomActionPanelContents();
  }
  next2();
  enableButtons();
  //debugger;
	let wts = core.vars.whereToSave;
	if (wts) {
	  convertToJpeg(wts,function () {
		 // debugger;
	  });	
	}
  let mn = core.root.main;
  if (mn && mn.animate) {
    mn.animate();
  }
  saveState('initial');

}

const displayMessageInSvg = function (msg) {
  core.root.hide();
  svgMessageDiv.$show();
  svgMessageDiv.$html(msg);
}

 const clearError = function () {
   core.root.show();
   svgMessageDiv.$hide();
 }

const handleError = function (e) {
	debugger; //keep
  if (core.throwOnError) {
    displayMessageInSvg(e);
  } else {
    core.error(e.message);
  }
}

