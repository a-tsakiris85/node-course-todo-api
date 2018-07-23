require('./config/config.js');
const {authenticate} = require('./middleware/authenticate.js');

const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const _ = require('lodash');

const {mongoose} = require('./db/mongoose') //can leave off .js
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

var app = express(); //creates the app
const port = process.env.PORT;
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

app.delete('/todos/:id', (req, res) => {
  let id = req.params.id;
  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  else {
    Todo.findByIdAndRemove(id).then((todo) => {
      if(!todo) {
        return res.status(404).send();
      }
      res.send({todo})
    }, (err) => {
      res.status(400).send();
    });
  }
});

app.patch('/todos/:id', (req, res) => {
  let id = req.params.id;
  const body = _.pick(req.body, ['text', 'completed']);

  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  if(_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  }
  else {
    body.completed = false;
    body.completedAt = null;
  }
  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if(!todo) {
      return res.status(404).send();
    }
    else {
      res.send({todo});
    }
  }).catch((e) => res.status(400).send());
});

//signing in
app.post("/users", (req,res) => {
  var body = _.pick(req.body, ['email', 'password'])
  var user = new User(body);
  user.save().then(() => {
    return user.generateAuthToken(); //returns a promise
  }).then((token) => { //x hyphen is a custom header
    res.header('x-auth', token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  });
});




//private route
app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});


app.listen(port, () => { //local port, or we can do Heroku
  console.log("Started on port ", port);
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
