


/* data might be internal, or external. In the former case, core.root.main.__dataText will be defined, and core.root.main.__sourceUrl will not.
 * In the latter case this is reversed. */

const findDataContainer = function () {
  if (core.root.main && core.root.main.data) {
     return core.root.main;
  }
  let rs;
  let multiple = false;
  core.forEachTreeProperty(core.root,function (node) {
    if (node.data  || node.__internalData  || node.__internalDataString) {
      if (rs) {
        multiple = true;
      } else {
        rs = node;
      }
    }
  });
  if (multiple && ui.vars.selectedNode) {
    return core.containingData(ui.vars.selectedNode);
  }
  return multiple?undefined:rs; // in future, pay attention to the selected node in this case
}


const dataSource = function (dataContainer) {  
  let d = dataContainer?dataContainer:findDataContainer();
  if (d) {
    if (d.__internalDataString) {
      return "internal";
    }
    if (d.data) {
     return d.data.__sourceUrl;
    }
  }
}


const loadDataFromEditor = function () {
  let code = editorValue();
  let rs;
  let d = findDataContainer();
  if (d.__internalDataString) {
    core.setDataString(d,code);
  } else {
    let ds = d.data.__sourceUrl;
    try {
      rs = core.lift(JSON.parse(code));
    } catch (e) {
     svgMessageDiv.$hide();
     let emsg = '<p style="font-weight:bold">'+e.message+'</p>';
      core.displayError(emsg);
      return;
    }
    d.set('data',rs);
    rs.__sourceUrl  = ds;
  }
}


let dataModified = false;
let beenRun = true; // has there been a run since the data changed?
let editor;
let editorInitialized;
let initializingEditorContents = false; // the setting of the initial value of the editor should not be regarded as a change

const initEditor =    function () {
  if (!editorInitialized) {
    editor = editor = ace.edit("dataDiv");
    editor.setTheme("ace/theme/textmate");
    editor.getSession().setMode("ace/mode/javascript");
    editor.renderer.setOption('showLineNumbers',false);
    editor.renderer.setOption('showFoldWidgets',false);
    editor.renderer.setOption('showGutter',false);
    editorInitialized = 1;
    editor.on('change',function () {
    if (initializingEditorContents) {
      return;
    }
    dataModified = true;
    beenRun = false;
    setDataMessage(dataSource());
  })
  }
}


const editorValue = function () {
  return editor.session.getDocument().getValue()
}

const setDataMessage = function (url) {
  let msg = url +  (dataModified?'*':'');
  dataMessage.$html(msg);
}

const setDataSource = function (url) {
  let d = findDataContainer();
  if (url === 'internal') {
    setDataMessage(url);
    return;
  }
  if (d) {
    if (!d.data) {
      core.error('unexpected no d.data')
      return;
    }
    d.data.__sourceUrl = url;
    d.__internalDataString = null;
    d.__internalData = undefined;
    setDataMessage(url);
  }
}

const enableDataButtons = function (url) {
  let owner = url?fb.uidOfUrl(url):undefined;
  let owned = userName && (userName === owner);
  enableButton1(saveDataBut,owned);
  enableButton1(saveDataAsBut,url && userName);
  enableButton(openDataInTextEditorBut);
}
  

const popData = function () { 
  let d = findDataContainer();
  let url = dataSource(d); 
  initEditor();
  panelMode = 'data';
  layout();
  dataContainer.$show();
  if (url) {
    setDataMessage(url);
  }
  if (!url)  {
    return;
  }
  let code = (url === 'internal')?d.__internalDataString:core.loadedScripts[url];
  initializingEditorContents = true;
  editor.setValue(code);
  initializingEditorContents = false;
  editor.clearSelection();
  editor.scrollToLine(0);
  dataModified = false;
  beenRun = true;
  enableDataButtons(url);
  enableButtons();
}


const changeDataSource = function (url) {
  core.httpGetForInstall(url,function (err,rs) {
    editor.setValue(rs);
    core.loadedScripts[url] = rs;
    let parsedData = checkJSON(JSONMessage);
    if (!parsedData) {
      return;
    }
    dataModified = false;
    let d = findDataContainer();
    if (!d) {  
      return;
    }
    let data = core.lift(parsedData);
    data.__sourceUrl = url;
    d.set('data',data);
    d.__internalDataString = undefined;
    d.__internalData = undefined;
    setDataSource(url);
    setSaved(false);
    uiAlert("Don't forget to save the item");
    beenRun = false;
    rebuildFromData();
    enableDataButtons(url);
  });
}
  
const changeDataSourceClick = function () {
   let  filtered = fb.filterDirectoryByExtension(directory,'.json');
   popChooser(filtered,'dataSource');
}

let catchInRunSource = true;

const rebuildFromData = function () {
  if (!checkJSON(JSONMessage)) {
    return;
  }
  let d = findDataContainer();
  let ds = dataSource(d);
  loadDataFromEditor();
  let data = core.getData(d);
  if (d.buildFromData) {
    d.buildFromData(data);
  } else {
    graph.buildFromData(d,data);
  }
  dom.fullUpdate();
  dom.svgMain.fitContents(fitFactor);
  beenRun = true;
  if (ds !== 'internal') {
    d.data.__sourceUrl = ds;
  }
  ui.unselect();
  panelMode = 'data';
  layout();
  dataContainer.$show();
}


export {dataSource,findDataContainer};


  
