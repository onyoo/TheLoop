var ApiEvent = {
  templateUrl: 'events/api_event.html',
  bindings: {
    details: '='
  },
  controller: function(UserEvent, EventsService, $state){
    this.date = Date.parse(this.details.start_time);

    this.showEvent = function(api_id) {
      console.log("clicked show event")
      EventsService.checkLoopEvent(api_id).then(function(resp){
        
        $state.go('home.loopEvent', {id: resp.data.id})
      }, function(error){
        console.log(api_id)
          
        $state.go('home.event', {id: api_id})
      })
    }
  },
  controllerAs: 'event'
};

angular
  .module('app')
  .component('apiEvent', ApiEvent);
