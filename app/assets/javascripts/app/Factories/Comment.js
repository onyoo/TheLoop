

function Comment($resource) {

  var Comment = $resource('https://localhost:3000/api/v1/events/:event_id/comments', {event_id: '@event_id'}, {
    save: {method: 'POST'},
    update: { method: 'PUT' },
    delete: { method: 'DELETE' }
  });

  return Comment;

}

angular
  .module('app')
  .factory('Comment', ['$resource', Comment]);