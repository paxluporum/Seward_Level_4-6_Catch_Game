//----------------------------------------------------------Falling Objects Game------------------------------------------------
//---------------------Blue squares = catch (+1 score, green flash)   |   Red circles = dodge (reset score to 0, red flash)   |   Yellow square = player-------------------------

var canvas;
var context;
var timer;
var interval;
var player;

	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");	
	
	// === PLAYER ===
	player = new GameObject({
		width: 50, 
		height: 50, 
		x: canvas.width / 2, 
		y: canvas.height - 50,   
		color: "#ffff00"
	});
	
	var playerSpeed = 9;
	var friction = 0.82;

	// === SCORE SYSTEM ===
	var score = 0;

	// Reset player color after flash
	function resetPlayerColor()
	{
		player.color = "#ffff00";
	}

	// === ARRAY 1: BLUE SQUARES ===
	var amountSquares = 5;
	var squares = [];
	var squareColors = ["#00aaff", "#0088ff", "#00ccff", "#3399ff"];
	
	for(var i = 0; i < amountSquares; i++)
	{
		squares[i] = new GameObject({width: 30, height: 30});
		var randomColor = Math.floor(Math.random() * squareColors.length);
		squares[i].color = squareColors[randomColor];
		squares[i].x = Math.random() * canvas.width;
		squares[i].y = -50 - Math.random() * 400;
		squares[i].vy = Math.random() * 5 + 3;
	}

	// === ARRAY 2: RED CIRCLES ===
	var amountCircles = 5;
	var circles = [];
	var circleColors = ["#ff2222", "#ff4444", "#ff6666", "#ff0000"];
	
	for(var i = 0; i < amountCircles; i++)
	{
		circles[i] = new GameObject({width: 28, height: 28});
		var randomColor = Math.floor(Math.random() * circleColors.length);
		circles[i].color = circleColors[randomColor];
		circles[i].x = Math.random() * canvas.width;
		circles[i].y = -50 - Math.random() * 400;
		circles[i].vy = Math.random() * 6 + 4;
	}
	
	interval = 1000/60;
	timer = setInterval(animate, interval);

function animate()
{	
	context.clearRect(0, 0, canvas.width, canvas.height);	
	
	// ====================== BLUE SQUARES ======================
	for(var p = 0; p < squares.length; p++)
	{	
		squares[p].y += squares[p].vy;
		
		if (player.hitTestObject(squares[p]))
		{
			player.color = "#00ff00";
			setTimeout(resetPlayerColor, 500);
			
			score++;
			squares[p].y = -50 - Math.random() * 400;
			squares[p].x = Math.random() * canvas.width;
			squares[p].vy = Math.random() * 5 + 3;
		}
		
		if (squares[p].y > canvas.height)
		{
			squares[p].y = 0 - squares[p].height;
			squares[p].vy = Math.random() * 5 + 3;
			var randomColor = Math.floor(Math.random() * squareColors.length);
			squares[p].color = squareColors[randomColor];
			squares[p].x = Math.random() * canvas.width;
		}
		
		squares[p].drawRect();
	}
	
	// ====================== RED CIRCLES ======================
	for(var p = 0; p < circles.length; p++)
	{	
		circles[p].y += circles[p].vy;
		
		if (player.hitTestObject(circles[p]))
		{
			player.color = "#ff0000";
			setTimeout(resetPlayerColor, 500); 
			
			score = 0;
			circles[p].y = -50 - Math.random() * 400;
			circles[p].x = Math.random() * canvas.width;
			circles[p].vy = Math.random() * 6 + 4;
		}
		
		if (circles[p].y > canvas.height)
		{
			circles[p].y = 0 - circles[p].height;
			circles[p].vy = Math.random() * 6 + 4;
			var randomColor = Math.floor(Math.random() * circleColors.length);
			circles[p].color = circleColors[randomColor];
			circles[p].x = Math.random() * canvas.width;
		}
		
		circles[p].drawCircle();
	}

	// ====================== PLAYER MOVEMENT ======================
	if (a) player.vx = -playerSpeed;
	if (d) player.vx = playerSpeed;
	
	player.vx *= friction;
	player.move();
	
	if (player.x - player.width/2 < 0) { player.x = player.width/2; player.vx = 0; }
	if (player.x + player.width/2 > canvas.width) { player.x = canvas.width - player.width/2; player.vx = 0; }
	
	player.drawRect();

	// ====================== DRAW SCORE ======================
	context.save();
		context.fillStyle = "black";
		context.font = "bold 30px Arial";
		context.fillText("Score: " + score, 20, 40);
	context.restore();
}