function EventController(event, uiGmapGoogleMapApi, $scope, uiGmapIsReady){
  var ctrl = this;
  ctrl.data = event.data;

      $scope.map = {
          center : {
              latitude: ctrl.data.latitude,
              longitude: ctrl.data.longitude
          },
          zoom : 11,
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
  .controller('EventController', EventController);
