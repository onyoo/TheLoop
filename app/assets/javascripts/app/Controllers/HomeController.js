function HomeController($scope, uiGmapIsReady) {

  $scope.map = {
      center : {
          latitude: 51.5,
          longitude: -0.1
      },
      zoom : 9,
      control : {}
  };


  uiGmapIsReady.promise()
  .then(function (map_instances) {

    var map1 = $scope.map.control;    // get map object through $scope.map.control getGMap() function
    var map2 = map_instances[0].map;            // get map object through array object returned by uiGmapIsReady promise
  });

};

angular
  .module('app')
  .controller('HomeController', HomeController);
