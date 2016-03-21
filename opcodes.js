var Opcodes = (function () {
	'use strict';

	var Opcodes = {
		0x78: {
			name: 'SEI',
			bytes: 1,
			cycles: 2,
			func: function (cpu) {
				console.log(cpu);
				cpu.registers.p.flags.interruptInhibit = true;
			}
		},
		0xd8: {
			name: 'CLD',
			bytes: 1,
			cycles: 2,
			func: function (cpu) {
				cpu.registers.p.flags.decimal = false;
			}
		},
		0xa9: {
			name: 'LDA',
			bytes: 2,
			cycles: 2,
			func: function (cpu, byte1) {
				var reg = cpu.registers;
				reg.acc = byte1;
				reg.p.zero = (reg.acc === 0);
				reg.p.negative = (reg.acc & (1 << 7)) !== 0;
			}
		}
	};

	return Opcodes;
}());