// supports the pages account.html and password.html
//globals
let accountValues = {};
let isNew = false;
let theCurrentCount;
let requireBetaKey = false;
let email;
let verified;

//let firstDest = "draw.html?load=/kit/familyTree.js&intro=familyTree";
let firstDest = "index.html";

const signOut = function () {
  if (currentUser) {
    let auth = firebase.auth();
    auth.signOut().then(function () {
      sendToShell("index.html");
    });
  }  else {
    sendToShell("index.html");
  }
}

const setFieldValue = function (field) {
  let input =  document.getElementById(field+'Input');
  let value = accountValues[field];
  if (value  !== undefined) {
    input.value = value;
  }
}

let newFields = ['userName'];//,'inviteKey'];

let fields = ['name','profile','email'];

/*
const toLink = function (url) {
  if (!url) {
    return '';
  }
  return (url.substr(0,4) === 'http')?'<a href="'+url+'">'+url+'</a>':url
}
*/
const checkUserString = function (string) {
  if ((string === undefined) || (!string.match)) { 
    core.error('Bad argument');
  }
  if (string==='') return false;
  return !!string.match(/^([a-z]|[A-Z])(?:\w)*$/)
}
const setMessage = function (msg) {
  document.getElementById('message').innerHTML = msg;
}

let checkedUserName;
const checkUserName = function (name,cb) {
  if (!checkUserString(name)) {
      setMessage('User names must be alphanumeric and start with a letter. No spaces.');
      cb(false);
  } else {
   // userNameToAccount(name,function (account) {// NEEDS Work
    userNameToUid(name,function (account) {// NEEDS Work
      if (account) {
        setMessage('That user name is taken. Please try another');
        cb(false);
      } else {
        checkedUserName = name;
        showElement('userName');
        document.getElementById('userNameSpan').innerHTML = name;
        hideElement('userNameNew');
        cb(true);
      }
    });
  }
}


let valuesOk;
const saveFieldValue = function (field) {
  let input =  document.getElementById(field+'Input');
  accountValues[field] = input.value;
  return true;
}

const checkCount = function (cb) {
  maxCount(function (max) {
    currentCount(function (current) {
     theCurrentCount = current;
      if (current+1 < max) {
        cb(current);
      } else {
        cb(false);
      }
    });
  });
}


let initialConfig  =
`{
    "catalogs":"sys/*,.exports/*,.catalog/*"
}`;

const saveInitialConfig = function (cb) {
  saveString('/config.json',initialConfig,jsonMetadata,undefined,cb);  
}
  
const saveAccount = function () {
  let ifOk = function (newCount) {
    let dst = userVerified()?firstDest:'passwordc.html?unverified=1';
    if (isNew) {
      setCurrentCount(newCount,function () {
        let date = new Date();
        accountValues.creationDate = date.toString();
        accountValues.creationTime = date.getTime();
        accountValues.userName = checkedUserName;
        if (email) {
          accountValues.email = email;
        }
        account = accountValues;
        saveAccountValues(accountValues,function () {
          saveInitialConfig(() => {
            sendToShell(dst);
          });
        });
      });
    } else {
      saveAccountValues(accountValues,function () {
         saveInitialConfig(() => { // just for chasing a bug
          sendToShell(firstDest);
         });
      });
    }
  }
  fields.forEach(saveFieldValue);
  if (isNew) {
    newFields.forEach(saveFieldValue);
    ifOk(theCurrentCount+1);
  } else {
    ifOk();
  }
}

const setHandler = function (id,fn) {
 let element = document.getElementById(id);
 if (element) {
   element.addEventListener('click',fn);
 }
}

const setEnterHandler = function (id,fn) {
  document.getElementById(id).addEventListener("keyup",fn);
}

const hideElement = function (id) {
  document.getElementById(id).style.display = 'none';
}


const showElement = function (id) {
  document.getElementById(id).style.display = 'block';
}


const showButton = function (id) {
  document.getElementById(id).style.display = 'inline';
}

const setHandlers = function (field) {
  setHandler('edit'+field,function (){editField(field)});
  setHandler('edit'+field+'Done',function (){editFieldDone(null,field)});
}


const checkAvailability = function () {
  let userName = document.getElementById('userNameInput').value;
  checkUserName(userName,function (available) { 
    if (available) {
      setMessage('Available!');
      showElement('optionalFields');
      if (email) {
         hideElement('emailInput');
         document.getElementById('email').innerHTML = email;
      }
      showButton('save');
    }
  });
}


