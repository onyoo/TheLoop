angular
  .module('app', ['ui.router'])
  .config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'LoopApp/Templates/home.html',
        controller: 'EventsController as EventsCtrl'
      });
  });
