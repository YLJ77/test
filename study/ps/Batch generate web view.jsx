var outputFolder = Folder.selectDialog('选择输出的文件夹'),
	layers = app.activeDocument.layers,
	doc = app.activeDocuemnt,
	option = new ExportOptionsSaveForWeb();

option.transparency = true;
option.colors = 256;
option.format = SaveDocumentType.COMPUSERVEGIF;

for(var i=0; i<layers.length; i++) {
	alert(layers[i].copy)
	var layer = app.activeDocument.layers[i].copy(),
		bounds = layer.boundsNoEffects,
		width = bounds[2] - bounds[0],
		height = bounds[3] - bounds[1];

	app.document.add(width, height,72,'myDocument',NewDocumentMode.RGB,DocumentFill.TRANSPARENT);
	app.activeDocument.paste();
	var file = new File(outputFolder + '/Output' + i + '.gif');
	app.activeDocument.exportDocument(file,ExportType.SAVEFORWEB,option);
	app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
	app.activeDocument = doc;
}

doc.close(SavOptions.DONOTSAVECHANGES);