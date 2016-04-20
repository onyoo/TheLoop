angular
  .module('app', ['ui.router', 'templates'])
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'home.html'
      })
      .state('events', {
        url: '/events',
        templateUrl: 'events/events_index.html',
        controller: 'EventsController as ctrl',
        resolve: {
          events: function (EventsService) {
            return EventsService.byZipcode(84074);
          }
        }
      // })
      // .state('event', {
      //   url: '/event/:id',
      //   templateUrl: 'views/show_event.html',
      //   controller: 'EventController as event',
      //   resolve: {
      //     story: function ($stateParams, EventsService) {
      //       return EventsService.getEvent($stateParams.id);
      //     }
      //   }
      });
    $urlRouterProvider.otherwise('/');
  });
