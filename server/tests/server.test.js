//this isn't gonna work cuz I skipped stuff.

const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server'); //to go backwards!
const {Todo} = require('./../models/todo');
const {populateTodos, test_todos, populateUsers} = require('./seed/seed.js');

const {ObjectID} = require('mongodb');


beforeEach(populateTodos);
beforeEach(populateUsers);

describe('GET /todos:id', () => {
  it('should get a todo by id', (done) => {
    request(app).get(`/todos/${test_todos[0]._id.toHexString()}`)
    .expect(200)
    .expect((res) => {
      expect(res.body.todo.text).toBe(test_todos[0].text);
    }).end(done);
  });
  it('should return 404 if bad id', (done) => {
    request(app).get('/todos/23u234').expect(404).end(done);
  });
  it('should not find an id that does not exist', (done) => {
    request(app).get(`/todos/${new ObjectID().toHexString()}`).expect(404)
    .end(done);
  })
})
describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app).get('/todos').expect(200).expect((res) => {
      expect(res.body.todos.length).toBe(test_todos.length)
    })
    .end(done); //nothing async to check at the end. So nothing special needed.
  });
});
describe('POST /todos', () => {
  it('should create new todo', (done) => { //mocha async
    let text = 'this is a test todo text';
    request(app).post('/todos').set(users[0].tokens[0].token).send({text})
      .expect(200) //assertion on the status code
      .expect((res) => {
        expect(res.body.text).toBe(text); //a custom assertion
      })
      .end((err, res) => { //this is if we have some async stuff
        if(err) {
          return done(err);
        }

        Todo.find({text}).then((todos) => { //actually check the database
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((err) => {
          done(e);
        });
      });
  });

  it('should not create new todo', (done) => {
    request(app).post('/todos').set(users[0].tokens[0].token).send({})
      .expect(400)
      .end((err, res) => {
        if(err) {
          return done(err);
        }
        Todo.find().then((todos) => {
          expect(todos.length).toBe(test_todos.length);
          done();
        }).catch((err) => {
          done(err);
        });
      });
  });
});
