function EventController(event, uiGmapGoogleMapApi, $scope, uiGmapIsReady, UserEvent, Auth, $state){
  var ctrl = this;
  ctrl.data = event.data;

  $scope.map = {
      center : {
          latitude: ctrl.data.latitude,
          longitude: ctrl.data.longitude
      },
      zoom : 11,
      control : {}
  };

  uiGmapIsReady.promise()
  .then(function (map_instances) {

      var map1 = $scope.map.control;    // get map object through $scope.map.control getGMap() function
      var map2 = map_instances[0].map;     // get map object through array object returned by uiGmapIsReady promise
    });

  ctrl.newEvent = new UserEvent;

  ctrl.addEvent = function(ourEvent){
    ctrl.event = UserEvent.create(ourEvent);
    ctrl.user = Auth.currentUser().then(function(user) {
      ctrl.event.$save({'user_id': user.id}).then(function(resp) {
        console.log('Event saved!');
        $state.go('home.events');
      }, function(error) {
        console.log("There was an error saving: " + error);
      });
    });
  };

};


angular
  .module('app')
  .controller('EventController', EventController);
