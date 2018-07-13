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

//.find() gives a cursor. Then use different methods like toArray() and count()
//these methods return a promise!
  db.collection('Todos').find().toArray().then((docs) => { //find actually returns a cursor.
    console.log("All Todos");
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log("error fetching");
  });

  db.collection('Todos').find({completed: false}).count().then((count) => {
    console.log(`You have ${count} things to do!`)
  }, (err) => {
    console.log("error");
  })

  db.collection('Todos').find({completed: false}).toArray().then((docs) => {
    console.log("Not Completed");
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log("error fetching");
  });
  //client.close(); //closes the connection with the server
});
