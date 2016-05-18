function UserEvent($resource){
  return $resource('/api/v1/events/:id.json', {id: '@id'}, {
        query: { method: 'GET', isArray: true },
        create: { method: 'POST' }
        // update: { method: 'PUT' },
        // delete: { method: 'DELETE' }
  });
}

angular
  .module('app')
  .factory('UserEvent', ['$resource', UserEvent]);
