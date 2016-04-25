app.factory('Comment', Comment);

function Comment($resource) {

  var Comment = $resource('http://localhost:3000/api/v1/events/:event_id/comments', {event_id: '@event_id'}, {
    update: { method: 'PUT' },
    delete: { method: 'DELETE' }
  });

  return Comment;

}