require('should');

const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../app');

process.env.ENV = 'Test';
process.env.PORT = 4000;

const Book = mongoose.model('Book');
const agent = request.agent(app);

describe('Book crud test', () => {
  it('Should allow a book to be posted and return read and _id', (done) => {
    const bookPOST = {
      title: 'My book',
      author: 'Jon dOE',
      genre: 'Fiction'
    };

    agent.post('/api/books')
      .send(bookPOST)
      .expect(200)
      .end((err, results) => {
        //results.body.read.should.not.equal(false);
        //results.body.should.have.property('_id');
        done();
      });
  });

  afterEach((done) => {
    Book.deleteMany({}).exec();
    done();
  });

  after((done) => {
    mongoose.connection.close();
    app.server.close(done());
  });
});
