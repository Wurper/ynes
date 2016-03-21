(function () {
	'use strict';

	var nes,
		loadRom = function (filename) {
		var req = new XMLHttpRequest();
		req.open('GET', '/' + filename, true);
		req.responseType = 'arraybuffer';

		req.onload = function (e) {
			var arrayBuffer = this.response,
				dataView = new DataView(arrayBuffer);
			nes = new Nes(dataView);
			nes.parseHeader();
			nes.runInstructions();
		};
		req.send();
	};

	loadRom('rom.nes');

	
}());