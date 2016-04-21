function LocalController($scope, uiGmapIsReady) {

  $scope.map = {
      center : {
          latitude: 51.5,
          longitude: -0.1
      },
      zoom : 9,
      control : {}
  };

  if(!!navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
                      // can use .watchPosition(); for periodic updates to coords
      $scope.map = {
        center : {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        },
        zoom : 18,
        control : {}
      };

      uiGmapIsReady.promise()
      .then(function (map_instances) {
        var map1 = $scope.map.control;    // get map object through $scope.map.control getGMap() function
        var map2 = map_instances[0].map;            // get map object through array object returned by uiGmapIsReady promise
      });
    });
  } else {
      console.log('Sorry, your browser does not support geolocation.')
      document.getElementById('your_location_map').innerHTML = 'Sorry, Your Browser Does Not Support Geolocation.';
  }

};

angular
  .module('app')
  .controller('LocalController', LocalController);
