var EditEventForm = {
  templateUrl: 'events/forms/edit_event.html',
  bindings: {
    event: '='
  },
  controller: function(UserEvent, $scope, $stateParams, CategoriesService, EventsService) {
    var ctrl = this;
    ctrl.$inject = ['UserEvent', '$scope', '$stateParams', 'CategoriesService', 'EventsService'];

    ctrl.event.data.start_time = new Date(ctrl.event.data.start_time);

    if (ctrl.event.data.venue !== undefined){
      ctrl.event.data.venue_name = ctrl.event.data.venue.name;
    };

    CategoriesService.getCategories().then(function(res){
      ctrl.categories = res.data;
    });

    ctrl.editEvent = function() {
      var updatedEvent = this.event.data;
      updatedEvent.category = this.event.data.category.name;

      UserEvent.update({id: updatedEvent.id}, {event: updatedEvent}, function(res){
        ctrl.event.category = res.category.name;
        ctrl.event.date = new Date(res.start_time);
        ctrl.venue_name = res.venue.name;
        // if (res.venue != undefined){ ctrl.event.data.venue_name = res.venue.name; };
        $scope.$emit("eventUpdated", res);
      });
    };

    // $scope.selectedCountry = [];

    $scope.closeForm = function() {
      $scope.$emit('closeEditForm', false);
    };
  },
  controllerAs: 'eventForm'
};

angular
  .module('app')
  .component('editEventForm', EditEventForm);
