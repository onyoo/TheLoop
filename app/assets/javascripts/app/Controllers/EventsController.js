function EventsController(events, EventsService, uiGmapGoogleMapApi, $scope){
  var ctrl = this;
  ctrl.data      = events.data.events.event;
  ctrl.latitude  = events.data.events.event[0].latitude
  ctrl.longitude = events.data.events.event[0].longitude

  ctrl.zipcodeSearch = function() {
    EventsService.byZipcode(ctrl.zipcode).then(function(resp) {
      ctrl.data      = resp.data.events.event;
      ctrl.latitude  = resp.data.events.event.latitude;
      ctrl.longitude = resp.data.events.event.longitude;
    });
  };

  var areaLat      = ctrl.latitude,
      areaLng      = ctrl.longitude,
      areaZoom     = 8;

  uiGmapGoogleMapApi.then(function(maps) {
    $scope.map     = { center: { latitude: areaLat, longitude: areaLng }, zoom: areaZoom };
    $scope.options = { scrollwheel: false };
  });

};

angular
  .module('app')
  .controller('EventsController', EventsController);
