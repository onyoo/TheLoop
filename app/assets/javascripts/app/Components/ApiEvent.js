var ApiEvent = {
  templateUrl: 'events/api_event.html',
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
  .component('apiEvent', ApiEvent);
