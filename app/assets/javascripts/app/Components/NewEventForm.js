var NewEventForm = {
  templateUrl: 'events/new_event_form.html',
  controller: function(UserEvent, $scope, CategoriesService, $state, Auth) {
    var ctrl = this;

    $scope.closeForm = function() {
      $scope.$emit('closeForm', false);
    };

    // ctrl.allCategories = [];

    ctrl.categories = CategoriesService.getCategories().then(function(res){
      ctrl.allCategories = res.data.map(function(category){
        category.name = category.name.replace('&amp; ', '');
        return category;
      });
    });

    $scope.selectedCountry = [];

    ctrl.currentUser = Auth.currentUser().then(function(resp) {
      ctrl.creator = resp.id;
    }, function(error) {
      console.log(error);
    })

    ctrl.createEvent = function() {
      ctrl.formData.creator = ctrl.creator
      UserEvent.create({event: ctrl.formData}, function(res){
        $scope.closeForm();
        $state.go('home.myEvents');
        ctrl.formData = {};
      }, function(error) {
        console.log(error);
      });
    };

  },
  controllerAs: 'eventForm'
};

angular
  .module('app')
  .component('newEventForm', NewEventForm);
