var EditEventForm = {
  templateUrl: 'events/edit_event_form.html',
  controller: function(UserEvent, $scope, $stateParams) {
    var ctrl = this;

    $scope.closeForm = function() {
      $scope.$emit('closeForm', false);
    }

    $scope.selectedCountry = [];

    ctrl.event = UserEvent.get({id: $stateParams.id});
    debugger;
    ctrl.editEvent = function() {
      ctrl.event.$update(function() {
        $location.path('events')
      });
    };
    ctrl.message = "this is the controller"
  },
  controllerAs: 'eventForm'
};

angular
  .module('app')
  .component('editEventForm', EditEventForm);

  