angular
  .module('app', ['ui.router', 'templates'])
  .config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'home.html',
        controller: 'EventsController as EventsCtrl'
      })
      .state('events', {
        url: '/events',
        templateUrl: '/events/events_index.html',
        controller: 'EventsController as ctrl',
        resolve: {
          stories: function (EventsService) {
            return EventsService.getEvents();
          }
        }
      });
    $urlRouterProvider.otherwise('/');
  });
