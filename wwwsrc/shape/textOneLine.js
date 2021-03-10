core.require(function () {

let item = dom.SvgElement.mk('<g/>');

item.width = 40;
item.height = 10;

item.text = 'Text';       
item["font-size"] = "12";
item["font-style"] = "normal";
item["font-family"] = "arial";
item["font-weight"] = "normal";
item.stroke = "black"; // turned into fill in the actual text. 
//item.lineSep = 2;

item.role = 'vertex';
item.resizable = true;
item.text = 'test';

let textProperties = 
         ["font-size",
         "font-style",
         "font-family",
         "font-weight"];

item.update = function () {
	 let singleLine = this.set('singleLine',dom.SvgElement.mk('<text stroke-width="0"  text-anchor="middle"/>'));
	 core.setProperties(singleLine,this,textProperties);
    singleLine.fill = this.stroke;
	  singleLine.show();
    singleLine.setText(this.text);
}

return item;
});

