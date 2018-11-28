const button = document.getElementById('subscribe-btn')

button.addEventListener('click', e => {
  e.preventDefault()
  const macro = 'https://script.google.com/macros/s/AKfycbz7dH_CBshOK2O2ngctNHlDvkGioeaIH6-4aoIJJXag_H_KRc5h/exec'
  const input = document.querySelector('#subscribe-form input')
  const url = `${macro}?email=${encodeURIComponent(input.value)}`


  window.fetch(url, {
    method: 'get',
    mode: "cors"
  }).then(resp => {
    console.log(resp.status)
    const form = document.getElementById('subscribe-form')
    const success = document.getElementById('success-msg')
    success.style.display = 'block'
    form.style.display = 'none'
  })
    .catch(e => console.log('error', e))
})
