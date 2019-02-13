class Animation {
  constructor (node) {
    this.bubble = node
    this.x = 0
    this.y = 0
    this.directionX = null
    this.directionY = null
    this.colors = ['#e8a87c','#e27d60','#c38d9e','#8bcbc8','#40b3a3', '#4CC1E5']
    this.color = null
    this.minX = null
    this.minY = null
    this.maxX = null
    this.maxY = null
    this.size = null
    this.easeIn = []
    this.easing = false
    this.speed = null
  }

  startAnimation () {
    for (let t = 1; t >= 0.45; t-=0.004) {
      this.easeIn.push((t * t) * 1.5)
    }
    this.left = getValue(this.bubble, 'left')
    this.top = getValue(this.bubble, 'top')
    this.easingLength = this.easeIn.length-1
    this.speed = this.easeIn[this.easingLength]
    this.changeColor()
    this.update()
    this.move()
  }

  update () {
    this.updateSize()
    this.getMinMax()
    this.updateDirections()

    if (this.x <= this.minX) {
      this.x = this.minX
    } else if (this.x >= this.maxX) {
      this.x = this.maxX
    }
    if (this.y <= this.minY) {
      this.y = this.minY
    } else if (this.y >= this.maxY) {
      this.y = this.maxY
    }
  }

  updateSize () {
    let newSize = Math.round(Math.random() * (height * 0.45) + (height * 0.25))
    let pos = this.size/2 - newSize/2
    this.size = newSize
    this.x += pos
    this.y += pos

    this.bubble.style.setProperty('width', this.size + 'px')
    this.bubble.style.setProperty('height', this.size + 'px')

    let translate = `translate3d(${this.x}px, ${this.y}px, 0)`
    this.bubble.style.setProperty('transform', translate)
  }

  getMinMax () {
    this.minX = this.left > 0 ? this.left * -1 : this.left
    this.minY = this.top > 0 ? this.top * -1 : this.top
    this.maxX = width + this.minX - this.size
    this.maxY = height + this.minY - this.size
  }

  click () {
    this.changeColor()
    this.update()
  }

  changeColor () {
    let colors = this.colors.filter(c => c !== this.color)
    let index = Math.round(Math.random() * (colors.length-1))
    this.color = colors[index]
    this.bubble.style.backgroundColor = this.color
  }

  updateDirections () {
    this.updateDirectionX()
    this.updateDirectionY()
  }

  updateDirectionX () {
    this.directionX = this.updateDirection(this.directionX)
  }

  updateDirectionY () {
    this.directionY = this.updateDirection(this.directionY)
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
    if (randomChange()) {
      this.updateDirections()
      this.changeColor()
    } else if (this.x < this.minX || this.x > this.maxX) {
      this.updateDirectionX()
      this.easing = 0
    } else if (this.y < this.minY || this.y > this.maxY) {
      this.updateDirectionY()
      this.easing = 0
    } else if (this.directionX === 0 && this.directionY === 0) {
      this.updateDirections()
    }

    if (this.easing !== false && this.easing <= this.easingLength) {
      this.speed = this.easeIn[this.easing]
      this.easing += 1
    } else {
      this.easing = false
      this.speed = this.easeIn[this.easingLength]
    }

    if (this.directionX < 0) {
      this.x -= this.speed
    } else if (this.directionX > 0) {
      this.x += this.speed
    }

    if (this.directionY < 0) {
      this.y -= this.speed
    } else if (this.directionY > 0) {
      this.y += this.speed
    }


    let translate = `translate3d(${this.x}px, ${this.y}px, 0)`
    this.bubble.style.setProperty('transform', translate)

    window.requestAnimationFrame(this.move.bind(this))
  }
}


const header = document.querySelector('header')
const ratio = 2.585
let width = window.innerWidth
let height = width / ratio
height = 720;
header.style.setProperty('height', '720px')
// header.style.setProperty('height', height + 'px')
let animations = []

let bubbles = document.querySelectorAll('.bubble')
bubbles.forEach((bubble) => {
  let anim = new Animation(bubble)
  animations.push(anim)
  anim.startAnimation()

  bubble.addEventListener('click', () => {
    anim.click()
  })
})

window.addEventListener('resize', () => {
  width = window.innerWidth
  height = width / ratio
  // header.style.setProperty('height', height + 'px')
  header.style.setProperty('height', '800px')
  animations.forEach((anim) => {
    anim.update()
  })
})

function getValue (node, property) {
  return parseInt(window.getComputedStyle(node)[property].split('px')[0])
}

function randomChange () {
  return Math.floor(Math.random() * 1000) === 0
}
