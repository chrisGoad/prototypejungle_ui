

// The action facility is a way of associating a panel of actions with an item.  Some of the actions are "top level", and
// some are asscociated with descendants of the item. For example, the item might be a tree kit. A top level action
// might be turning the kit on its side. Each node might have an associated action "add descendant". Details:

// an item is topActive  if it has these properties:
// __actionPanelUrl
// __topActions: an object of the form {[id:id1,title:title1,action:action1}, id2:action2 ... idn:actionn
//If the element in the action panel with idk is clicked, actionK is called with one argument: the topActive item.
// otherIds : an array of ids of other elements in the action panel which respond to actions associated with descendants
// of the topActive item. The elements with these otherIds should be grayed or hidden unless the descendant in question is selected

// an item A is active if it is a descendant of a topActive item, and if it has the properties
// __action __actionTitle,__actionId.  When the ative item A is selected, the element in the actionPanel with __actionId is shown (or ungrayed)
// When that element is clicked,  item__action(id) is called.


// actions should be functions attached to the activeTop,and are designated by their names



const stdActionPanelButtonAction =  function () {
  if (ui.vars.copyMode) {
    ui.vars.copyMode = false;
    ui.unselect();
  }  
  enableButtons();
  actionPanelMessage.__element.innerHTML="No item selected";
  vars.actionPanelSelectCallback = function (itm) {
      actionPanelMessage.__element.innerHTML="Actions on selected item";
      setCustomActionPanelContents(itm);
  }
  setCustomActionPanelContents(ui.vars.selectedNode);
  actionPanelCommon.__element.style.display = "block";
  actionPanelCustom.__element.style.display = "block";
  actionPanelButton.__element.innerHTML = "";
};


let nowSelectingForActionPanel = false;

const resumeActionPanelAfterSelect = function () {
   nowSelectingForActionPanel = false;
  enableTopbarButtons();
  actionPanelCommon.__element.style.display = "block";
  actionPanelCustom.__element.style.display = "block";
  if (ui.vars.selectedNode) {
     actionPanelMessage.__element.innerHTML="Actions on selected item";
     actionPanelButton.__element.innerHTML = "";
  } else {
     actionPanelMessage.__element.innerHTML = "No item selected";
    
  }
  vars.actionPanelSelectCallback = function (itm) {
    actionPanelMessage.__element.innerHTML="Actions on selected item";
    setCustomActionPanelContents(itm);
  }
}

const redrawActionPanel = function (itm) {
  actionPanelMessage.__element.innerHTML="Actions on selected item";
  setCustomActionPanelContents(itm);
}
vars.actionPanelSelectCallback  = redrawActionPanel;

//ui.selectCallbacks.push(function (itm) {vars.actionPanelSelectCallback(itm)});
ui.selectCallbacks.push(vars.actionPanelSelectCallback);

const setActionPanelForSelect = function (msg,onSelect,buttonMsg,buttonAction) {
  actionPanelCommon.__element.style.display = "none";
  actionPanelCustom.__element.style.display = "none";
  actionPanelMessage.__element.innerHTML = msg;
  vars.actionPanelSelectCallback = onSelect;
  if (buttonMsg) {
    actionPanelButton.__element.innerHTML = buttonMsg;
    setClickFunction(actionPanelButton,buttonAction)
  } else {
    actionPanelButton.__element.innerHTML = '';
  }
  nowSelectingForActionPanel = true;
}

const setupActionPanelForCloning = function () {
  actionPanelCommon.__element.style.display = "none";
  actionPanelCustom.__element.style.display = "none";
  actionPanelMessage.__element.innerHTML = `Now copying`;
  actionPanelButton.__element.innerHTML = `Done copying`;
  setClickFunction(actionPanelButton,stdActionPanelButtonAction);
}

const resumeActionPanelAfterCloning = function () {
  actionPanelCommon.__element.style.display = "block";
  actionPanelCustom.__element.style.display = "block";
  actionPanelMessage.__element.innerHTML = "Actions on selected item";
  actionPanelButton.__element.innerHTML = ``;
}

const setActionPanelForPointSeries = function (item) {
    actionPanelMessage.__element.innerHTML="Click to add point. Press escape key to complete";  
   actionPanelCustom.__element.innerHTML = '';
}


const setCustomActionPanelContents = function (item) {
  let kit,actions;//el
  let mark = ui.actionSubject(item);
  actionPanelCustom.__element.innerHTML = '';
  const addAction = function (action,forTop,forKit=true) {
    let el,val,inputEl,actionF;
    if (kit) {
      actionF = kit[action.action];
    }
    if (!actionF) {
      actionF = item[action.action];
    }
    if (!actionF) {
      core.error('no such Action',action.action);
    }
    if (action.type === "numericInput") {
      let valueFN = action.value;
      if (valueFN && mark) {
        let valueF = kit[valueFN];
        val = valueF(mark);
      }
      el = html.Element.mk('<div>'+action.title+'</div>');
      actionPanelCustom.addChild(el);
      inputEl = html.Element.mk('<input type="text" value="123" size="10" style="font:8pt arial;background-color:#e7e7ee,wwidth:20px;margin-left:30px"/>');
      actionPanelCustom.addChild(inputEl);
      const handleInput = function () {
        if (forTop) {
          actionF.call(kit,kit,inputEl.$prop('value'));
        } else {
          actionF.call(kit,mark,inputEl.$prop('value'));
        }
      }
      inputEl.addEventListener("blur",handleInput);
      inputEl.addEventListener('keyup',function (e) {
        if((e.key === 13)||(e.keyCode === 13)) {
          handleInput();
        }
      });
      if (val !== undefined) {
        inputEl.$prop("value",val);

      }
      
    } else {
      el = html.Element.mk('<div class="colUbutton left">'+action.title+'</div>');
      actionPanelCustom.addChild(el);
      if (forKit) {
        setClickFunction(el,function () {
          actionF.call(kit,mark);
        });
      } else {
        setClickFunction(el,function () {
          actionF.call(mark);
        });
      }
    }
  }
  if (item) {
    kit = core.containingKit(item);
  }
  let markActions = (mark && (mark !== kit))?(mark.actions?mark.actions():[]):[];
  if (markActions) {
    markActions.forEach(function (action) {
      addAction(action,false,false);
    });
  }
  if (kit) {
    let topActions = kit.topActions;
    if (topActions) {
      topActions.forEach(function (action) {
        addAction(action,true);
      });
    }
    actions = kit.actions?kit.actions(mark):[];
    if (actions) {
      actions.forEach(function (action) {
        addAction(action);
      });
    }
  }
  
}

 
export {setActionPanelForSelect,resumeActionPanelAfterSelect,redrawActionPanel};
