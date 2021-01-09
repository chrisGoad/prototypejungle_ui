
var fs = require('fs');

  //var needsSignInScripts = {sign_in:1,account:0,index:1,svg:1};
   var noScripts = 1;//{account:1};
 
  
  
  
const endsIn = function (string,p) {
  return string.substr(string.length-p.length) === p;
}

  var xferFile = function(ipath,opath) {
    //var scripts = needsSignInScripts[fl]?signInScripts:minimalScripts;
//var ffl = fl+'.html';
  //  let fipath = '../prototypejungle_ui/'+ipath;
    //var vl = fs.readFileSync(ipath).toString();
    var vl = fs.readFileSync(ipath);
        console.log('read',ipath,'writing',opath);
  

     fs.writeFileSync(opath,vl);
  

  }
  

const afterLastChar = function (string,chr,strict) {
  let idx = string.lastIndexOf(chr);
  if (idx < 0) {
    return strict?undefined:string;
  }
  return string.substr(idx+1);
}



  
  var xferDir = function (idir,odir) {
		
     let files = fs.readdirSync(idir);
     files.forEach( function (fln) {
       let ext = afterLastChar(fln,'.');
       console.log('fln',fln,'ext',ext);
      if ((ext === fln) || (!['js','css','html','svg','jpg','ico','md'].includes(ext))) {
         console.log('wrong kind of file/dir',fln);
         return;
      }
      let fpath = idir + '/' + fln;
      var vl = fs.readFileSync(fpath).toString();
      console.log('read',fpath);
     
       fs.writeFileSync(odir+'/'+fln,vl);
      
     });
  }
  var xferFiles = function (idir,ifiles,odir) {
		let ln = ifiles.length;
		for (let i = 0;i<ln;i++) {
			let ifl = idir + '/' +ifiles[i];
			let ofl = odir + '/' +ifiles[i];
      xferFile(ifl,ofl);
		}
  }
	
	
	const xferTheFiles = function (files) {
		let idir = './www';
		let  odir = '../eutelic/public';
		xferFiles(idir,files,odir);
	}
	xferTheFiles(['grids.html','page.html']);
		
	
			return;
		
		