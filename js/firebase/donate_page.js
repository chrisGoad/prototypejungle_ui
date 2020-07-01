// supports the pages account.html and password.html
//globals


//const writeStripe = function () {}
  
const donatePageReady = function () {
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
    getAccount(currentUser.uid,function (erm,account) {
      if (!account) {
        showElement('newAccount');
      } else {
        createStripeForm();
        accountValues = account;
        debugger;
      }
    });    
  });
}

/*
const pageStart = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="description" content="An Open Repository of Prototype Structures for the Visual Domain">
<title>ProtoPedia</title>
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
debugger;
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
  debugger;
  document.open();
  document.write(pageStart);
  document.write(stripeForm);
  document.write(endPage);
  document.close();
}
  */
  
const createStripeForm = function () {
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

export {pageReady,passwordPageReady,checkCount};
