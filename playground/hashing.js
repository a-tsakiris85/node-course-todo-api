const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

let data = {
  id: 10
}

var token = jwt.sign(data, 'secret');
console.log(token);

var decode = jwt.verify(token, 'secret');
console.log(decode);
//jwt.verify


// var message = 'I am user number 3';
// var hash = SHA256(message).toString(); //irreversable
// console.log(hash);
//
// var data = {
//   id: 4
// };
//
// var token = {
//   data: data,
//   hash: SHA256(JSON.stringify(data) + 'somesecret').toString() //salt it
// }
//
// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();
//
// if(resultHash === token.hash) {
//   //data not manipulated
//   console.log('data not changed')
// }
// else {
//   console.log('data was changed. dont trust.')
// }
