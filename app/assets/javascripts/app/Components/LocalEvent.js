var LocalEvent = {
  templateUrl: 'events/local_event.html',
  bindings: {
    details: '='
  },
  controller: function(){
    
    this.date = Date.parse(this.details.start_time);
  },
  controllerAs: 'event'
};

angular
  .module('app')
  .component('localEvent', LocalEvent);