const checkKeyInput = function () {
  let key = document.getElementById('keyInput').value;
  checkBetaKey(currentUser.uid,key,function (rs) {
    if (rs === 'noSuchUser') {
      setMessage('No key has yet been allocated for this user.');
      return;
    }
    if (rs) {
      setMessage('Correct key. Please choose a user name.');
      hideElement('checkKeyButton');
      showElement('userNameNew');
      showButton('checkAvailabilityButton');
    } else {
      setMessage('The key and user id did not match');
    }
  });
}

const writeStripe = function () {}
  
const pageReady = function () {
 /* document.open();
  document.write('<p> HELLO HELLO </p>');
  document.close();
  return;*/
  setCurrentUser(function () {
    if (!currentUser) {
      showElement('notSignedIn');
      return;
    }
   /* let stripeEl = document.getElementById('stripe');
    stripeEl.action = "https://us-central1-project-5150272850535855811.cloudfunctions.net/zub?uid="+
                       currentUser.uid;
    let stripeScript = document.getElementById('stripeScript');     
    stripeScript.setAttribute('data-amount',"7777");    */
    email = currentUser.email;
    verified = userVerified();//(!currentcurrentUser.emailVerified;
    setHandler('signOut',signOut);
    setHandler('cancel',function () {sendToShell(firstDest)});
    if (!verified) {
      showElement('notVerified');
      showButton('signOut');
      showButton('cancel');
      return;
    }
    setHandler('checkKeyButton',checkKeyInput);
    setHandler('checkAvailabilityButton',checkAvailability);
    setHandler('save',saveAccount);
    getAccount(currentUser.uid,function (erm,account) {
      if (!account) {
        showElement('newAccount');
        if (!requireBetaKey) {
          hideElement('checkKeyButton');
        }
  
        showButton('cancel');
        accountValues = {};
        isNew = true;
        checkCount(function (count) {
          if (count === false) {
             setMessage("The limit for number of accounts for the beta has been reached.  Send an email to  sys@prototypejungle.org, and we'll let you know when slots open up.");
             /*showElement('getKey');
             showElement('userId');
             showElement('userIdSpan');
              showElement('betaKey');
             showButton('checkKeyButton');
              document.getElementById('userIdSpan').innerHTML = currentUser.uid;*/
            hideElement('optionalFields');
             return;
          } else {
            //theCurrentCount = count;
            showElement('welcome');
            if (requireBetaKey) {
              showElement('getKey');
              showElement('userId');
              showElement('userIdSpan');
              showElement('betaKey');
              showElement('checkKeyButton');
              hideElement('optionalFields');
              document.getElementById('userIdSpan').innerHTML = currentUser.uid;
              hideElement('userNameNew');
            } else {
              showElement('userNameNew');
              showButton('checkAvailabilityButton');
            }
          }
        });
      } else {
        accountValues = account;
       
        //delete accountValues.actions;
          showElement('optionalFields');
          if (email) {
            hideElement('emailInput');
            let emailEl = document.getElementById('email');
            emailEl.style.display = 'inline-block';
            emailEl.innerHTML = email;
          }
          //showElement('userIdForLocal'); //temporary or only for local
           //  document.getElementById('userIdForLocal').innerHTML = currentUser.uid;

           showButton('save');
          showButton('signOut');
          showButton('cancel');

          document.getElementById('userNameSpan').innerHTML = accountValues.userName;
          fields.forEach(setFieldValue);
      }
    });    
  });
}

const passwordRegister = function () {
  let auth = firebase.auth();
  let email =  document.getElementById('emailInput').value;
  let password =  document.getElementById('passwordInput').value;
  let repeatPassword =  document.getElementById('repeatPassword').value;
  let msg = document.getElementById('message');
  if (password !== repeatPassword) {
    msg.innerHTML = 'Repeat password does not match';
    return;
  }
  auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(function () {
    auth.createUserWithEmailAndPassword(email, password).then(function(result) {
      let  user = auth.currentUser;
      user.sendEmailVerification().then(function() {
         msg.innerHTML = 'A verification email has been sent. After verification, you may <a href="/sign_in.html">sign in</a>.';
         return;
      }).catch(function(error) {
      });
    }).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode === 'auth/email-already-in-use') {
      msg.innerHTML = 'This email is already in use. Perhaps you meant to sign in rather than registering?';
      return;
    }
    msg.innerHTML = errorMessage;
   })
  });
}


