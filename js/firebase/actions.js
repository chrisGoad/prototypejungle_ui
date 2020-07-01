/* Actions: (initial application: stripe processing) 
theory of operation: code run on behalf of the user creates an action in the JSON object 
uid/action. 

 Only the user has read or write access, 
but modification of action is watched by functions. So no one can create an action except the user. Functions watch and interpret 
creation of actions, and record what is going on in the sys part of the db. In particular, the actions are kept under actions/uid/


*/



const actionRefString = function (iuid) {
  let uid = iuid?iuid:currentUid();
  return 'account/' +uid + '/action';
}


const actionRef = function (uid) {
  return rootRef.child(actionRefString(uid));
}

const getAction = function () {
  return new Promise(
    function (resolve,reject) {
      if (lastAction) {
        resolve(lastAction);
        return;
      }
      if (!currentUser) {
        reject('noCurrentUser');
        return;
      }
      let actionR = actionRef();
      actionR.once("value").then(function (snapshot) {
        let rs = snapshot.val();
        if (rs === null) {
          resolve(null);
          return;
        } else {
          lastAction = rs;
          resolve(rs);
        }
    });
  });
}

// for debugging, it is convenient to have a non-promise version, since the debugger handles promises strangely
const setActionF = function (act) {
  if (!currentUser) {
    return;
  }
  let tm = Date.now();
  let tact = tm+';'+act;
  let accountR = accountRef();
  let upd = {action:tact};
  accountR.update(upd).then(function () {
    lastAction = tact;
  });
}
  
const setAction = function (act) {
  return new Promise(
    function (resolve,reject) {
      if (!currentUser) {
        reject('noCurrentUser');
        return;
      }
      let tm = Date.now();
      let tact = tm+';'+act;
      let accountR = accountRef();
      let upd = {action:tact};
      console.log('aa',accountR.update);
      accountR.update(upd).then(function () {
        lastAction = tact;
        resolve(tact);
    });
  });
}

export {getAction,setAction,setActionF}
