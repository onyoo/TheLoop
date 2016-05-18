var EditEventForm = {
  templateUrl: 'events/forms/edit_event.html',
  bindings: {
    event: '='
  },
  controller: function(UserEvent, $scope, $stateParams, CategoriesService, EventsService) {

    var ctrl = this;
    ctrl.$inject = ['UserEvent', '$scope', '$stateParams', 'CategoriesService', 'EventsService'];

    $scope.selectedCountry = [];

    $scope.closeForm = function() {
      $scope.$emit('closeEditForm', false);
    }

    ctrl.event.data.start_time = new Date(ctrl.event.data.start_time);
    ctrl.event.data.categories = ctrl.event.data.category;

    if (ctrl.event.data.venue !== undefined){
      ctrl.event.data.venue_name = ctrl.event.data.venue.name;
    };

    CategoriesService.getCategories().then(function(res){
      ctrl.categories = res.data;
    });

    ctrl.editEvent = function() {
      var updatedEvent = this.event.data;

      UserEvent.update({id: updatedEvent.id}, {event: updatedEvent}, function(res){
        ctrl.event.category = res.category.name;
        ctrl.event.date = new Date(res.start_time);
        $scope.$emit("eventUpdated", res);
      });
    };
  },
  controllerAs: 'eventForm'
};

angular
  .module('app')
  .component('editEventForm', EditEventForm);
