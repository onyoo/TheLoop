var NewEventForm = {
  templateUrl: 'events/new_event_form.html',
  controller: function(UserEvent, $scope, CategoriesService, $state, Auth) {
    var ctrl = this;

    ctrl.$inject = ['UserEvent', '$scope', 'CategoriesService', '$state', 'Auth'];

    $scope.closeForm = function() {
      $scope.$emit('closeForm', false);
    };

    $scope.selectedCountry = [];

    Auth.currentUser().then(function(resp) {
      ctrl.creator = resp.id;
    });

    CategoriesService.getCategories().then(function(res){
      ctrl.categories = res.data.map(function(category){
        category.name = category.name.replace('&amp; ', '');
        return category;
      });
    });

    ctrl.createEvent = function() {
      this.formData.creator = ctrl.creator
      UserEvent.create({event: this.formData}, function(res){
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
