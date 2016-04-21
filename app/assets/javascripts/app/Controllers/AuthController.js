function AuthController($scope, $state, $location, Auth){

  $scope.login = function() {
    Auth.login($scope.user).then(function(){
      $state.go('home.events');
    }, function(error){
      $('.auth-errors').html(error.data.error);
    });
  };

  $scope.register = function() {
    Auth.register($scope.user).then(function() {
      $state.go('home.events');
    }, function(error){
      $('.auth-errors').html('Email ' + error.data.errors.email);
      if (error.data.errors.password != undefined) {
        $('.auth-errors').html('Password ' + error.data.errors.password);
      }
    });
  };
}

angular
  .module('app')
  .controller('AuthController', AuthController);
