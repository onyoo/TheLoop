function MapService($q, EventFactory, EventsService, uiGmapGoogleMapApi){
  var mapService = {};

  function constructMap(position) {
    return mapService.map = {
      center : {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      },
      zoom : 10,
      control : {}
    };
  };

  function constructCoordinates(position){
    return position.coords.latitude + "," + position.coords.longitude + "&within=25";
  };

  function concatenateEvents(events){
    return mapService.allEvents = events.localEvents.concat(events.eventfulEvents.data.events.event);
  };

  function getCoordinates() {
    return $q(function(resolve, reject) {
      navigator.geolocation.getCurrentPosition(function(position) {
        if(constructMap(position)) {
          getEvents(constructCoordinates(position)).then(function(allEvents){
            resolve (allEvents);
          });
        } else {
          reject ('There was an error loading events');
        };
      });
    });
  };

  function getEvents(coordinates) {
    return $q(function(resolve, reject) {
      $q.all({
        localEvents: EventFactory.query({location: coordinates}),
        eventfulEvents: EventsService.eventfulEvents(coordinates)
      }).then(function(events){
        if(concatenateEvents(events)) {
          resolve(mapService);
        } else {
          reject("Error loading events.");
        }
      });
    });
  };

  this.constructMarkers = function(allEvents){
    return uiGmapGoogleMapApi.then(function(maps) {
      var markers = [];

      for(var i = 0; i < allEvents.length; i++) {
        markers.push({
          id: allEvents[i].id,
          coords: {
            latitude: allEvents[i].latitude,
            longitude: allEvents[i].longitude
          },
          show: true
        });
      };
      return markers;
    });
  }

  this.getAllEvents = getCoordinates();
};

angular
  .module('app')
  .service('MapService', MapService);
