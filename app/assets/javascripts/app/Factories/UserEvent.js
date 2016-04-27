
function UserEvent($resource){

  var host = 'https://localhost:3000/api/v1/';

  var UserEvent = $resource( host + 'events/:id.json',{id: '@id'},{
        query: { method: 'GET', isArray: true },
        create: { method: 'POST' },
        update: { method: 'PUT' },
        delete: { method: 'DELETE' }
  });
  return UserEvent;
}

angular
  .module('app')
  .factory('UserEvent', ['$resource', UserEvent]);
