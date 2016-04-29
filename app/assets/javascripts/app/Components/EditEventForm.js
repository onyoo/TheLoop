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
    // ctrl.event.data.categories = ctrl.event.data.category.name;
    $scope.selectedCountry = [];
    // ctrl.allCategories = [];
    //
    // ctrl.categories = CategoriesService.getCategories().then(function(res){
    //   ctrl.allCategories = res.data.map(function(category){
    //     category.name = category.name.replace('&amp; ', '');
    //     return category;
    //   });
    // });

    //
    CategoriesService.getCategories().then(function(res){
      ctrl.categories = res.data.map(function(category){
        category.name = category.name.replace('&amp; ', '');
        return category;
      });
    });

    ctrl.editEvent = function() {
      if (this.event.data.categories == undefined){
        ctrl.event.data.categories = this.event.data.category;
      }
      // ctrl.event.data.categories = ctrl.event.data.category;
      UserEvent.update({id: ctrl.event.data.id}, {event: ctrl.event.data}, function(res){
        ctrl.event.data = res;
        ctrl.event.category = res.category.name;
        debugger;
        ctrl.event.start_time = new Date(res.start_time);
        $scope.$emit("eventUpdated", res);
      });
    };
  },

  controllerAs: 'eventForm'
};

angular
  .module('app')
  .component('editEventForm', EditEventForm);
