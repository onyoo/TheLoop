var ApiEvent = {
  templateUrl: 'events/api_event.html',
  bindings: {
    details: '='
  },
  controller: function(UserEvent, EventsService, $state){
    var ctrl = this;
    this.date = Date.parse(this.details.start_time);

    // If we want to add categories to eventful API event index card
    // ctrl.category = '';
    // ctrl.setCategory = EventsService.getEvent(this.details.id)
    //   .then(function(resp){
    //     ctrl.category = resp.data.categories.category[0].name.replace('&amp; ', '');
    //   });

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
