function EventController(event, $scope, $state, Auth, UserEvent, CategoriesService, MapService, Comment){
  var ctrl = this;
  ctrl.data = event.data;
  ctrl.date = Date.parse(ctrl.data.start_time);
  ctrl.category = CategoriesService.assignCategory(ctrl.data);

  $scope.signedIn = Auth.isAuthenticated;
  $scope.map = MapService.constructMap(ctrl.data);
  $scope.options = { scrollwheel: true, scrollwheel: true, mapMakers: true };

  MapService.constructMarkers([ctrl.data]).then(function(res){
    $scope.markers = res;
  });

  ctrl.addEvent = function(){
    UserEvent.create({event: this.data}, function(res){
      $state.go('home.myEvents');
    });
  };

  Auth.currentUser().then(function(resp){
    ctrl.user = resp;
    ctrl.comment = new Comment({user_id: ctrl.user.id, event_id: ctrl.data.id});
    ctrl.attending = ctrl.data.users.some(function(user){
      return resp.id == user.id;
    });
    ctrl.editable = resp.id == ctrl.data.creator && ctrl.data.api_id == undefined;
  });

  $scope.$on('closeEditForm', function (emitEvent, data) {
    $scope.editEvent = false;
  });

  $scope.$on('eventUpdated', function (emitEvent, data) {
    ctrl.data = data;
    $scope.editEvent = false;
  });

  ctrl.addComment = function() {
    this.comment.$save(function(comment){
       ctrl.data.comments.push(comment);
    });

    ctrl.comment = new Comment({user_id: ctrl.user.id, event_id: ctrl.data.id});
  };
};

angular
.module('app')
.controller('EventController', ['event', '$scope', '$state', 'Auth', 'UserEvent', 'CategoriesService', 'MapService', 'Comment', EventController]);
