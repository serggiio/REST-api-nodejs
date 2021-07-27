/* eslint-disable linebreak-style */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;
const Book = require('./models/bookModel');
const bookRouter = require('./router/bookRouter')(Book);

const user = process.env.USER || 'admin-vet';
const password = process.env.PASSWORD || 'YRvQz9H3i4ATkZm';
let dbName = process.env.DBNAME || 'veterinaria';
const uri = `mongodb+srv://${user}:${password}@cluster0.qozfm.mongodb.net/${dbName}?retryWrites=true&w=majority`;

if (process.env.ENV === 'Test') {
  console.log('On test env');
  dbName = 'veterinaria-test';
} else {
  dbName = 'veterinaria';
  console.log('This is not test');
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conectado papu');
  })
  .catch((e) => {
    console.log('Algo fallo, quien sabe donde');
    console.log(e);
  });

app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.send('WELCOME TO MY API');
});

app.server = app.listen(port, () => {
  console.log(`Running at port: ${port}`);
});

module.exports = app;
