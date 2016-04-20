angular
  .module('app', ['ui.router'])
  .config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'home.html',
        controller: 'EventsController as EventsCtrl'
      });
    $urlRouterProvider.otherwise('/');
  });
