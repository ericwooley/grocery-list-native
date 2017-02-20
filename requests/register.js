/* globals fetch */
export default (username, password) => fetch(
  'http://127.0.0.1:8090/register/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({username, password})
  })
