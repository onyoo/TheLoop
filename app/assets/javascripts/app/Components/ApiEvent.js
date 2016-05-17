var ApiEvent = {
  templateUrl: 'events/api_event.html',
  bindings: {
    details: '='
  },
  controller: function(EventsService, $state){
    var ctrl = this;
    ctrl.$inject = ['UserEvent', 'EventsService', '$state'];

    // this.details.date = Date.parse(this.details.start_time);
    ctrl.date = Date.parse(this.details.start_time);

    if (this.details.venue_name === undefined && this.details.venue !== undefined){
      ctrl.details.venue_name = this.details.venue.name;
    };

    if (this.details.city_name === undefined){
      ctrl.details.city_name = this.details.city;
    };

    ctrl.showEvent = function(api_id) {
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
