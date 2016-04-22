var ApiEvent = {
  templateUrl: 'events/api_event.html',
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
  .component('apiEvent', ApiEvent);
