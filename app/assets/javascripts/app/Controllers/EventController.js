function EventController(event, $scope, $state, Auth, UserEvent, CategoriesService, MapService){
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
};

angular
  .module('app')
  .controller('EventController', ['event', '$scope', '$state', 'Auth', 'UserEvent', 'CategoriesService', 'MapService', EventController]);
