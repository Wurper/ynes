var Cpu = (function () {
	'use strict';

	var Cpu = function (interconnect) {
		this.interconnect = interconnect;
		this.registers = new Registers();
	};

	Cpu.prototype.runInstruction = function () {
		var opcodeByte = this.interconnect.readByte(this.registers.pc),
			opcode = Opcodes[opcodeByte];

		if(opcode === undefined) {
			throw new Error('Unknown opcode byte:' + '0x' + opcodeByte.toString(16));
		}
		console.log(opcode);

		switch (opcode.bytes) {
			case 1:
				opcode.func(this);
				break;
			case 2:
				opcode.func(this, this.interconnect.readByte(this.registers.pc + 1));
				break;
			default:
				throw new Error('Unhandled amount of bytes: ' + opcode.bytes);	
		}
		this.registers.print();
		this.registers.pc += opcode.bytes;
	};

	return Cpu;
}());