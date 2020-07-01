
import * as core from "/js/core-1.1.0.min.js";

const zub = "JHtAs2VsGjYCqJmOo39SexGq2Fx1";
let config = {
    apiKey: "AIzaSyAKaFHViXlHy6Hm-aDeKa5S9Pnz87ZRpvA",
    authDomain: "prototypejungle.firebaseapp.com",
    databaseURL: "https://prototypejungle.firebaseio.com",
    projectId: "project-5150272850535855811",
    storageBucket: "project-5150272850535855811.appspot.com",
    messagingSenderId: "665687899275"
  };

 let dev_config = {
    apiKey: "AIzaSyA97dcoN5fPvEoK_7LAGZcJn-GHd3xPW9I",
    authDomain: "prototypejungle-dev.firebaseapp.com",
    databaseURL: "https://prototypejungle-dev.firebaseio.com",

    storageBucket: "prototypejungle-dev.appspot.com",
    messagingSenderId: "619200148716"

  };
  

const users = {}; //maps usernames to uids


// globals: currentUser is the firebase object representing the current user
// account is ve's account at the level of protopedia

let rootRef,storage,storageRef,account,currentUser,lastAction; 
  
const initFirebase = function (stripeInstalled) {
   firebase.initializeApp(config);
   if (stripeInstalled) {
     Stripe.setPublishableKey('pk_test_LahxOqVDjwJdSakNJeADTS1100upYC3j2L');
   }
   rootRef =  firebase.database().ref();
   storage = firebase.storage();
   storageRef = storage.ref();
}

/*
 * Structure: to the user, there is just one tree of objects. The underlying firebase structure is more complicated.
 * In the database <uid>/directory contains an entry for every element of the tree of whatever kind. For an item at <path>,
 * <uid>/diretory/<path> holds a 1, and in storage <uid>/<path> contains the corresponding data
 *
 */
let authStateListenerAdded = false;
const setCurrentUserOnly = function (cb) {
  if (currentUser) {
     if (cb) {
      cb();
     }
     return;
  }
  let  auth = firebase.auth();
  currentUser = auth.currentUser;
  if (!currentUser) {
   // if (!authStateListenerAdded) {
      //authStateListenerAdded = true;
      //auth.addAuthStateListener(function (newAuth) {
    //auth.onIdTokenChanged(function(user) {
    auth.onAuthStateChanged(function(user) {
      currentUser = user;
      if (cb) {
          cb();
      }
    });
    //,function (error) {
    //  debugger; //keep
   // });
    //return;
  } else {
    if (cb) {
      cb();
    }
  }
}

const setCurrentUser = function (cb) {
  setCurrentUserOnly(function () {
    if (currentUser) {
      getAccount(currentUser.uid,cb);
    } else {
      cb();
    }
  });
}
const removeUser = function () {
 if (currentUser) {
    let uid = encodeURIComponent(currentUser.uid);
    let userRef = rootRef.child(uid);
    userRef.remove();
 }
}

const currentUid = function ()  {
  return currentUser?currentUser.uid:undefined;
}

const currentUserName = function () {
  return account?account.userName:undefined;
}


const directoryRefString = function (iuid) {
  let uid = iuid?iuid:currentUid();
  return 'directory/' + uid;
}


const getDirectoryRef = function (uid) {
  return rootRef.child(directoryRefString(uid));
}


const accountRefString = function (iuid) {
  let uid = iuid?iuid:currentUid();
  return 'account/' +uid;
}



const accountRef = function (uid) {
  return rootRef.child(accountRefString(uid));
}


const usernameRefString = function (iuid) {
  let uid = iuid?iuid:currentUid();
  return 'username/' +uid;
}


const usernameRef = function (uid) {
  return rootRef.child(usernameRefString(uid));
}


const allAccountsRef = function () {
  return rootRef.child('account');
}


// visits maps page+day number (a crude measure of day: just time divided by milliseconds per day) to the number of visits that day

