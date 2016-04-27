angular
  .module('app', ['ui.router', 'templates', 'uiGmapgoogle-maps', 'Devise', 'ngResource', 'ngSanitize', 'ngMessages', 'puigcerber.countryPicker', 'statePicker'])
  .config(['$stateProvider', '$urlRouterProvider', 'uiGmapGoogleMapApiProvider', function($stateProvider, $urlRouterProvider, uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyCyq6FsbEY-tBqO05UA9cQw5OjWBRw9oTM',
        v: '3.23',
        libraries: 'weather,geometry,visualization'
    });
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'home.html',
        abstract: true
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
      })
      .state('home.event', {
        url: 'show/:id',
        templateUrl: 'events/event_show_page.html',
        controller: 'EventController as event',
        resolve: {
          event: ['$stateParams', 'EventsService', function ($stateParams, EventsService) {
            return EventsService.getEvent($stateParams.id);
          }
        }]
      })
      .state('home.loopEvent', {
        url: 'loopShow/:id',
        templateUrl: 'events/loop_event_show_page.html',
        controller: 'LoopEventController as event',
        resolve: {
          event: ['$stateParams', 'EventsService', function ($stateParams, EventsService) {
            return EventsService.getLoopEvent($stateParams.id);
          }
        }]
      })
      .state('home.myEvents', {
        url: 'my_events',
        templateUrl: 'events/my_events.html',
        controller: 'UserEventsController as ctrl'
      })
      .state('home.localView', {
        url: 'localview',
        templateUrl: 'events/local_view.html',
        controller: 'LocalController as local'
      });
    $urlRouterProvider.otherwise('/localview');
  }]);
