console.log('client.js');

//Angular Controller setup
const todoApp = angular.module('TodoApp', []);

todoApp.controller('TodoController', ['$http', function ($http) {
  //set scope variable
  const vm = this;

  //vm variables
  vm.todoToAdd = {};
  vm.todoData = [];
  vm.searchString = '';

  //vm HTTP requests

  //GET retrieves all database todo items
  vm.getTodos = function () {
    console.log('in getTodos');
    $http({
      method: 'GET',
      url: '/todo'
    }).then(function (response) {
      console.log('Back from /todo GET with:', response.data);
      //pushes response data to array for ng-repeat to loop over on DOM
      vm.todoData = response.data;
    }).catch(function (error) {
      console.log('Error retrieving todo items:', error);
    })
  }

  //POST sends user input to server for DB entry
  vm.addTodo = function () {
    console.log('in addTodo');
    $http({
      method: 'POST',
      url: '/todo',
      data: vm.todoToAdd
    }).then(function (response) {
      console.log('Back from /todo POST with:', response);
      //refresh todolist on DOM
      vm.getTodos();
      //reset inputs to empty
      vm.todoToAdd = {};
    }).catch(function (error) {
      console.log('Error adding todo:', error);
    })
  }

  //PUT changes completed property from false to true
  vm.markCompleted = function (todoToUpdate) {
    console.log('in markCompleted');
    $http({
      method: 'PUT',
      url: '/todo',
      params: todoToUpdate
    }).then(function (response) {
      console.log('Todo marked as complete!', response);
      //refresh todo list on DOM
      vm.getTodos();
    }).catch(function (error) {
      console.log('Error marking todo complete:', error);
    })
  }

  //DELETE selects a todo item for deletion
  vm.deleteTodo = function (todoToDelete) {
    console.log('in deleteTodo');
    //Popup SweetAlert confirmation dialog
    swal({
      title: 'Are you sure you want to delete?',
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then(function (willDelete) {
      if (willDelete) {
        $http({
          method: 'DELETE',
          url: '/todo',
          params: todoToDelete
        }).then(function (response) {
          //refresh todo list on DOM
          vm.getTodos();
          console.log('Back from /todo DELETE:', response);
        }).catch(function (error) {
          console.log('Error deleting item:', error);
        })
        //popup success dialog
        swal({
          title: 'Task successfully deleted!',
          icon: 'success'
        });
      } else {
        return;
      }
    });
  };
  //GET todos on page load
  vm.getTodos();
}]);