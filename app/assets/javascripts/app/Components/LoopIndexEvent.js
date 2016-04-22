var LoopIndexEvent = {
  templateUrl: 'events/loop_index_event.html',
  bindings: {
    details: '='
  },
  controller: function(UserEvent){
    if(this.details.start_time){
      this.date = Date.parse(this.details.start_time);
    };
  },
  controllerAs: 'event'
};

angular
  .module('app')
  .component('loopIndexEvent', LoopIndexEvent);
