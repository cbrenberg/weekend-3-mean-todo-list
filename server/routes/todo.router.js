const express = require('express');
const mongoose = require('mongoose');
const router = express.Router()
const Schema = mongoose.Schema;

//validates data being sent to DB to ensure all properties exist
const todoSchema = new Schema({
  task: { type: String, required: true },
  completed: { type: Boolean, required: true, default: false },
  category: { type: String, required: true, default: ' ' }
});

//sets model, allows validation and interaction with DB
const Todo = mongoose.model('todo', todoSchema);

//retrieves all items currently stored in DB
router.get('/', (req, res) => {
  Todo.find({}).then(function (todosFound) {
    console.log('/todo GET hit:', todosFound)
    res.send(todosFound);//respond to client with db items
  }).catch((error) => {
    console.log('Error retrieving todos:', error);
    res.sendStatus(500); // server error
  })
})

//creates new todo item on DB
router.post('/', (req, res) => {
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
router.delete('/', (req, res) => {
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
router.put('/', (req, res) => {
  console.log('PUT. Item to edit:', req.query)
  const todoToEdit = {
    _id: req.query._id,
    completed: true,
  }
  Todo.findByIdAndUpdate(todoToEdit._id, todoToEdit).then((response) => {
    console.log('Todo marked as complete:', response);
    res.sendStatus(200);//success!
  }).catch((error) => {
    console.log('Error updating todo:'.error);
    res.sendStatus(500);//server error
  })
})

module.exports = router;