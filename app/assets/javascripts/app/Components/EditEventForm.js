var EditEventForm = {
  templateUrl: 'events/edit_event_form.html',
  bindings: {
    event: '='
  },
  controller: function(UserEvent, $scope, $stateParams, CategoriesService, EventsService) {
    var ctrl = this;

    ctrl.$inject = ['UserEvent', '$scope', '$stateParams', 'CategoriesService', 'EventsService'];

    $scope.closeForm = function() {
      $scope.$emit('closeEditForm', false);
    }

    ctrl.event.data.start_time = new Date(ctrl.event.data.start_time);
    $scope.selectedCountry = [];

    ctrl.allCategories = [];

    ctrl.categories = CategoriesService.getCategories().then(function(res){
      ctrl.allCategories = res.data.map(function(category){
        category.name = category.name.replace('&amp; ', '');
        return category;
      });
    });

    ctrl.editEvent = function() {
      UserEvent.update({id: ctrl.event.data.id}, ctrl.event.data, function(resp){
        ctrl.event.data = resp;
        ctrl.event.data.start_time = new Date(ctrl.event.data.start_time);
        $scope.$emit("eventUpdated", resp);
      });
    };
  },

  controllerAs: 'eventForm'
};

angular
  .module('app')
  .component('editEventForm', EditEventForm);
