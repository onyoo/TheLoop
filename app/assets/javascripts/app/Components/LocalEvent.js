var LocalEvent = {
  templateUrl: 'events/local_event.html',
  bindings: {
    details: '='
  },
  controller: function(User, $state){

    this.removeEvent = function(myEvent) {
      console.log(myEvent);
      console.log('Event remove clicked');
      
      User.remove(myEvent);
      this.details = {};
      debugger;
      $state.go('home.myEvents');
  };
    this.date = Date.parse(this.details.start_time);
  },
  controllerAs: 'event'
};

angular
  .module('app')
  .component('localEvent', LocalEvent);
