//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb'); //object destructuring

var obj = new ObjectID();

//TodoApp is a database we are just making. It doesn't exist yet.
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if(err) {
    return console.log("Unable to connect to MongoDB server");
  }
  console.log("Connected to MongoDB server");
  const db = client.db('TodoApp');

  db.collection("Todos").findOneAndUpdate({ _id:new ObjectID('5b48f3f789e4f7d8316be8e2')}, {
    $set: {
      completed: true
    }
  }, {
    returnOriginal: false
  }).then((res) => {
    console.log(res);
  });

  db.collection('Users').findOneAndUpdate({_id : new ObjectID("5b48f0ce67aa0c160c64ba71")}, {
    $set: {
      name: 'Old Andrew'
    },
    $inc: {
      age: 10
    }
  }, {
    returnOriginal:false
  }).then((res) => {
    console.log(res);
  })


  //client.close(); //closes the connection with the server
});
