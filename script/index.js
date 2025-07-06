import Player from './entity/Player.js'
import Ball from './entity/Ball.js'

var canvas = document.querySelector('canvas')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

var c = canvas.getContext('2d')

const DX = 4
const DY = 4
const MULTIPLIER = 2

var player1 = new Player("Player 1", canvas, 200, 200, MULTIPLIER, "red", 38, 40, 37, 39, 16, 0)
var player2 = new Player("Player 2", canvas, 200, 400, MULTIPLIER, "yellow", 87, 83, 65, 68, 16, 1)
var ball = new Ball(200,600, "white")

var players = []
players.push(player1)
players.push(player2)

window.onload = function () {
    document.addEventListener('keydown', keyPressed)
    document.addEventListener('keyup', keyReleased)
    document.addEventListener('click', clickMade)
}

function keyPressed(event) {
    players.forEach(player => {
        player.handlePress(event)
    })
}

function keyReleased(event) {
    players.forEach(player => {
        player.handleRelease(event)
    })
}

function clickMade(event) {
    players.forEach(player => {
        var result = player.handleClick(event, ball)
        if (result != undefined) {
            ball.beShotTo(result[0], result[1])
        }
    })
}

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0,0, window.innerWidth, window.innerHeight)
    /* Ball methods */
    c.beginPath()
    c.arc(ball.x, ball.y, 5, 0, Math.PI*2, false)
    c.strokeStyle = ball.color
    c.lineWidth = 20
    c.stroke()
    /* End ball methods */
    players.forEach(player => {
        var resultObtained = player.move(DX, DY)
        if (player.isTouchingBall(ball.x, ball.y)) {
            ball.move(resultObtained[0],resultObtained[1])
            ball.nextFrameShot(true)
        }
        ball.nextFrameShot()
        c.beginPath()
        c.arc(player.x, player.y, 30, 0, Math.PI*2, false)
        c.strokeStyle = player.color
        c.lineWidth = 10
        c.stroke()
    })
}

animate()