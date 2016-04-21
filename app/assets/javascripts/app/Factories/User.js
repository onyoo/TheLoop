angular
  .module('app')
  .factory('User', User);

function User($resource){

  var host = 'http://localhost:3000/api/v1/';

  var User = $resource( host + '/users/:id.json', {user_id: '@someId'}, {
        query: { method: 'GET', isArray: true },
        create: { method: 'POST' },
        update: { method: 'PUT' },
        delete: { method: 'DELETE' }
  });
  return User;
}