const visitsRef = function (page,day) {
  return rootRef.child('visits/'+page+'_'+day);
}



const inviteKeyToAccount = function (key,cb) {
  let aref = rootRef.child('account');
  aref.orderByChild('inviteKey').equalTo(key).once('value',function (snap) {
    let val = snap.val();
    cb(val);
  });
}

const checkBetaKey = function (uid,key,cb) {
  let ref = rootRef.child('betaKeys').child(uid);
  ref.once("value").then(function (snap) {
    if (!snap.exists()) {
      cb('noSuchUser');
    } else {
      let val = snap.val();
      cb(key === val );
    }
  });
}

// prop is current or max
const currentCount = function (cb) {
    let ref = rootRef.child('currentCount');
    ref.once("value").then(function (snap) {
      let val = snap.val();
      cb(val);
    });
}

// maxCount of users

const maxCount = function (cb) {
    let ref = rootRef.child('maxCount');
    ref.once("value").then(function (snap) {
      let val = snap.val();
      cb(val);
    });
}

const setCurrentCount = function (value,cb) {
   let ref = rootRef.child('currentCount');
   ref.set(value,cb);
}


const setMaxCount = function (value,cb) {
   let ref = rootRef.child('maxCount');
   ref.set(value,cb);
}



const userNameToAccount = function (userName,cb) {
  let aref = rootRef.child('account');
  aref.orderByChild('userName').equalTo(userName).once('value',function (snap) {
    let val = snap.val();
    cb(val);
  });
}

const userNameToUid = function (userName,cb) {
  let rs = users[userName];
  if (rs !== undefined) {
    cb(rs);
    return;
  }
  let uref = rootRef.child('username');
  uref.orderByChild('userName').equalTo(userName).once('value',function (snap) {
    let val = snap.val();
    if (val) {
      let pnames = Object.getOwnPropertyNames(val);
      let rs = pnames[0];
      users[userName] = rs;
      cb(rs);
    } else {
      cb(undefined);
    }
  });
}

const toUid = function (userName) { // for getting uids from the console 
  userNameToUid(userName,(uid) => console.log('UID: ',uid)); //keep
}

const usersRef = function () {
  return rootRef.child('users');
}





const storageRefString = function () {
  return currentUid();
}

const svgMetadata =  {
  contentType: 'image/svg+xml'
};


const textMetadata =  {
  contentType: 'text/plain'
};

const pngMetadata =  {
  contentType: 'image/png'
};


const jpegMetadata =  {
  contentType: 'image/jpeg'
};

const jsonMetadata =  {
  contentType: 'application/json'
};


const javascriptMetadata =  {
  contentType: 'application/javascript'
};


const txtMetadata =  {
  contentType: 'text/plain'
};

const userRef = function () {
  return rootRef.child(currentUid()); 
}

const dotCode = 'd73O18t';
const statsCode = 'vszf63q';

//  .'s are replaced by dotCode in the dataBase; this puts the dots back in
const putInDots  = function (src) {
  for (let k in src) {
    let v = src[k];
    if (typeof v === 'object') {
      let child = src[k];
      if (child) {
        putInDots(child);
      }
    } else if (k.indexOf(dotCode)>-1) {
      delete src[k];
      src[k.replace(dotCode,'.')] = v;
    }
  }
  return src;
}

let directory; // contains the current user's directory


const getDirectoryForUid = function (uid,cb) {
 if (!uid) {
    cb('noSuchUser',{});
    return;
 }
  let directoryRef = getDirectoryRef(uid);
  directoryRef.once("value").then(function (snapshot) {
    let rs = snapshot.val();
    if (rs === null) {
      cb(undefined,{});
      return;
    } else {
      let dir = putInDots(rs);
      if (!rs.exports) {
        rs.exports = {};
      }
      if (!rs.catalog) {
        rs.catalog = {};
      }
      cb(undefined,dir);
    }
  });
}

const getDirectoryForUsername = function (uname,cb) {
    userNameToUid(uname,(uid) => getDirectoryForUid(uid,cb));
}


