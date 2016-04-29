var ApiEvent = {
  templateUrl: 'events/api_event.html',
  bindings: {
    details: '='
  },
  controller: function(UserEvent, EventsService, $state){
    var ctrl = this;
    ctrl.$inject = ['UserEvent', 'EventsService', '$state'];
    this.details.date = Date.parse(this.details.start_time);

    this.showEvent = function(api_id) {
      EventsService.checkLoopEvent(api_id).then(function(resp){
        $state.go('home.loopEvent', {id: resp.data.id})
      }, function(error){
        $state.go('home.event', {id: api_id})
      })
    }
  },
  controllerAs: 'event'
};

angular
  .module('app')
  .component('apiEvent', ApiEvent);
