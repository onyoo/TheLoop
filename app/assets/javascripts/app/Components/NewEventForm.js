var NewEventForm = {
  templateUrl: 'events/new_event_form.html',
  controller: function(UserEvent, $scope) {
    var ctrl = this;

    $scope.closeForm = function() {
      $scope.$emit('closeForm', false);
    }

    ctrl.createEvent = function() {
      UserEvent.create(ctrl.formData, function(res){
        if(res.status == 200){
          $scope.$emit('closeForm', false);
        }else{
          debugger;
        };
      });
    };
    ctrl.message = "this is the controller"
  },
  controllerAs: 'eventForm'
};

angular
  .module('app')
  .component('newEventForm', NewEventForm);
