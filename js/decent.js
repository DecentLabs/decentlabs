const header = document.querySelector('header')
const ratio = 2.585
const colors = ['#e8a87c','#c38d9e','#8bcbc8','#40b3a3', '#e27d60']
let animations = []
let width = window.innerWidth
let height = 768

init()

function init () {
  if (width <= 599 && width < 1024) {
    height = 568
  }
  header.style.setProperty('height', height + 'px')

  templating ()
  resize()
  createBubbles()
  hover()
}

function templating () {
  let grid = document.querySelector('.category-grid')
  let gridContent = ''

  DECENT_PROJECTS.forEach((category) => {
    // let categoryBox = `
    //   <div class="experiment-item category-type">
    //     <img src="${category.image}">
    //     <h3>${category.catName}</h3>
    //   </div>
    // `
    // gridContent += categoryBox

    category.projects.forEach((project) => {
      // <img class="project-logo" src="${project.logo}"></img>
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
          <div class="label">${project.hashtag}</div>
        </div>
      `
      gridContent += template
    })
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
        node.style.backgroundColor = color
        node.style.opacity = '1'
      }
    })

    item.addEventListener('mouseover', () => {
      if (node) {
        let color = colors[Math.round(Math.random() * colors.length-1)]
        node.style.backgroundColor = color
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
    if (width <= 599 && width < 1024) {
      height = 568
    }
    header.style.setProperty('height', height + 'px')
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