const passwordSign_in = function () {
  let auth = firebase.auth();
  let email =  document.getElementById('emailInput').value;
  let password =  document.getElementById('passwordInput').value;
  let msg = document.getElementById('message');
  let reg = document.getElementById('toRegister');
  auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(function () {

    auth.signInWithEmailAndPassword(email, password).then(function(result) {
      let uid = result.user.uid;
      let verified = result.user.emailVerified;
      if (!verified) {
          msg.innerHTML = 'This email address has not yet been verified';
          return;
      }  
      getAccount(uid,function (err,account) {
        let lcl = window.location.host.substr(0,4) === '127.';
        let shellDomain = lcl?"http://127.0.0.1:3001/":"https://prototypejungle.org/";
        if (account) {
         /* if (!verified) {
            msg.innerHTML = 'This email address has not yet been verified';
            return;
          }*/
          location.href = shellDomain+firstDest;
          //sendToShell('index.html');
        } else {
          location.href = shellDomain+'account.html';

          // sendToShell('account.html');
        }
      });
    }).catch(function(error) {
      let errorCode = error.code;
      let errorMessage = error.message;
      msg.innerHTML = errorMessage;
      showElement('toRegister');
    });
  });
}



const checkAuth = function () {
  let auth = firebase.auth();
  let user = auth.currentUser;
  let email = user.email;
  let v = user.emailVerified;
}

const passwordPageReady = function () {
  setHandler('registerWithPassword',passwordRegister);
    setHandler('sign_in_WithPassword',passwordSign_in);
    let atDev = location.hostname === '127.0.0.1';
    let shellDomain = atDev?'http://127.0.0.1:3001':'https://prototypejungle.org';

      setHandler('cancel',() => {location.href = shellDomain;});
     // setHandler('cancel',() => {sendToShell('index.html')});
   // setHandler('checkAuth',checkAuth);

}
/*
const pageStart = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="description" content="An Open Repository of Prototype Structures for the Visual Domain">
<title>PrototypeJungle</title>
<link rel="stylesheet" type="text/css"  href="/style.css"/>
<link rel="stylesheet" type="text/css"  href="spectrum.css"/>
<link rel="icon" href="/images/favicon.ico?v18" />
</head>
<body style="background-color:white;font-size:14pt">
<div id="outerContainer">  
  <div id="topbar"> 
     <div id="topbarOuter" style="padding-bottom:0px"><a href="/"><span style="position:relative;top:-10px" class="mainTitle">ProtoPedia </span></a>
         <img style ="position:relative;border:none;top:0px;left:20px;" alt="images/logo_alt.html" src="/images/logo3.svg"  width="60" height="25"/>
         <div id = "topbarInner" style="position:relative;float:right;top:0px">
                     <a href="/draw.html?source=(sys)/forMainPage/spiralLogo6.item&intro=tutorial_index&fit=0.7" class="ubutton">Tutorial</a>
 <a href="/draw.html" class="ubutton">Draw</a> 
          <a href="/code.html" class="ubutton">Code Editor</a> 
            <a href="/text.html" class="ubutton">Text Editor</a> 
         <a href="/doc/code.html" class="ubutton">Coding Guide</a> 
          <a href="/doc/about.html" class="ubutton">About</a>
             <a id ="registerButton" style="display:none" href="/register.html" class="ubutton">Register</a>
            <a id ="signInButton" style="display:none" href="/sign_in.html" class="ubutton">Sign In</a>
           <a id="accountButton" style="display:none" href="/account.html" class="ubutton">Account</a>      
         </div> 
    </div>
  </div>
  <div id="innerContainer" style="margin-top:10px">
   
<script src="https://www.gstatic.com/firebasejs/5.8.2/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/5.8.2/firebase-auth.js"></script>
<script src="https://www.gstatic.com/firebasejs/5.8.2/firebase-database.js"></script>
<script src="https://www.gstatic.com/firebasejs/5.8.2/firebase-storage.js"></script>


<script src="https://js.stripe.com/v2/"></script>

<script type="module">
  import * as core from "/js/minimal-1.1.0.min.js";
  import * as fb from "/js/firebase_only-1.1.0.min.js";

Window.core = core;Window.fb=fb;
fb.initFirebase(true);

document.addEventListener('DOMContentLoaded',fb.stripePageReady);
</script>
`;

const endPage = `</div>
</div>
</body>
</html>
`;

const createStripForm = function () {
  let f = document.createElement("form");
  f.setAttribute('method',"POST");
  f.setAttribute('action',"https://us-central1-project-5150272850535855811.cloudfunctions.net/zub");
  let i = document.createElement('script');
  i.setAttribute('src','https://checkout.stripe.com/checkout.js');
  i.setAttribute('class','stripe-button');
  i.setAttribute('data-key',"pk_test_LahxOqVDjwJdSakNJeADTS1100upYC3j2L");
  i.setAttribute('data-amount',"777");
    i.setAttribute('data-name',"ProtoPedia");
    i.setAttribute('data-description',"Widget");
    i.setAttribute('data-image',"https://stripe.com/img/documentation/checkout/marketplace.png");
    i.setAttribute('data-locale',"auto");
  f.appendChild(i);  
  let stripeDiv = document.getElementById('stripe');
  stripeDiv.appendChild(f);
}
 /*
  
 const stripeForm = `<form  id = "stripe" action="https://us-central1-project-5150272850535855811.cloudfunctions.net/zub" method="POST">
  <script id = "stripeScript"
    src="https://checkout.stripe.com/checkout.js" class="stripe-button"
    data-key="pk_test_LahxOqVDjwJdSakNJeADTS1100upYC3j2L"
    data-amount="9991"
    data-name="ProtoPedia"
    data-description="Widget"
    data-image="https://stripe.com/img/documentation/checkout/marketplace.png"
    data-locale="auto">
  </script>
</form>
`;

const stripePageReady = () => {
  document.open();
  document.write(pageStart);
  document.write(stripeForm);
  document.write(endPage);
  document.close();
}
  */
  
