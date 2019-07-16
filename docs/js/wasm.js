// 参考: https://gist.github.com/kripken/59c67556dc03bb6d57052fedef1e61ab

if(!('WebAssembly' in window)){
	alert("このブラウザではWebAssemblyがサポートされていません．");
}else{
	console.log("[ok] Webassembly support");
}

// wasmをロードする関数
function load_wasm(filename, imports){
	return fetch(filename)
		.then(responce => responce.arrayBuffer())
		.then(buffer => WebAssembly.compile(buffer))
		.then(module => {
			imports = imports || {};
			imports.env = imports.env || {};
			imports.env.print = arg => console.log(arg);
			imports.env.memoryBase = imports.env.memoryBase || 0;
			imports.env.tableBase  = imports.env.tableBase || 0;
			if(!imports.env.memory){
				imports.env.memory = new WebAssembly.Memory({
					initial:10,
					maximum:100
				});
			}
			if(!imports.env.table){
				imports.env.table = new WebAssembly.Table({
					initial: 0,
					element: 'anyfunc'
				});
			}
			console.log("memo: Chromeだと'WebAssembly.Instance is disallowed on the main thread'って出てかなしい．firefoxでは出ないのであっハイ");
			return new WebAssembly.Instance(module, imports);
		});
}

//load_wasm('wasm/main.wasm')
//	.then(instance => {
//		var exports = instance.exports;
//		console.log(exports.add(1,3));
//	});

/*
var wasm = {};

wasm.memory = new WebAssembly.Memory({
	initial:10,
	maximum:100
});

WebAssembly.instantiateStreaming(
	fetch("wasm/main.wasm"),
	{
		js: {
			mem: wasm.memory
		}
	}
).then(function(obj) {
	var i32 = new Uint32Array(wasm.memory.buffer);
	for(var i =0;i<10;i++){
		console.log(i32[i]);
	}
	wasm.instance = obj.instance;
});

// メモリ拡張(wasmページ単位)
wasm.memory.grow(1);
console.log(wasm);
console.log(wasm.memory);
console.log(wasm.instance);
*/
