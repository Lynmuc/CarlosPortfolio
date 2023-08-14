const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

const size = 30

const snake = [ { x: 300, y: 270 } ]

const randomNumber = (min, max) => {
    return Math.round(Math.random() * (max - min) + min)
}

const randomposition = () => {
    const number = randomNumber(0, canvas.width - size)
    return Math.round(number / 30) * 30
}

const randomColor = () => {
    const red = randomNumber(0, 255)
    const green = randomNumber(0, 255)
    const blue = randomNumber(0, 255)
}

const food = {
    x: randomposition(0, 570),
    y: randomposition(0, 570),
    color: "orange"
}

let direction, loopId

const drawFood = () => {
    const { x, y, color } = food

    ctx.shadowColor = color
    ctx.shadowBlur = 7
    ctx.fillStyle = color
    ctx.fillRect(x, y, size, size)
    ctx.shadowBlur = 0
}

const drawSnake = () => {
    ctx.fillStyle = '#ddd'
    
    snake.forEach((position, index) => {

        if (index == snake.length - 1){
            ctx.fillStyle = "white"
        }


        ctx.fillRect(position.x, position.y, size, size)
    })
}

const moveSnake = () => {
    if (!direction) return
    const head = snake.at(-1)

    if (direction == "right"){
        snake.push({ x: head.x + size, y: head.y })
    }

    if (direction == "left"){
        snake.push({ x: head.x - size, y: head.y })
    }

    if (direction == "down"){
        snake.push({ x: head.x, y: head.y + size })
    }

    if (direction == "up"){
        snake.push({ x: head.x, y: head.y - size })
    }

    snake.shift()

}

const drawGrid = () => {
    ctx.lineWidth = 1
    ctx.strokeStyle = "#191919"

    for (let i = 30; i < canvas.width; i += 30) {
        ctx.beginPath()
        ctx.lineTo (i, 0)
        ctx.lineTo (i, 600)
        ctx.stroke()

        ctx.beginPath()
        ctx.lineTo (0, i)
        ctx.lineTo (600, i)
        ctx.stroke()
    }
}

const gameLoop = () => {
    clearInterval(loopId)
    ctx.clearRect(0, 0, 600, 600)
    drawGrid()
    drawFood()
    drawSnake()
    moveSnake()

    loopId = setTimeout(() => {
        gameLoop()
    }, 300)
}

gameLoop()

document.addEventListener("keydown", ( {key} ) => {
    if (key == "ArrowRight" && direction != "left") {
        direction = "right"
    }

    if (key == "ArrowLeft" && direction != "right") {
        direction = "left"
    }

    if (key == "ArrowDown" && direction != "up") {
        direction = "down"
    }

    if (key == "ArrowUp" && direction != "down") {
        direction = "up"
    }
})


