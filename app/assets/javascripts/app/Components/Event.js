var Item = {
  templateUrl: 'events/event.html',
  bindings: {
    id: '='
  },
  controller: function (EventsService) {
    var ctrl = this;

    EventsService
      .getEvent(this.id)
      .then(function(res){
        ctrl.data = res.data;
      })
  },
  controllerAs: 'event'
};

angular
  .module('app')
  .component('event', Event);