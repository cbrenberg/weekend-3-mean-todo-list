//requires
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//globals
const PORT = process.env.PORT || 5000;
const mongoUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/todolist';
const todoRouter = require('./routes/todo.router');

//uses
app.use(bodyParser.json());
app.use(express.static('server/public'));
app.use('/todo', todoRouter)

//MONGOOSE connection setup
mongoose.connect(mongoUrl, { useNewUrlParser: true });

// Log out success or failure
mongoose.connection.on('open', () => {
  // Success!
  console.log('Connected to Mongo');
});
//log error message
mongoose.connection.on('error', (error) => {
  console.log('ERROR CONNECTING TO MONGO', error);
});

//spin up server
app.listen(PORT, () => {
  console.log('Listening on port', PORT);
})