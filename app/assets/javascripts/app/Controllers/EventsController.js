function EventsController(events){
  this.data = events.data.events.event;
};

angular
  .module('app')
  .controller('EventsController', EventsController);
