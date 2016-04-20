var Event = {
  templateUrl: 'events/event.html',
  bindings: {
    details: '='
  },
  controllerAs: 'event'
};

angular
  .module('app')
  .component('event', Event);
