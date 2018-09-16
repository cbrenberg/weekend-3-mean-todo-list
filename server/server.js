//requires
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//globals
const PORT = process.env.PORT || 5000;
const mongoUrl = 'mongodb://localhost:27017/todolist'

//uses
app.use(bodyParser.json());
app.use(express.static('server/public'));

//MONGOOSE setup
mongoose.connect(mongoUrl, { useNewUrlParser: true });

// Log out success or failure
mongoose.connection.on('open', () => {
  // Success!
  console.log('Connected to Mongo');
});

mongoose.connection.on('error', (error) => {
  console.log('ERROR CONNECTING TO MONGO', error);
});


//Move to /todo router later
const Schema = mongoose.Schema; // Set schema for database

//validates data being sent to DB to ensure all properties exist
const todoSchema = new Schema({
  task: { type: String, required: true },
  completed: { type: Boolean, required: true, default: false },
  category: { type: String, required: true, default: ' '}
});

//sets model, allows interaction with DB
const Todo = mongoose.model('todo', todoSchema);

//spin up server
app.listen(PORT, () => {
  console.log('Listening on port', PORT);
})

//retrieves all items currently stored in DB
app.get('/todo', (req, res) => {
  Todo.find({}).then(function (todosFound) {
    console.log('/todo GET hit:', todosFound)
    res.send(todosFound);//respond to client with db items
  }).catch((error) => {
    console.log('Error retrieving todos:', error);
    res.sendStatus(500); // server error
  })
})

//creates new todo item on DB
app.post('/todo', (req, res) => {
  let dataFromClient = req.body;
  Todo.create(dataFromClient).then(() => {
    console.log('Todo added:', dataFromClient);
    res.sendStatus(201);//success!
  }).catch((error) => {
    console.log('Error adding todo:', error);
    res.sendStatus(500);//server error
  })
})

//deletes selected item from DB
app.delete('/todo', (req, res) => {
  let todoToDelete = req.query._id
  Todo.findByIdAndRemove(todoToDelete).then(() => {
    console.log('Deleted');
    res.sendStatus(200);//success!
  }).catch((error) => {
    console.log('Error deleting item:', error);
    res.sendStatus(500);//server error
  })
})


//Updates completed property of selected todo item with value: true
app.put('/todo', (req, res) => {
  console.log('PUT. Item to edit:', req.query)
  const todoToEdit = {
    _id: req.query._id,
    completed: true,
  }
  Todo.findByIdAndUpdate(todoToEdit._id, todoToEdit).then((response)=>{
    console.log('Todo marked as complete:', response);
    res.sendStatus(200);//success!
  }).catch((error)=>{
    console.log('Error updating todo:'. error);
    res.sendStatus(500);//server error
  })
})