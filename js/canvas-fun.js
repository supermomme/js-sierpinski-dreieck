
var canvas = document.getElementById("screen")
var ctx = canvas.getContext("2d")

//settings
var backgroundColor = "#202020"

//space for global variables. You may need some :)
//@TODO: add some variables
let depth = 0


const outerTriangle = (size = 100, center = { x: 0, y: 0 }) => {
	const p1 = { // top
		x: center.x,
		y: center.y - size/2
	}
	const p2 = { // bottom right
		x: center.x + size/2,
		y: center.y + size/2
	}
	const p3 = { // bottom left
		x: center.x - size/2,
		y: center.y + size/2
	}
	ctx.beginPath()
	ctx.fillStyle = '#000'
	ctx.moveTo(p1.x, p1.y)
	ctx.lineTo(p2.x, p2.y)
	ctx.lineTo(p3.x, p3.y)
	ctx.lineTo(p1.x, p1.y)
	ctx.fill()

	return {
		size: size/2,
		center: {
			x: center.x,
			y: center.y + size/4
		}
	}
}

const triangle = (size = 100, center = { x: 0, y: 0 }, depth = 7) => {
	if (depth <= 0) return
	depth--

	const p1 = { // upper left
		x: center.x - size/2,
		y: center.y - size/2
	}
	const p2 = { // upper right
		x: center.x + size/2,
		y: center.y - size/2
	}
	const p3 = { // bottom
		x: center.x,
		y: center.y + size/2
	}
	ctx.beginPath()
	ctx.fillStyle = `#FFF`
	// ctx.fillStyle = `hsl(${Math.random()*360}, 100%, 50%)`
	ctx.moveTo(p1.x, p1.y)
	ctx.lineTo(p2.x, p2.y)
	ctx.lineTo(p3.x, p3.y)
	ctx.lineTo(p1.x, p1.y)
	ctx.fill()

	// top
	triangle(size/2, {
		x: center.x,
		y: center.y-size * (3/4)
	}, depth)

	// left
	triangle(size/2, {
		x: center.x - size * (2/4),
		y: center.y + size * (1/4)
	}, depth)

	// right
	triangle(size/2, {
		x: center.x + size * (2/4),
		y: center.y + size * (1/4)
	}, depth)
}

//implement your drawing here.
function draw() {
	//@TODO: implement your drawing here
	ctx.translate(canvas.width/2, canvas.height/2)

	// outer triangle
	const { size, center } = outerTriangle(canvas.height)

	// triangle recursion
	triangle(size, center, depth)
}

//calculate, sort, or do whatever you want here
function update() {
	//@TODO: implement your calculations here
	depth = document.getElementById('depth').value
}

//clear the canvas
function clear() {
	ctx.setTransform(1, 0, 0, 1, 0, 0)
	ctx.fillStyle = backgroundColor
	ctx.fillRect(0, 0, canvas.width, canvas.height)
}

//if the user changes the size of the window we have do recalculate
function resizeCanvas() {
	canvas.width = window.innerWidth - 20
	//let us keep this sixteen by nine
	canvas.height = ((window.innerWidth) / 16) * 9
}

//let us call the function once at the start to get the user's canvas size
resizeCanvas()

window.addEventListener('resize', resizeCanvas)

//this block will call the function clear, update, and draw all the time
function loop() {
	clear();
	update();
	draw();
	window.requestAnimationFrame(loop)
}
window.requestAnimationFrame(loop)