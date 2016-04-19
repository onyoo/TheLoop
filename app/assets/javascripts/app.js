angular
  .module('app', ['ui.Router'])
  .conig(function($stateProvider, $urlRouterProvider) [

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'LoopApp/Templates/home.html',
        controller: 'EventsController as EventsCtrl'
      });
  ]);
