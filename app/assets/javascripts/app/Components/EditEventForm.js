var EditEventForm = {
  templateUrl: 'events/edit_event_form.html',
  bindings: {
    event: '='
  },
  controller: function(UserEvent, $scope, $stateParams, CategoriesService, EventsService) {
    var ctrl = this;

    $scope.closeForm = function() {
      $scope.$emit('closeEditForm', false);
    }

    ctrl.event.data.start_time = new Date(ctrl.event.data.start_time);
    $scope.selectedCountry = [];

    ctrl.allCategories = '';

    ctrl.categories = CategoriesService.getCategories().then(function(res){
      ctrl.allCategories = res.data.map(function(category){
        return category.name.replace('&amp; ', '');
      });
    });

// working with EventsService
    // ctrl.editEvent = function() {
    //   EventsService.updateEvent($stateParams.id, ctrl.event.data).then(function(resp) {
    //     ctrl.event.data = resp.data;
    //     ctrl.event.data.start_time = new Date(ctrl.event.data.start_time);
    //     $scope.$emit("eventUpdated", resp.data);
    //   })
    // };

// working with resource
    ctrl.editEvent = function() {
      console.log(ctrl.event.data.id)
      UserEvent.update({id: ctrl.event.data}, function(resp){
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
