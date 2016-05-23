function VenuesService($http) {
  this.getVenue = function(venue_id) {
    return $http.get('/api/v1/venues/' + venue_id);
  };

  this.assignVenue = function(api_event){
    if (api_event.venue_name){
      return  api_event.venue_name
     } else {
      return api_event.venue.name;
    };
  };
};

angular
  .module('app')
  .service('VenuesService', VenuesService);
