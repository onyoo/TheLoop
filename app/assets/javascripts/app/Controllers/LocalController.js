function LocalController($scope, $state, GeoLocationService, MapService, uiGmapIsReady) {
  var ctrl = this;

  function assignMarkers(events){
    return MapService.constructMarkers(events).then(function(res){
      $scope.markers = res;
    });
  };

  if(!!navigator.geolocation) {
    $scope.loading = true;

    GeoLocationService.getEventsByGeoLocation().then(function(res){
      ctrl.allEvents = res.allEvents;
      $scope.map = res.map;
      $scope.options = { scrollwheel: true, scrollwheel: true, mapMakers: true };
      assignMarkers(ctrl.allEvents);

      $scope.loading = false;

      // $scope.map.markers = {
      //   mouseover: function (marker, eventName, model, args) {
      //     debugger;
      //     model.options.labelContent = "Position - lat: " + model.latitude + " lon: " + model.longitude;
      //     marker.showWindow = true;
      //     $scope.$apply();
      //   },
      //   mouseout: function (marker, eventName, model, args) {
      //     model.options.labelContent = " ";
      //     marker.showWindow = false;
      //     $scope.$apply();
      //   }
      // };
    });
  } else {
    console.log('Sorry, your browser does not support geolocation.');
    document.getElementById('your_location_map').innerHTML = 'Sorry, Your Browser Does Not Support Geolocation.';
  };

  $scope.markerClick = function(map, event, marker) {
    $state.go('home.event', {id: marker.id});
  };
};

angular
  .module('app')
  .controller('LocalController', ['$scope', '$state', 'GeoLocationService', 'MapService', 'uiGmapIsReady', LocalController]);
