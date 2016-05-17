function MapService($q, EventsService, uiGmapGoogleMapApi){

  function constructCoordinates(position){
    return position.coords.latitude + "," + position.coords.longitude + "&within=25";
  };

  function constructGeoMap(position) {
    return {
      center : {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      },
      zoom : 10,
      control : {}
    };
  };

  this.constructZipcodeMap = function(events){
    return {
      center : {
        latitude: events[0].latitude,
        longitude: events[0].longitude
      },
      zoom : 12,
      control : {}
    };
  };

  this.getEventsByGeoLocation = function() {
    return $q(function(resolve, reject) {
      navigator.geolocation.getCurrentPosition(function(position) {
        if (position) {
          EventsService.getEvents(constructCoordinates(position)).then(function(allEvents){
            resolve({ map: constructGeoMap(position), allEvents: allEvents });
          });
        } else {
          reject('There was an error loading the events.');
        };
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
  };
};

angular
  .module('app')
  .service('MapService', MapService);
