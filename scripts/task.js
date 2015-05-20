'use strict';

app.controller('TaskController', function($scope, $firebase, FIREBASEURL) {

  var ref = new Firebase(FIREBASEURL);
  var fbTasks = $firebase(ref.child('/tasks')).$asArray();

  $scope.postTask = function(task) {
    fbTasks.$add(task);
  }
});
