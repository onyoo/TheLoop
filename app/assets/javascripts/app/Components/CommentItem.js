var CommentItem = {
  templateUrl: 'comments/comment.html',
  bindings: {
    comment: '='
  },
  controllerAs: 'comment'
};

angular
  .module('app')
  .component('commentItem', CommentItem);
