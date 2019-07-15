var wasm = {}; // WebAssembly

// canvas
var canvas = document.getElementById("canvas");
if(!canvas || ! canvas.getContext){
	alert("error: canvasが使えません");
}else{
	console.log("[ok] canvas support");
}

// 描画系関数
function fill_back(){
	var context = canvas.getContext('2d');
	context.beginPath();
	context.fillStyle = 'black';
	context.fillRect(0, 0, canvas.width, canvas.height);
}

function draw_circle(x, y, r){
	var context = canvas.getContext('2d');
	context.beginPath();
	context.fillStyle = 'blue';
	context.arc(x, y, r, 0, Math.PI*2, false);
	context.fill();
}

// 関数をimportできるようにここでwasmを読み込む
const objs = {
	imports: {
		draw_circle: function(arg){
			console.log(arg);
		}
	}
}; // importよくわからん
load_wasm("wasm/nbody.wasm")
	.then(instance => {
		wasm = instance;
		var exports = instance.exports;
	});

// イベントハンドラ
function on_start(){
	console.log(wasm.exports.add(100,4));
}

fill_back(); // とりあえず塗りつぶしておく
draw_circle(100, 100, 50);
