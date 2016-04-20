angular
  .module('app', ['ui.router', 'templates', 'uiGmapgoogle-maps'])
  .config(function($stateProvider, $urlRouterProvider, uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyCyq6FsbEY-tBqO05UA9cQw5OjWBRw9oTM',
        v: '3.20', //defaults to latest 3.X anyhow
        libraries: 'weather,geometry,visualization'
    });
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
