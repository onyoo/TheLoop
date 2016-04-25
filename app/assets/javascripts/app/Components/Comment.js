var Comment = {
  templateUrl: 'comments/comment.html',
  bindings: {
    comment: '='
  },
  controller: function(UserEvent, EventsService, $state){
    var ctrl = this;
    

    

  },
  controllerAs: 'comment'
};

angular
  .module('app')
  .component('comment', Comment);