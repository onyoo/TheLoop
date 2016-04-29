var LoopEvent = {
  templateUrl: 'events/local_event.html',
  bindings: {
    details: '='
  },
  controller: function(User, $state, $scope, CategoriesService, VenuesService){
    var ctrl = this;

    this.date = Date.parse(this.details.start_time);

    this.removeEvent = function() {
      User.delete({id: this.details.id }, function(res){
        $('[data-event-id="' + res.id +'"]').text('');
      });
    };

    CategoriesService.getCategory(ctrl.details.category_id).then(function(res){
      ctrl.category = res.data.name;
    });

    VenuesService.getVenue(ctrl.details.venue_id).then(function(res){
      ctrl.venue = res.data.name;
    })
  },
  controllerAs: 'event'
};

angular
  .module('app')
  .component('loopEvent', LoopEvent);
