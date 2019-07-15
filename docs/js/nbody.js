var canvas = document.getElementById("canvas");
if(!canvas || ! canvas.getContext){
	alert("error: canvasが使えません");
}
var context= canvas.getContext('2d');

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

fill_back(); // とりあえず塗りつぶしておく
