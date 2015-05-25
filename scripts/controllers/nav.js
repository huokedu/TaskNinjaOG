'use strict';

app.controller('NavController', function($scope, $location, Auth) {

    $scope.signedIn = Auth.signedIn;
    $scope.currentUser = Auth.user;

    $scope.logout = function() {
        Auth.logout();
        console.log("Logged out!");
        $location.path('/');
    };

});