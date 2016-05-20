function UserEventsController($scope, user, User) {
  var ctrl = this;

  User.get({'id': user.id}, function(res){
    ctrl.events = res.events;
  });

  ctrl.removeEvent = function(index) {
    var apiEvent = this.events[index];
    User.delete({id: apiEvent.id});
    this.events.splice(index,1);
  };

  $scope.$on('newEvent', function(e, event) { 
    ctrl.events.push(event);
  });

};

angular
.module('app')
.controller('UserEventsController', ['$scope', 'user', 'User', UserEventsController]);
