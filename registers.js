var Registers = (function () {
	'use strict';
	var Registers = function () {
		this.acc = 0; // 1 Byte, accumulator
		this.x = 0; // 1 Byte, index
		this.y = 0; // 1 Byte, index
		this.pc = 0; // 2 Byte, program counter
		this.sp = 0; // 1 Byte, stack pointer

		// 1 Byte, status reg
		this.p = {
			flags: {
				carry: false,
				zero: false,
				interruptInhibit: false,
				decimal: false,
				overflow: false,
				negative: false
			},
			parseFlags: function (byte) {
				console.log(this.flags);
				this.flags.carry = 				byte & (1 << 0) === 1;
				this.flags.zero = 				byte & (1 << 1) === 1;
				this.flags.interruptInhibit = 	byte & (1 << 2) === 1;
				this.flags.decimal = 			byte & (1 << 3) === 1;
				// TODO: b flag
				//this.flags. = 				byte & (1 << 4) === 1;
				//this.flags. = 				byte & (1 << 5) === 1;
				this.flags.overflow =			byte & (1 << 6) === 1;
				this.flags.negative =			byte & (1 << 7) === 1;
			}
		};

		this.print = function () {
			console.log('acc: ' + this.acc, 'x: ' + this.x, 'y: ' + this.y, 'pc: ' + this.pc, 'sp: ' + this.sp);
			console.table(this.p);
		};
	};
	return Registers;
}());