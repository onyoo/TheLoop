var LocalEvent = {
  templateUrl: 'events/local_event.html',
  bindings: {
    details: '='
  },
  controllerAs: 'event'
  
};

angular
  .module('app')
  .component('localEvent', LocalEvent);