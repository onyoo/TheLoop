var NewEventForm = {
  templateUrl: 'events/forms/new_event.html',
  controller: function($scope, $state, Auth, UserEvent, CategoriesService) {
    var ctrl = this;
    ctrl.$inject = ['$scope', '$state', 'Auth', 'UserEvent', 'CategoriesService'];

    Auth.currentUser().then(function(resp) {
      ctrl.creator = resp.id;
    });

    CategoriesService.getCategories().then(function(res){
      ctrl.categories = res.data;
    });

    ctrl.createEvent = function() {
      this.data.creator = ctrl.creator
      UserEvent.create({event: this.data}, function(res){
        $scope.closeForm();
        $state.go('home.myEvents');
        ctrl.data = {};
      }, function(error) {
        console.log(error);
      });
    };

    $scope.closeForm = function() {
      $scope.$emit('closeForm', false);
    };

    // $scope.selectedCountry = [];
  },
  controllerAs: 'eventForm'
};

angular
  .module('app')
  .component('newEventForm', NewEventForm);
