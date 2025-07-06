class Ball {

    constructor(x, y, color) {
        this.x = x
        this.y = y
        this.futureX = -1
        this.futureY = -1
        this.color = color
        this.framesleft = 0
    }

    move(dx, dy) {
        this.x = this.x + dx
        this.y = this.y + dy
    }

    nextFrameShot(isTouchingBall) {
        if (isTouchingBall && this.framesleft < 14) {
            this.framesleft = 0
        }
        if (this.framesleft > 0) {
            console.log("Moving!")
            this.move(Math.round(this.directionX*this.distanceToMoveX/15), Math.round(this.directionY*this.distanceToMoveY/15))
            this.framesleft = this.framesleft - 1;
        }
    }

    beShotTo(x, y) {
        this.framesleft = 15
        console.log("Received call!")
        if (x < this.x) {
            this.distanceToMoveX = this.x-x
            this.directionX = -1
        } else if (x > this.x) {
            this.distanceToMoveX = x-this.x
            this.directionX = 1
        }
        if (y < this.y) {
            this.distanceToMoveY = this.y-y
            this.directionY = -1
        } else if (y > this.y) {
            this.distanceToMoveY = y-this.y
            this.directionY = 1
        }
    }
}

export default Ball;