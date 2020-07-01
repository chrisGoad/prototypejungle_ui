
let errorMark = '|>>>>>|';

const placeErrorMark = function (str,pos) {
   let s0 = str.substring(0,pos);
   let s1 = str.substring(pos);
   return s0 + errorMark + s1;
}

const removeErrorMark = function (istr) {
  let str;
  if (istr) {
    str = istr;
  } else {
    str = editorValue();
  }
  let pos = str.indexOf(errorMark);
  let rs;
  if (pos>=0) {
     rs = str.substring(0,pos) + str.substring(pos+errorMark.length);
  } else {
    rs = str;
  }
  if (istr) {
    return rs;
  } else {
    if (rs!==str) {
      editor.setValue(rs);
      editor.clearSelection();
    }
  }
}


const numberAtEnd = function (str) {
  let ln = str.length;
  let i = ln-1;
  let rs = '';
  while (true) {
    let cc = str.charCodeAt(i);
    if ((cc >= 48) && (cc <= 57)) { //a digit
      rs = str[i--] + rs;
    } else {
      return Number(rs);
    }
  }
}
    
  
  
const checkJSON = function (msgEl,displayLegalMsg) {
  let data = removeErrorMark(editorValue());
  let pr;
  try {
    pr = JSON.parse(data);
  } catch (e) {
    let msg = e.message;
    let pos = numberAtEnd(msg);
    let erm = placeErrorMark(data,pos);
    editor.setValue(erm);
    editor.clearSelection();
    ui.displayError(msgEl,'Bad JSON: '+e.message+', marked by '+errorMark);
    return false;
  }
  if (displayLegalMsg) {
    ui.displayTemporaryError(msgEl,'Legal JSON');
  } else {
    ui.displayMessage(msgEl,'');
  }
  return pr;
}
