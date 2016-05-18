var LoopEvent = {
  templateUrl: 'events/local_event.html',
  bindings: {
    details: '='
  },
  controller: function(User, CategoriesService, VenuesService){
    this.$inject = ['User', 'CategoriesService', 'VenuesService'];
    var ctrl = this;

    ctrl.details.date = Date.parse(this.details.start_time);

    CategoriesService.getCategory(ctrl.details.category_id).then(function(res){
      ctrl.category = res.data.name;
    });

    VenuesService.getVenue(ctrl.details.venue_id).then(function(res){
      ctrl.venue = res.data.name;
    });
  },
  controllerAs: 'event'
};

angular
  .module('app')
  .component('loopEvent', LoopEvent);
