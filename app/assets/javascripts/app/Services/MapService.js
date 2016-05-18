function MapService($q, uiGmapGoogleMapApi){

  this.constructMap = function(apiEvent){
    return {
      center : {
        latitude: apiEvent.latitude,
        longitude: apiEvent.longitude
      },
      zoom : 10,
      control : {}
    };
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
