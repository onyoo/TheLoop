var NewEventForm = {
  templateUrl: 'events/new_event_form.html',
  controller: function(UserEvent, $scope) {
    var ctrl = this;
    ctrl.createEvent = function() {
      // ctrl.formData.categories.category = $scope.category_input;
      UserEvent.create(ctrl.formData).$promise.then(function(resp) {
        debugger;
      });
    };
    this.message = "this is the controller"
  },
  controllerAs: 'eventForm'
};

angular
  .module('app')
  .component('newEventForm', NewEventForm);
