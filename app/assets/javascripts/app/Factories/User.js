function User($resource){
  return $resource('/api/v1//users/:id.json', {user_id: '@userId'}, {
    get: {method: 'GET', isArray: true},
    delete: { method: 'DELETE' }
  });
}

angular
.module('app')
.factory('User', ['$resource', User]);
