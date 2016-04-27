  
function User($resource){

  var host = '/api/v1/';

  var User = $resource( host + '/users/:id.json', {user_id: '@userId'}, {
        query: { method: 'GET', isArray: true },
        get: {method: 'GET'},
        create: { method: 'POST' },
        remove: { method: 'PUT' },
        update: { method: 'PUT' },
        delete: { method: 'DELETE' }
  });
  return User;
}

angular
.module('app')
.factory('User', ['$resource', User]);
