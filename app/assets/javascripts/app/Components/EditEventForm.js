var EditEventForm = {
  templateUrl: 'events/forms/edit_event.html',
  bindings: {
    event: '='
  },
  controller: function($scope, UserEvent, CategoriesService) {
    var ctrl = this;
    ctrl.$inject = ['$scope', 'UserEvent', 'CategoriesService'];

    ctrl.event.data.start_time = new Date(ctrl.event.data.start_time);

    if (ctrl.event.data.venue !== undefined){
      ctrl.event.data.venue_name = ctrl.event.data.venue.name;
    };

    CategoriesService.getCategories().then(function(res){
      ctrl.categories = res.data;
    });

    function setData(updatedEvent){
      updatedEvent.category = updatedEvent.category.name;
      updatedEvent.venue_name = updatedEvent.venue;
      return updatedEvent;
    };

    function updateData(updatedEvent){
      ctrl.event.category = updatedEvent.category.name;
      ctrl.event.date = new Date(updatedEvent.start_time);
    };

    ctrl.editEvent = function() {
      var updatedEvent = this.event.data;
      UserEvent.update({id: updatedEvent.id}, {event: setData(updatedEvent)}, function(res){
        updateData(res);
        $scope.$emit("eventUpdated", res);
      });
    };

    $scope.closeForm = function() {
      $scope.$emit('closeEditForm', false);
    };
  },
  controllerAs: 'eventForm'
};

angular
  .module('app')
  .component('editEventForm', EditEventForm);
