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
        controller: 'EventsController as ctrl'
      })
      .state('home.event', {
        url: 'event/:id',
        templateUrl: 'events/event_show.html',
        controller: 'EventController as event',
        resolve: {
          event: ['$stateParams', 'EventfulService', 'EventsService', function ($stateParams, EventfulService, EventsService) {
            if ($stateParams.id.search('-') > 0) {
              return EventfulService.getEvent($stateParams.id);
            } else {
              return EventsService.getPersistedEvent($stateParams.id);
            };
          }]
        }
      })
      .state('home.myEvents', {
        url: 'my_events',
        templateUrl: 'events/my_events.html',
        controller: 'UserEventsController as ctrl',
        resolve: {
          user: ['Auth', function(Auth){
            return Auth.currentUser();
          }]
        }
      })
      .state('home.localView', {
        url: 'localview',
        templateUrl: 'events/local_view.html',
        controller: 'LocalController as local'
      });

    $urlRouterProvider.otherwise('/localview');
  }]);
