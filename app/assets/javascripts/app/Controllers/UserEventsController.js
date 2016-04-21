angular 
  .module('app') 
  .controller('UserEventsController', UserEventsController);
function UserEventsController(UserEvent) {
  
  var ctrl = this; 
  // change our ctrl.notes = []; to query the entire Note table
  ctrl.events = UserEvent.query();
};