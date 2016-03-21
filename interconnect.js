var Interconnect = (function () {
	'use strict';
	var Interconnect = function (rom) {
		this.rom = rom;
		this.ram = new DataView(new ArrayBuffer(0xffff));
	};

	Interconnect.prototype.readByte = function (offset) {
		return this.rom.getUint8(offset);
	};

	Interconnect.prototype.readAddress(address) {

	};

	Interconnect.prototype.writeAddress(address, value) {
		this.ram.setUint16(address, value);
	};

	return Interconnect;
}());