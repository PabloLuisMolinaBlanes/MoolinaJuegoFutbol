import { getMousePos } from '../utils.js'
 

class Player {    
    constructor(name, canvas, x, y, mult, color, upKeyCode, lowKeyCode, leftKeyCode, rightKeyCode, runKeyCode, rundirection) {
        this.name = name
        this.canvas = canvas
        this.x = x
        this.y = y
        this.mult = mult
        this.color = color
        this.upKeyCode = upKeyCode
        this.lowKeyCode = lowKeyCode
        this.leftKeyCode = leftKeyCode
        this.rightKeyCode = rightKeyCode
        this.runKeyCode = runKeyCode
        this.clickToX = 0
        this.clickToY = 0
        this.toProcessClick = false
        this.leftPressed = false
        this.rightPressed = false
        this.upPressed = false
        this.downPressed = false
        this.runPressed = false
        this.hasTheBall = false
        if (rundirection === 0) {
            this.runLocation = KeyboardEvent.DOM_KEY_LOCATION_LEFT
        } else if (rundirection === 1) {
            this.runLocation = KeyboardEvent.DOM_KEY_LOCATION_RIGHT
        }
    }

    handleClick(event, ball) {
        if (this.hasTheBall) {
            return [event.clientX, event.clientY]
        } else {
            return undefined
        }
    }

    handlePress(event) {
        if (event.keyCode == this.runKeyCode && event.location === this.runLocation) {
            this.runPressed = true
        }
        if (event.keyCode == this.upKeyCode) {
            this.upPressed = true
        }
        if (event.keyCode == this.lowKeyCode) {
            this.downPressed = true
        }
        if (event.keyCode == this.leftKeyCode) {
            this.leftPressed = true
        }
        if (event.keyCode == this.rightKeyCode) {
            this.rightPressed = true
        }
    }

    isTouchingBall(ball_x, ball_y) {
        Math.sqrt(Math.pow(Math.abs(ball_x-this.x),2) + Math.pow(Math.abs(ball_y-this.y),2) ) < 40 ? this.hasTheBall = true : this.hasTheBall = false 
        return Math.sqrt(Math.pow(Math.abs(ball_x-this.x),2) + Math.pow(Math.abs(ball_y-this.y),2) ) < 40
    }

    move(dx, dy) {
        var dx_new = 0
        var dy_new = 0
        if (this.runPressed) {
            dx = dx*this.mult
            dy = dy*this.mult
        }
        if (this.upPressed) {
            dy_new = -dy
        }
        if (this.downPressed) {
            dy_new = dy
        }
        if (this.leftPressed) {
            dx_new = -dx
        }
        if (this.rightPressed) {
            dx_new = dx
        }
        this.x = this.x + dx_new
        this.y = this.y + dy_new
        return [dx_new,dy_new]
    }

    shoot() {
            return [this.clickToX, this.clickToY]
    }
    
    handleRelease(event) {
        if (event.keyCode == this.runKeyCode && event.location === this.runLocation) {
            this.runPressed = false
        }
        if (event.keyCode == this.upKeyCode) {
            this.upPressed = false
        }
        if (event.keyCode == this.lowKeyCode) {
            this.downPressed = false
        }
        if (event.keyCode == this.leftKeyCode) {
            this.leftPressed = false
        }
        if (event.keyCode == this.rightKeyCode) {
            this.rightPressed = false
        }
    }
    
}

export default Player;