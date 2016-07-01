var originalStem = app.activeDocument.activeLayer;
//var stemsAmount = prompt('How many stems do you need?',12,'Processing'+originalStem.name)
var stemsAmount = prompt('Processing\"'+originalStem.name+'\"\nHow many stems do you need?(from 2 to 100)', 12 );
while(isNaN(stemsAmount) || stemsAmount <=0 || stemsAmount > 100) {
	alert('Please enter number in range from 2 to 100');
	stemsAmount = prompt('Processing\"'+originalStem.name+'\"\nHow many stems do you need?(from 2 to 100)', 12 );
}
if(stemsAmount != null) {
	var angle = 360 / stemsAmount;
	var stemsGroup = app.activeDocument.layerSets.add();
	stemsGroup.name = originalStem.name + ' ('+stemsAmount+' stems)';
	originalStem.move(stemsGroup, ElementPlacement.INSIDE);
	for(var i = 1; i < stemsAmount; i++) {
		var newStem = originalStem.duplicate();
		newStem.rotate(angle * i, AnchorPosition.BOTTOMCENTER);
		newStem.name = originalStem.name + " " + (i+1);
		newStem.move(stemsGroup, ElementPlacement.PLACEATEND);
	}
	originalStem.name += ' 1';
}

