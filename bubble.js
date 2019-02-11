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
    this.colors = ['#e8a87c','#e27d60','#c38d9e','#8bcbc8','#40b3a3']
  }

  getSize (node, property) {
    return parseInt(window.getComputedStyle(node)[property].split('px')[0])
  }

  click () {
    this.changeColor()
  }

  changeColor () {
    let index = Math.round(Math.random() * (this.colors.length-1))
    this.bubble.style.backgroundColor = this.colors[index]
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

  randomDirectionChange () {
    return Math.floor(Math.random() * 1000) === 0
  }

  move () {
    if (this.randomDirectionChange()) {
      this.updateDirectionX()
      this.updateDirectionY()
      this.changeColor()
    }

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

  bubble.addEventListener('click', () => {
    anim.click()
  })
})
