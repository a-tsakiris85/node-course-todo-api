const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server'); //to go backwards!
const {Todo} = require('./../models/todo');

const test_todos = [
  {text: "first test todo"},
  {text: "second test todo"},
  {text: "third test todo"}
];

beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(test_todos);
  }).then(() => done());
});

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
    request(app).post('/todos').send({text})
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
    request(app).post('/todos').send({})
      .expect(400)
      .end((err, res) => {
        if(err) {
          return done(err);
        }
        Todo.find().then((todos) => {
          expect(todos.length).toBe(test_todos.length);
          done();
        }).catch((err) => {
          done(e);
        });
      });
  });
});
