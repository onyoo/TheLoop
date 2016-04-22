var LoopIndexEvent = {
  templateUrl: 'events/loop_index_event.html',
  bindings: {
    details: '='
  },
  controller: function(UserEvent){
    // UserEvent.query({id: this.details.id});
    this.date = Date.parse(this.details.start_time);
  },
  controllerAs: 'event'
};

angular
  .module('app')
  .component('loopIndexEvent', LoopIndexEvent);
