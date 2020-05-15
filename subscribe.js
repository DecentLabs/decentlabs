const button = document.getElementById('subscribe-btn')
const email = document.querySelector('#subscribe-form input[name="email"]')

button.addEventListener('click', e => {
  e.preventDefault()
  const macro = 'https://script.google.com/macros/s/AKfycbwDd_e0hXCszwt6mJaMuMHHsxndEkzKbkXmRCdHyHOaLnfwxdE/exec'
  const getIp = 'https://ipapi.co/json/'

  window.fetch(getIp, {
    method: 'get'
  }).then(resp => {
    resp.json().then(data => {
      const url = `${macro}?email=${encodeURIComponent(email.value)}
                           &ip=${encodeURIComponent(data.ip)}
                           &location=${encodeURIComponent(data.city)}`
      if (email.value) {
        window.fetch(url, {
          method: 'get',
          mode: 'cors'
        }).then(resp => {
          const form = document.getElementById('subscribe-form')
          const success = document.getElementById('success-msg')
          success.style.display = 'block'
          form.style.display = 'none'
        }).catch(e => console.log('error', e))
      } else {
        email.classList.add('error')
      }
    })
  })
})

email.addEventListener('keyup', () => {
  if (email.value) {
    email.classList.remove('error')
  } else {
    email.classList.add('error')
  }
})
