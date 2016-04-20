function AuthController($scope, $state, Auth){

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

  $scope.signedIn = Auth.isAuthenticated;
  $scope.logout = Auth.logout;

  $scope.$on('devise:new-registration', function (e, user){
    $scope.user = user;
  });

  $scope.$on('devise:login', function (e, user){
    $scope.user = user;
  });

  $scope.$on('devise:logout', function (e, user){
    $scope.user = {};
  });
}

angular
  .module('app')
  .controller('AuthController', AuthController);
