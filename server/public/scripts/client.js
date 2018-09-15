console.log('client.js');

//Angular Controller setup
const todoApp = angular.module('TodoApp', []);

todoApp.controller('TodoController', ['$http', function($http) {
  //set scope variable
  const vm = this;
  vm.test = 'Angular is loaded!';

  //vm variables
  vm.todoToAdd = {};
  vm.todoData = []

  //vm HTTP requests

  //GET
  vm.getTodos = function() {
    console.log('in getTodos');
  }

  //POST
  vm.addTodo = function() {
    console.log('in addTodo');
    vm.getTodos();
  }

  //PUT
  vm.markCompleted = function () {
    console.log('in markCompleted');
  }

  //DELETE
  vm.deleteTodo = function () {
    console.log('in deleteTodo');
  }

  //GET todos on page load
  vm.getTodos();
}])
