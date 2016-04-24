var EditEventForm = {
  templateUrl: 'events/edit_event_form.html',
  bindings: {
    event: '='
  },
  controller: function(UserEvent, $scope, $stateParams, CategoriesService, EventsService) {
    var ctrl = this;

    $scope.closeForm = function() {
      $scope.$emit('closeForm', false);
    }

    $scope.selectedCountry = [];

    ctrl.allCategories = "";

    ctrl.categories = CategoriesService.getCategories().then(function(res){
      var categories = [];
      res.data.forEach(function(category){
        categories.push(category.name.replace('&amp; ', ''));
      })
      ctrl.allCategories = categories;
    });
    
   

    ctrl.editEvent = function() { 
      EventsService.updateEvent($stateParams.id, ctrl.event.data).then(function(resp) {
        debugger;
      }) 
    };
      
  //   ctrl.event.$update(function() {
      
  //     $state.go('events'); 
  //   });
  // };

    
  //   ctrl.editEvent = function() {
  //   EventsService.getLoopEvent($stateParams.id).then(function(resp) {
      
  //     ctrl.entry = resp.data
      
  //     ctrl.entry.data = ctrl.formData;
  //     ctrl.entry.$update(function() {
  //     //updated in the backend
  //     });
  //   });
  // };
    

    ctrl.message = "this is the controller"
  },
  controllerAs: 'eventForm'
};

angular
  .module('app')
  .component('editEventForm', EditEventForm);

  