angular
  .module('app')
  .factory('YourEvents', YourEvents );

function YourEvents($resource){
  return $resource('/api/v1/events/:id', {event_id: '@event_id'}, {});
}
