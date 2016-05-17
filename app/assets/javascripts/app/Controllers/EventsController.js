function EventsController(EventsService, uiGmapGoogleMapApi, $scope, uiGmapIsReady, Restangular, $location, $anchorScroll, MapService, EventFactory, $q){
  var ctrl = this;

  ctrl.zipcodeSearch = function() {
    EventsService.loopEventsZipcode(ctrl.zipcode).then(function(events) {
      ctrl.localEvents = events.data;
    });

    EventsService.eventfulEvents(ctrl.zipcode).then(function(resp) {
      ctrl.data      = resp.data.events.event;
      ctrl.latitude  = resp.data.events.event.latitude;
      ctrl.longitude = resp.data.events.event.longitude;

      var map = {
          center : {
              latitude: ctrl.data[0].latitude,
              longitude: ctrl.data[0].longitude
          },
          zoom : 10,
          control : {}
      };

      uiGmapGoogleMapApi.then(function(maps) {
        $scope.map     = map;
        $scope.options = { scrollwheel: true, scrollwheel: true, mapMakers: true };
        $scope.markers = [];

        ctrl.allEvents = ctrl.localEvents.concat(ctrl.data);
        for(var i = 0; i < ctrl.allEvents.length; i++) {
           $scope.markers.push({
             id: i,
             coords: {
               latitude: ctrl.allEvents[i].latitude,
               longitude: ctrl.allEvents[i].longitude
             },
             show: true
           });
         };
      });
    });
  };

  if(!!navigator.geolocation) {
    $scope.loading = true;

    MapService.getAllEvents.then(function(res){
      ctrl.allEvents = res.allEvents;
      $scope.map = res.map;
      $scope.options = { scrollwheel: true, scrollwheel: true, mapMakers: true };

      MapService.constructMarkers(ctrl.allEvents).then(function(res){
        $scope.markers = res;
      });

      $scope.loading = false;
    });
  } else {
    console.log('Sorry, your browser does not support geolocation.');
    document.getElementById('your_location_map').innerHTML = 'Sorry, Your Browser Does Not Support Geolocation.';
  };

  // $scope.markerClick = function(map, event, marker) {
  //   debugger;
  //  var newHash = 'anchor' + marker.id;
  //  if ($location.hash() !== newHash) {
  //      $location.hash(newHash);
  //      $('li.active-marker').removeClass('active-marker')
  //      $('#' + newHash).addClass('active-marker');
  //    } else {
  //      $anchorScroll();
  //    };
  // };
};

angular
  .module('app')
  .controller('EventsController', EventsController);
