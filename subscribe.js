const url = 'https://script.google.com/macros/s/AKfycbz7dH_CBshOK2O2ngctNHlDvkGioeaIH6-4aoIJJXag_H_KRc5h/exec'

const button = document.getElementById('subscribe-btn')

button.addEventListener('click', e => {
  e.preventDefault()

  const input = document.querySelector('#subscribe-form input')

  window.fetch(`${url}?email=${input.value}`, {
    method: 'get',
    mode: "cors", // no-cors, cors, *same-origin
  }).then(resp => console.log(resp)).catch(e => console.log(e))
})
