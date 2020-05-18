const header = document.querySelector('header')
const ratio = 2.585
const colors = ['#e8a87c','#c38d9e','#8bcbc8','#40b3a3', '#4CC1E5']
let width = window.innerWidth
let height = 700
let animations = []

init()

function init () {
  templating ()
  resize()
  createBubbles()
  hover()
}

function templating () {

  let grid = document.querySelector('.category-grid')
  let gridContent = ''

  DECENT_PROJECTS.forEach((project) => {
    let template = `
      <div class="experiment-item">
        <div class="overlay">

          <p>${project.desc ? project.desc : ''}</p>
        </div>

        ${project.url ? `<a class="img-link" href="${project.url}" target="_blank">
          <img src="${project.image}">
        </a>` : `<img src="${project.image}">`}

        <h3>
          ${project.url ? `<a class="more-link left" href="${project.url}" target="_blank">
            ${project.name}
          </a>` : project.name}
        </h3>
      </div>
    `
    gridContent += template
  })
  grid.innerHTML = gridContent
}

function hover () {
  let items = document.querySelectorAll('.experiment-item')

  items.forEach((item) => {
    let index = Object.keys(item.childNodes).find((key) => {
      if (item.children[key]) {
        return item.children[key].className === 'overlay'
      }
    })
    let node = item.children[index]

    item.addEventListener('touchstart', () => {
      if (node) {
        let color = colors[Math.round(Math.random() * colors.length-1)]
        node.style.backgroundColor = color + 'F2'
        node.style.opacity = '1'
      }
    })

    item.addEventListener('mouseover', () => {
      if (node) {
        let color = colors[Math.round(Math.random() * colors.length-1)]
        node.style.backgroundColor = color + 'F2'
        node.style.opacity = '1'
      }
    })

    item.addEventListener('mouseout', () => {
      if (node) {
        node.style.opacity = '0'
      }
    })

    item.addEventListener('touchend', () => {
      if (node) {
        node.style.opacity = '0'
      }
    })
  })
}

function resize () {
  window.addEventListener('resize', () => {
    width = window.innerWidth
    // header.style.setProperty('height', height + 'px')
    animations.forEach((anim) => {
      anim.update()
    })
  })
}

function createBubbles () {
  let bubbles = document.querySelectorAll('.bubble')
  bubbles.forEach((bubble) => {
    let anim = new Animation(bubble)
    animations.push(anim)
    anim.startAnimation()

    bubble.addEventListener('click', () => {
      anim.click()
    })
  })
}
