var LoopEvent = {
  templateUrl: 'events/local_event.html',
  bindings: {
    details: '='
  },
  controller: function(User, $state, $scope, $http){
    var ctrl = this;

    this.removeEvent = function() {
      User.delete({id: this.details.id }, function(res){
        $('[data-event-id="' + res.id +'"]').text('');
      });
    };

    ctrl.assignCategory = $http.get('http://localhost:3000/api/v1/categories/' + ctrl.details.category_id).then(function(res){
      ctrl.category = res.data.name;
    });

    ctrl.assignVenue = $http.get('http://localhost:3000/api/v1/venues/' + ctrl.details.venue_id).then(function(res){
      ctrl.venue = res.data.name;
    });

    this.date = Date.parse(this.details.start_time);
  },
  controllerAs: 'event'
};

angular
  .module('app')
  .component('loopEvent', LoopEvent);
