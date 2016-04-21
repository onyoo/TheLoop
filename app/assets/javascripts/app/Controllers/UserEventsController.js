function UserEventsController(User, Auth) {

  var ctrl = this;
  // change our ctrl.notes = []; to query the entire Note table
  ctrl.user = Auth.currentUser().then(function(user) {
    ctrl.events = User.get({ 'id': user.id });
    
  });

};


angular
.module('app')
.controller('UserEventsController', UserEventsController);
