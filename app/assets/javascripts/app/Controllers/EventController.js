function EventController(event, uiGmapGoogleMapApi, $scope){
  var ctrl = this;
  ctrl.data = event.data;

  var latitude  = ctrl.data.latitude;
  var longitude = ctrl.data.longitude;
  var areaZoom  = 8;

  uiGmapGoogleMapApi.then(function(maps) {
    $scope.map     = { center: { latitude: longitude, longitude: latitude }, zoom: areaZoom };
    $scope.options = { scrollwheel: false };
  });

};


angular
  .module('app')
  .controller('EventController', EventController);
