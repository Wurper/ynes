var Nes = (function () {
	'use strict';
	var Nes = function (rom) {
		var interconnect = new Interconnect(rom);
		this.rom = rom;
		this.cpu = new Cpu(interconnect);
		this.header = {};
	};

	Nes.prototype.runInstructions = function () {
		for (var i = 0; i < 10; i+= 1) {
			this.cpu.runInstruction();
		}
	};

	Nes.prototype.parseHeader = function () {
		var r = this.rom,
			header = {},
			byte;
		if (r.getUint32(0, false) !== 0x4e45531a) {
			console.error('Error: Not a iNES rom');
		}
		header.noOf16kPrgRomPageCount = r.getUint8(4);
		header.noOf8kChrRomPageCount = r.getUint8(5);

		byte = r.getUint8(6);
		header.romControlByte1 = {
			horizontalMirroring: 	byte & (1 << 0) === 0,
			verticalMirroring: 		byte & (1 << 0) === 1,
			battery: 				byte & (1 << 1) === 1,
			trainer: 				byte & (1 << 2) === 1,
			fourScreenVram: 		byte & (1 << 3) === 1
		};
		header.mapperLowerNibble = byte >> 4;

		byte = r.getUint8(7);
		header.romControlByte2 = {
			vsUnisystem: 	byte & (1 << 0) === 1,
			playChoice10: 	byte & (1 << 1) === 1,
			nesV2: 			byte & (2 << 2) === 1
		};
		header.mapperUpperNibble = byte >> 4;

		this.header = header;

		if (!header.romControlByte1.trainer) {
			this.cpu.registers.pc = 0x10;
		}

		console.log(header);
	};

	return Nes;
}());