load_wasm("wasm/test.wasm")
	.then(instance => {
		var exports = instance.exports;
		alert(exports.add(1, 5));
	});
