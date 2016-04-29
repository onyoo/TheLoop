function LoopEventController(event, uiGmapGoogleMapApi, $scope, uiGmapIsReady, UserEvent, Auth, $state, Comment){

  var ctrl = this;
  ctrl.data = event.data;
  ctrl.category = ctrl.data.category.name;
  ctrl.date = new Date(ctrl.data.start_time);
  ctrl.comment = new Comment();


  ctrl.addComment = function(event, comment, user) {
    comment.event_id = event;
    comment.user_id = user;

    comment.$save(function(result) {
      ctrl.data.comments.push(result);
    });
    ctrl.comment = new Comment();
  };

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
    ctrl.event = UserEvent.create({event: this.data}, function(res){
      $state.go('home.myEvents');
    });
  };

  Auth.currentUser().then(function(user) {
    ctrl.user = user;
  });

  Auth.currentUser().then(function(resp){
    ctrl.attending = ctrl.data.users.some(function(user){
      return resp.id == user.id;
    });
  });

  Auth.currentUser().then(function(resp) {
    ctrl.editable = resp.id == ctrl.data.creator && ctrl.data.api_id == undefined;
  });

  $scope.$on('closeEditForm', function (emitEvent, data) {
    $scope.editEvent = false;
  });

  $scope.$on('eventUpdated', function (emitEvent, data) {
    ctrl.data = data;
    $scope.editEvent = false;
  });
};
angular
  .module('app')
  .controller('LoopEventController', LoopEventController);
