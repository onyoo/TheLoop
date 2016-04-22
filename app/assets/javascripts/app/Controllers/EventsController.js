function EventsController(EventsService, uiGmapGoogleMapApi, $scope, uiGmapIsReady){
  var ctrl = this;

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

  if(!!navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      // can use .watchPosition(); for periodic updates to coords

      var searchCoords = position.coords.latitude+","+position.coords.longitude+"&within=25";

      EventsService.byZipcode(searchCoords).then(function(events) {
        ctrl.data      = events.data.events.event;
        ctrl.latitude  = events.data.events.event[0].latitude;
        ctrl.longitude = events.data.events.event[0].longitude;

        var map = {
            center : {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            },
            zoom : 10,
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
               },
               show: true
             });
           };
        });

      });

    });
  } else {
    console.log('Sorry, your browser does not support geolocation.')
    document.getElementById('your_location_map').innerHTML = 'Sorry, Your Browser Does Not Support Geolocation.';
  }

};

angular
  .module('app')
  .controller('EventsController', EventsController);
