var LoopEvent = {
  templateUrl: 'events/local_event.html',
  bindings: {
    details: '='
  },
  controller: function(User, CategoriesService, VenuesService){
    this.$inject = ['User', 'CategoriesService', 'VenuesService'];
    var ctrl = this;
    ctrl.details.date = Date.parse(this.details.start_time);
  },
  controllerAs: 'event'
};

angular
  .module('app')
  .component('loopEvent', LoopEvent);
