function NavbarController($scope, Auth, $state, $location) {

  $scope.signedIn = Auth.isAuthenticated;

  $scope.logout = Auth.logout;

  Auth.currentUser()
    .then(function(user) {
      $scope.user = user;
    });

  $scope.$on('devise:new-registration', function(e, user) {
    $scope.user = user;
  });

  $scope.$on('devise:login', function(e, user) {
    $scope.user = user;
  });

  $scope.$on('devise:logout', function(e, user) {
    $scope.user = {};
    $location.path('home.login');
  });

  $scope.$on('closeForm', function (event, data) {
    $scope.newEvent = data
  });
};

angular
.module('app')
.controller('NavbarController', ['$scope', 'Auth', '$state', '$location', NavbarController]);
