angular
  .module('app', ['ui.router', 'templates'])
  .config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'home.html',
        controller: 'EventsController as EventsCtrl'
      });
    $urlRouterProvider.otherwise('/');
  });