const getDirectory = function (cb) {
  if (directory) {
    cb(undefined,directory);
    return;
  }
   if (!currentUser) {
    directory = {};//notSignedInDirectory;
    cb(undefined,directory);
    return;
  }
  getDirectoryForUid(currentUser.uid,(err,dir) => {directory = dir;cb(err,dir);}); // set the directory global
}



const getAccount = function (uid,cb) {
  if (account) {
    cb(undefined,account);
    return;
  }
   if (!currentUser  && !uid) {
    account = {};
    cb(undefined,account);
    return;
  }
  let accountR = accountRef(uid);
  accountR.once("value").then(function (snapshot) {
    let rs = snapshot.val();
    if (rs === null) {
      cb(undefined,undefined);
      return;
    } else {
      account = rs;
      lastAction = account.action;
      delete account.action;
    }
    cb(undefined,account);
  });
}



const getVisits = function (page,day,cb) {
  let visitsR = visitsRef(page,day);
  visitsR.once("value").then(function (snapshot) {
    let rs = snapshot.val();
    cb(undefined,rs);
  });
}

const millisecondsPerDay = 1000 * 24  * 3600;

const addVisit = function (page,cb) {
  let day = Math.floor((Date.now())/millisecondsPerDay);
  let visitsR = visitsRef(page,day);
  getVisits(page,day,function (err,vl) {
    let cnt = vl?vl+1:1;
    visitsR.set(cnt);
    if (cb) {
      cb(undefined,cnt);
    }
  });
}
      


const getRecentAccounts = function(n,cb) {
  let accountsR;
  if (n) {
    accountsR = allAccountsRef().orderByChild('creationTime').limitToLast(n);
  } else {
    accountsR = allAccountsRef().orderByChild('creationTime');
  }
  accountsR.once("value").then(function (snapshot) {
    let rs = snapshot.val();
    cb(undefined,rs);
  });
}




const deleteFromUiDirectory = function (path) {
  let splitPath = path.split('/');
  let cd = directory;
  if (!cd) {
    return;
  }
  let ln = splitPath.length;
  for (let i=1;i<ln-1;i++) {
    cd = cd[splitPath[i]];
    if (!cd) {
      return;
    }
  }
  delete cd[splitPath[ln-1]];
}



const ownerOfUrl = function (url) {
  let userName = currentUserName();
  if (!userName) {
    return false;
  }
  let decodedUrl = decodeUrl(url);
  return decodedUrl[0] === userName;
}

const handleTwiddle = function (url) {
  if (url && (url[0] === '~')) {
    let userName = currentUserName();
    if (userName) {
      return '('+userName+')'+ url.substring(1);
    }
  }
  return url;
}

const deleteFromDatabase =  function (url,cb) {
  let userName = currentUserName();
  if (!userName) {
    cb?cb('notSignedIn'):null;
    return;
  }
  let decodedUrl = decodeUrl(url);
  let [uid,path] = decodedUrl;
 
  if (uid !== userName) {
    cb?cb('permissionDenied'):null;
    return;
  }
  let dotPath = path.replace('.',dotCode);
  let deleteFromDirectory = function () {
    let fullPath = directoryRefString()+dotPath;
    let directoryRef = rootRef.child(fullPath);
    let removePromise = directoryRef.remove();
    removePromise.then(function () {
      deleteFromUiDirectory(path);
      cb?cb(undefined,'ok'):null;
    });
  }
   let  deleteFromStorage = function () {
    let fullPath = storageRefString()+path;
    let sRef = storageRef.child(fullPath);
    let deletePromise = sRef.delete();
    deletePromise.then(function () {
      deleteFromDirectory(path);
    }).catch(function () {
       core.error('firebase','delete from directory failed'); 
    });
  }
  deleteFromStorage();
  
}
  



