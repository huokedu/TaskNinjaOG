'use strict';

var app = angular
  .module('TaskNinjaApp', [
    'ngAnimate',
    'ngResource',
    'ngRoute',
    'firebase'
  ])
  .constant('FURL', 'https://ogfirebaseapp.firebaseIO.com')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'taskController'
      })
      .when('/post', {
        templateUrl: 'views/post.html',
        controller: 'taskController'
      })
      .when('/browse', {
        templateUrl: 'views/browse.html'
      })
      .when('/edit', {
        templateUrl: 'views/edit.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
