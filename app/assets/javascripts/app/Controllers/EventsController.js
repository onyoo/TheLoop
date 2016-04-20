function EventsController(events, EventsService, uiGmapGoogleMapApi, $scope){
  var ctrl = this;
  ctrl.data = events.data.events.event;

  ctrl.zipcodeSearch = function() {
    EventsService.byZipcode(ctrl.zipcode).then(function(resp) {
      ctrl.data = resp.data.events.event;
    });
  };

  var areaLat      = 44.2126995,
      areaLng      = -100.2471641,
      areaZoom     = 3;

  uiGmapGoogleMapApi.then(function(maps) {
    $scope.map     = { center: { latitude: areaLat, longitude: areaLng }, zoom: areaZoom };
    $scope.options = { scrollwheel: false };
  });

};

angular
  .module('app')
  .controller('EventsController', EventsController);
