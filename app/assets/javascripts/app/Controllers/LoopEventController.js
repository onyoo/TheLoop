function LoopEventController(event, uiGmapGoogleMapApi, $scope, uiGmapIsReady, UserEvent, Auth, $state, Comment, $http){

  var ctrl = this;

  ctrl.data = event.data;
  if(ctrl.data.category){
    ctrl.category = ctrl.data.category.name.replace('&amp; ', '');
  }
  ctrl.date = new Date(ctrl.data.start_time);
  $scope.signedIn = Auth.isAuthenticated;

  Auth.currentUser()
    .then(function(user) {
      ctrl.user = user;
      console.log(ctrl.user);
    });

  ctrl.comment = new Comment();

  ctrl.addComment = function(event, comment, user) {
    comment.event_id = event;
    comment.user_id = user;

    comment.$save(function(result) {
      console.log(result);
    });
    ctrl.comment = new Comment();
    $state.go($state.current, {}, {reload: true});
  };

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
      $state.go('home.myEvents');
    });
  };
  ctrl.editable = '';

  ctrl.canEdit = Auth.currentUser().then(function(resp) {
    ctrl.editable = resp.id == ctrl.data.creator && ctrl.data.api_id == undefined;
  });

  ctrl.attending = Auth.currentUser().then(function(resp){
    return ctrl.attending = ctrl.data.users.some(function(user){
      return resp.id == user.id;
    });
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
