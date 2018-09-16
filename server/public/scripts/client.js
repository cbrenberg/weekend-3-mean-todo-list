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
    $http({
      method: 'GET', 
      url: '/todo'
    }).then(function(response) {
      console.log('Back from /todo GET with:', response.data);
      vm.todoData = response.data;
    }).catch(function(error) {
      console.log('Error retrieving todo items:', error);
    })
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
