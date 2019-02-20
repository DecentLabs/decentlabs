const button = document.getElementById('subscribe-btn')
const email = document.querySelector('#subscribe-form input[name="email"]')

button.addEventListener('click', e => {
  e.preventDefault()
  const macro = 'https://script.google.com/macros/s/AKfycbz7dH_CBshOK2O2ngctNHlDvkGioeaIH6-4aoIJJXag_H_KRc5h/exec'
  const url = `${macro}?email=${encodeURIComponent(email.value)}`

  if (email.value) {
    window.fetch(url, {
      method: 'get',
      mode: 'cors',
    }).then(resp => {
      console.log(resp.status)
      const form = document.getElementById('subscribe-form')
      const success = document.getElementById('success-msg')
      success.style.display = 'block'
      form.style.display = 'none'
    }).catch(e => console.log('error', e))
  } else {
    email.classList.add('error')
  }
})

email.addEventListener('keyup', () => {
  if (email.value) {
    email.classList.remove('error')
  } else {
    email.classList.add('error')
  }
})
