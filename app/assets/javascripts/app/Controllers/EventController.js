function EventController(event){
  var ctrl = this;
  ctrl.data = event.data;

  ctrl.latitude = ctrl.latitude;
  ctrl.longitude = ctrl.longitude;
}


angular
  .module('app')
  .controller('EventController', EventController);
