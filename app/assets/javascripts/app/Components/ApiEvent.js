var ApiEvent = {
  templateUrl: 'events/api_event.html',
  bindings: {
    details: '='
  },
  controller: function(){
    var ctrl = this;
    ctrl.date = Date.parse(this.details.start_time);

    if (this.details.venue_name === undefined && this.details.venue !== undefined){
      ctrl.details.venue_name = this.details.venue.name;
    };

    if (this.details.city_name === undefined){
      ctrl.details.city_name = this.details.city;
    };
  },
  controllerAs: 'event'
};

angular
  .module('app')
  .component('apiEvent', ApiEvent);
