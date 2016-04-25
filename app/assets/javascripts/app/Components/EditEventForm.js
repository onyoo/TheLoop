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
    ctrl.date = Date.parse(this.event.data.start_time);
    $scope.selectedCountry = [];

    ctrl.allCategories = '';

    ctrl.categories = CategoriesService.getCategories().then(function(res){
      ctrl.allCategories = res.data.map(function(category){
        return category.name.replace('&amp; ', '');
      });
    });

    ctrl.editEvent = function() {
      EventsService.updateEvent($stateParams.id, ctrl.event.data).then(function(resp) {
        $scope.$emit("eventUpdated", resp)
      })
    };

    // Attempting to update the event using resource
    // ctrl.editEvent = function() {
    //   userEvent = UserEvent.get({user_id: this.event.data.id}, function(){
    //     debugger;
    //   });
    // };
  },
  controllerAs: 'eventForm'
};

angular
  .module('app')
  .component('editEventForm', EditEventForm);
