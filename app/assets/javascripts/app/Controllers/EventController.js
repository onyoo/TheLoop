function EventController(event){
  this.data = event.data.events.event;
}


angular
  .module('app')
  .controller('EventController', EventController);