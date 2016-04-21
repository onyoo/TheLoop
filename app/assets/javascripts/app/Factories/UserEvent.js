angular
  .module('app')
  .factory('UserEvent', UserEvent);

function UserEvent($resource){

  var host = 'http://localhost:3000/api/v1/';

  var UserEvent = $resource( host + '/events/:id.json',{user_id: '@someId'},{
        query: { method: 'GET', isArray: true },
        create: { method: 'POST' },
        update: { method: 'PUT' },
        delete: { method: 'DELETE' }
  });
  return UserEvent;
}



// {user_id: '@someId'}, I took this out for testing purposes