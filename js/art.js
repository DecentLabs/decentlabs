

(function () {
  document.querySelectorAll('div[data-art]').forEach((l) => {
    l.addEventListener('click', () => {
      let data = l.dataset.art
      search(data)
    })
  })

  document.querySelector('.show-all').addEventListener('click', () => {
    search(null)
  })

  navigate()
})()


function search(num) {
  let url = new URL(window.location.href);
  let params = url.searchParams

  if (num) {
    params.set('art', num)
  } else {
    params.delete('art')
  }

  history.pushState({}, '', url)
  navigate()
}

function navigate () {
  let param = window.location.search
  let arts = document.querySelectorAll('div[data-art]')
  let showAllBtn = document.querySelector('.show-all')

  if (param.length > 0) {
    let i = param.split("=")[1]
    query(arts, i)
    showAllBtn.style.display = "inline-block"
  } else {
    showAll(arts)
    showAllBtn.style.display = "none"
  }
}

function query(arts, i) {
  arts.forEach((a) => {
    if (a.dataset.art != i) {
      a.style.display = "none"
      a.classList.remove('full')
    } else {
      a.style.display = "inline-block"
      a.classList.add('full')
    }
  })
}

function showAll (arts) {
  arts.forEach((a) => {
    a.style.display = "inline-block"
    a.classList.remove('full')
  })
}
