'use strict';

app.controller('TaskController', function($scope, $firebase, FIREBASEURL, $location, $routeParams) {

  var ref = new Firebase(FIREBASEURL);
  var fbTasks = $firebase(ref.child('/tasks')).$asArray();
  var taskId = $routeParams.taskId;

  function getTask(taskId) {
    return $firebase(ref.child('tasks').child(taskId)).$asObject();
  }

  if(taskId) {
    $scope.selectedTask = getTask(taskId);
  }

  $scope.tasks = fbTasks;

  $scope.postTask = function(task) {
    fbTasks.$add(task);
    $location.path('/browse');
  }

  $scope.updateTask = function(selectedTask) {
    $scope.selectedTask.$save(selectedTask);
    $location.path('/browse');
  }

});
