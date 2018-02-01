// import api from './api'

/*
This file will represent each data endpoint on your api. It's designed to look a
bit like an ActiveRecord model. If you need to add any data transformations on
the API output before sending it to your app, this is the right place!
Note we're assuming all your endpoints work the same way (and they should, for
your own sanity's sake). You'll need to create different modules if you have
endpoints that behave differently.
*/

const Request = (path, method, authorization, data) => {
  return fetch(`http://localhost:3000/${path}`, {
    method: method,
    body: JSON.stringify(data),
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': authorization
    })
  }).then((res) => res.json())
    .catch((err) => console.log(err))
}

// const Resource = (endpoint) => {

//   // We're extracting result.data and returning it on success to avoid
//   // result.data.data in our components
//   function findAll() {
//     const myRequest = new Request(`http://localhost:3000/${endpoint}`);
//     return fetch(myRequest)
//       .then((result) => result.json())
//       .catch((errors) => errors.json());
//   }

//   // Same as above
//   function find(id) {
//     return new Promise((resolve, reject) => {
//       api.get(`${domain}/${endpoint}/${id}`)
//       .then((result) => resolve(result.data))
//       .catch((errors) => reject(errors))
//     })
//   }

//   function create(data) {
//     return api.post(`${domain}/${endpoint}`, data)
//   }

//   function update(id, data) {
//     return api.patch(`${domain}/${endpoint}/${id}`, data)
//   }

//   function destroy(id) {
//     return api.delete(`${domain}/${endpoint}`)
//   }

//   return {
//     findAll,
//     find,
//     create,
//     update,
//     destroy
//   }

// }

export default Request