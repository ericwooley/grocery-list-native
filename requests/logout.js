/* globals fetch */
export default () => fetch(
  'http://127.0.0.1:8090/logout', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    // body: {}
  })
