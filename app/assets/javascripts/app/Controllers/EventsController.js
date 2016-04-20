function EventsController(events, EventsService, uiGmapGoogleMapApi, $scope){
  var ctrl = this;
  ctrl.data = events.data.events.event;

  ctrl.zipcodeSearch = function() {
    EventsService.byZipcode(ctrl.zipcode).then(function(resp) {
      ctrl.data = resp.data.events.event;
    });
  };

  uiGmapGoogleMapApi.then(function(maps) {
    $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
    $scope.options = { scrollwheel: false };
  });

};

angular
  .module('app')
  .controller('EventsController', EventsController);