const addToDirectory = function (parentPath,name,ival,icb) {
  if (!currentUser) {
    return;
  }
  let dRef = rootRef.child(directoryRefString()+parentPath);
  if (dRef) {
    let val = (typeof ival === 'object')?JSON.stringify(ival):ival;
    let ename =   name.replace('.',dotCode);
    let uv = {};
    //uv[name] = link;
    uv[ename] = val;
    let cb = icb?icb:() => {};
    dRef.update(uv,cb);
  }
}

/*
 *test 
fb.addToDirectory('catalog/global','foob.link','linkValue', function () { debugger;});//keep
*/
const pathExists = function (uid,path,cb) {
  let dotPath = path.replace('.',dotCode);
  let fullPath = directoryRefString(uid)+dotPath;
  let ref = rootRef.child(fullPath);
  ref.once("value").then(function (snap) {
    cb(snap.exists());
  });
}
  
 // this is only for checking urls in  storage (of the form (user)....)
const urlExists = function (url,cb) {
  let dc = decodeUrl(url);
  let uname = dc[0];
  if (!uname) {
    return false;
  }
  let path = dc[1];
  if (uname === currentUserName()) {
    pathExists(currentUser.uid,path,cb);
  } else {
    userNameToUid(uname,function (uid) {
      pathExists(uid,path,cb);
    });
  }
}


 

const saveAccountValues = function (values,cb) {
  if (!currentUser) {
    return;
  }
  let accountR = accountRef(currentUser.uid);
  let usernameR = usernameRef(currentUser.uid);
  let uname = values.userName;
  let uvls = {"userName":uname};
  const ucb = function () {
    usernameR.set(uvls,cb);
  }
  if (accountR) {
    //idRef = accountRef.child(id);
    accountR.update(values,ucb);
  }
}

const directoryValue = function (path,cb) {
  getDirectory(function (err,directory) {
      let rs = core.evalPath(path,directory);
      cb(null,rs);
    });
  
  }

const getFromStore = function (uid,path,cb) {
  let ref = rootRef.child(uid+path);
  ref.once("value",function (snapshot) {
    let rs = snapshot.val();
    cb(null,rs);
  });
}

  
const testStore = function () {
  let uid = encodeURIComponent(authData.uid);
  let directoryRef = new Firebase(firebaseHome+'/'+uid+'/directory');
  directoryRef.set({});
}

// decodes a pjUrl of the form (uid)/path
//if iurl has the form (uid)/whatever (a "pjUrl"), uid is taken from the path

const decodeUrl = function (iurl,uid) {
  let m= iurl.match(/\((.*)\)(.*)/);
  if (m) {
    return [m[1],m[2]];
  } else {
    return [uid,iurl];
  }
}

const uidOfUrl = function (url)  {
  let m= url.match(/\((.*)\)(.*)/);
  return m?m[1]:undefined;
}


const pathOfUrl = function (url) {
  let m= url.match(/\((.*)\)(.*)/);
  return m?m[2]:undefined;
}

// the url for the directory side of the db (/s/...)

const databaseDirectoryUrl = function (ipath) {
  let uid,path;
  let durl = decodeUrl(ipath);
  uid = durl[0];
  path = durl[1].replace('.',dotCode)
  return 'https://prototypejungle.firebaseio.com/directory/'+uid+path+'.json';
}


const webPrefix = '';

const storageUrls = {};


//vars.debuggingPJlocally = true; // 

  
const storageUrl = function (url,cb) {
  let uname,path,rs;
  if (!core.beginsWith(url,'(')) {
    cb(url);
    return;
  }
  let durl = decodeUrl(url);
  uname = durl[0];
 // uid = (uid==='sys')?'twitter:14822695':uid;
  path = durl[1];
  userNameToUid(uname,function (uid)  {
    rs = 'https://firebasestorage.googleapis.com/v0/b/project-5150272850535855811.appspot.com/o/'+
      encodeURIComponent(uid+path)+'?alt=media';
    storageUrls[rs] = url;
    cb(rs);
  });
}

const inverseStorageUrl = function (url) {
  let rs = storageUrls[url];
  return rs?rs:url;
}


