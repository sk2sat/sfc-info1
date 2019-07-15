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

function draw(){
	fill_back();
	wasm.exports.update();
	draw_circle(wasm.exports.get_x(0), wasm.exports.get_y(0), 10);
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
	wasm.exports.add_particle(1, 1);
	setInterval(draw, 1);
}

fill_back(); // とりあえず塗りつぶしておく
draw_circle(100, 100, 50);
