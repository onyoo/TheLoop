function AuthController($scope, $state, $location, Auth){

  $scope.login = function() {
    Auth.login($scope.user).then(function(){
      $state.go('home.events');
    });
  };

  $scope.register = function() {
    Auth.register($scope.user).then(function() {
      $state.go('home.events');
    });
  };
}

angular
  .module('app')
  .controller('AuthController', AuthController);
