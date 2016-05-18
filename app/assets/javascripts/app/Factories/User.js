function User($resource){
  return $resource('/api/v1//users/:id.json', {user_id: '@userId'}, {
    get: {method: 'GET'},
    delete: { method: 'DELETE' }
    // query: { method: 'GET', isArray: true },
    // create: { method: 'POST' },
    // remove: { method: 'PUT' },
    // update: { method: 'PUT' },
  });
}

angular
.module('app')
.factory('User', ['$resource', User]);
