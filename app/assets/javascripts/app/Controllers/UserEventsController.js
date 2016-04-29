function UserEventsController(User, Auth, $http) {
  var ctrl = this;

  ctrl.user = Auth.currentUser().then(function(user) {
    ctrl.events = User.get({ 'id': user.id });
  });
};


angular
.module('app')
.controller('UserEventsController', UserEventsController);
