function UserEventsController(user, User) {
  var ctrl = this;

  User.get({'id': user.id}, function(res){
    ctrl.events = res.events;
  });

  ctrl.removeEvent = function(index) {
    var apiEvent = this.events[index];
    User.delete({id: apiEvent.id});
    this.events.splice(index,1);
  };
};

angular
.module('app')
.controller('UserEventsController', ['user', 'User', UserEventsController]);
