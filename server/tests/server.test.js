const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server'); //to go backwards!
const {Todo} = require('./../models/todo');

beforeEach((done) => {
  Todo.remove({}).then(() => done())
});

describe('POST /todos', () => {
  it('should create new todo', (done) => { //mocha async
    let text = 'this is a test todo text';
    request(app).post('/todos').send({text})
      .expect(200) //assertion on the status code
      .expect((res) => {
        expect(res.body.text).toBe(text); //a custom assertion
      })
      .end((err, res) => {
        if(err) {
          return done(err);
        }

        Todo.find().then((todos) => { //actually check the database
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
          expect(todos.length).toBe(0);
          done();
        }).catch((err) => {
          done(e);
        });
      });
  });
});
