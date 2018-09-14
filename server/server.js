//requires
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//globals
const PORT = process.env.PORT || 5000;
const mongoUrl = 'mongodb://localhost:27017/todoList'

//uses
app.use(bodyParser.json());
app.use(express.static('server/public'));

//MONGOOSE setup
mongoose.connect(mongoUrl, {useNewUrlParser : true});

// Log out success or failure
mongoose.connection.on('open', () => {
  // Success!
  console.log('Connected to Mongo');
});

mongoose.connection.on('error', (error) => {
  console.log('ERROR CONNECTING TO MONGO', error);
});


//Move to /todo router later
const Schema = mongoose.Schema; // Similar to a Class

const todoSchema = new Schema({
  task: { type: String, required: true },
  completed: { type: Boolean, required: true, default: false },
  category: { type: String, required: true }
});

const Todo = mongoose.model('todos', todoSchema);

//spin up server
app.listen(PORT, () => {
  console.log('Listening on port', PORT);
})