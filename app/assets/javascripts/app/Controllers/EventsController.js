function EventsController(EventsService, uiGmapGoogleMapApi, $scope, uiGmapIsReady, Restangular){
  var ctrl = this;

  ctrl.zipcodeSearch = function() {
    EventsService.loopEventsZipcode(ctrl.zipcode).then(function(events) {
      ctrl.localEvents = events.data;
    });

    EventsService.apiEvents(ctrl.zipcode).then(function(resp) {
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

      // uiGmapIsReady.promise().then(function(map_instances) {
      //   $scope.map = map;
      //   $scope.markers = [];
      //   var events = ctrl.data.concat(ctrl.loop);
      //   for(var i = 0; i < events.length; i++) {
      //      $scope.markers.push({
      //        id: i,
      //        coords: {
      //          latitude: events[i].latitude,
      //          longitude: events[i].longitude
      //        },
      //        show: true
      //      });
      //    };
      //   });
      // });

  if(!!navigator.geolocation) {
    $scope.loading = true;
    navigator.geolocation.getCurrentPosition(function(position) {
      var searchCoords = position.coords.latitude + "," + position.coords.longitude + "&within=25";
      // can use .watchPosition(); for periodic updates to coords
      // var loopCoords = position.coords.latitude+","+position.coords.longitude;
      //
      // EventsService.loopEvents(searchCoords).then(function(events) {
      //   ctrl.loop = events.data;
      // });

      var getEvents = Restangular.all('events');

      getEvents.getList({location: searchCoords}).then(function(events) {
        ctrl.localEvents = events;
      });

     EventsService.apiEvents(searchCoords).then(function(events) {
        ctrl.data = events.data.events.event;
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
        $scope.loading = false;
      });
    });
  } else {
    console.log('Sorry, your browser does not support geolocation.');
    document.getElementById('your_location_map').innerHTML = 'Sorry, Your Browser Does Not Support Geolocation.';
  };

};

angular
  .module('app')
  .controller('EventsController', EventsController);
