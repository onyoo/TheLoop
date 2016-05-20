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

  this.getPersistedEvent = function(id) {
    return $http.get('/api/v1/events/' + id);
  };
};

angular
  .module('app')
  .service('EventsService', ['$http', '$q', 'EventFactory', 'EventfulService', EventsService]);