core.vars.mapUrl = storageUrl; // used down in core/install.js
core.vars.inverseMapUrl = inverseStorageUrl; // used down in core/install.js


const filterDirectory = function (dir,filter) {
  let rs = {};
  let none = true;
  for (let name in dir) {
    let element = dir[name];
    if (typeof element === 'string')  {
      if (filter(name)) {
        rs[name] = "1";
        none = false;
      }
    } else {
      let fel = filterDirectory(element,filter);
      if (fel) {
        rs[name] = fel;
        none = false;
      }
    }
  }
  return none?undefined:rs;
}

const filterDirectoryByExtension = function (dir,ext) {
  return filterDirectory(dir,function (element) {
    return core.endsIn(element,ext);
  });
}

//let maxSaveLength = 5000000;//50000; // this should match the limit in the storage rules for firebase Now in core.vars.maxSaveLength

const removeToken = function (url) { // the token is not needed, because our bucket gives open read access
  let rs;
  let tokenP = url.indexOf('&token=');
  if (tokenP > -1) {
    rs = url.substring(0,tokenP);
  } else {
    rs = url;
  }
  return rs;
}


const computeStats = function () {
  let size = 0;
  let count = 0;
  let recurse = function (node,p) {
    if (typeof node === 'string') {
      if (node.indexOf('{') > -1) {
        let prs;
        try {
          let prs = JSON.parse(node);
          let nsize = prs.size;
          if (nsize) {
        //    console.log('p',p,'size',nsize);
            size = size + nsize;
          }
        } catch (e) {
          //debugger;
        }
       
      }
      count++;
    } else {
      for (let p in node) {
        recurse(node[p],p);
      }
    }
  }
  recurse(directory);
  return {size,count};
}

const saveString = function (path,str,metadata,note,cb) {
  if (!directory) { // for a brand new account
    directory = {};
  }
  let saveAccount = false;
  let size = str.length;
  if (size >= core.vars.maxSaveLength) {
    cb('maxSizeExceeded',size);
    return;
  }
  let dir = core.pathExceptLast(path);
  let fnm = core.pathLast(path);
  //let cval = core.evalPath(core.stripInitialSlash(path),directory);
  //let svg = core.endsIn(fnm,'.svg');
  let nm = fnm.replace('.',dotCode);
  let fullPath = storageRefString()+path;
  let myStorageRef = storageRef.child(fullPath);
  let directoryRef = rootRef.child(directoryRefString()+(dir?dir:''));//dir?directoryRef.child(dir):directoryRef;
  let updd = {};
  let time = String(Date.now());
 // let dirval = {time:time,size:size}
  let dirval = {time,size};

  if (note) {
    dirval.note = note;
  }
  let dirstr = JSON.stringify(dirval);
  let folder = dir?core.evalPath(core.stripInitialSlash(dir),directory):directory;
  if (!folder) {
   // new folder
    let parentDir = core.pathExceptLast(dir) ;
    let dnm = core.pathLast(path);
    let parentFolder = parentDir?core.evalPath(core.stripInitialSlash(parentDir),directory):directory;
    parentFolder[dnm] = folder = {};
  };
  folder[fnm] = dirstr;
  let stats;
  if (account.userName !== 'sys') {
    stats = computeStats();
     if (stats.size >= 5000000) {
      cb('maxAllocationExceeded',size);
      return;
    }
    account.size = stats.size;
    account.count = stats.count;
    account.lastSaveTime = time;
    saveAccount = true;
  }
  updd[nm] = dirstr;
  //updd[nm] = note?note:tm;//"1";
  let updateDirectory = function (rs) {
    directoryRef.update(updd,function (err) {
      if (err) {
        cb(err,rs);
      } else if (saveAccount) {
        saveAccountValues(account,cb);
      } else {
        cb(err,rs);
      }
    });
  }
  let blob = new Blob([str]);
  let uploadTask = myStorageRef.put(blob,metadata);
  uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,null,null,function() {
    uploadTask.snapshot.ref.getDownloadURL().then(
      function (url) {
        updateDirectory(url);
      });
        //v 4 let url = removeToken(uploadTask.snapshot.downloadURL);
        //updateDirectory(url);
  });
}

        
        

