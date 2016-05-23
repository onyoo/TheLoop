function UserEventsController($scope, user, User) {
  var ctrl = this;

  User.get({'id': user.id}, function(res){
    ctrl.events = res;
  });

  $scope.$on('newEvent', function(e, event) {
    ctrl.events.push(event);
  });

  $scope.$on('removeEvent', function(e, removedEvent){
    ctrl.events.forEach(function(event, index){
      if (event.id == removedEvent.id) {
        ctrl.events.splice(index, 1);
      }
    })
  });

};

angular
.module('app')
.controller('UserEventsController', ['$scope', 'user', 'User', UserEventsController]);
