var NewEventForm = {
  templateUrl: 'events/new_event_form.html',
  controller: function(UserEvent, $scope, CategoriesService) {
    var ctrl = this;

    $scope.closeForm = function() {
      $scope.$emit('closeForm', false);
    };

    ctrl.allCategories = "";
    
    ctrl.categories = CategoriesService.getCategories().then(function(res){
      var categories = [];
      res.data.forEach(function(category){
        categories.push(category.name.replace('&amp; ', ''));
      })
      ctrl.allCategories = categories;
    });

    $scope.selectedCountry = [];
    ctrl.createEvent = function() {
      UserEvent.create(ctrl.formData, function(res){
        $scope.$emit('closeForm', false);
      }, function(error) {
        console.log(error)
        debugger;
      });
    };
    ctrl.message = "this is the controller"
  },
  controllerAs: 'eventForm'
};

angular
  .module('app')
  .component('newEventForm', NewEventForm);
