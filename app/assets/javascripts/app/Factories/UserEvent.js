angular
  .module('app')
  .factory('UserEvent', UserEvent);

function UserEvent($resource){
  var UserEvent = $resource('http:localhost:3000/api/v1/events/:id.json', {id: @id}, {
    update: { method: 'PUT'}
  });
  return UserEvent;
}



