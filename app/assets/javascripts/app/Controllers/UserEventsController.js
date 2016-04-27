function UserEventsController(User, Auth, $http) {
  var ctrl = this;

  ctrl.user = Auth.currentUser().then(function(user) {
    ctrl.events = User.get({ 'id': user.id });
  });

  // ctrl.events = [];
  // ctrl.user = Auth.currentUser().then(function(user) {
  //   $http.get('/api/v1/users/' + user.id + '/events').then(function(res){
  //     ctrl.events = res.data;
  //   })
  // });
  // $http.get('/api/v1/users/' + user.id + '/events').then(function(res){
  //   ctrl.events = res.data;
  // });
};


angular
.module('app')
.controller('UserEventsController', UserEventsController);
