const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose') //can leave off .js
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

var app = express(); //creates the app
const port = process.env.PORT || 3000;
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



app.get('/todos', (req,res) => {
  Todo.find().then((todos) => {
    res.send({todos}); //using an object is more flexible.
  }, (err) => {
    res.status(400).send(err);
  });
});

//fetching a variable based on URL
app.get('/todos/:id', (req, res) => {
  let id = req.params.id;
  if(!ObjectID.isValid(id)) {
    return res.status(404).send(); //the id is not valid.
  }
  else {
    Todo.findById(id).then((todo) => {
      if(!todo) {
        return res.status(404).send();
      }
      res.send({todo});
    }, (err) => {
      res.status(400).send();
    });
  }
})

app.listen(port, () => { //local port, or we can do Heroku
  console.log("Started on port ", port;
});

module.exports = {
  app
}
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