const createStripeForm = function (amount) {
  let f = document.createElement("form");
  f.setAttribute('method',"POST");
  f.setAttribute('action',"https://us-central1-project-5150272850535855811.cloudfunctions.net/zub");
  let i = document.createElement('script');
  i.setAttribute('src','https://checkout.stripe.com/checkout.js');
  i.setAttribute('class','stripe-button');
  i.setAttribute('data-key',"pk_test_LahxOqVDjwJdSakNJeADTS1100upYC3j2L");
  i.setAttribute('data-amount',amount);
    i.setAttribute('data-name',"ProtoPedia");
    i.setAttribute('data-description',"Widget");
    i.setAttribute('data-image',"https://stripe.com/img/documentation/checkout/marketplace.png");
    i.setAttribute('data-locale',"auto");
  f.appendChild(i);  
  let stripeDiv = document.getElementById('stripe');
  stripeDiv.appendChild(f);
}


const donatePageReady = function () {
 /* document.open();
  document.write('<p> HELLO HELLO </p>');
  document.close();
  return;*/
  setCurrentUser(function () {
    
   /* let stripeEl = document.getElementById('stripe');
    stripeEl.action = "https://us-central1-project-5150272850535855811.cloudfunctions.net/zub?uid="+
                       currentUser.uid;
    let stripeScript = document.getElementById('stripeScript');     
    stripeScript.setAttribute('data-amount',"7777");    */
    getAccount(currentUser.uid,function (erm,account) {
      let okChecked,state,val;
      accountValues = account;
      let d5el = document.getElementById('d5');
      let d10el = document.getElementById('d10');
      let d20el = document.getElementById('d20');
      let other = document.getElementById('other');
      //setHandler('pay',() => {
      //  alert('pay');
      //);
      setHandler('ok',() => {
        if (!state) {
          //hideElement('pay');
          let  otherVal;
          if (d5el.checked) {
             state = 'd5';
             val = "500";
          } else if (d10el.checked) {
            state = 'd10';
            val = "1000";
            
          } else if (d20el.checked) {
            state = 'd20';
            val = "2000";
          } else {
            let oval = other.value;
            if (oval === '$') {
              alert('no value entered');
            } else {
              state = oval;
              val = oval;
            }
          }
        }
        if (state) {
           createStripeForm(val);
        }

      });
      const uncheck = (which) => {
        which.forEach((wh) => {
          let el = document.getElementById(wh);
          el.checked = false;
        });
      }
      setHandler('d5',() => {
        if (state) {
          d5el.checked = state === 'd5';
        } else {
          uncheck(['d10','d20']);
          other.value = '$';
        }
      });
      setHandler('d10',() => {
        uncheck(['d5','d20']);
        other.value = '$';
      });
      setHandler('d20',() => {
        uncheck(['d5','d10']);
        other.value = '$';
      });
      other.addEventListener('input',() => {
        uncheck(['d5','d10','d20']);

      });
      
    });  
  });   
}

export {pageReady,donatePageReady,passwordPageReady,checkCount,accountValues};
