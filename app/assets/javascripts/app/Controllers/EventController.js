function EventController(event, uiGmapGoogleMapApi, $scope, uiGmapIsReady, UserEvent, Auth, $state){
  var ctrl = this;
  ctrl.data = event.data;

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
    $scope.options = { scrollwheel: false };
  });


  ctrl.addEvent = function(ourEvent){
    ctrl.event = UserEvent.create(ourEvent);
    ctrl.user = Auth.currentUser().then(function(user) {
      ctrl.event.$save({'user_id': user.id}).then(function(resp) {
        debugger;
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
