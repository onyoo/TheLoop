function EventsService($http, $q, EventFactory, EventfulService){

  function concatenateEvents(events){
    return events.localEvents.concat(events.eventfulEvents.data.events.event);
  };

  this.getEvents = function(location) {
    return $q(function(resolve, reject) {
      $q.all({
        localEvents: EventFactory.query({location: location}),
        eventfulEvents: EventfulService.eventfulEvents(location)
      }).then(function(events){
        if (events) {
          resolve(concatenateEvents(events));
        } else {
          reject("Error loading events.");
        }
      });
    });
  };

  this.getLoopEvent = function(id) {
    return $http({
      method: 'get',
      url: '/api/v1/events/' + id
    });
  };

  this.checkLoopEvent = function(api_id) {
    return $http({
      method: 'get',
      url: '/api/v1/events/' + api_id + '/check'
    });
  };

  this.updateEvent = function(id, data) {
    return $http({
      method: 'put',
      url: '/api/v1/events/' + id,
      data: data
    });
  };

  this.loopEvents = function(coords){
    return $http({
      method: 'get',
      url: '/api/v1/events?location=' + coords
    });
  };

//   this.loopEventsZipcode = function(zip){
//     return $http.get('http://localhost:3000/api/v1/events?zipcode=' + zip);
// =======
//     return $http({
//       method: 'get',
//       url: '/api/v1/events?zipcode=' + zip
//     });
//   };
};

angular
  .module('app')
  .service('EventsService', ['$http', EventsService]);
