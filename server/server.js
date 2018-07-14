const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose') //can leave off .js
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

var app = express(); //creates the app

//middleware
app.use(bodyParser.json()); //returns a function that express will use

//handle post requests from a new todo
app.post('/todos', (req, res) => {
  console.log(req.body);
  let todo = new Todo({ //create the document via model constructor
    text: req.body.text // (thanks to bodyParser)
  });
  todo.save().then((doc) => {
    res.send(doc); //send JSON back
  }, (err) => {
    res.status(400).send(err);  //send the error back if something went wrong.
  });
});

app.listen(3000, () => { //local port, or we can do Heroku
  console.log("Started on port 3000");
})
// let secondTodo = new Todo({
//   text: "walk the dog",
//   completed: true,
//   completedAt: 78
// });
// secondTodo.save().then((doc) => {
//   console.log('%j', doc);
// }, (err) => {
//   console.log('Error %j', err);
// });
//
//
//
// let user1 = new User({
//   email: '    andrew@email.com    '
// }).save().then((res) => {
//   console.log("User saved");
//   console.log(JSON.stringify(res, undefined, 2));
// }, (err) => {
//   console.log("error %j", err)
// });
