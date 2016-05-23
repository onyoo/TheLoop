var LoopEvent = {
  templateUrl: 'events/local_event.html',
  bindings: {
    details: '='
  },
  controller: function($rootScope, User, CategoriesService, VenuesService){
    this.$inject = ['$rootScope,', 'User', 'CategoriesService', 'VenuesService'];
    var ctrl = this;
    ctrl.details.date = Date.parse(this.details.start_time);

    ctrl.removeEvent = function(index) {
      User.delete({id: this.details.id}, function(res){
        $rootScope.$broadcast("removeEvent", res);
      });
    };
  },
  controllerAs: 'event'
};

angular
  .module('app')
  .component('loopEvent', LoopEvent);
