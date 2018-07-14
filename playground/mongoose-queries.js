const {mongoose} = require('./../server/db/mongoose');
const {ObjectID} = require('mongodb');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');


// let id = "5b4985730f9ab0240c4d"
//
// if(!ObjectID.isValid(id)) {
//   console.log('ID not valid');
// }
// Todo.find({}).then((todos) => {
//   console.log('Todos:', todos);
// });

// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todo:', todo);
// })



id = "5b4960a8c9311257b43c88d3";

User.findById("5b4960a8c9311257b43c88d3").then((user) => {
  if(!user) {
    return console.log('user not found');
  }
  console.log("User", user)
}, (err) => {
  console.log(err);
});

Todo.findById("5b4960a8c9311257b43c88d3").then((todo) => {
  if(!todo) {
    return console.log('id not found for todo!')
  }
  console.log("todo by id:", todo);
}, (err) => {
  console.log(err);
});
