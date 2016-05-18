function VenuesService($http) {
  this.getVenue = function(venue_id) {
    return $http.get('http://localhost:3000/api/v1/venues/' + venue_id);
  };
};

angular
  .module('app')
  .service('VenuesService', VenuesService);
