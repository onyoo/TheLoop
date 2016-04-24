function LoopEventController(event, uiGmapGoogleMapApi, $scope, uiGmapIsReady, UserEvent, Auth, $state){

  var ctrl = this;
  ctrl.data = event.data;
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
      $('#add-event-message').text('Have fun attending the ' + res.title +'!');
    });
  };

  ctrl.editable = function(){
    return Auth._currentUser.id == this.data.creator && this.data.api_id == undefined;
  }

  ctrl.attending = function(){
    this.data.users.forEach(function(user){
      if (Auth._currentUser.id == user.id) {
        return true;
      }
    });
    return false;
  }
};


angular
  .module('app')
  .controller('LoopEventController', LoopEventController);
