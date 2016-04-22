var NewEventForm = {
  templateUrl: 'events/new_event_form.html',
  bindings: {
    eventBoolean: '='
  },
  controller: function(UserEvent, $scope) {
    var ctrl = this;

    $scope.closeForm = function() {
      $scope.$emit('closeForm', false);  
    }

    ctrl.createEvent = function() {
      UserEvent.create(ctrl.formData, function(res){
        debugger;
      });
    };
    ctrl.message = "this is the controller"
  },
  controllerAs: 'eventForm'
};

angular
  .module('app')
  .component('newEventForm', NewEventForm);
