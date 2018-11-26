const form = document.getElementById('subscribe-form')
const success = document.getElementById('success-msg')

form.addEventListener('submit', e => {
  success.style.display = 'block'
  form.style.display = 'none'
})
