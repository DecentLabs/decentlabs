const macro = 'https://script.google.com/macros/s/AKfycbz7dH_CBshOK2O2ngctNHlDvkGioeaIH6-4aoIJJXag_H_KRc5h/exec'
const form = document.getElementById('subscribe-form')

const button = document.getElementById('subscribe-btn')

button.addEventListener('click', e => {
  e.preventDefault()

  const input = document.querySelector('#subscribe-form input')
  const url = `${macro}?email=${encodeURIComponent(input.value)}`

  window.fetch(url, {
    method: 'get',
    mode: "cors", // no-cors, cors, *same-origin
  }).then(resp => console.log(url, resp))
    .catch(e => console.log('error', e))
})
