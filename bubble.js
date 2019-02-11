class Animation {
  constructor (node) {
    this.bubble = node
    this.x = 0
    this.y = 0
    this.width = window.innerWidth
    this.height = this.getSize(document.querySelector('header'), 'height')
    this.directionX = null
    this.directionY = null
    this.maxX = this.width - this.getSize(this.bubble, 'width')
    this.maxY = this.height - this.getSize(this.bubble, 'height')

    console.log(this.maxX, this.maxY);
  }

  getSize (node, property) {
    return parseInt(window.getComputedStyle(node)[property].split('px')[0])
  }

  startAnimation () {
    this.updateDirectionX()
    this.updateDirectionY()
    window.requestAnimationFrame(this.move.bind(this))
  }

  updateDirectionX () {
    let prev = this.directionX
    this.directionX = this.updateDirection(prev)
  }

  updateDirectionY () {
    let prev = this.directionY
    this.directionY = this.updateDirection(prev)
  }

  updateDirection (prev) {
    let newDir = [-1, 0, 1][Math.round(Math.random() * 2)]
    if (prev) {
      while (newDir === prev) {
        newDir = [-1, 0, 1][Math.round(Math.random() * 2)]
      }
    }
    return newDir

  }

  move () {
    if (this.x <= 0 || this.x >= this.maxX) {
      this.updateDirectionX()
    }
    if (this.y <= 0 || this.y >= this.maxY) {
      this.updateDirectionY()
    }

    if (this.directionX === 0 && this.directionY === 0) {
      this.updateDirectionX()
      this.updateDirectionY()
    }

    if (this.directionX < 0) {
      this.x -= 0.5
    } else if (this.directionX > 0) {
      this.x += 0.5
    }

    if (this.directionY < 0) {
      this.y -= 0.5
    } else if (this.directionY > 0) {
      this.y += 0.5
    }

    let translate = `translate3d(${this.x}px, ${this.y}px, 0)`
    this.bubble.style.setProperty('transform', translate)

    window.requestAnimationFrame(this.move.bind(this))
  }
}

let bubbles = document.querySelectorAll('.bubble')
bubbles.forEach((bubble) => {
  let anim = new Animation(bubble)
  anim.startAnimation()
})
