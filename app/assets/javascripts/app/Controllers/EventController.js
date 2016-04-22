function EventController(event, uiGmapGoogleMapApi, $scope, uiGmapIsReady, UserEvent, Auth, $state){

  var ctrl = this;
  ctrl.data = event.data;
  ctrl.category = ctrl.data.categories.category[0].name.replace('&amp; ', '');
  ctrl.date = Date.parse(ctrl.data.start_time);
  $scope.signedIn = Auth.isAuthenticated;

  var map = {
    center : {
        latitude: ctrl.data.latitude,
        longitude: ctrl.data.longitude
    },
    zoom : 11,
    control : {}
  };

  uiGmapGoogleMapApi.then(function(maps) {
    $scope.map     = map;
    $scope.options = { scrollwheel: true, scrollwheel: true, mapMakers: true };
    $scope.markers = [{
      id: 1,
      coords: { latitude: ctrl.data.latitude, longitude: ctrl.data.longitude},
      show: true
    }];
  });

  ctrl.addEvent = function(ourEvent){
    ctrl.event = UserEvent.create(ourEvent, function(res){
      // $('#add-event-message').text('Have fun attending the ' + res.title +'!');
    });
  };
};


angular
  .module('app')
  .controller('EventController', EventController);
