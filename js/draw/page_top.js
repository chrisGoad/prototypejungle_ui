
let registerButton,signInButton,accountButton,mainUrl,installError,main,fileModified,swapMachine;

let shellDomain = 'http://127.0.0.1:3001/';


const setSignInOutButtons = function () {
  if (fb.account) {
    registerButton.style.display = "none";
    signInButton.style.display = "none";
    accountButton.style.display = "inline";
  } else {
    registerButton.style.display = "inline";
    signInButton.style.display = "inline";
    accountButton.style.display = "none";
  }
}

const signIn = function  () {
  if (fb.account) {
    setSignInOutButtons();
    return;
  }
  sessionStorage.setItem('preSigninUrl',location.href);
  fb.sendToShell('sign_in.html');
}


const register = function  () {
  if (fb.account) {
    setSignInOutButtons();
    return;
  }
  sessionStorage.setItem('preSigninUrl',location.href);
  fb.sendToShell("register.html");
}


const addButton =   function (container,id,text,url) {
  let rs;
  if (url) {
    rs = document.createElement('span');
    rs.className = "ubutton";
    rs.setAttribute('onclick','jumpTo("'+url+'")');
   //     rs.setAttribute('onclick','top.location.href = "'+shellDomain+url+'"');

  } else {
    rs = document.createElement('span');
    rs.className = "ubutton";
  }
  rs.innerHTML = text;
  container.appendChild(rs);
  return rs; 
}

const addSpan = function (container,texttext,padding) {
    let rs = document.createElement('span');
    rs.className = "topbarSpan";
    rs.style['padding-right'] = padding + 'px';
    rs.style['font-size'] = "16";
    rs.innerHTML = text;
    container.appendChild(rs);
    return rs; 
  }

const genSignInOutButtons = function (container,cb) {
  accountButton = addButton(container,'signOut','Account','account.html');
  registerButton = addButton(container,'register','Register');//,'https://protopedia.org/register.html');
  registerButton.addEventListener('click',register);
  signInButton = addButton(container,'signIn','Sign in');//,'https://protopedia.org/sign_in.html');
  signInButton.addEventListener('click',signIn);
  setSignInOutButtons(cb);  
}
let codeButton;

const genButtons = function (container) {
  let src = (source)?'?source='+source:'';
  addButton(container,'kits','Kits','doc/allKits.html');
  addButton(container,'tutorial','Tutorial','draw.html?intro=tutorial_index&source=(sys)/forMainPage/spiralLogo8.item&fit=0.4');
  if (ui.vars.whichPage === 'catalog_editor')  {
    addButton(container,'draw','Draw',topDomain+'draw.html');
    addButton(container,'codeEdit','View Source','code.html');
    addButton(container,'docs','Coding Guide','doc/code.html');
  } else if (ui.vars.whichPage === 'structure_editor')  {
    let src = loadUrl?loadUrl:source;
    let isJs = src && core.endsIn(src,'.js');
    codeButton = addButton(container,'codeEdit',isJs?'View Source':'Code Editor');
  /*  let moveUpButton = addButton(container,'moveUp','move up');
    moveUpButton.addEventListener('click',() => moveSelection(true));
    let moveDownButton = addButton(container,'moveDown','move down');
    moveDownButton.addEventListener('click',() => moveSelection(false));*/
    codeButton.addEventListener('click', () => {
      let dst = isJs?src:'';
      //if (!dst) {
        // takes care of going to the code of the item selected in the catalog
      if (catalogSelected) {
        let url = catalogSelected.url;
        if (url) {
          dst = url;
        } else {
          let roles = catalogSelected.roles;
          let urls = catalogSelected.urls;
          dst = urls[roles[0]];
        }
      }
   //   }
      let durl = 'code.html'+(dst?'?source='+dst:'');
      fb.sendToShell(durl);
     // top.location.href = durl;
    });

   //addButton(container,'codeEdit','Code Editor','/code.html?source'+dst);
   let textEditButton = addButton(container,'textEdit','Text Editor');
   textEditButton.addEventListener('click',() => {
     let ds = dataSource();
     let dst = fb.sendToShell('text.html'+((ds && ds!=='internal')?'?source='+ds:''));
     top.location.href = dst;
   });
   addButton(container,'docs','Coding Guide','doc/code.html');
  } else if (ui.vars.whichPage ===  'code_editor') {
    addButton(container,'draw','Draw','draw.html'+src);
    addButton(container,'dataEdit','Text Editor','text.html');
    addButton(container,'docs','Coding Guide','doc/code.html');
  } else if (ui.vars.whichPage ===  'text_editor') {
    if (!core.endsIn(src,'.js')) {
      src = '';
    }
    addButton(container,'draw','Draw','draw.html'+src);
    addButton(container,'codeEdit','Code Editor','code.html'+src);
    addButton(container,'docs','Coding Guide','doc/code.html');
 }
 // addButton(container,'github','GitHub ','https://github.com/chrisGoad/protopedia/tree/master');
  addButton(container,'about','About',"doc/about.html");
  genSignInOutButtons(container);
}

const standaloneInit = function () {
  let topbar = document.getElementById('topbarInner');
  genButtons(topbar);
}



