const axios = require('axios').default;

axios.get('http://localhost:8080/users')
  .then(function (response) {
    console.log(response);
  })