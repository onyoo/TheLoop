function EventsController(events, EventsService, uiGmapGoogleMapApi, $scope, uiGmapIsReady){
  var ctrl = this;
  ctrl.data      = events.data.events.event;
  ctrl.latitude  = events.data.events.event[0].latitude;
  ctrl.longitude = events.data.events.event[0].longitude;

  var map;
  var marker;

  ctrl.zipcodeSearch = function() {
    EventsService.byZipcode(ctrl.zipcode).then(function(resp) {
      ctrl.data      = resp.data.events.event;
      ctrl.latitude  = resp.data.events.event.latitude;
      ctrl.longitude = resp.data.events.event.longitude;
      var newLatLng = new google.maps.LatLng(ctrl.latitude, ctrl.longitude);
      marker.setPosition(newLatLng);
      map.setCenter(newLatLng);
    });
  };

  var map = {
      center : {
          latitude: ctrl.latitude,
          longitude: ctrl.longitude
      },
      zoom : 11,
      control : {}
  };

  uiGmapGoogleMapApi.then(function(maps) {
    $scope.map     = map;
    $scope.options = { scrollwheel: true, scrollwheel: true, mapMakers: true };
    $scope.markers = [];
    for(var i = 0; i < ctrl.data.length; i++) {
       $scope.markers.push({
         id: i,
         coords: {
           latitude: ctrl.data[i].latitude,
           longitude: ctrl.data[i].longitude
           }
       });
     }
  });

};

angular
  .module('app')
  .controller('EventsController', EventsController);
