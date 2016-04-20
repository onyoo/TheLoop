function EventsController(events, EventsService){
  var ctrl = this;
  ctrl.data = events.data.events.event;

  ctrl.zipcodeSearch = function() {
    EventsService.byZipcode(ctrl.zipcode).then(function(resp) {
      ctrl.data = resp.data.events.event;
    });
  };
};

angular
  .module('app')
  .controller('EventsController', EventsController);