/*
const saveString = function (path,str,metadata,note,cb) {
  //debugger;
  let size = str.length;
  if (size >= maxSaveLength) {
    cb('maxSizeExceeded',size);
    return;
  }
  let spath = core.stripInitialSlash(path);
  //let path = core.stripInitialSlash(ipath);
  let dir = core.stripInitialSlash(core.pathExceptLast(path));
  let fnm = core.pathLast(path);
  let cval = core.evalPath(core.pathExceptLast(spath),directory);
   //let cval = core.evalPath(core.stripInitialSlash(path),directory);
  let cstats = core.evalPath( dir?dir+'/'+statsCode:statsCode,directory);\
  let cstat;
  if (cstats) {
    cstat = JSON.parse(cstats);
  }
  let userCategory = 0; // payment level (0 = free)
  if (!cstats) { 
    newStat = {count:1,totalSize:size,userLevel:0};
  } else {
    if (cval) { // replacement
      newStat = {count,cstat.count,totalSize:size - cstats.totalSize,userCategory}
    } else { //new
      newStat = {count:cstat.count+1,totalSize:size+cstat.totalSize,userCategory}
    }
  }
  let newStats = JSON.stringify(newStat);  
  //let svg = core.endsIn(fnm,'.svg');
  let nm = fnm.replace('.',dotCode);
  let fullPath = storageRefString()+path;
  let myStorageRef = storageRef.child(fullPath);
  //let directoryRef = rootRef.child(directoryRefString()+(dir?'/'+dir:'');//dir?directoryRef.child(dir):directoryRef;
  let updd = {};
  let time = String(Date.now());
 // let dirval = {time:time,size:size}
  let dirval = {time,size};
  if (note) {
    dirval.note = note;
  }
  let dirstr = JSON.stringify(dirval);
  let folder = dir?core.evalPath(core.stripInitialSlash(dir),directory):directory;
  folder[fnm] = dirstr; // update the in-state directory 
  directory[statsCode] = newStats;
  updd[statsCode] = newStats;
  updd[dir?dir+'/'+nm:nm] = dirstr;
  updd[nm] = dirstr; 
  let updateDirectory = function (rs) {
    rootRef.update(updd,function (err) {
      cb(err,rs);
    });
  }
  let blob = new Blob([str]);
  let uploadTask = myStorageRef.put(blob,metadata);
  uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,null,null,function() {
    uploadTask.snapshot.ref.getDownloadURL().then(
      function (url) {
        updateDirectory(url);
      });
        //v 4 let url = removeToken(uploadTask.snapshot.downloadURL);
        //updateDirectory(url);
  });
}
*/
const userVerified = function (iuser) {
  let user = iuser?iuser:currentUser;
  if (!user) {
    return false;
  }
  let providerKind =  user.providerData.providerId;
  return (providerKind !== 'password') || (user.emailVerified);
}


const sendToShell = function (msg) {
  let prnt = window.parent;
  prnt.postMessage(msg,'*');
}

  
export {initFirebase,setCurrentUser,currentUser,getDirectoryForUid,getDirectoryForUsername,lastAction,
        getDirectory,addToDirectory,currentUserName,handleTwiddle,deleteFromDatabase,computeStats,
        storageRefString,storageRef,rootRef,directoryRefString,uidOfUrl,sendToShell,
        pathOfUrl,dotCode,saveString,urlExists,directory,userNameToUid,toUid,
        account,getAccount,getRecentAccounts,filterDirectoryByExtension,ownerOfUrl,
        storageUrl,svgMetadata,jsonMetadata,addVisit,
javascriptMetadata,pngMetadata,jpegMetadata,textMetadata,userVerified}//,maxSaveLength}
  
  