angular
  .module('app', ['ui.router', 'templates', 'uiGmapgoogle-maps', 'Devise'])
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
      .state('home.login', {
        url: 'login',
        templateUrl: 'auth/login.html',
        controller: 'AuthController',
        onEnter: ['$state', 'Auth', function($state, Auth) {
          Auth.currentUser().then(function(){
            $state.go('home.events');
          });
        }]
      })
      .state('home.register', {
        url: 'register',
        templateUrl: 'auth/register.html',
        controller: 'AuthController',
        onEnter: ['$state', 'Auth', function($state, Auth) {
          Auth.currentUser().then(function(){
            $state.go('home.events');
          });
        }]
      })
      .state('home.events', {
        url: 'events',
        templateUrl: 'events/events_index.html',
        controller: 'EventsController as ctrl',
        resolve: {
          events: function (EventsService) {
            return EventsService.byZipcode(84074);
          }
        }
      })
      .state('home.event', {
        url: '/:id',
        templateUrl: 'events/event_show_page.html',
        controller: 'EventController as event',
        resolve: {
          event: function ($stateParams, EventsService) {
            return EventsService.getEvent($stateParams.id);
          }
        }
      });
    $urlRouterProvider.otherwise('/');
  });
