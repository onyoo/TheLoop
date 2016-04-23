var LoopEvent = {
  templateUrl: 'events/local_event.html',
  bindings: {
    details: '='
  },
  controller: function(User, $state, $scope){
    this.removeEvent = function(myEvent) {
      User.delete({id: myEvent.id }, function(res){
        $('[data-event-id="' + res.id +'"]').text('');
      });
    };

    $scope.$on('closeForm', function (event, data) {
      $scope.newEvent = data
    });
    this.date = Date.parse(this.details.start_time);
  },
  controllerAs: 'event'
};

angular
  .module('app')
  .component('loopEvent', LoopEvent);
