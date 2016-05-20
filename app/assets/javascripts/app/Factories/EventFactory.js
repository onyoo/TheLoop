function EventFactory($resource) {
  var EventFactory = $resource('http://localhost:3000/api/v1/events/', {event_id: '@event_id'}, {
    query: { method: 'GET', isArray: true },
  });

  return EventFactory;
}

angular
  .module('app')
  .factory('EventFactory', EventFactory);
