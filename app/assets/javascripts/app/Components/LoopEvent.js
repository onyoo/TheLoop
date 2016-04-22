var LoopEvent = {
  templateUrl: 'events/local_event.html',
  bindings: {
    details: '='
  },
  controller: function(User, $state){
    this.removeEvent = function(myEvent) {
      User.delete({id: myEvent.id }, function(res){
        $('[data-event-id="' + res.id +'"]').text('');
      });
    };
    this.date = Date.parse(this.details.start_time);
  },
  controllerAs: 'event'
};

angular
  .module('app')
  .component('loopEvent', LoopEvent);
