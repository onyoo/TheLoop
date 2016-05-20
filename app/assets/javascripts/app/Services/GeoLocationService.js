function GeoLocationService($q, EventsService, MapService){

  function constructCoordinates(position){
    return position.coords.latitude + "," + position.coords.longitude + "&within=25";
  };

  this.getEventsByGeoLocation = function() {
    return $q(function(resolve, reject) {
      navigator.geolocation.getCurrentPosition(function(position) {
        if (position) {
          EventsService.getEvents(constructCoordinates(position)).then(function(allEvents){
            resolve({ map: MapService.constructMap(position.coords, 10), allEvents: allEvents });
          });
        } else {
          reject('There was an error loading the events.');
        };
      });
    });
  };
};

angular
  .module('app')
  .service('GeoLocationService', GeoLocationService);
