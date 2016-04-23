var EditEventForm = {
  templateUrl: 'events/edit_event_form.html',
  bindings: {
    event: '='
  },
  controller: function(UserEvent, $scope, $stateParams) {
    var ctrl = this;

    $scope.closeForm = function() {
      $scope.$emit('closeForm', false);
    }

    $scope.selectedCountry = [];
    
    // ctrl.event = UserEvent.get({id: $stateParams.id});

    ctrl.editEvent = function() {
      
      UserEvent.update(ctrl.formData, function(res){
        $scope.$emit('closeForm', false);
      }, function(error) {
        console.log(error)
        
      });
    };
    // ctrl.editEvent = function() {
    //   ctrl.event.$update(function() {
    //     $location.path('events')
    //   });
    // };
    ctrl.message = "this is the controller"
  },
  controllerAs: 'eventForm'
};

angular
  .module('app')
  .component('editEventForm', EditEventForm);

  