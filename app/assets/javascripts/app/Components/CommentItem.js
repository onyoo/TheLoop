var CommentItem = {
  templateUrl: 'comments/comment.html',
  bindings: {
    comment: '='
  },
  controller: function(UserEvent, EventsService, $state, User){
    var ctrl = this;
    
    // User.get({id: ctrl.comment.user_id}).then(function(resp) {
    //   debugger;
    // });
    // ctrl.user = User.get({id: ctrl.comment.user_id});
    
    

    

  },
  controllerAs: 'comment'
};

angular
  .module('app')
  .component('commentItem', CommentItem);