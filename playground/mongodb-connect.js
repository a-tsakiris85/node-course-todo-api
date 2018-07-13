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

  // db.collection('Todos').insertOne({
  //   text: "Take out the trash",
  //   completed: false
  // }, (err, res) => {
  //   if(err) {
  //     return console.log("Unable to insert into database.", err);
  //   }
  //   console.log(JSON.stringify(res.ops, undefined, 2));
  // });

  db.collection('Users').insertOne({
    name: "Andrew Tsakiris",
    age: 19,
    location: "Philadelphia, PA"
  }, (err, res) => {
    if(err) {
      return console.log("Unable to insert into Users collection", err);
    }

    console.log(JSON.stringify(res.ops, undefined, 2));
  })
  client.close(); //closes the connection with the server
});
