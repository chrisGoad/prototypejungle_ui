core.require(function () {
	alert(99);
	debugger;
	core.httpPost('/gen0/foob','zub',function (rs) { 
	   alert(98);
		 debugger;
	});
});
