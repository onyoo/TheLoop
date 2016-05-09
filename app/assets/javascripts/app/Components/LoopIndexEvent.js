var LoopIndexEvent = {
  templateUrl: 'events/loop_index_event.html',
  bindings: {
    details: '='
  },
  controller: function(UserEvent, EventsService, $state){
    this.$inject = ['UserEvent','EventsService','$state'];
    this.details.date = new Date(this.details.start_time);

    this.showEvent = function(id) {
      EventsService.checkLoopEvent(id).then(function(resp){
        $state.go('home.loopEvent', {id: resp.data.id})
      }, function(error){
        $state.go('home.event', {id: id})
      })
    }
  },
  controllerAs: 'event'
};

angular
  .module('app')
  .component('loopIndexEvent', LoopIndexEvent);
