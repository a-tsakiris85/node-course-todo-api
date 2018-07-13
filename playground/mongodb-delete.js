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

  db.collection('Todos').deleteMany({text: "eat lunch"}).then((res) => {
    console.log(res);
  });

  db.collection('Todos').findOneAndDelete({completed: true}).then((res) => {
    console.log(JSON.stringify(res, undefined, 2))
  })

  //client.close(); //closes the connection with the server
});
