var LoopEvent = {
  templateUrl: 'events/local_event.html',
  bindings: {
    details: '='
  },
  controller: function(User, CategoriesService, VenuesService){
    var ctrl = this;

    ctrl.date = Date.parse(this.details.start_time);

    CategoriesService.getCategory(ctrl.details.category_id).then(function(res){
      ctrl.category = res.data.name;
    });

    VenuesService.getVenue(ctrl.details.venue_id).then(function(res){
      ctrl.venue = res.data.name;
    });

    this.removeEvent = function() {
      User.delete({id: this.details.id }, function(res){
        $('[data-event-id="' + res.id +'"]').text('');
      });
    };
  },
  controllerAs: 'event'
};

angular
  .module('app')
  .component('loopEvent', LoopEvent);
