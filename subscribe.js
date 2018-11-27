const form = document.getElementById('subscribe-form')
const success = document.getElementById('success-msg')

const button = document.getElementById('subscribe-btn')

button.addEventListener('click', e => {
  e.preventDefault()

  const input = document.querySelector('#subscribe-form input')
  const url = 'https://docs.google.com/forms/d/e/1FAIpQLSeYHOaZvdM6vMgpOaXsHBOtLjYVRq-fYuYnnz9XtwKqKKcrkQ/formResponse'
  const data = {
    email: input.value
  }

  window.fetch(url, {
    method: 'post',
    mode: "cors", // no-cors, cors, *same-origin,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(resp => console.log(url, resp))
    .catch(e => console.log('error', e))
})
