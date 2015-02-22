'use strict';

/**
 * @ngdoc overview
 * @name eltiempoApp
 * @description
 * # eltiempoApp
 *
 * Main module of the application.
 */
angular
  .module('eltiempoApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/tiempo.html',
        controller: 'tiempoCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
